<template>
  <div class="page active">
    <div class="page-topbar">
      <div class="page-title">School Explorer</div>
      <div class="page-sub">Find schools · view incentive packages · jump to lifestyle</div>
    </div>

    <div v-if="filtersError" class="explorer-banner warn">{{ filtersError }}</div>

    <!-- ── Compare View ── -->
    <div v-if="showCmp" id="cmp-view">
      <div class="back-row" style="padding:20px 28px 0" @click="closeCompare">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"/></svg>
        Back to Explorer
      </div>
      <div style="padding:8px 28px 40px;max-width:1060px;margin:0 auto;">
        <div class="cmp-title">Compare Schools</div>
        <div class="cmp-sub-txt">Incentive comparison · green = strongest value</div>
        <div v-if="compareError" class="explorer-banner err" style="margin-bottom:12px">{{ compareError }}</div>
        <div class="cmp-wrap">
          <table class="cmp-tbl">
            <thead>
              <tr>
                <th>Factor</th>
                <th v-for="s in cmpSchools" :key="s.id">
                  {{ s.name }}<br>
                  <span style="font-weight:400;font-size:0.61rem;color:var(--ink3)">{{ s.suburb }}·{{ s.state_id === '1' ? 'QLD' : 'NSW' }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="cmp-sec"><td :colspan="cmpSchools.length + 1">General</td></tr>
              <tr>
                <td>State</td>
                <td v-for="s in cmpSchools" :key="s.id">
                  <span class="chip" :class="s.state_id === '1' ? 'cq' : 'cn'">{{ s.state_id === '1' ? 'QLD' : 'NSW' }}</span>
                </td>
              </tr>
              <tr>
                <td>Remoteness</td>
                <td v-for="s in cmpSchools" :key="s.id">{{ s.remoteness || '—' }}</td>
              </tr>
              <tr class="cmp-sec"><td :colspan="cmpSchools.length + 1">💰 Incentives</td></tr>
              <tr>
                <td>Annual incentive</td>
                <td v-for="(s, i) in cmpSchools" :key="s.id" :class="bestIncentiveIdx === i ? 'cmp-best' : 'cmp-lo'">
                  <strong v-if="toNum(s.annual_incentive, 0) > 0">${{ Math.round(toNum(s.annual_incentive, 0)).toLocaleString() }}/yr</strong>
                  <span v-else>—</span>
                </td>
              </tr>
              <tr>
                <td>Package type</td>
                <td v-for="s in cmpSchools" :key="s.id">{{ s.inc_label || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ── Entry ── -->
    <div v-else-if="view === 'entry'" class="exp-entry anim-fadeup">
      <div class="exp-entry-h">
        <h2>How would you like to find a school?</h2>
        <p>Choose the path that suits you — both lead to the same results</p>
      </div>
      <div class="two-paths">
        <div class="path-card pc-search" @click="view = 'search'">
          <div class="pc-icon blue">🔍</div>
          <div><div class="pc-title">I know what I want</div>
          <div class="pc-sub">Search by school name or suburb. Add filters for state, remoteness and employment type.</div>
          <div class="pc-btn blue">Search directly →</div></div>
        </div>
        <div class="path-card pc-guide" @click="startGuide">
          <div class="pc-icon green">🧭</div>
          <div><div class="pc-title">Help me find one</div>
          <div class="pc-sub">Answer 3 quick questions. We'll match and sort schools based on your priorities.</div>
          <div class="pc-btn green">Guide me →</div></div>
        </div>
      </div>
    </div>

    <!-- ── Search Path ── -->
    <div v-else-if="view === 'search'" class="search-path anim-fadeup">
      <div class="back-row" @click="view = 'entry'">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"/></svg>
        Back
      </div>
      <div class="srch-row">
        <div class="srch-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--ink3);flex-shrink:0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input ref="searchInput" v-model="searchQ" placeholder="Search by school name or suburb…">
        </div>
        <button class="filter-tog" :class="{ open: filterOpen }" @click="filterOpen = !filterOpen">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          Filters <span class="f-badge">{{ filterBadgeCount }}</span>
        </button>
      </div>

      <!-- Filter panel -->
      <div class="filter-panel" :class="{ open: filterOpen }">
        <div class="fp-inner">
          <div class="fp-sec">
            <div class="fp-lbl">State</div>
            <div class="fp-tiles">
              <div v-for="s in stateOpts" :key="s.v" class="fp-tile"
                :class="fState === s.v ? 'sel-' + s.v : ''"
                @click="selState(s.v)">
                <span class="ti">{{ s.icon }}</span>{{ s.label }}
              </div>
            </div>
          </div>
          <div class="fp-sec">
            <div class="fp-lbl">Employment</div>
            <div class="fp-tiles">
              <div
                v-for="e in empOpts"
                :key="e.v"
                class="fp-tile"
                :class="fEmp === e.v ? (e.v === 'perm' ? 'sel-perm' : e.v === 'temp' ? 'sel-temp' : 'sel-rem') : ''"
                @click="selEmp(e.v)"
              >
                <span class="ti">{{ e.icon }}</span>{{ e.label }}
              </div>
            </div>
          </div>
          <div class="fp-sec">
            <div class="fp-lbl">Remoteness</div>
            <div class="fp-tiles">
              <div v-for="r in remotenessOpts" :key="r.v" class="fp-tile"
                :class="fRem.has(r.v) ? 'sel-rem' : ''"
                @click="toggleRem(r.v)">
                <span class="ti">{{ r.icon }}</span>{{ r.label }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sort -->
      <div class="sort-row">
        <span class="sort-lbl">Sort by:</span>
        <div v-for="s in sortOpts" :key="s.v" class="sort-pill"
          :class="{ active: fSort === s.v }"
          @click="setSort(s.v)">{{ s.label }}</div>
      </div>

      <!-- Results -->
      <div class="results-zone">
        <div v-if="!searchQ && remSize === 0 && fState === 'both'" style="text-align:center;padding:2.5rem;font-size:0.8rem;color:var(--ink3)">
          Type a school name or suburb to search, or use Filters above.
        </div>
        <div v-else-if="searchError" class="explorer-banner err">{{ searchError }}</div>
        <template v-else-if="searchTotal > 0 || searchLoading">
          <div class="r-meta">
            <template v-if="searchLoading">Loading…</template>
            <template v-else><strong>{{ searchTotal }}</strong> school{{ searchTotal !== 1 ? 's' : '' }} · sorted by {{ sortLabel }}</template>
          </div>
          <div class="school-list">
            <SchoolRow
              v-for="s in searchListItems"
              :key="s.id"
              :school="s"
              :is-open="String(openRow) === String(s.id)"
              :in-cmp="isCmp(s.id)"
              :sort="fSort"
              :emp-type="fEmp"
              @toggle="handleToggleRow"
              @toggle-cmp="toggleCmp"
              @view-lifestyle="handleViewLifestyle"
            />
          </div>
          <AppPagination :total="searchTotal" :page="currentPage" @change="goPage" />
        </template>
        <div v-else style="text-align:center;padding:2rem;font-size:0.8rem;color:var(--ink3)">
          No schools match — try adjusting filters.
        </div>
      </div>
    </div>

    <!-- ── Guided Path ── -->
    <div v-else-if="view === 'guide'" class="guide-path anim-fadeup" :class="{ 'results-open': guideTotal > 0 }">
      <div class="back-row" @click="view = 'entry'">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"/></svg>
        Back
      </div>

      <!-- Progress -->
      <div class="guide-progress">
        <div class="gp-track"><div class="gp-fill" :style="{ width: guideProgress + '%' }"></div></div>
        <div class="gp-labels">
          <span v-for="(lbl, i) in ['Which state', 'How far', 'What matters', 'Results']" :key="i"
            class="gp-label"
            :class="{ done: guideStep > i, active: guideStep === i }">{{ lbl }}</span>
        </div>
      </div>

      <!-- Questions -->
      <div class="guide-q-wrap" :class="{ 'results-open': guideTotal > 0 }">
        <Transition name="guide-q">
          <div v-if="guideStep === 0" class="guide-q visible" key="q1">
            <div class="gq-label">Step 1 of 3</div>
            <div class="gq-text">Which state are you considering teaching in?</div>
            <div class="gq-opts">
              <div v-for="opt in q1opts" :key="opt.v" class="gq-opt" :class="{ sel: gqAnswers[0] === opt.title }" @click="gqSel(0, opt.title)">
                <span class="gqo-icon">{{ opt.icon }}</span>
                <div><div class="gqo-title">{{ opt.title }}</div><div class="gqo-sub">{{ opt.sub }}</div></div>
              </div>
            </div>
            <div class="guide-footer">
              <span class="gf-skip" @click="gqNext(0)">Skip</span>
              <button class="gf-next" :class="{ ready: gqAnswers[0] !== null }" @click="gqNext(0)">Next →</button>
            </div>
          </div>
          <div v-else-if="guideStep === 1" class="guide-q visible" key="q2">
            <div class="gq-label">Step 2 of 3</div>
            <div class="gq-text">How far from a city are you open to going?</div>
            <div class="gq-opts">
              <div v-for="opt in q2opts" :key="opt.v" class="gq-opt" :class="{ sel: gqAnswers[1] === opt.title }" @click="gqSel(1, opt.title)">
                <span class="gqo-icon">{{ opt.icon }}</span>
                <div><div class="gqo-title">{{ opt.title }}</div><div class="gqo-sub">{{ opt.sub }}</div></div>
              </div>
            </div>
            <div class="guide-footer">
              <span class="gf-skip" @click="gqNext(1)">Skip</span>
              <button class="gf-next" :class="{ ready: gqAnswers[1] !== null }" @click="gqNext(1)">Next →</button>
            </div>
          </div>
          <div v-else-if="guideStep === 2" class="guide-q visible" key="q3">
            <div class="gq-label">Step 3 of 3</div>
            <div class="gq-text">What matters most to you in a placement?</div>
            <div class="gq-opts">
              <div v-for="opt in q3opts" :key="opt.v" class="gq-opt" :class="{ sel: gqAnswers[2] === opt.title }" @click="gqSel(2, opt.title)">
                <span class="gqo-icon">{{ opt.icon }}</span>
                <div><div class="gqo-title">{{ opt.title }}</div><div class="gqo-sub">{{ opt.sub }}</div></div>
              </div>
            </div>
            <div class="guide-footer">
              <span class="gf-skip" @click="gqFinish">Skip</span>
              <button class="gf-next" :class="{ ready: gqAnswers[2] !== null }" @click="gqFinish">Show my schools →</button>
            </div>
          </div>
          <div v-else-if="guideStep === 3" key="results">
            <div v-if="guideError" class="explorer-banner err" style="margin-bottom:10px">{{ guideError }}</div>
            <div class="gq-label">{{ guideLoading ? 'Loading…' : `${guideTotal} school${guideTotal !== 1 ? 's' : ''} matched` }}</div>
            <template v-if="guideTotal > 0 || guideLoading">
              <div class="r-meta" style="margin-top:4px">sorted by {{ sortLabel }}</div>
              <div class="school-list">
                <SchoolRow
                  v-for="s in guideListItems"
                  :key="s.id"
                  :school="s"
                  :is-open="String(openRow) === String(s.id)"
                  :in-cmp="isCmp(s.id)"
                  :sort="fSort"
                  :emp-type="fEmp"
                  @toggle="handleToggleRow"
                  @toggle-cmp="toggleCmp"
                  @view-lifestyle="handleViewLifestyle"
                />
              </div>
              <AppPagination :total="guideTotal" :page="guidePage" @change="goGuidePage" />
            </template>
            <div v-else style="text-align:center;padding:1.5rem;font-size:0.8rem;color:var(--ink3)">No schools match — try different answers.</div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Compare tray -->
    <CompareTray
      :cmp-list="cmpList"
      @remove="toggleCmp"
      @clear="clearCompare"
      @open-compare="openCompare"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useExplorer } from '../composables/useExplorer.js'
import { toNum } from '../utils/locationFields.js'
import SchoolRow from '../components/SchoolRow.vue'
import AppPagination from '../components/AppPagination.vue'
import CompareTray from '../components/CompareTray.vue'

const emit = defineEmits(['navigate', 'view-lifestyle'])

const {
  fState, fEmp, fRem, fSort,
  cmpList, openRow, showCmp,
  currentPage, guidePage,
  filterBadgeCount,
  selState, selEmp, toggleRem, setSort,
  toggleCmp, clearCompare, isCmp,
  toggleRow, viewLifestyle,
  remSize,
  stateOpts,
  empOpts,
  remotenessOpts,
  filtersError,
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
  compareError,
} = useExplorer()

const view = ref('entry')
const filterOpen = ref(false)
const searchInput = ref(null)
const searchQ = ref('')

const guideStep = ref(0)
const gqAnswers = ref([null, null, null])

let searchDebounce

watch(view, (v) => {
  if (v === 'search') nextTick(() => searchInput.value?.focus())
})
watch([searchQ, fState, remSize, fSort, fEmp], () => { currentPage.value = 1 }) 

watch([searchQ, fState, remSize, fSort, fEmp, currentPage, view], () => {
  if (view.value !== 'search') return
  clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => {
    loadSearchLocations(searchQ.value)
  }, 260)
})

watch([guidePage, guideStep, fState, remSize, fSort, fEmp], () => {
  if (guideStep.value !== 3) return
  loadGuideLocations()
})

function goPage(p) {
  currentPage.value = p
  openRow.value = null
}

const sortLabel = computed(() => ({
  inc: 'incentive', hc: 'healthcare', dist: 'distance', az: 'name'
}[fSort.value]))

const guideProgress = computed(() => [0, 33, 66, 100][guideStep.value])

function startGuide() {
  view.value = 'guide'
  guideStep.value = 0
  gqAnswers.value = [null, null, null]
}
function gqSel(step, title) {
  gqAnswers.value[step] = title
}
function gqNext(step) {
  guideStep.value = step + 1
}
function gqFinish() {
  const a1 = gqAnswers.value[0] || ''
  const a2 = gqAnswers.value[1] || ''
  const a3 = gqAnswers.value[2] || ''
  selState(a1.includes('Queensland') ? 'qld' : a1.includes('New South Wales') ? 'nsw' : 'both')
  fRem.clear()
  if (a2.includes('under 100')) { fRem.add('1'); fRem.add('2') }
  else if (a2.includes('100–300')) { fRem.add('2'); fRem.add('3') }
  else if (a2.includes('over 300')) { fRem.add('3'); fRem.add('4'); fRem.add('5') }
  if (a3.includes('Healthcare')) setSort('hc')
  else if (a3.includes('Close to a city')) setSort('dist')
  else setSort('inc')
  guidePage.value = 1
  guideStep.value = 3
}
function goGuidePage(p) {
  guidePage.value = p
  openRow.value = null
}

// ── Compare ──
const cmpSchools = computed(() => compareSchools.value)
const bestIncentiveIdx = computed(() => {
  if (!cmpSchools.value.length) return -1
  const vals = cmpSchools.value.map((s) => toNum(s.annual_incentive, 0))
  return vals.indexOf(Math.max(...vals))
})
function openCompare() {
  if (!cmpList.length) return
  showCmp.value = true
}
function closeCompare() {
  showCmp.value = false
}

// ── Row toggle ──
function handleToggleRow(id) {
  toggleRow(id)
}
async function handleViewLifestyle(id) {
  const dest = await viewLifestyle(id)
  if (dest) emit('navigate', dest)
}

const sortOpts = [
  { v: 'inc', label: '💰 Incentive' },
  { v: 'hc', label: '🏥 Healthcare' },
  { v: 'dist', label: '📍 Distance to city' },
  { v: 'az', label: '🔤 A → Z' },
]
const q1opts = [
  { title: 'Both states', icon: '🗺️', sub: 'Show me QLD and NSW schools together' },
  { title: 'Queensland', icon: '☀️', sub: 'QLD Locality Allowance applies' },
  { title: 'New South Wales', icon: '🌉', sub: 'NSW Rural Teacher Incentive applies' },
]
const q2opts = [
  { title: 'Close — under 100 km', icon: '🏙️', sub: 'Stay within reach of city services' },
  { title: 'Somewhat regional — 100–300 km', icon: '🛣️', sub: 'Balance between access and remoteness' },
  { title: 'Far — over 300 km', icon: '🌄', sub: 'Higher incentives, true outback feel' },
  { title: 'Open to anything', icon: '✦', sub: 'Show me all distances' },
]
const q3opts = [
  { title: 'Financial incentive', icon: '💰', sub: 'Show highest $ packages first' },
  { title: 'Healthcare access', icon: '🏥', sub: 'Prioritise areas with more services nearby' },
  { title: 'Close to a city', icon: '📍', sub: 'Show schools nearest to a major city first' },
  { title: 'Nature & outdoors', icon: '🌿', sub: 'Prioritise areas with parks and reserves' },
]
</script>

<style scoped>
.explorer-banner {
  padding: 10px 16px;
  font-size: 0.78rem;
  border-radius: 8px;
  margin: 0 24px 12px;
  max-width: 1060px;
}
.explorer-banner.warn {
  background: var(--orange-s);
  color: var(--orange-d);
}
.explorer-banner.err {
  background: #fef2f2;
  color: #b91c1c;
}
</style>
