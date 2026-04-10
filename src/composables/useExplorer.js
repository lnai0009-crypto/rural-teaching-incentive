import { ref, reactive, computed } from 'vue'
import { DB, PAGE_SIZE } from '../data/db.js'

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
  fRem.has(v) ? fRem.delete(v) : fRem.add(v)
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

// ── Filtering & sorting ──
function getFiltered(q = '') {
  const sq = (q || '').toLowerCase().trim()
  return DB.filter(l => {
    if (fState.value === 'qld' && l.state_id !== '1') return false
    if (fState.value === 'nsw' && l.state_id !== '2') return false
    if (fRem.size > 0 && !fRem.has(l.remoteness_id)) return false
    if (sq && !l.name.toLowerCase().includes(sq) && !l.suburb.toLowerCase().includes(sq)) return false
    return true
  }).sort((a, b) => {
    if (fSort.value === 'inc') return b.annual_incentive - a.annual_incentive
    if (fSort.value === 'hc') return b.healthcare_count - a.healthcare_count
    if (fSort.value === 'dist') return a.distance_to_city - b.distance_to_city
    return a.name.localeCompare(b.name)
  })
}

// ── Compare ──
function toggleCmp(id) {
  const idx = cmpList.indexOf(id)
  if (idx > -1) cmpList.splice(idx, 1)
  else if (cmpList.length < 4) cmpList.push(id)
}
function clearCompare() {
  cmpList.splice(0, cmpList.length)
}
function isCmp(id) {
  return cmpList.includes(id)
}

// ── Open row ──
function toggleRow(id) {
  openRow.value = openRow.value === id ? null : id
}

// ── Lifestyle ──
function viewLifestyle(id) {
  const l = DB.find(x => x.id === id)
  if (!l) return
  insSchool.value = l
  sbsMode.value = false
  return 'insights'
}
function selectIns(id) {
  const l = DB.find(x => x.id === id)
  if (!l) return
  insSchool.value = l
  sbsMode.value = false
}
function clearIns() {
  insSchool.value = null
  sbsMode.value = false
}
function toggleSbs() {
  if (cmpList.length < 2) return
  sbsMode.value = !sbsMode.value
}

// ── Hero preview ──
const heroTop = computed(() =>
  DB.filter(x => x.annual_incentive > 0)
    .sort((a, b) => b.annual_incentive - a.annual_incentive)
    .slice(0, 4)
)

export function useExplorer() {
  return {
    DB,
    PAGE_SIZE,
    fState, fEmp, fRem, fSort,
    cmpList, openRow, showCmp,
    insSchool, sbsMode,
    currentPage, guidePage,
    filterBadgeCount, remSize,
    selState, selEmp, toggleRem, setSort,
    getFiltered,
    toggleCmp, clearCompare, isCmp,
    toggleRow,
    viewLifestyle, selectIns, clearIns, toggleSbs,
    heroTop,
  }
}
