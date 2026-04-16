<template>
  <div class="page active">
    <div class="page-topbar">
      <div class="page-title">Lifestyle Insights</div>
      <div class="page-sub">ABS lifestyle data · no incentive figures here · see Explorer for financial packages</div>
    </div>

    <!-- Search bar -->
    <div class="ins-search-bar">
      <div style="position:relative;flex:1;max-width:360px">
        <div class="ins-sw">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--ink3);flex-shrink:0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="insQ" placeholder="Search for a school to view its lifestyle…" @input="onInsSearch" autocomplete="off">
        </div>
        <div v-if="insResults.length" class="ins-sr show">
          <div v-for="l in insResults" :key="l.id" class="ins-sri" @click="selectIns(l.id)">
            <div class="ins-sri-name">{{ l.name }}</div>
            <div class="ins-sri-sub">{{ l.suburb || '—' }} · {{ stateLabelFromRecord(l) }} · {{ l.remoteness || '—' }}</div>
          </div>
        </div>
      </div>
      <span v-if="insSchool" class="ins-clear" @click="doClearIns">✕ Clear</span>
      <button class="btn btn-s btn-sm" @click="$emit('navigate', 'explorer')" style="margin-left:auto;flex-shrink:0">← Explorer</button>
    </div>

    <!-- Tray pills -->
    <div v-if="cmpList.length" class="ins-tray-bar show">
      <span class="itp-lbl">From your compare tray:</span>
      <span
        v-for="id in cmpList" :key="id"
        class="itp-pill"
        :class="{ active: !sbsMode && insSchool && insSchool.id === id }"
        @click="selectIns(id)"
      >{{ shortName(id) }}</span>
      <span v-if="cmpList.length >= 2"
        class="itp-sbs"
        :class="{ active: sbsMode }"
        @click="toggleSbs"
      >⊞ Side by side{{ sbsMode ? ' (on)' : '' }}</span>
    </div>

    <!-- Body -->
    <div class="ins-body">
      <!-- Empty state -->
      <div v-if="!insSchool && !sbsMode" style="text-align:center;padding:44px 0;">
        <div style="font-size:2rem;margin-bottom:10px;opacity:0.3;">🌿</div>
        <div style="font-size:0.92rem;font-weight:600;color:var(--ink2);margin-bottom:5px;">Select a school to explore its lifestyle</div>
        <div style="font-size:0.77rem;color:var(--ink3);line-height:1.6;max-width:280px;margin:0 auto;">Search above, click a compare tray pill, or use "View Lifestyle →" from Explorer.</div>
      </div>

      <!-- Single school view -->
      <template v-else-if="insSchool && !sbsMode">
        <div class="ins-school-hdr anim-fadeup">
          <div>
            <div class="ish-name">{{ insSchool.name }}</div>
            <div class="ish-meta">
              <span>{{ insSchool.suburb }}</span>
              <span class="chip" :class="insSchool.state_id === '1' ? 'cq' : 'cn'">{{ insSchool.state_id === '1' ? 'QLD' : 'NSW' }}</span>
              <span class="chip" :class="RC[String(insSchool.remoteness_id)] || 'c3'">{{ insSchool.remoteness || '—' }}</span>
              <span style="color:var(--ink3)">{{ insSchool.type }}·{{ insSchool.sector }}</span>
            </div>
          </div>
          <div class="ish-acts">
            <button class="btn btn-sm" :class="isCmp(insSchool.id) ? 'btn-g' : 'btn-gh'" @click="toggleCmp(insSchool.id)">
              {{ isCmp(insSchool.id) ? '✓ In Compare' : '+ Compare' }}
            </button>
          </div>
        </div>

        <div class="life-grid anim-fadeup" style="animation-delay:0.05s">
          <div class="life-card">
            <div class="lc-title">📍 Location & Cost</div>
            <div class="lr"><span class="lrk">Distance to city</span><span class="lrv">{{ Math.round(n(insSchool.distance_to_city)) }} km</span></div>
            <div class="lr"><span class="lrk">Nearest city</span><span class="lrv">{{ insSchool.nearest_city || '—' }}</span></div>
            <div class="lr"><span class="lrk">Median rent</span><span class="lrv" :class="n(insSchool.median_rent) < 250 ? 'good' : n(insSchool.median_rent) > 450 ? 'warn' : ''">${{ n(insSchool.median_rent) }}/wk</span></div>
            <div class="lr"><span class="lrk">Regional income</span><span class="lrv muted">${{ n(insSchool.median_income) }}/wk <small style="font-size:0.6rem">(ABS area)</small></span></div>
            <div class="lr"><span class="lrk">Median age</span><span class="lrv">{{ n(insSchool.median_age) }} yrs</span></div>
          </div>
          <div class="life-card">
            <div class="lc-title">🏥 Healthcare & Safety</div>
            <div class="lr"><span class="lrk">Healthcare grade</span><span class="lrv"><span class="gbadge" :class="gradeClass(insSchool.healthcare_grade)">{{ gradeText(insSchool.healthcare_grade) }}</span></span></div>
            <div class="lr"><span class="lrk">Facilities</span><span class="lrv" :class="n(insSchool.healthcare_count) > 50 ? 'good' : n(insSchool.healthcare_count) < 10 ? 'warn' : ''">{{ n(insSchool.healthcare_count) }} in area</span></div>
            <div class="lr"><span class="lrk">Crime rank</span><span class="lrv" :class="crimeClass(n(insSchool.crime_rank))">{{ n(insSchool.crime_rank) > 0 ? n(insSchool.crime_rank) + ' / 100' : 'No data' }}</span></div>
          </div>
          <div class="life-card">
            <div class="lc-title">🎓 Education & Nature</div>
            <div class="lr"><span class="lrk">Education grade</span><span class="lrv"><span class="gbadge" :class="gradeClass(insSchool.education_grade)">{{ gradeText(insSchool.education_grade) }}</span></span></div>
            <div class="lr"><span class="lrk">Schools nearby</span><span class="lrv">{{ n(insSchool.education_count) }} schools</span></div>
            <div class="lr"><span class="lrk">National parks</span><span class="lrv" :class="n(insSchool.national_parks) > 3 ? 'good' : ''">{{ n(insSchool.national_parks) }} parks</span></div>
            <div class="lr"><span class="lrk">Nature reserves</span><span class="lrv">{{ n(insSchool.nature_reserves) }} reserves</span></div>
          </div>
        </div>

        <!-- Trade-offs -->
        <div class="editorial anim-fadeup" style="animation-delay:0.1s">
          <div class="editorial-title">The honest trade-offs.</div>
          <div class="editorial-sub">Neither column wins — these are differences. You decide what matters more.</div>
          <div class="tradeoffs"><div class="to-cols">
            <div class="to-col reg">
              <div class="to-col-lbl">🌿 Regional & Remote</div>
              <div class="to-item"><span class="au">↑</span>Higher financial incentives</div>
              <div class="to-item"><span class="au">↑</span>Lower cost of living</div>
              <div class="to-item"><span class="au">↑</span>Stronger community bonds</div>
              <div class="to-item"><span class="au">↑</span>Faster-developing skills</div>
              <div class="to-item"><span class="ad">↓</span>Fewer healthcare services</div>
              <div class="to-item"><span class="ad">↓</span>Further from city amenities</div>
            </div>
            <div class="to-col city">
              <div class="to-col-lbl">🏙️ City & Inner Regional</div>
              <div class="to-item"><span class="au">↑</span>Excellent hospital access</div>
              <div class="to-item"><span class="au">↑</span>Rich cultural and social life</div>
              <div class="to-item"><span class="au">↑</span>Larger professional networks</div>
              <div class="to-item"><span class="au">↑</span>More specialist opportunities</div>
              <div class="to-item"><span class="ad">↓</span>Higher housing costs</div>
              <div class="to-item"><span class="ad">↓</span>Lower incentive packages</div>
            </div>
          </div></div>
        </div>
      </template>

      <!-- Side-by-side view -->
      <template v-else-if="sbsMode && cmpSchools.length >= 2">
        <div class="sbs-wrap anim-fadeup">
          <table class="sbs-tbl">
            <thead>
              <tr>
                <th>Factor</th>
                <th v-for="s in cmpSchools" :key="s.id" style="min-width:170px">
                  {{ s.name }}<br>
                  <span style="font-weight:400;font-size:0.61rem;color:var(--ink3)">{{ s.suburb }}</span>
                  <span class="chip" :class="s.state_id === '1' ? 'cq' : 'cn'" style="margin-left:2px">{{ s.state_id === '1' ? 'QLD' : 'NSW' }}</span>
                  <span class="chip" :class="RC[String(s.remoteness_id)] || 'c3'" style="margin-left:2px">{{ s.remoteness || '—' }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="sbs-sec"><td :colspan="cmpSchools.length + 1">📍 Location & Cost</td></tr>
              <tr>
                <td>Distance to city</td>
                <td v-for="(s, i) in cmpSchools" :key="s.id" :class="bestIdx(cmpSchools.map(x => n(x.distance_to_city)), false) === i ? 'sbs-best' : 'sbs-lo'">{{ Math.round(n(s.distance_to_city)) }} km</td>
              </tr>
              <tr>
                <td>Nearest city</td>
                <td v-for="s in cmpSchools" :key="s.id">{{ s.nearest_city || '—' }}</td>
              </tr>
              <tr>
                <td>Median rent</td>
                <td v-for="(s, i) in cmpSchools" :key="s.id" :class="bestIdx(cmpSchools.map(x => n(x.median_rent)), false) === i ? 'sbs-best' : 'sbs-lo'">${{ n(s.median_rent) }}/wk</td>
              </tr>
              <tr>
                <td>Median age</td>
                <td v-for="s in cmpSchools" :key="s.id">{{ n(s.median_age) }} yrs</td>
              </tr>
              <tr class="sbs-sec"><td :colspan="cmpSchools.length + 1">🏥 Healthcare & Safety</td></tr>
              <tr>
                <td>Healthcare grade</td>
                <td v-for="s in cmpSchools" :key="s.id"><span class="gbadge" :class="gradeClass(s.healthcare_grade)">{{ gradeText(s.healthcare_grade) }}</span></td>
              </tr>
              <tr>
                <td>Facilities in area</td>
                <td v-for="(s, i) in cmpSchools" :key="s.id" :class="bestIdx(cmpSchools.map(x => n(x.healthcare_count)), true) === i ? 'sbs-best' : 'sbs-lo'">{{ n(s.healthcare_count) }} facilities</td>
              </tr>
              <tr>
                <td>Crime rank (lower=safer)</td>
                <td v-for="(s, i) in cmpSchools" :key="s.id" :class="bestIdx(cmpSchools.map(x => n(x.crime_rank)), false) === i ? 'sbs-best' : 'sbs-lo'">{{ n(s.crime_rank) > 0 ? n(s.crime_rank) + '/100' : 'No data' }}</td>
              </tr>
              <tr class="sbs-sec"><td :colspan="cmpSchools.length + 1">🎓 Education & Nature</td></tr>
              <tr>
                <td>Education grade</td>
                <td v-for="s in cmpSchools" :key="s.id"><span class="gbadge" :class="gradeClass(s.education_grade)">{{ gradeText(s.education_grade) }}</span></td>
              </tr>
              <tr>
                <td>Schools nearby</td>
                <td v-for="(s, i) in cmpSchools" :key="s.id" :class="bestIdx(cmpSchools.map(x => n(x.education_count)), true) === i ? 'sbs-best' : 'sbs-lo'">{{ n(s.education_count) }} schools</td>
              </tr>
              <tr>
                <td>National parks</td>
                <td v-for="(s, i) in cmpSchools" :key="s.id" :class="bestIdx(cmpSchools.map(x => n(x.national_parks)), true) === i ? 'sbs-best' : 'sbs-lo'">{{ n(s.national_parks) }} parks</td>
              </tr>
              <tr>
                <td>Nature reserves</td>
                <td v-for="(s, i) in cmpSchools" :key="s.id" :class="bestIdx(cmpSchools.map(x => n(x.nature_reserves)), true) === i ? 'sbs-best' : 'sbs-lo'">{{ n(s.nature_reserves) }} reserves</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="font-size:0.7rem;color:var(--ink3);margin-top:4px;">Green = strongest value per row · Regional income excluded (ABS area average, not teacher salary)</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useExplorer } from '../composables/useExplorer.js'
import { RC, GC } from '../data/db.js'
import { toNum, stateLabelFromRecord } from '../utils/locationFields.js'

defineEmits(['navigate'])

function n(v) {
  return toNum(v, 0)
}

const {
  insSchool,
  sbsMode,
  cmpList,
  selectIns: _selectIns,
  clearIns,
  toggleSbs,
  toggleCmp,
  isCmp,
  compareSchools,
  searchSchoolsForDropdown,
} = useExplorer()

const insQ = ref('')
const insResults = ref([])
let insSearchTimer

function closeDropdown() {
  insResults.value = []
}

onMounted(() => document.addEventListener('click', (e) => {
  if (!e.target.closest('.ins-search-bar')) closeDropdown()
}))
onUnmounted(() => document.removeEventListener('click', closeDropdown))

async function onInsSearch() {
  const q = insQ.value.toLowerCase().trim()
  clearTimeout(insSearchTimer)
  if (!q) { insResults.value = []; return }
  insSearchTimer = setTimeout(async () => {
    insResults.value = await searchSchoolsForDropdown(q)
  }, 260)
}

async function selectIns(id) {
  await _selectIns(id)
  insResults.value = []
  insQ.value = insSchool.value?.name || ''
}

function doClearIns() {
  clearIns()
  insQ.value = ''
  insResults.value = []
}

const cmpSchools = computed(() => compareSchools.value)

function shortName(id) {
  const l = compareSchools.value.find((x) => String(x.id) === String(id))
  return l ? (l.name || '—').split(' ').slice(0, 3).join(' ') : '—'
}

function crimeClass(rank) {
  if (rank > 0 && rank < 30) return 'good'
  if (rank > 70) return 'bad'
  return ''
}

function bestIdx(vals, hi) {
  const ns = vals.map(v => parseFloat(v) || 0)
  const best = hi ? Math.max(...ns) : Math.min(...ns.filter(n => n > 0).concat([0]))
  return ns.indexOf(best)
}

function gradeValue(g) {
  if (g === null || g === undefined || g === '') return null
  if (typeof g === 'object') {
    const v = g.value
    return v === null || v === undefined || v === '' ? null : String(v)
  }
  return String(g)
}
function gradeText(g) {
  return gradeValue(g) ?? 'No data'
}
function gradeClass(g) {
  const v = gradeValue(g)
  return v ? (GC[v] || 'gd') : 'gd'
}
</script>
