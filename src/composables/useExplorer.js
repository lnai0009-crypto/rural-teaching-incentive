import { ref, reactive, computed, watch } from 'vue'
import { PAGE_SIZE } from '../data/db.js'
import {
  fetchExplorerFilters,
  fetchExplorerLocations,
  fetchExplorerLocation,
  fetchExplorerCompare,
  fetchExplorerHeroTop,
} from '../api/explorerApi.js'
import { normalizeLocationRecord, normalizeLocationList } from '../utils/locationFields.js'

// ── Default filter tiles (used if /filters fails) ──
const DEFAULT_STATE_OPTS = [
  { v: 'both', icon: '🗺️', label: 'Both' },
  { v: 'qld', icon: '☀️', label: 'QLD' },
  { v: 'nsw', icon: '🌉', label: 'NSW' },
]
const DEFAULT_EMP_OPTS = [
  { v: 'perm', icon: '📋', label: 'Permanent' },
  { v: 'temp', icon: '📝', label: 'Temporary' },
]
const DEFAULT_REMOTENESS_OPTS = [
  { v: '5', icon: '🔴', label: 'Very Remote' },
  { v: '4', icon: '🟠', label: 'Remote' },
  { v: '3', icon: '🟡', label: 'Outer Regional' },
  { v: '2', icon: '🟢', label: 'Inner Regional' },
  { v: '1', icon: '🔵', label: 'Major Cities' },
]

/**
 * Map GET /api/explorer/filters → UI option rows
 * Backend: states, employeeTypes, remotenessOptions
 */
function mapFiltersPayload(json) {
  const states = json.states ?? []
  const emp = json.employeeTypes ?? json.employee_types ?? []
  const rem = json.remotenessOptions ?? json.remoteness_options ?? []

  const stateOpts = states.length
    ? states.map((s) => ({
        v: String(s.value ?? s.v ?? s.id ?? s.code ?? ''),
        icon: s.icon ?? '📍',
        label: String(s.label ?? s.name ?? s.title ?? ''),
      }))
    : DEFAULT_STATE_OPTS

  const empOpts = emp.length
    ? emp.map((e) => ({
        v: String(e.value ?? e.id ?? e.code ?? ''),
        icon: e.icon ?? '📋',
        label: String(e.label ?? e.name ?? e.title ?? ''),
      }))
    : DEFAULT_EMP_OPTS

  const remotenessOpts = rem.length
    ? rem.map((r) => ({
        v: String(r.id ?? r.remoteness_category_id ?? r.value ?? r.v ?? ''),
        icon: r.icon ?? '📍',
        label: String(r.label ?? r.name ?? r.title ?? ''),
      }))
    : DEFAULT_REMOTENESS_OPTS

  return { stateOpts, empOpts, remotenessOpts }
}

let filtersPromise = null
const stateOpts = ref([...DEFAULT_STATE_OPTS])
const empOpts = ref([...DEFAULT_EMP_OPTS])
const remotenessOpts = ref([...DEFAULT_REMOTENESS_OPTS])
const filtersError = ref(null)

function loadFiltersOnce() {
  if (!filtersPromise) {
    filtersPromise = fetchExplorerFilters()
      .then((json) => {
        filtersError.value = null
        const m = mapFiltersPayload(json)
        stateOpts.value = m.stateOpts
        empOpts.value = m.empOpts
        remotenessOpts.value = m.remotenessOpts
      })
      .catch((e) => {
        console.warn('explorer filters', e)
        filtersError.value = 'Could not load filter options. Using defaults.'
      })
  }
  return filtersPromise
}

const heroTop = ref([])
const heroLoading = ref(false)
const heroError = ref(null)

let heroStarted = false
function loadHeroTopOnce() {
  if (heroStarted) return
  heroStarted = true
  heroLoading.value = true
  heroError.value = null
  fetchExplorerHeroTop()
    .then((rows) => {
      const arr = Array.isArray(rows) ? rows : []
      heroTop.value = normalizeLocationList(arr)
    })
    .catch((e) => {
      console.warn('hero-top', e)
      heroTop.value = []
      heroError.value = 'Could not load top schools.'
      heroStarted = false
    })
    .finally(() => {
      heroLoading.value = false
    })
}

// ── Shared reactive state ──
const fState = ref('both')
const fEmp = ref('perm')
const fRem = reactive(new Set())
const fSort = ref('inc')
const cmpList = reactive([])
const openRow = ref(null)
const showCmp = ref(false)
const insSchool = ref(null)
const sbsMode = ref(false)
const currentPage = ref(1)
const guidePage = ref(1)

const searchListItems = ref([])
const searchTotal = ref(0)
const searchLoading = ref(false)
const searchError = ref(null)

const guideListItems = ref([])
const guideTotal = ref(0)
const guideLoading = ref(false)
const guideError = ref(null)

const compareSchools = ref([])
const compareLoading = ref(false)
const compareError = ref(null)

function sortParamForApi(uiSort) {
  if (uiSort === 'az') return 'name'
  return uiSort
}

function buildLocationQuery({ page, searchText }) {
  const remoteness_ids = [...fRem].sort().join(',')
  const params = {
    page,
    page_size: PAGE_SIZE,
    state: fState.value,
    employee_type: fEmp.value,
    sort: sortParamForApi(fSort.value),
  }
  if (remoteness_ids) params.remoteness_ids = remoteness_ids
  const t = (searchText || '').trim()
  if (t) params.search = t
  return params
}

function shouldSkipSearchList(searchText) {
  const t = (searchText || '').trim()
  return !t && fRem.size === 0 && fState.value === 'both'
}

// ── Filters ──
function selState(v) {
  fState.value = v
  currentPage.value = 1
}
function selEmp(v) {
  fEmp.value = v
  currentPage.value = 1
}
function toggleRem(v) {
  const key = String(v)
  fRem.has(key) ? fRem.delete(key) : fRem.add(key)
  currentPage.value = 1
}
function setSort(v) {
  fSort.value = v
  currentPage.value = 1
}

const filterBadgeCount = computed(() => {
  let n = 0
  if (fState.value !== 'both') n++
  if (fRem.size > 0) n++
  return n
})

const remSize = computed(() => fRem.size)

async function loadSearchLocations(searchText) {
  searchError.value = null
  if (shouldSkipSearchList(searchText)) {
    searchListItems.value = []
    searchTotal.value = 0
    return
  }
  searchLoading.value = true
  try {
    const { items, total } = await fetchExplorerLocations(
      buildLocationQuery({ page: currentPage.value, searchText })
    )
    searchListItems.value = normalizeLocationList(items)
    searchTotal.value = total
  } catch (e) {
    console.warn('search locations', e)
    searchListItems.value = []
    searchTotal.value = 0
    searchError.value = 'Could not load schools. Check your connection and try again.'
  } finally {
    searchLoading.value = false
  }
}

async function loadGuideLocations() {
  guideError.value = null
  guideLoading.value = true
  try {
    const { items, total } = await fetchExplorerLocations(
      buildLocationQuery({ page: guidePage.value, searchText: '' })
    )
    guideListItems.value = normalizeLocationList(items)
    guideTotal.value = total
  } catch (e) {
    console.warn('guide locations', e)
    guideListItems.value = []
    guideTotal.value = 0
    guideError.value = 'Could not load schools. Try again.'
  } finally {
    guideLoading.value = false
  }
}

// ── Compare (max 4) ──
function toggleCmp(id) {
  const key = String(id)
  const idx = cmpList.findIndex((x) => String(x) === key)
  if (idx > -1) cmpList.splice(idx, 1)
  else if (cmpList.length < 4) cmpList.push(key)
}
function clearCompare() {
  cmpList.splice(0, cmpList.length)
}
function isCmp(id) {
  return cmpList.some((x) => String(x) === String(id))
}

watch(
  () => [...cmpList],
  async (ids) => {
    compareError.value = null
    if (!ids.length) {
      compareSchools.value = []
      return
    }
    compareLoading.value = true
    try {
      const rows = await fetchExplorerCompare(ids)
      const list = normalizeLocationList(Array.isArray(rows) ? rows : [])
      const byId = new Map(list.map((r) => [String(r.id), r]))
      compareSchools.value = ids.map((id) => byId.get(String(id))).filter(Boolean)
    } catch (e) {
      console.warn('compare', e)
      compareSchools.value = []
      compareError.value = 'Could not load comparison.'
    } finally {
      compareLoading.value = false
    }
  },
  { deep: true }
)

function toggleRow(id) {
  const k = String(id)
  openRow.value = openRow.value === k ? null : k
}

async function viewLifestyle(id) {
  try {
    const raw = await fetchExplorerLocation(id)
    insSchool.value = normalizeLocationRecord(raw)
    sbsMode.value = false
    return 'insights'
  } catch (e) {
    console.warn('viewLifestyle', e)
    return null
  }
}

async function selectIns(id) {
  try {
    const raw = await fetchExplorerLocation(id)
    insSchool.value = normalizeLocationRecord(raw)
    sbsMode.value = false
  } catch (e) {
    console.warn('selectIns', e)
  }
}

function clearIns() {
  insSchool.value = null
  sbsMode.value = false
}

function toggleSbs() {
  if (cmpList.length < 2) return
  sbsMode.value = !sbsMode.value
}

async function searchSchoolsForDropdown(q) {
  const t = (q || '').trim()
  if (!t) return []
  try {
    const { items } = await fetchExplorerLocations({
      page: 1,
      page_size: 8,
      state: 'both',
      employee_type: 'perm',
      sort: 'name',
      search: t,
    })
    return normalizeLocationList(items)
  } catch (e) {
    console.warn('school search', e)
    return []
  }
}

export function useExplorer() {
  loadFiltersOnce()
  loadHeroTopOnce()

  return {
    PAGE_SIZE,
    stateOpts,
    empOpts,
    remotenessOpts,
    filtersError,
    fState,
    fEmp,
    fRem,
    fSort,
    cmpList,
    openRow,
    showCmp,
    insSchool,
    sbsMode,
    currentPage,
    guidePage,
    filterBadgeCount,
    remSize,
    selState,
    selEmp,
    toggleRem,
    setSort,
    loadSearchLocations,
    loadGuideLocations,
    searchListItems,
    searchTotal,
    searchLoading,
    searchError,
    guideListItems,
    guideTotal,
    guideLoading,
    guideError,
    compareSchools,
    compareLoading,
    compareError,
    toggleCmp,
    clearCompare,
    isCmp,
    toggleRow,
    viewLifestyle,
    selectIns,
    clearIns,
    toggleSbs,
    heroTop,
    heroLoading,
    heroError,
    searchSchoolsForDropdown,
  }
}
