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
        <div class="cmp-wrap">
          <table class="cmp-tbl">
            <thead>
              <tr>
                <th>Factor</th>
                <th v-for="s in cmpSchools" :key="s.id">
                  {{ s.name }}<br>
                  <span style="font-weight:400;font-size:0.61rem;color:var(--ink3)">{{ s.suburb }} · {{ s.state_id === '1' ? 'QLD' : 'NSW' }}</span>
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
                <td v-for="s in cmpSchools" :key="s.id">{{ s.remoteness }}</td>
              </tr>
              <tr class="cmp-sec"><td :colspan="cmpSchools.length + 1">Incentives</td></tr>
              <tr>
                <td>Annual incentive</td>
                <td v-for="(s, i) in cmpSchools" :key="s.id" :class="bestIncentiveIdx === i ? 'cmp-best' : 'cmp-lo'">
                  <strong v-if="s.annual_incentive > 0">${{ Math.round(s.annual_incentive).toLocaleString() }}/yr</strong>
                  <span v-else>—</span>
                </td>
              </tr>
              <tr>
                <td>Package type</td>
                <td v-for="s in cmpSchools" :key="s.id">{{ s.inc_label || 'None' }}</td>
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
          <span class="es-num">{{ incentiveCount }}</span>
          <span class="es-lbl">schools with incentives</span>
        </div>
        <div class="exp-stat-div"></div>
        <div class="exp-stat">
          <span class="es-num">2</span>
          <span class="es-lbl">states covered</span>
        </div>
        <div class="exp-stat-div"></div>
        <div class="exp-stat">
          <span class="es-num">${{ topIncentive }}</span>
          <span class="es-lbl">top annual package</span>
        </div>
      </div>

      <!-- Leaflet Map -->
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
          <input ref="searchInput" v-model="searchQ" placeholder="Search by school name or suburb…">
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
                  @click="selState(s.v)">
                  <span class="fp-tile-icon">{{ s.icon }}</span>{{ s.label }}
                </div>
              </div>
            </div>
            <div class="fp-sec">
              <div class="fp-lbl">Employment</div>
              <div class="fp-tiles">
                <div class="fp-tile" :class="fEmp === 'perm' ? 'sel-perm' : ''" @click="selEmp('perm')">
                  <span class="fp-tile-icon">📋</span>Permanent
                </div>
                <div class="fp-tile" :class="fEmp === 'temp' ? 'sel-temp' : ''" @click="selEmp('temp')">
                  <span class="fp-tile-icon">📝</span>Temporary
                </div>
              </div>
            </div>
            <div class="fp-sec">
              <div class="fp-lbl">Remoteness</div>
              <div class="fp-tiles">
                <div v-for="r in remotenessOpts" :key="r.v" class="fp-tile"
                  :class="fRem.has(r.v) ? 'sel-rem' : ''"
                  @click="toggleRem(r.v)">
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
          @click="setSort(s.v)">
          <span class="sort-icon">{{ s.icon }}</span>{{ s.label }}
        </div>
      </div>

      <div class="results-zone">
        <template v-if="searchResults.length">
          <div class="r-meta">
            <strong>{{ searchResults.length }}</strong> school{{ searchResults.length !== 1 ? 's' : '' }} · sorted by {{ sortLabel }}
          </div>
          <div class="school-list">
            <SchoolRow
              v-for="s in searchPage"
              :key="s.id"
              :school="s"
              :is-open="openRow === s.id"
              :in-cmp="isCmp(s.id)"
              :sort="fSort"
              :emp-type="fEmp"
              @toggle="handleToggleRow"
              @toggle-cmp="toggleCmp"
              @view-lifestyle="handleViewLifestyle"
            />
          </div>
          <AppPagination :total="searchResults.length" :page="currentPage" @change="goPage" />
        </template>
        <div v-else class="search-empty-state">
          <div class="ses-title">No schools match</div>
          <div class="ses-sub">Try adjusting your filters or search term.</div>
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
                  <div class="gqo-state-img">
                    <img :src="opt.flag" :alt="opt.title" />
                  </div>
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
                {{ guideResults.length }} school{{ guideResults.length !== 1 ? 's' : '' }} matched
              </div>
              <template v-if="guideResults.length">
                <div class="r-meta" style="margin-top:4px">sorted by {{ sortLabel }}</div>
                <div class="school-list">
                  <SchoolRow
                    v-for="s in guidePage_"
                    :key="s.id"
                    :school="s"
                    :is-open="openRow === s.id"
                    :in-cmp="isCmp(s.id)"
                    :sort="fSort"
                    :emp-type="fEmp"
                    @toggle="handleToggleRow"
                    @toggle-cmp="toggleCmp"
                    @view-lifestyle="handleViewLifestyle"
                  />
                </div>
                <AppPagination :total="guideResults.length" :page="guidePage" @change="goGuidePage" />
              </template>
              <div v-else style="text-align:center;padding:1.5rem;font-size:0.8rem;color:var(--ink3)">
                No schools match — try different answers.
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Footer outside guide-inner so it gets full width -->
    </div>

    <CompareTray
      :cmp-list="cmpList"
      @remove="toggleCmp"
      @clear="clearCompare"
      @open-compare="openCompare"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { useExplorer } from '../composables/useExplorer.js'
import { PAGE_SIZE } from '../data/db.js'
import SchoolRow from '../components/SchoolRow.vue'
import AppPagination from '../components/AppPagination.vue'
import CompareTray from '../components/CompareTray.vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const emit = defineEmits(['navigate', 'view-lifestyle'])

const {
  fState, fEmp, fRem, fSort,
  cmpList, openRow, showCmp,
  currentPage, guidePage,
  filterBadgeCount,
  selState, selEmp, toggleRem, setSort,
  getFiltered, toggleCmp, clearCompare, isCmp,
  toggleRow, viewLifestyle,
  DB,
  remSize,
} = useExplorer()

const view = ref('entry')
const filterOpen = ref(false)
const searchInput = ref(null)
const searchQ = ref('')
const mapEl = ref(null)
let mapInstance = null

// ── Dynamic stats ──
const allIncentiveSchools = computed(() => DB ? DB.filter(s => s.annual_incentive > 0) : [])
const incentiveCount = computed(() => allIncentiveSchools.value.length)
const topIncentive = computed(() => {
  if (!allIncentiveSchools.value.length) return '—'
  const max = Math.max(...allIncentiveSchools.value.map(s => s.annual_incentive))
  return (max / 1000).toFixed(0) + 'k+'
})

// ── Colour scale ──
const INC_MIN = 4232, INC_MAX = 30000
function lerp(a, b, t) { return a + (b - a) * t }
function hexToRgb(hex) { return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)] }
function rgbToHex(r,g,b) { return '#' + [r,g,b].map(v => Math.round(v).toString(16).padStart(2,'0')).join('') }
function lerpColor(hex1, hex2, t) {
  const [r1,g1,b1] = hexToRgb(hex1), [r2,g2,b2] = hexToRgb(hex2)
  return rgbToHex(lerp(r1,r2,t), lerp(g1,g2,t), lerp(b1,b2,t))
}
function incentiveColor(incentive, isQld) {
  const t = Math.max(0, Math.min(1, (incentive - INC_MIN) / (INC_MAX - INC_MIN)))
  return isQld ? lerpColor('#fde68a', '#b45309', t) : lerpColor('#bfdbfe', '#1e3a8a', t)
}

// ── Map ──
function initMap() {
  if (!mapEl.value || mapInstance) return
  mapInstance = L.map(mapEl.value, { center: [-27, 145], zoom: 5, zoomControl: true, scrollWheelZoom: false })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors', maxZoom: 18,
  }).addTo(mapInstance)
  allIncentiveSchools.value.forEach((s, i) => {
    if (!s.lat || !s.lng) return
    const isQld = s.state_id === '1'
    const color = incentiveColor(s.annual_incentive, isQld)
    setTimeout(() => {
      const marker = L.circleMarker([s.lat, s.lng], {
        radius: 7, fillColor: color, color: '#fff', weight: 2, opacity: 0, fillOpacity: 0,
      }).addTo(mapInstance)
      let op = 0
      const fade = setInterval(() => {
        op += 0.12
        marker.setStyle({ opacity: Math.min(op, 1), fillOpacity: Math.min(op * 0.92, 0.92) })
        if (op >= 1) clearInterval(fade)
      }, 25)
      marker.bindTooltip(`
        <div style="font-family:sans-serif;min-width:150px">
          <div style="font-weight:700;font-size:0.8rem;margin-bottom:2px">${s.name}</div>
          <div style="font-size:0.72rem;color:#94a3b8;margin-bottom:4px">${s.suburb} · ${isQld ? 'QLD' : 'NSW'} · ${s.remoteness}</div>
          <div style="font-size:0.8rem;font-weight:700;color:${color}">${'$' + Math.round(s.annual_incentive).toLocaleString()}/yr</div>
        </div>
      `, { permanent: false, direction: 'top', offset: [0, -8], opacity: 1, className: 'school-tooltip' })
      marker.on('mouseover', function() { this.setRadius(10); this.setStyle({ weight: 3 }); this.openTooltip() })
      marker.on('mouseout', function() { this.setRadius(7); this.setStyle({ weight: 2 }); this.closeTooltip() })
      marker.on('click', () => { view.value = 'search'; searchQ.value = s.suburb })
    }, i * 18)
  })
}

watch(view, (v) => {
  if (v === 'entry') nextTick(() => { if (!mapInstance) initMap(); else mapInstance.invalidateSize() })
  if (v === 'search') nextTick(() => searchInput.value?.focus())
})
onMounted(() => { nextTick(() => initMap()) })
onUnmounted(() => { if (mapInstance) { mapInstance.remove(); mapInstance = null } })

// ── Search ──
const searchResults = computed(() => {
  if (!searchQ.value && remSize.value === 0 && fState.value === 'both') {
    return DB ? DB.filter(s => s.annual_incentive > 0).sort((a, b) => b.annual_incentive - a.annual_incentive) : []
  }
  return getFiltered(searchQ.value)
})
const searchPage = computed(() => {
  const s = (currentPage.value - 1) * PAGE_SIZE
  return searchResults.value.slice(s, s + PAGE_SIZE)
})
watch([searchQ, fState, remSize, fSort], () => { currentPage.value = 1 })
function goPage(p) { currentPage.value = p; openRow.value = null }
const sortLabel = computed(() => ({ inc: 'incentive', hc: 'healthcare', dist: 'distance', az: 'name' }[fSort.value]))

// ── Guide ──
const guideStep = ref(0)
const gqAnswers = ref([null, null, null])
const guideResults = ref([])
const guideProgress = computed(() => [0, 33, 66, 100][guideStep.value])

function startGuide() { view.value = 'guide'; guideStep.value = 0; gqAnswers.value = [null, null, null]; guideResults.value = [] }
function gqSel(step, title) { gqAnswers.value[step] = title }
function gqNext(step) { guideStep.value = step + 1 }
function gqFinish() {
  const a1 = gqAnswers.value[0] || '', a2 = gqAnswers.value[1] || '', a3 = gqAnswers.value[2] || ''
  selState(a1.includes('Queensland') ? 'qld' : a1.includes('New South Wales') ? 'nsw' : 'both')
  fRem.clear()
  if (a2.includes('Outer Regional')) fRem.add('3')
  else if (a2.includes('Very Remote')) fRem.add('5')
  else if (a2.includes('Remote')) fRem.add('4')
  if (a3.includes('Healthcare')) setSort('hc')
  else if (a3.includes('Distance')) setSort('dist')
  else setSort('inc')
  guideResults.value = getFiltered('').filter(s => s.annual_incentive > 0)
  guideStep.value = 3; guidePage.value = 1
}
const guidePage_ = computed(() => {
  const s = (guidePage.value - 1) * PAGE_SIZE
  return guideResults.value.slice(s, s + PAGE_SIZE)
})
function goGuidePage(p) { guidePage.value = p; openRow.value = null }

// ── Compare ──
const cmpSchools = computed(() => cmpList.map(id => DB.find(x => x.id === id)).filter(Boolean))
const bestIncentiveIdx = computed(() => {
  if (!cmpSchools.value.length) return -1
  const vals = cmpSchools.value.map(s => s.annual_incentive || 0)
  return vals.indexOf(Math.max(...vals))
})
function openCompare() { if (!cmpList.length) return; showCmp.value = true }
function closeCompare() { showCmp.value = false }
function handleToggleRow(id) { toggleRow(id) }
function handleViewLifestyle(id) { const dest = viewLifestyle(id); if (dest) emit('navigate', dest) }

const stateOpts = [
  { v: 'both', icon: '🗺️', label: 'Both' },
  { v: 'qld',  icon: '☀️', label: 'QLD' },
  { v: 'nsw',  icon: '🌉', label: 'NSW' },
]
const remotenessOpts = [
  { v: '5', icon: '🔴', label: 'Very Remote' },
  { v: '4', icon: '🟠', label: 'Remote' },
  { v: '3', icon: '🟡', label: 'Outer Regional' },
]
const sortOpts = [
  { v: 'inc',  icon: '💰', label: 'Incentive' },
  { v: 'hc',   icon: '🏥', label: 'Healthcare' },
  { v: 'dist', icon: '📍', label: 'Distance' },
  { v: 'az',   icon: '🔤', label: 'A–Z' },
]

// Local flag assets — place files in src/assets/
const q1opts = [
  {
    title: 'Both states',
    flag: new URL('../assets/flag-au.png', import.meta.url).href,
    sub: 'Show QLD and NSW together'
  },
  {
    title: 'Queensland',
    flag: new URL('../assets/flag-qld.png', import.meta.url).href,
    sub: 'QLD Locality Allowance applies'
  },
  {
    title: 'New South Wales',
    flag: new URL('../assets/flag-nsw.png', import.meta.url).href,
    sub: 'NSW Rural Teacher Incentive applies'
  },
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
/* ── Entry ── */
.exp-entry { padding: 24px 32px 0; max-width: 960px; margin: 0 auto; }
.exp-entry-h { text-align: center; margin-bottom: 28px; }
.exp-entry-h h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 6px; }
.exp-entry-h p { color: var(--ink3, #6b7280); font-size: 0.85rem; }
.two-paths { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.path-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 28px 28px 24px; cursor: pointer; transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s; display: flex; flex-direction: column; gap: 10px; }
.path-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.09); transform: translateY(-3px); }
.pc-search:hover { border-color: #93c5fd; }
.pc-guide:hover  { border-color: #6ee7b7; }
.pc-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
.pc-icon.blue  { background: #dbeafe; }
.pc-icon.green { background: #d1fae5; }
.pc-title { font-size: 1.05rem; font-weight: 700; color: var(--ink1, #111827); }
.pc-sub { font-size: 0.8rem; color: var(--ink3, #6b7280); line-height: 1.5; }
.pc-features { list-style: none; padding: 0; margin: 4px 0 8px; display: flex; flex-direction: column; gap: 7px; }
.pc-features li { font-size: 0.78rem; color: var(--ink2, #374151); display: flex; align-items: center; gap: 7px; }
.pc-btn { display: inline-block; padding: 8px 18px; border-radius: 999px; font-size: 0.82rem; font-weight: 600; width: fit-content; margin-top: auto; cursor: pointer; transition: opacity 0.15s; }
.pc-btn:hover { opacity: 0.85; }
.pc-btn.blue  { background: #dbeafe; color: #1d4ed8; }
.pc-btn.green { background: #d1fae5; color: #065f46; }

/* ── Stats ── */
.exp-stats-bar { display: flex; align-items: center; justify-content: center; margin-top: 20px; background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 16px 24px; }
.exp-stat { display: flex; flex-direction: column; align-items: center; flex: 1; }
.es-num { font-size: 1.3rem; font-weight: 700; color: var(--ink1, #111827); }
.es-lbl { font-size: 0.72rem; color: var(--ink3, #6b7280); margin-top: 2px; }
.exp-stat-div { width: 1px; height: 36px; background: #e5e7eb; margin: 0 8px; }

/* ── Map ── */
.exp-map-section { margin-top: 24px; background: #fff; border: 1.5px solid #e5e7eb; border-radius: 16px; overflow: hidden; position: relative; margin-bottom: 40px; }
.exp-map-header { padding: 12px 20px 10px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: baseline; gap: 12px; }
.exp-map-label { font-size: 0.82rem; font-weight: 600; color: var(--ink2, #374151); }
.exp-map-hint { font-size: 0.72rem; color: var(--ink3, #9ca3af); }
.exp-map-container { height: 420px; width: 100%; z-index: 0; }
.map-legend { position: absolute; bottom: 16px; right: 16px; background: rgba(255,255,255,0.96); border: 1px solid #e5e7eb; border-radius: 10px; padding: 10px 14px; z-index: 999; min-width: 130px; }
.ml-title { font-size: 0.68rem; font-weight: 600; color: var(--ink3, #6b7280); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
.ml-gradient-row { display: flex; flex-direction: column; gap: 2px; }
.ml-gradient { height: 10px; border-radius: 4px; width: 100%; }
.qld-grad { background: linear-gradient(to right, #fde68a, #b45309); }
.nsw-grad { background: linear-gradient(to right, #bfdbfe, #1e3a8a); }
.ml-grad-labels { display: flex; justify-content: space-between; font-size: 0.62rem; color: var(--ink3, #9ca3af); }
.ml-grad-state { font-size: 0.7rem; font-weight: 600; color: var(--ink2, #374151); margin-top: 1px; }
:global(.school-tooltip) { background: #1e293b !important; border: none !important; border-radius: 8px !important; color: #fff !important; padding: 8px 10px !important; font-size: 0.78rem !important; box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important; }
:global(.school-tooltip::before) { border-top-color: #1e293b !important; }

/* ── Filter ── */
.fp-slide-enter-active, .fp-slide-leave-active { transition: max-height 0.28s ease, opacity 0.22s ease; overflow: hidden; }
.fp-slide-enter-from, .fp-slide-leave-to { max-height: 0; opacity: 0; }
.fp-slide-enter-to, .fp-slide-leave-from { max-height: 400px; opacity: 1; }
.fp-tile-icon { font-size: 0.9rem; }
.sort-icon { font-size: 0.85rem; }
.sort-pill { display: flex; align-items: center; gap: 5px; }

/* ── Search ── */
.search-empty-state { text-align: center; padding: 2.5rem 1rem; }
.ses-title { font-size: 0.95rem; font-weight: 700; color: var(--ink1, #111827); margin-bottom: 6px; }
.ses-sub { font-size: 0.8rem; color: var(--ink3, #6b7280); }

/* ── Guide ── */
.guide-path { display: flex; flex-direction: column; }
.guide-inner { flex: 1; }
.guide-slide-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.guide-slide-leave-active { transition: all 0.18s ease; }
.guide-slide-enter-from { opacity: 0; transform: translateX(32px) scale(0.97); }
.guide-slide-leave-to   { opacity: 0; transform: translateX(-20px); }
.guide-q { padding: 0 0 8px; }
.gq-text { font-size: 1.2rem; font-weight: 700; margin-bottom: 20px; color: var(--ink1, #111827); }
.gq-opts { display: flex; flex-direction: column; gap: 10px; }
.gq-opt { display: flex; align-items: center; gap: 14px; background: #fff; border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 14px 16px; cursor: pointer; transition: border-color 0.15s, background 0.15s, transform 0.15s; position: relative; }
.gq-opt:hover { border-color: #a5b4fc; transform: translateX(3px); }
.gq-opt.sel { border-color: #6366f1; background: #eef2ff; transform: translateX(3px); }
.gqo-state-img { width: 56px; height: 36px; border-radius: 6px; overflow: hidden; flex-shrink: 0; border: 1px solid #e5e7eb; background: #f3f4f6; }
.gqo-state-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gqo-emoji { font-size: 1.5rem; flex-shrink: 0; }
.gqo-title { font-weight: 600; font-size: 0.9rem; }
.gqo-sub { font-size: 0.75rem; color: var(--ink3, #6b7280); margin-top: 2px; }
.gqo-check { position: absolute; right: 14px; color: #6366f1; font-weight: 700; font-size: 1rem; }
</style>