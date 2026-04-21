<template>
  <div class="page active">
    <div class="page-topbar">
      <div class="page-title">School Explorer</div>
      <div class="page-sub">Find schools · view incentive packages · jump to lifestyle</div>
    </div>

    <!-- ── Compare View ── -->
    <div v-if="showCmp" id="cmp-view">
      <div class="back-row" style="padding:20px 28px 0" @click="closeCompare">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"/></svg>
        Back to Explorer
      </div>
      <div style="padding:8px 28px 40px;max-width:1060px;margin:0 auto;">
        <div class="cmp-title">Compare Schools</div>
        <div class="cmp-sub-txt">Incentive comparison · green = strongest value</div>
        <div v-if="compareLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <span>Loading comparison…</span>
        </div>
        <div v-else-if="compareError" class="error-state">{{ compareError }}</div>
        <div v-else class="cmp-wrap">
          <table class="cmp-tbl">
            <thead>
              <tr>
                <th>Factor</th>
                <th v-for="s in compareSchools" :key="s.id">
                  {{ s.name }}<br>
                  <span style="font-weight:400;font-size:0.61rem;color:var(--ink3)">{{ s.suburb }} · {{ s.state_id === '1' ? 'QLD' : 'NSW' }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="cmp-sec"><td :colspan="compareSchools.length + 1">General</td></tr>
              <tr>
                <td>State</td>
                <td v-for="s in compareSchools" :key="s.id">
                  <span class="chip" :class="s.state_id === '1' ? 'cq' : 'cn'">{{ s.state_id === '1' ? 'QLD' : 'NSW' }}</span>
                </td>
              </tr>
              <tr>
                <td>Remoteness</td>
                <td v-for="s in compareSchools" :key="s.id">{{ s.remoteness }}</td>
              </tr>
              <tr class="cmp-sec"><td :colspan="compareSchools.length + 1">Incentives</td></tr>
              <tr>
                <td>Annual incentive</td>
                <td v-for="(s, i) in compareSchools" :key="s.id" :class="bestIncentiveIdx === i ? 'cmp-best' : 'cmp-lo'">
                  <strong v-if="s.annual_incentive > 0">${{ Math.round(s.annual_incentive).toLocaleString() }}/yr</strong>
                  <span v-else>—</span>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <div class="cmp-lifestyle-row">
          <p>Want to compare lifestyle metrics too?</p>
          <button class="cmp-lifestyle-btn" @click="$emit('navigate', 'insights')">View Lifestyle Insights →</button>
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
          <div class="pc-icon blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
          <div class="pc-title">I know what I want</div>
          <div class="pc-sub">Search by school name or suburb. Filter and sort to find your match.</div>
          <ul class="pc-features">
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
              Filter by QLD or NSW
            </li>
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
              Filter by remoteness
            </li>
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
              Sort by incentive or healthcare
            </li>
          </ul>
          <div class="pc-btn blue">Search directly →</div>
        </div>
        <div class="path-card pc-guide" @click="startGuide">
          <div class="pc-icon green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#065f46" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </div>
          <div class="pc-title">Help me find one</div>
          <div class="pc-sub">Answer 3 quick questions. We'll match schools to your priorities.</div>
          <ul class="pc-features">
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              3 quick questions
            </li>
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Matched to your priorities
            </li>
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              Auto-sorted results
            </li>
          </ul>
          <div class="pc-btn green">Guide me →</div>
        </div>
      </div>

      <div class="exp-stats-bar">
        <div class="exp-stat">
          <span class="es-num">1,080</span>
          <span class="es-lbl">schools with incentives</span>
        </div>
        <div class="exp-stat-div"></div>
        <div class="exp-stat">
          <span class="es-num">2</span>
          <span class="es-lbl">states covered</span>
        </div>
        <div class="exp-stat-div"></div>
        <div class="exp-stat">
          <span class="es-num">$45k+</span>
          <span class="es-lbl">top annual package</span>
        </div>
      </div>

      <div class="exp-map-section">
        <div class="exp-map-header">
          <div class="exp-map-label">Schools with incentives — QLD &amp; NSW</div>
          <div class="exp-map-hint">Hover a dot for details · click to search that suburb</div>
        </div>
        <div ref="mapEl" class="exp-map-container"></div>
        <div class="map-legend">
          <div class="ml-title">Incentive amount</div>
          <div class="ml-gradient-row">
            <div class="ml-gradient qld-grad"></div>
            <div class="ml-grad-labels"><span>Low</span><span>High</span></div>
            <div class="ml-grad-state">QLD</div>
          </div>
          <div class="ml-gradient-row" style="margin-top:6px">
            <div class="ml-gradient nsw-grad"></div>
            <div class="ml-grad-labels"><span>Low</span><span>High</span></div>
            <div class="ml-grad-state">NSW</div>
          </div>
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
          <input ref="searchInput" v-model="searchQ" placeholder="Search by school name or suburb…" @input="onSearchInput" />
        </div>
        <button class="filter-tog" :class="{ open: filterOpen }" @click="filterOpen = !filterOpen">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          Filters
          <span v-if="filterBadgeCount > 0" class="f-badge">{{ filterBadgeCount }}</span>
        </button>
      </div>

      <Transition name="fp-slide">
        <div v-if="filterOpen" class="filter-panel open">
          <div class="fp-inner">
            <div class="fp-sec">
              <div class="fp-lbl">State</div>
              <div class="fp-tiles">
                <div v-for="s in stateOpts" :key="s.v" class="fp-tile"
                  :class="fState === s.v ? 'sel-' + s.v : ''"
                  @click="onSelState(s.v)">
                  <span class="fp-tile-icon">{{ s.icon }}</span>{{ s.label }}
                </div>
              </div>
            </div>
            <div class="fp-sec">
              <div class="fp-lbl">Employment</div>
              <div class="fp-tiles">
                <div v-for="e in empOpts" :key="e.v" class="fp-tile"
                  :class="fEmp === e.v ? 'sel-' + e.v : ''"
                  @click="onSelEmp(e.v)">
                  <span class="fp-tile-icon">{{ e.icon }}</span>{{ e.label }}
                </div>
              </div>
            </div>
            <div class="fp-sec">
              <div class="fp-lbl">Remoteness</div>
              <div class="fp-tiles">
                <div v-for="r in remotenessOpts" :key="r.v" class="fp-tile"
                  :class="fRem.has(r.v) ? 'sel-rem' : ''"
                  @click="onToggleRem(r.v)">
                  <span class="fp-tile-icon">{{ r.icon }}</span>{{ r.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <div class="sort-row">
        <span class="sort-lbl">Sort:</span>
        <div v-for="s in sortOpts" :key="s.v" class="sort-pill"
          :class="{ active: fSort === s.v }"
          @click="onSetSort(s.v)">
          <span class="sort-icon">{{ s.icon }}</span>{{ s.label }}
        </div>
      </div>

      <div class="results-zone">
        <div v-if="searchLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <span>Loading schools…</span>
        </div>
        <div v-else-if="searchError" class="error-state">{{ searchError }}</div>
        <template v-else-if="searchListItems.length">
          <div class="r-meta">
            <strong>{{ searchTotal }}</strong> school{{ searchTotal !== 1 ? 's' : '' }} · sorted by {{ sortLabel }}
          </div>
          <div class="school-list">
            <SchoolRow
              v-for="s in searchListItems"
              :key="s.id"
              :school="s"
              :is-open="openRow === String(s.id)"
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
        <div v-else class="search-empty-state">
          <div class="ses-title">{{ searchQ || remSize > 0 || fState !== 'both' ? 'No schools match' : 'Search for a school' }}</div>
          <div class="ses-sub">{{ searchQ || remSize > 0 || fState !== 'both' ? 'Try adjusting your filters or search term.' : 'Type a name or suburb, or use filters.' }}</div>
        </div>
      </div>
    </div>

    <!-- ── Guided Path ── -->
    <div v-else-if="view === 'guide'" class="guide-path anim-fadeup">
      <div class="guide-inner">
        <div class="back-row" @click="view = 'entry'">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"/></svg>
          Back
        </div>

        <div class="guide-progress">
          <div class="gp-track"><div class="gp-fill" :style="{ width: guideProgress + '%' }"></div></div>
          <div class="gp-labels">
            <span v-for="(lbl, i) in ['State', 'Distance', 'Priority', 'Results']" :key="i"
              class="gp-label" :class="{ done: guideStep > i, active: guideStep === i }">{{ lbl }}</span>
          </div>
        </div>

        <div class="guide-q-wrap">
          <Transition name="guide-slide" mode="out-in">
            <div v-if="guideStep === 0" class="guide-q" key="q1">
              <div class="gq-label">Step 1 of 3</div>
              <div class="gq-text">Which state are you considering?</div>
              <div class="gq-opts">
                <div v-for="opt in q1opts" :key="opt.title" class="gq-opt" :class="{ sel: gqAnswers[0] === opt.title }" @click="gqSel(0, opt.title)">
                  <div class="gqo-state-img"><img :src="opt.flag" :alt="opt.title" /></div>
                  <div><div class="gqo-title">{{ opt.title }}</div><div class="gqo-sub">{{ opt.sub }}</div></div>
                  <span v-if="gqAnswers[0] === opt.title" class="gqo-check">✓</span>
                </div>
              </div>
              <div class="guide-footer">
                <span class="gf-skip" @click="gqNext(0)">Skip</span>
                <button class="gf-next" :class="{ ready: gqAnswers[0] !== null }" @click="gqNext(0)">Next →</button>
              </div>
            </div>
            <div v-else-if="guideStep === 1" class="guide-q" key="q2">
              <div class="gq-label">Step 2 of 3</div>
              <div class="gq-text">How remote are you open to going?</div>
              <div class="gq-opts">
                <div v-for="opt in q2opts" :key="opt.title" class="gq-opt" :class="{ sel: gqAnswers[1] === opt.title }" @click="gqSel(1, opt.title)">
                  <span class="gqo-emoji">{{ opt.emoji }}</span>
                  <div><div class="gqo-title">{{ opt.title }}</div><div class="gqo-sub">{{ opt.sub }}</div></div>
                  <span v-if="gqAnswers[1] === opt.title" class="gqo-check">✓</span>
                </div>
              </div>
              <div class="guide-footer">
                <span class="gf-skip" @click="gqNext(1)">Skip</span>
                <button class="gf-next" :class="{ ready: gqAnswers[1] !== null }" @click="gqNext(1)">Next →</button>
              </div>
            </div>
            <div v-else-if="guideStep === 2" class="guide-q" key="q3">
              <div class="gq-label">Step 3 of 3</div>
              <div class="gq-text">What matters most to you?</div>
              <div class="gq-opts">
                <div v-for="opt in q3opts" :key="opt.title" class="gq-opt" :class="{ sel: gqAnswers[2] === opt.title }" @click="gqSel(2, opt.title)">
                  <span class="gqo-emoji">{{ opt.emoji }}</span>
                  <div><div class="gqo-title">{{ opt.title }}</div><div class="gqo-sub">{{ opt.sub }}</div></div>
                  <span v-if="gqAnswers[2] === opt.title" class="gqo-check">✓</span>
                </div>
              </div>
              <div class="guide-footer">
                <span class="gf-skip" @click="gqFinish">Skip</span>
                <button class="gf-next" :class="{ ready: gqAnswers[2] !== null }" @click="gqFinish">Show my schools →</button>
              </div>
            </div>
            <div v-else-if="guideStep === 3" class="guide-q" key="results">
              <div class="gq-label">
                {{ guideLoading ? 'Loading…' : guideTotal + ' school' + (guideTotal !== 1 ? 's' : '') + ' matched' }}
              </div>
              <div v-if="guideLoading" class="loading-state">
                <div class="loading-spinner"></div>
                <span>Finding schools…</span>
              </div>
              <div v-else-if="guideError" class="error-state">{{ guideError }}</div>
              <template v-else-if="guideListItems.length">
                <div class="r-meta" style="margin-top:4px">sorted by {{ sortLabel }}</div>
                <div class="school-list">
                  <SchoolRow
                    v-for="s in guideListItems"
                    :key="s.id"
                    :school="s"
                    :is-open="openRow === String(s.id)"
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
              <div v-else class="search-empty-state">
                <div class="ses-title">No schools match</div>
                <div class="ses-sub">Try different answers.</div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <CompareTray
      :cmp-list="[...cmpList]"
      @remove="toggleCmp"
      @clear="clearCompare"
      @open-compare="openCompare"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useExplorer } from '../composables/useExplorer.js'
import { fetchExplorerLocations } from '../api/explorerApi.js'
import { normalizeLocationList } from '../utils/locationFields.js'
import SchoolRow from '../components/SchoolRow.vue'
import AppPagination from '../components/AppPagination.vue'
import CompareTray from '../components/CompareTray.vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const emit = defineEmits(['navigate', 'view-lifestyle'])

const {
  PAGE_SIZE,
  stateOpts, empOpts, remotenessOpts,
  fState, fEmp, fRem, fSort,
  cmpList, openRow, showCmp,
  currentPage, guidePage,
  filterBadgeCount, remSize,
  selState, selEmp, toggleRem, setSort,
  loadSearchLocations, loadGuideLocations,
  searchListItems, searchTotal, searchLoading, searchError,
  guideListItems, guideTotal, guideLoading, guideError,
  compareSchools, compareLoading, compareError,
  toggleCmp, clearCompare, isCmp,
  toggleRow, viewLifestyle,
  heroTop,
} = useExplorer()

const view        = ref('entry')
const filterOpen  = ref(false)
const searchQ     = ref('')
const searchInput = ref(null)
const mapEl       = ref(null)
let mapInstance   = null

const mapSchools = ref([])

async function loadMapSchools() {
  try {
    const [qld, nsw] = await Promise.all([
      fetchExplorerLocations({ page: 1, page_size: 200, state: 'qld', sort: 'inc' }),
      fetchExplorerLocations({ page: 1, page_size: 200, state: 'nsw', sort: 'inc' }),
    ])
    const all = [
      ...normalizeLocationList(qld.items),
      ...normalizeLocationList(nsw.items),
    ].filter(s => s.annual_incentive > 0)
    mapSchools.value = all
    console.log('map schools loaded:', all.length)
  } catch (e) {
    console.warn('loadMapSchools failed:', e)
    mapSchools.value = heroTop.value.filter(s => s.annual_incentive > 0)
  }
}

const topIncentive = computed(() => {
  const src = mapSchools.value.length ? mapSchools.value : heroTop.value
  if (!src.length) return '—'
  const max = Math.max(...src.map(s => s.annual_incentive || 0))
  return max > 0 ? '$' + (max / 1000).toFixed(0) + 'k+' : '—'
})

const sortLabel = computed(() =>
  ({ inc: 'incentive', hc: 'healthcare', dist: 'distance', az: 'name' }[fSort.value] || 'incentive')
)

const bestIncentiveIdx = computed(() => {
  if (!compareSchools.value.length) return -1
  const vals = compareSchools.value.map(s => s.annual_incentive || 0)
  return vals.indexOf(Math.max(...vals))
})

function onSelState(v)  { selState(v);  loadSearchLocations(searchQ.value) }
function onSelEmp(v)    { selEmp(v);    loadSearchLocations(searchQ.value) }
function onToggleRem(v) { toggleRem(v); loadSearchLocations(searchQ.value) }
function onSetSort(v)   { setSort(v);   loadSearchLocations(searchQ.value) }

let searchDebounce = null
function onSearchInput() {
  clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => {
    currentPage.value = 1
    loadSearchLocations(searchQ.value)
  }, 300)
}

function goPage(p) {
  currentPage.value = p
  openRow.value = null
  loadSearchLocations(searchQ.value)
}
function goGuidePage(p) {
  guidePage.value = p
  openRow.value = null
  loadGuideLocations()
}

function openCompare()  { if (cmpList.length) showCmp.value = true }
function closeCompare() { showCmp.value = false }

function handleToggleRow(id) { toggleRow(id) }

async function handleViewLifestyle(id) {
  const dest = await viewLifestyle(id)
  if (dest) emit('navigate', dest)
}

watch(view, (v) => {
  if (v === 'search') nextTick(() => { searchInput.value?.focus(); loadSearchLocations(searchQ.value) })
  if (v === 'entry')  nextTick(() => {
    if (mapInstance) { mapInstance.remove(); mapInstance = null }
    initMap()
    plotMarkers()
  })
})

onMounted(() => {
  nextTick(() => initMap())
  loadMapSchools()
})
onUnmounted(() => { if (mapInstance) { mapInstance.remove(); mapInstance = null } })

watch(mapSchools, (v) => { if (v.length && mapInstance) { plotMarkers() } })

const INC_MIN = 4232, INC_MAX = 30000
function lerp(a, b, t) { return a + (b - a) * t }
function hexToRgb(h) { return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)] }
function rgbToHex(r,g,b) { return '#' + [r,g,b].map(v => Math.round(v).toString(16).padStart(2,'0')).join('') }
function lerpColor(h1, h2, t) {
  const [r1,g1,b1] = hexToRgb(h1), [r2,g2,b2] = hexToRgb(h2)
  return rgbToHex(lerp(r1,r2,t), lerp(g1,g2,t), lerp(b1,b2,t))
}
function incentiveColor(inc, isQld) {
  const t = Math.max(0, Math.min(1, (inc - INC_MIN) / (INC_MAX - INC_MIN)))
  return isQld ? lerpColor('#fde68a', '#b45309', t) : lerpColor('#bfdbfe', '#1e3a8a', t)
}

function initMap() {
  if (!mapEl.value || mapInstance) return
  mapInstance = L.map(mapEl.value, { center: [-27, 145], zoom: 5, zoomControl: true, scrollWheelZoom: false })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors', maxZoom: 18,
  }).addTo(mapInstance)
  plotMarkers()
}

function plotMarkers() {
  if (!mapInstance) return
  const schools = mapSchools.value.length ? mapSchools.value : heroTop.value
  schools.forEach((s, i) => {
    if (!s.lat || !s.lng) return
    const isQld = s.state_id === '1'
    const color = incentiveColor(s.annual_incentive || 0, isQld)
    setTimeout(() => {
      const marker = L.circleMarker([s.lat, s.lng], {
        radius: 7, fillColor: color, color: '#fff', weight: 2, opacity: 0, fillOpacity: 0,
      }).addTo(mapInstance)
      let op = 0
      const fade = setInterval(() => {
        op += 0.12
        marker.setStyle({ opacity: Math.min(op,1), fillOpacity: Math.min(op*0.92,0.92) })
        if (op >= 1) clearInterval(fade)
      }, 25)
      marker.bindTooltip(`
        <div style="font-family:'DM Sans',sans-serif;min-width:150px">
          <div style="font-weight:700;font-size:0.8rem;margin-bottom:2px">${s.name}</div>
          <div style="font-size:0.72rem;color:#94a3b8;margin-bottom:4px">${s.suburb} · ${isQld ? 'QLD' : 'NSW'} · ${s.remoteness}</div>
          <div style="font-size:0.8rem;font-weight:700;color:${color}">$${Math.round(s.annual_incentive||0).toLocaleString()}/yr</div>
        </div>
      `, { permanent: false, direction: 'top', offset: [0,-8], opacity: 1, className: 'school-tooltip' })
      marker.on('mouseover', function() { this.setRadius(10); this.setStyle({ weight: 3 }); this.openTooltip() })
      marker.on('mouseout',  function() { this.setRadius(7);  this.setStyle({ weight: 2 }); this.closeTooltip() })
      marker.on('click', () => { view.value = 'search'; searchQ.value = s.suburb; nextTick(() => loadSearchLocations(s.suburb)) })
    }, i * 8)
  })
}

watch(heroTop, (v) => { if (v.length && mapInstance && !mapSchools.value.length) plotMarkers() }, { once: true })

const guideStep     = ref(0)
const gqAnswers     = ref([null, null, null])
const guideProgress = computed(() => [0, 33, 66, 100][guideStep.value] ?? 100)

function startGuide() {
  view.value = 'guide'
  guideStep.value = 0
  gqAnswers.value = [null, null, null]
}
function gqSel(step, title) {
  const updated = [...gqAnswers.value]; updated[step] = title; gqAnswers.value = updated
}
function gqNext(step) { guideStep.value = step + 1 }

function gqFinish() {
  const a1 = gqAnswers.value[0] || ''
  const a2 = gqAnswers.value[1] || ''
  const a3 = gqAnswers.value[2] || ''
  selState(a1.includes('Queensland') ? 'qld' : a1.includes('New South Wales') ? 'nsw' : 'both')
  ;[...fRem].forEach(v => toggleRem(v))
  if (a2.includes('Outer Regional')) toggleRem('3')
  else if (a2.includes('Very Remote')) toggleRem('5')
  else if (a2.includes('Remote')) toggleRem('4')
  if (a3.includes('Healthcare')) setSort('hc')
  else if (a3.includes('Distance')) setSort('dist')
  else setSort('inc')
  guidePage.value = 1
  guideStep.value = 3
  loadGuideLocations()
}

const sortOpts = [
  { v: 'inc',  icon: '💰', label: 'Incentive' },
  { v: 'hc',   icon: '🏥', label: 'Healthcare' },
  { v: 'dist', icon: '📍', label: 'Distance' },
  { v: 'az',   icon: '🔤', label: 'A–Z' },
]
const q1opts = [
  { title: 'Both states',     flag: new URL('../assets/flag-au.png',  import.meta.url).href, sub: 'Show QLD and NSW together' },
  { title: 'Queensland',      flag: new URL('../assets/flag-qld.png', import.meta.url).href, sub: 'QLD Locality Allowance applies' },
  { title: 'New South Wales', flag: new URL('../assets/flag-nsw.png', import.meta.url).href, sub: 'NSW Rural Teacher Incentive applies' },
]
const q2opts = [
  { title: 'Outer Regional', emoji: '🛣️', sub: '~100–300 km from a city · some incentives available' },
  { title: 'Remote',         emoji: '🌾', sub: '300–600 km · good incentive packages' },
  { title: 'Very Remote',    emoji: '🌵', sub: '600+ km · highest incentives available' },
  { title: 'Open to all',    emoji: '✨', sub: 'Show me everything' },
]
const q3opts = [
  { title: 'Highest incentive', emoji: '💰', sub: 'Maximise my annual payment' },
  { title: 'Healthcare access', emoji: '🏥', sub: 'Prioritise areas with more services' },
  { title: 'Distance to city',  emoji: '📍', sub: 'Stay as close to a city as possible' },
  { title: 'Nature & outdoors', emoji: '🌿', sub: 'Parks, reserves, wide open spaces' },
]
</script>

<style scoped>
.page.active {
  background: var(--bg);
  color: var(--ink);
  min-height: 100%;
}

.page-topbar {
  width: 100%;
  margin: 0 0 16px;
  padding: 56px 20px 40px;
  background:
    radial-gradient(circle at 20% 50%, rgba(31,111,235,0.16) 0%, transparent 42%),
    radial-gradient(circle at 80% 20%, rgba(30,158,86,0.10) 0%, transparent 34%),
    linear-gradient(135deg, #0D1F3C 0%, #1A3557 45%, #0F2D4A 72%, #081828 100%);
  color: #fff;
  box-shadow: 0 20px 40px rgba(13,31,60,0.18);
}

.page-topbar::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0));
  pointer-events: none;
}

.page-title {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto 8px;
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.02;
  color: #fff !important;
}

.page-title {
  font-size: 2.1rem;
  font-weight: 900;
  line-height: 1.08;
  margin-bottom: 6px;
}

.page-sub {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  font-size: 1rem;
  color: rgba(255,255,255,0.82) !important;
}

.exp-entry-h p,
.exp-entry-h p,
.pc-sub,
.gqo-sub,
.ses-sub,
.r-meta,
.exp-map-hint,
.cmp-sub-txt,
.gq-label {
  color: var(--ink2);
}

.loading-state {
  display:flex;
  align-items:center;
  gap:10px;
  padding:2rem 1rem;
  justify-content:center;
  color:var(--ink3,#6b7280);
  font-size:0.85rem;
}

.loading-spinner {
  width:18px;
  height:18px;
  border:2px solid var(--b);
  border-top-color: var(--blue);
  border-radius:50%;
  animation:spin 0.7s linear infinite;
  flex-shrink:0;
}

@keyframes spin { to { transform:rotate(360deg); } }

.error-state {
  padding:1.5rem;
  text-align:center;
  color:#b42318;
  font-size:0.82rem;
  background:#fff4f2;
  border:1px solid #fecaca;
  border-radius:12px;
  margin:12px 0;
}

.back-row {
  display:inline-flex;
  align-items:center;
  gap:8px;
  font-size:0.85rem;
  color:var(--blue);
  font-weight:700;
  cursor:pointer;
  margin-bottom:16px;
}

.back-row:hover { color: var(--blue-d); }

.exp-entry {
  padding:16px 16px 0;
  max-width:1200px;
  margin:0 auto;
}

.exp-entry-h {
  text-align:center;
  margin-bottom:32px;
}

.exp-entry-h h2 {
  font-size:2.3rem;
  font-weight:900;
  line-height:1.1;
  margin-bottom:10px;
}

.exp-entry-h p {
  font-size:0.95rem;
}

.two-paths {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
}

.path-card,
.exp-stats-bar,
.exp-map-section,
.filter-panel,
.search-empty-state,
.gq-opt,
.cmp-lifestyle-row,
.cmp-wrap,
.srch-wrap,
.sort-pill,
.guide-progress,
.guide-q {
  background: var(--s);
  border: 1px solid var(--b);
  box-shadow: 0 10px 30px rgba(13,31,60,0.05);
}

.path-card {
  border-radius:18px;
  padding:30px 30px 26px;
  cursor:pointer;
  transition:box-shadow 0.2s,transform 0.2s,border-color 0.2s;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.path-card:hover {
  box-shadow:0 16px 36px rgba(13,31,60,0.10);
  transform:translateY(-4px);
}

.pc-search:hover { border-color: var(--blue); }
.pc-guide:hover  { border-color: var(--green); }

.pc-icon {
  width:56px;
  height:56px;
  border-radius:16px;
  display:flex;
  align-items:center;
  justify-content:center;
}

.pc-icon.blue  { background: var(--blue-s); }
.pc-icon.green { background: var(--green-s); }

.pc-title {
  font-size:1.08rem;
  font-weight:800;
  color:var(--ink);
}

.pc-sub {
  font-size:0.82rem;
  line-height:1.6;
}

.pc-features {
  list-style:none;
  padding:0;
  margin:6px 0 10px;
  display:flex;
  flex-direction:column;
  gap:8px;
}

.pc-features li {
  font-size:0.79rem;
  color:var(--ink2);
  display:flex;
  align-items:center;
  gap:7px;
}

.pc-btn,
.gf-next,
.filter-tog,
.cmp-lifestyle-btn {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  padding:10px 18px;
  border-radius:8px;
  font-size:0.84rem;
  font-weight:700;
  width:fit-content;
  margin-top:auto;
  cursor:pointer;
  transition:all 0.16s;
  border:none;
}

.pc-btn.blue,
.gf-next.ready,
.filter-tog.open {
  background: var(--blue);
  color:#fff;
}

.pc-btn.blue:hover,
.gf-next.ready:hover,
.filter-tog.open:hover {
  background: var(--blue-d);
}

.pc-btn.green,
.cmp-lifestyle-btn {
  background: var(--green);
  color:#fff;
}

.pc-btn.green:hover,
.cmp-lifestyle-btn:hover {
  background: var(--green-d);
}

.exp-stats-bar {
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:22px;
  border-radius:16px;
  padding:18px 24px;
}

.exp-stat {
  display:flex;
  flex-direction:column;
  align-items:center;
  flex:1;
}

.es-num {
  font-family: 'Playfair Display', serif;
  font-size:1.55rem;
  font-weight:900;
  color:var(--ink);
}

.es-lbl {
  font-size:0.72rem;
  color:var(--ink3,#6b7280);
  margin-top:3px;
  text-transform:uppercase;
  letter-spacing:0.05em;
}

.exp-stat-div {
  width:1px;
  height:36px;
  background:var(--b);
  margin:0 8px;
}

.exp-map-section {
  margin-top:24px;
  border-radius:18px;
  overflow:hidden;
  position:relative;
  margin-bottom:40px;
}

.exp-map-header {
  padding:14px 20px 12px;
  border-bottom:1px solid var(--b);
  display:flex;
  align-items:baseline;
  gap:12px;
}

.exp-map-label {
  font-size:0.84rem;
  font-weight:700;
  color:var(--ink);
}

.exp-map-hint {
  font-size:0.72rem;
}

.exp-map-container { height:420px; width:100%; z-index:0; }

.map-legend {
  position:absolute;
  bottom:16px;
  right:16px;
  background:rgba(255,255,255,0.97);
  border:1px solid var(--b);
  border-radius:12px;
  padding:10px 14px;
  z-index:999;
  min-width:130px;
  box-shadow: 0 8px 24px rgba(13,31,60,0.12);
}

.ml-title {
  font-size:0.68rem;
  font-weight:700;
  color:var(--ink3,#6b7280);
  text-transform:uppercase;
  letter-spacing:0.05em;
  margin-bottom:8px;
}

.ml-gradient-row { display:flex; flex-direction:column; gap:2px; }
.ml-gradient { height:10px; border-radius:4px; width:100%; }
.qld-grad { background:linear-gradient(to right,#fde68a,#b45309); }
.nsw-grad { background:linear-gradient(to right,#bfdbfe,#1e3a8a); }
.ml-grad-labels { display:flex; justify-content:space-between; font-size:0.62rem; color:var(--ink3,#9ca3af); }
.ml-grad-state { font-size:0.7rem; font-weight:700; color:var(--ink2,#374151); margin-top:1px; }

:global(.school-tooltip) {
  background:#0D1F3C !important;
  border:none !important;
  border-radius:10px !important;
  color:#fff !important;
  padding:10px 12px !important;
  font-size:0.78rem !important;
  box-shadow:0 8px 24px rgba(13,31,60,0.22) !important;
}

/* FIX: make incentive text always visible */
:global(.school-tooltip strong),
:global(.school-tooltip .inc-value) {
  color: #ffffff !important;
  font-weight: 800;
}

:global(.school-tooltip div[style*="color"]) {
  color: #93c5fd !important; /* light blue instead of dark */
  font-weight: 700;
}

:global(.school-tooltip::before) { border-top-color:#0D1F3C !important; }

.search-path,
.guide-path {
  max-width:1200px;
  margin:0 auto;
  padding: 8px 16px 32px;
}

.srch-row {
  display:flex;
  gap:12px;
  align-items:center;
  margin-bottom:14px;
}

.srch-wrap {
  flex:1;
  display:flex;
  align-items:center;
  gap:10px;
  border-radius:12px;
  padding:0 14px;
  min-height:52px;
}

.srch-wrap input {
  flex:1;
  border:none;
  background:transparent;
  outline:none;
  font-size:0.92rem;
  color:var(--ink);
}

.filter-tog {
  background: var(--s);
  color: var(--ink);
  border:1px solid var(--b);
  min-height:52px;
}

.f-badge {
  min-width:18px;
  height:18px;
  border-radius:999px;
  background: var(--blue);
  color:#fff;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:0.68rem;
  padding:0 5px;
}

.fp-slide-enter-active,.fp-slide-leave-active { transition:max-height 0.28s ease,opacity 0.22s ease; overflow:hidden; }
.fp-slide-enter-from,.fp-slide-leave-to { max-height:0; opacity:0; }
.fp-slide-enter-to,.fp-slide-leave-from { max-height:420px; opacity:1; }

.filter-panel {
  border-radius:16px;
  margin-bottom:14px;
}

.fp-inner {
  padding:18px;
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:16px;
}

.fp-sec { display:flex; flex-direction:column; gap:10px; }
.fp-lbl {
  font-size:0.76rem;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:0.06em;
  color:var(--ink3);
}

.fp-tiles {
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}

.fp-tile,
.sort-pill {
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:10px 14px;
  border-radius:999px;
  font-size:0.82rem;
  font-weight:700;
  color:var(--ink2);
  cursor:pointer;
  transition: all 0.16s;
}

.fp-tile:hover,
.sort-pill:hover {
  border-color: var(--blue);
  background: var(--blue-s);
  color: var(--blue-d);
}

.sel-qld,
.sel-both,
.sel-permanent,
.sel-temporary,
.sel-rem,
.sort-pill.active {
  border-color: var(--blue);
  background: var(--blue-s);
  color: var(--blue-d);
}

.fp-tile-icon,
.sort-icon { font-size:0.9rem; }

.sort-row {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:10px;
  margin-bottom:16px;
}

.sort-lbl {
  font-size:0.78rem;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:0.06em;
  color:var(--ink3);
}

.results-zone {
  min-height: 280px;
}

.r-meta {
  font-size:0.84rem;
  margin-bottom:14px;
}

.school-list {
  display:flex;
  flex-direction:column;
  gap:12px;
}

.search-empty-state {
  text-align:center;
  padding:2.8rem 1rem;
  border-radius:16px;
}

.ses-title {
  font-size:1rem;
  font-weight:800;
  color:var(--ink);
  margin-bottom:6px;
}

.guide-inner { flex:1; }

.guide-progress {
  border-radius:16px;
  padding:16px 18px;
  margin-bottom:18px;
}

.gp-track {
  height:10px;
  background: var(--blue-s);
  border-radius:999px;
  overflow:hidden;
  margin-bottom:10px;
}

.gp-fill {
  height:100%;
  background: linear-gradient(90deg, var(--blue) 0%, var(--green) 100%);
  border-radius:999px;
  transition: width 0.25s ease;
}

.gp-labels {
  display:flex;
  justify-content:space-between;
  gap:10px;
  flex-wrap:wrap;
}

.gp-label {
  font-size:0.72rem;
  font-weight:700;
  color:var(--ink3);
}

.gp-label.active { color: var(--blue-d); }
.gp-label.done { color: var(--green-d); }

.guide-slide-enter-active { transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.guide-slide-leave-active { transition:all 0.18s ease; }
.guide-slide-enter-from { opacity:0; transform:translateX(32px) scale(0.97); }
.guide-slide-leave-to   { opacity:0; transform:translateX(-20px); }

.guide-q {
  padding:22px;
  border-radius:18px;
}

.gq-label {
  font-size:0.76rem;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:0.06em;
  margin-bottom:10px;
}

.gq-text {
  font-size:1.8rem;
  font-weight:900;
  margin-bottom:22px;
  line-height:1.15;
}

.gq-opts { display:flex; flex-direction:column; gap:12px; }

.gq-opt {
  display:flex;
  align-items:center;
  gap:14px;
  border-radius:14px;
  padding:15px 16px;
  cursor:pointer;
  transition:border-color 0.15s,background 0.15s,transform 0.15s;
  position:relative;
}

.gq-opt:hover {
  border-color: var(--blue);
  background: var(--blue-s);
  transform:translateX(3px);
}

.gq-opt.sel {
  border-color: var(--blue);
  background: var(--blue-s);
  transform:translateX(3px);
}

.gqo-state-img {
  width:56px;
  height:36px;
  border-radius:6px;
  overflow:hidden;
  flex-shrink:0;
  border:1px solid var(--b);
  background:#f3f4f6;
}

.gqo-state-img img { width:100%; height:100%; object-fit:cover; display:block; }
.gqo-emoji { font-size:1.5rem; flex-shrink:0; }
.gqo-title { font-weight:700; font-size:0.92rem; color: var(--ink); }
.gqo-sub { font-size:0.76rem; margin-top:2px; }
.gqo-check { position:absolute; right:14px; color:var(--blue); font-weight:800; font-size:1rem; }

.guide-footer {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-top:18px;
}

.gf-skip {
  font-size:0.84rem;
  font-weight:700;
  color: var(--ink3);
  cursor:pointer;
}

.gf-skip:hover { color: var(--blue); }

.gf-next {
  background: var(--blue-s);
  color: var(--blue-d);
}

:global(.cmp-tray) {
  padding: 14px 32px !important;
  min-height: 64px !important;
}
:global(.tray-lbl) {
  font-size: 0.8rem !important;
  font-weight: 700 !important;
}
:global(.tray-item) {
  font-size: 0.8rem !important;
  padding: 5px 12px !important;
}
:global(.tray-go) {
  padding: 9px 22px !important;
  font-size: 0.84rem !important;
}

.cmp-title {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 6px;
}

.cmp-sub-txt {
  font-size: 0.84rem;
  margin-bottom: 18px;
}

.cmp-wrap {
  border-radius: 16px;
  overflow: hidden;
}

.cmp-tbl {
  width:100%;
  border-collapse: collapse;
}

.cmp-tbl th,
.cmp-tbl td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--b);
  text-align: left;
  font-size: 0.84rem;
}

.cmp-tbl th {
  background: #f8fbff;
  color: var(--ink);
  font-weight: 800;
}

.cmp-sec td {
  background: var(--blue-s);
  color: var(--blue-d);
  font-size: 0.74rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.cmp-best {
  background: #f1fbf5;
}

.cmp-lifestyle-row {
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-top:20px;
  padding:16px 20px;
  border-radius:14px;
  gap:12px;
}

.cmp-lifestyle-row p {
  font-size:0.84rem;
  color:var(--green-d);
  font-weight:700;
  margin:0;
}

@media (max-width: 900px) {
  .two-paths,
  .fp-inner {
    grid-template-columns: 1fr;
  }

  .exp-entry,
  .search-path,
  .guide-path,
  .page-topbar {
    padding-left: 20px;
    padding-right: 20px;
  }

  .srch-row,
  .guide-footer,
  .cmp-lifestyle-row,
  .exp-map-header {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 768px) {
  .page-topbar {
    padding: 44px 20px 36px;
  }

  .page-title { font-size: 2.4rem; }
  .page-sub { font-size: 0.92rem; }

  :global(.cmp-tray) {
    padding: 12px 16px !important;
    justify-content: flex-start !important;
  }
  :global(.tray-items) {
    flex: 1 !important;
  }

  .page-title { font-size: 1.75rem; }
  .exp-entry-h h2,
  .gq-text,
  .cmp-title { font-size: 1.5rem; }
  .exp-stats-bar { flex-direction: column; gap: 14px; }
  .exp-stat-div { display: none; }
  .cmp-tbl { display:block; overflow-x:auto; }
}
</style>
