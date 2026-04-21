<template>
  <div class="page active">

    <!-- SCROLL PROGRESS BAR -->
    <div class="scroll-progress" :style="{ width: scrollPct + '%' }"></div>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-eyebrow">For Australian Teachers</div>
        <h1 class="hero-h1">Find where you<br><em>belong</em>, not just a job.</h1>
        <p class="hero-sub">Real incentive data. Real lifestyle metrics. 1,080 schools across QLD and NSW so you can make the move with confidence.</p>
        <div class="hero-acts">
          <button class="btn-hero-p" @click="$emit('navigate', 'explorer')">Explore Schools</button>
          <button class="btn-hero-s" @click="$emit('navigate', 'insights')">View Lifestyle Data</button>
        </div>
      </div>
      <div class="hero-stats-bar">
        <div class="hstat"><div class="hstat-n">1,080</div><div class="hstat-l">Schools with incentives</div></div>
        <div class="hstat-sep"></div>
        <div class="hstat"><div class="hstat-n">$30k+</div><div class="hstat-l">Top annual incentive</div></div>
        <div class="hstat-sep"></div>
        <div class="hstat"><div class="hstat-n">2</div><div class="hstat-l">States covered</div></div>
        <div class="hstat-sep"></div>
        <div class="hstat"><div class="hstat-n">Free</div><div class="hstat-l">No sign-up needed</div></div>
      </div>
    </section>

    <!-- WHY REGIONAL -->
    <section class="why-section fade-section">
      <div class="why-inner">
        <div class="section-header centered">
          <h2>What regional actually offers</h2>
          <p>Four things that are genuinely true about teaching regionally. Not a pitch, a starting point for your own decision.</p>
        </div>
        <div class="why-grid">

          <div class="why-card why-financial">
            <div class="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div class="why-label">Financial</div>
            <h3 class="why-title">A real pay difference</h3>
            <p class="why-body">State incentive programs add up to $30,000 per year on top of your base salary. That figure is documented, verified, and shown in the Explorer tab. It is not a promise of long-term reward instead it is cash in your pay cycle while you are there.</p>
            <p class="why-caveat">It does not guarantee you will want to stay. But it does change what your first few years look like financially.</p>
          </div>

          <div class="why-card why-cost">
            <div class="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div class="why-label">Cost of living</div>
            <h3 class="why-title">Your salary stretches further</h3>
            <p class="why-body">Median weekly rent in regional QLD and NSW is substantially lower than in Sydney or Brisbane. ABS Census data backs this up. A teacher salary that feels tight in a capital city often has real breathing room in a regional town.</p>
            <p class="why-caveat">Some goods cost more and services are fewer. The net position depends on your lifestyle, but housing is genuinely cheaper.</p>
          </div>

          <div class="why-card why-career">
            <div class="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"/></svg>
            </div>
            <div class="why-label">Career pace</div>
            <h3 class="why-title">Smaller schools, broader role</h3>
            <p class="why-body">Rural schools are structurally smaller. Teachers take on leadership, cross-curriculum, and mentoring responsibilities earlier than they typically would in a larger metro school. That is not spin — it is a direct result of how small schools are staffed.</p>
            <p class="why-caveat">A broader role is only an advantage if that is what you want. For some teachers, it is the appeal. For others, it is the concern.</p>
          </div>

          <div class="why-card why-community">
            <div class="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="why-label">Community</div>
            <h3 class="why-title">You are not anonymous</h3>
            <p class="why-body">In a small regional town, teachers are known figures. Families recognise you at the shops. Your presence in the school is felt more directly. The relationship between school and community is tighter than in most metro settings.</p>
            <p class="why-caveat">That visibility suits some people and not others. It is worth knowing before you go, not after.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- TOP INCENTIVE AREAS -->
    <!-- INCENTIVE SNAPSHOT -->
    <section class="snapshot fade-section">
      <div class="snapshot-inner">
        <div class="section-header">
          <div class="section-eyebrow">What could you earn?</div>
          <h2>Incentive by remoteness level</h2>
          <p>The further from a city, the higher the package. Here is what teachers are earning across QLD and NSW right now.</p>
        </div>
        <div class="snap-grid">

          <div class="snap-card snap-vr">
            <div class="snap-tier-label">Very Remote</div>
            <div class="snap-row">
              <img src="../assets/flag-nsw.png" alt="NSW" class="snap-flag" />
              <div class="snap-info">
                <div class="snap-suburb">Wilcannia, Bourke, Tibooburra</div>
                <div class="snap-desc">8-point RTI + Retention Benefit</div>
              </div>
              <div class="snap-amount green">$30k<span>/yr</span></div>
            </div>
            <div class="snap-row">
              <img src="../assets/flag-qld.png" alt="QLD" class="snap-flag" />
              <div class="snap-info">
                <div class="snap-suburb">Birdsville, Jundah, Eromanga</div>
                <div class="snap-desc">Locality Allowance — Full Rate</div>
              </div>
              <div class="snap-amount amber">$7–11k<span>/yr</span></div>
            </div>
            <button class="snap-btn" @click="$emit('navigate', 'explorer')">Explore Very Remote schools</button>
          </div>

          <div class="snap-card snap-r">
            <div class="snap-tier-label">Remote</div>
            <div class="snap-row">
              <img src="../assets/flag-nsw.png" alt="NSW" class="snap-flag" />
              <div class="snap-info">
                <div class="snap-suburb">Walgett, Cobar, Collarenebri</div>
                <div class="snap-desc">6 or 8-point RTI + Retention Benefit</div>
              </div>
              <div class="snap-amount green">$25–30k<span>/yr</span></div>
            </div>
            <div class="snap-row">
              <img src="../assets/flag-qld.png" alt="QLD" class="snap-flag" />
              <div class="snap-info">
                <div class="snap-suburb">Cooktown, Hope Vale, Mount Isa</div>
                <div class="snap-desc">Locality Allowance — Full Rate</div>
              </div>
              <div class="snap-amount amber">$5–8k<span>/yr</span></div>
            </div>
            <button class="snap-btn" @click="$emit('navigate', 'explorer')">Explore Remote schools</button>
          </div>

          <div class="snap-card snap-or">
            <div class="snap-tier-label">Outer Regional</div>
            <div class="snap-row">
              <img src="../assets/flag-nsw.png" alt="NSW" class="snap-flag" />
              <div class="snap-info">
                <div class="snap-suburb">Broken Hill, Dareton, Coomealla</div>
                <div class="snap-desc">4 or 6-point RTI</div>
              </div>
              <div class="snap-amount green">$20–25k<span>/yr</span></div>
            </div>
            <div class="snap-row">
              <img src="../assets/flag-qld.png" alt="QLD" class="snap-flag" />
              <div class="snap-info">
                <div class="snap-suburb">Townsville region, Eaton College</div>
                <div class="snap-desc">Locality Allowance applies</div>
              </div>
              <div class="snap-amount amber">$2–5k<span>/yr</span></div>
            </div>
            <button class="snap-btn" @click="$emit('navigate', 'explorer')">Explore Outer Regional schools</button>
          </div>

        </div>
        <div class="snap-note">All figures are indicative annual incentive payments only and do not include base salary. Always verify eligibility with your state education department.</div>
      </div>
    </section>

    <!-- SPLIT: teacher in classroom -->
    <section class="split-section fade-section">
      <div class="split-photo"></div>
      <div class="split-text">
        <div class="section-eyebrow">What is HardStaff Connect?</div>
        <h2>Two questions. One platform.</h2>
        <p class="split-lead">Most teachers considering a rural move ask two things:</p>
        <div class="split-qs">
          <div class="split-q">
            <div class="split-q-num">01</div>
            <div>
              <div class="split-q-title">How much will I actually earn?</div>
              <div class="split-q-text">The <strong>Explorer</strong> tab shows real incentive packages: base salary top-ups, locality allowances, and retention benefits by school, filtered by state and remoteness.</div>
            </div>
          </div>
          <div class="split-q">
            <div class="split-q-num">02</div>
            <div>
              <div class="split-q-title">What is life actually like there?</div>
              <div class="split-q-text">The <strong>Lifestyle Insights</strong> tab shows healthcare access, housing costs, distance to the nearest city, crime rank, and nature access. Real ABS Census data.</div>
            </div>
          </div>
        </div>
        <button class="btn-ghost" @click="$emit('navigate', 'explorer')">Start in Explorer</button>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="how-section fade-section">
      <div class="how-inner">
        <div class="section-header centered">
          <div class="section-eyebrow">How it works</div>
          <h2>Three steps to your decision</h2>
        </div>
        <div class="how-cards">
          <div class="how-card">
            <div class="how-card-img img-search"></div>
            <div class="how-card-body">
              <div class="how-card-num">01</div>
              <div class="how-card-title">Find by incentive</div>
              <p class="how-card-text">Search 1,080 schools or answer 3 guided questions. Filter by state, remoteness, and role. Sort by highest package.</p>
              <button class="btn-ghost" @click="$emit('navigate', 'explorer')">Open Explorer</button>
            </div>
          </div>
          <div class="how-connector">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div class="how-card">
            <div class="how-card-img img-rural"></div>
            <div class="how-card-body">
              <div class="how-card-num">02</div>
              <div class="how-card-title">Explore the lifestyle</div>
              <p class="how-card-text">Every school links to its Lifestyle Insights profile. Healthcare, rent, distance to the nearest city, and nature access.</p>
              <button class="btn-ghost" @click="$emit('navigate', 'insights')">View Lifestyle Insights</button>
            </div>
          </div>
          <div class="how-connector">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div class="how-card">
            <div class="how-card-img img-compare"></div>
            <div class="how-card-body">
              <div class="how-card-num">03</div>
              <div class="how-card-title">Compare side by side</div>
              <p class="how-card-text">Add up to 4 schools to your compare tray. Incentives and lifestyle metrics in one table across both tabs.</p>
              <button class="btn-ghost" @click="$emit('navigate', 'explorer')">Start comparing</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATE SECTION -->
    <div class="state-section-header fade-section">
      <div class="section-eyebrow">Incentive programs by state</div>
      <h2>Choose your state</h2>
      <p>Each state runs its own rural incentive program with different eligibility rules and payment structures.</p>
    </div>
    <section class="state-section">
      <div class="state-card qld-card">
        <div class="state-card-overlay"></div>
        <div class="state-card-content">
          <img src="../assets/flag-qld.png" alt="QLD" class="state-flag" />
          <h3>Queensland</h3>
          <p>Locality Allowance by posting centre tier under Directive 16/18. Applies to permanent and temporary government school employees across QLD.</p>
          <div class="state-stats">
            <div class="state-stat"><span>Full rate</span><strong>Up to $11,470/yr</strong></div>
            <div class="state-stat"><span>Coverage</span><strong>All QLD gov schools</strong></div>
          </div>
          <button class="btn-state" @click="$emit('navigate', 'explorer')">Explore QLD Schools</button>
        </div>
      </div>
      <div class="state-card nsw-card">
        <div class="state-card-overlay"></div>
        <div class="state-card-content">
          <img src="../assets/flag-nsw.png" alt="NSW" class="state-flag" />
          <h3>New South Wales</h3>
          <p>Rural Teacher Incentive by transfer point value (4, 6, 8 pts) plus Retention Benefit of $5,000/yr up to 10 payments. Permanent employees only.</p>
          <div class="state-stats">
            <div class="state-stat"><span>Maximum RTI</span><strong>$30,000/yr</strong></div>
            <div class="state-stat"><span>Retention</span><strong>$5k/yr up to 10 yrs</strong></div>
          </div>
          <button class="btn-state" @click="$emit('navigate', 'explorer')">Explore NSW Schools</button>
        </div>
      </div>
    </section>

    <!-- TRUST STRIP -->
    <section class="trust-strip fade-section">
      <div class="trust-inner">
        <div class="trust-item">
          <div class="trust-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <div class="trust-title">Government data only</div>
          <div class="trust-text">ACARA, ABS Census, QLD Directive 16/18, NSW RTI Review 2020</div>
        </div>
        <div class="trust-div"></div>
        <div class="trust-item">
          <div class="trust-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
          <div class="trust-title">1,080 schools</div>
          <div class="trust-text">Government, Catholic, and Independent across QLD and NSW</div>
        </div>
        <div class="trust-div"></div>
        <div class="trust-item">
          <div class="trust-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
          <div class="trust-title">Your decision</div>
          <div class="trust-text">We show differences, not recommendations. You decide.</div>
        </div>
        <div class="trust-div"></div>
        <div class="trust-item">
          <div class="trust-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
          <div class="trust-title">No sign-up required</div>
          <div class="trust-text">Free and open access. No account or registration needed.</div>
        </div>
      </div>
    </section>

    <!-- READY TO EXPLORE CTA -->
    <section class="final-cta">
      <div class="final-cta-overlay"></div>
      <div class="final-cta-inner">
        <h2>Ready to explore real placements?</h2>
        <p>Browse 1,080 schools across QLD and NSW. Filter by pay, remoteness, and lifestyle then decide.</p>
        <div class="final-cta-btns">
          <button class="btn-hero-p" @click="$emit('navigate', 'explorer')">Find Schools</button>
          <button class="btn-hero-s" @click="$emit('navigate', 'about')">Learn about the data</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits(['navigate', 'view-lifestyle'])

const scrollPct = ref(0)

function onScroll() {
  const el = document.documentElement
  const scrolled = el.scrollTop || document.body.scrollTop
  const total = el.scrollHeight - el.clientHeight
  scrollPct.value = total > 0 ? (scrolled / total) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target) } }),
    { threshold: 0.1 }
  )
  document.querySelectorAll('.fade-section').forEach(el => observer.observe(el))
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>

/* SCROLL PROGRESS */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #1F6FEB, #1E9E56);
  z-index: 9999;
  transition: width 0.1s linear;
  pointer-events: none;
}

/* FADE-IN ON SCROLL */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-section { opacity: 0; transform: translateY(28px); }
.fade-section.in-view { animation: fadeUp 0.55s ease forwards; }

/* ── HERO
   Using a CSS gradient + subtle pattern instead of an unreliable external image.
   Feels like a professional govt/edu tool — dark navy, clean, no broken images. ── */
.hero {
  position: relative;
  min-height: 92vh;
  background:
    linear-gradient(135deg, #0D1F3C 0%, #1A3557 40%, #0F2D4A 70%, #081828 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

/* Subtle topographic-style pattern overlay — evokes maps/geography, relevant to location-based tool */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(31,111,235,0.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(30,158,86,0.08) 0%, transparent 40%),
    radial-gradient(circle at 60% 80%, rgba(31,111,235,0.06) 0%, transparent 35%);
  pointer-events: none;
}

.hero-overlay { display: none; }

.hero-content {
  position: relative;
  z-index: 1;
  padding: 0 80px;
  max-width: 820px;
  margin-top: -40px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.hero-eyebrow {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 20px;
}

.hero-h1 {
  font-family: 'Playfair Display', serif;
  font-size: 4.4rem;
  font-weight: 900;
  line-height: 1.06;
  color: #fff;
  margin-bottom: 22px;
  letter-spacing: -0.02em;
}

.hero-h1 em { color: #60A5FA; font-style: italic; }

.hero-sub {
  font-size: 1.12rem;
  color: rgba(255,255,255,0.72);
  line-height: 1.72;
  margin-bottom: 34px;
  max-width: 540px;
}

.hero-acts { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

.btn-hero-p {
  padding: 16px 32px;
  background: #1F6FEB;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-hero-p:hover { background: #1558C4; transform: translateY(-2px); }

.btn-hero-s {
  padding: 16px 32px;
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: 1.5px solid rgba(255,255,255,0.25);
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-hero-s:hover { background: rgba(255,255,255,0.18); }

.hero-stats-bar {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 28px 80px;
  background: rgba(0,0,0,0.35);
  border-top: 1px solid rgba(255,255,255,0.08);
  margin-top: auto;
}

.hstat { flex: 1; text-align: center; }
.hstat-n { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; color: #fff; line-height: 1; margin-bottom: 5px; }
.hstat-l { font-size: 0.74rem; font-weight: 600; color: rgba(255,255,255,0.45); letter-spacing: 0.06em; text-transform: uppercase; }
.hstat-sep { width: 1px; height: 40px; background: rgba(255,255,255,0.12); }

/* WHY REGIONAL */
.why-section { background: var(--s); padding: 52px 24px; border-bottom: 1px solid var(--b); }
.why-inner { max-width: 1200px; margin: 0 auto; }
.why-inner h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; line-height: 1.12; margin-bottom: 8px; }
.why-inner > .section-header { margin-bottom: 28px; }
.why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 28px; }

.why-card { background: var(--bg); border: 1px solid var(--b); border-radius: 14px; padding: 22px 24px; display: flex; flex-direction: column; gap: 7px; transition: box-shadow 0.18s; }
.why-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); }

.why-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 2px; flex-shrink: 0; }
.why-financial .why-icon { background: #D1FAE5; color: #065F46; }
.why-cost .why-icon { background: #DBEAFE; color: #1E40AF; }
.why-career .why-icon { background: #FEF3C7; color: #92400E; }
.why-community .why-icon { background: #EDE9FE; color: #5B21B6; }

.why-label { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
.why-financial .why-label { color: #065F46; }
.why-cost .why-label { color: #1E40AF; }
.why-career .why-label { color: #92400E; }
.why-community .why-label { color: #5B21B6; }

.why-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 900; color: var(--ink); line-height: 1.2; margin-bottom: 2px; }
.why-body { font-size: 0.83rem; color: var(--ink2); line-height: 1.68; }
.why-caveat { font-size: 0.78rem; color: var(--ink3); line-height: 1.6; font-style: italic; border-top: 1px solid var(--b); padding-top: 8px; margin-top: 2px; }

/* TOP AREAS */
/* SNAPSHOT */
.snapshot { background: var(--bg); padding: 88px 24px; border-bottom: 1px solid var(--b); }
.snapshot-inner { padding: 0 24px; max-width: 1200px; margin: 0 auto; }
.section-header { margin-bottom: 40px; text-align: center;}
.section-header.centered { text-align: center; }
.section-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue); margin-bottom: 10px; display: inline-block; }
.section-header h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; line-height: 1.12; margin-bottom: 10px; }
.section-header p { font-size: 0.96rem; color: var(--ink2); }
.snapshot .section-header { text-align: center; }

.snap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px; width: 100%; }

.snap-card { background: var(--s); border: 1px solid var(--b); border-radius: 14px; padding: 24px; transition: box-shadow 0.18s; }
.snap-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); }

.snap-tier-label { font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--b); }
.snap-vr .snap-tier-label { color: #991B1B; }
.snap-r .snap-tier-label { color: #A05A00; }
.snap-or .snap-tier-label { color: #1558C4; }

.snap-row { display: flex; align-items: center; gap: 10px; padding: 12px 0; border-bottom: 1px solid var(--b); }
.snap-row:last-of-type { border-bottom: none; margin-bottom: 16px; }
.snap-flag { height: 18px; width: auto; border-radius: 2px; flex-shrink: 0; }
.snap-info { flex: 1; }
.snap-suburb { font-size: 0.88rem; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
.snap-desc { font-size: 0.78rem; color: var(--ink3); }
.snap-amount { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 900; flex-shrink: 0; text-align: right; }
.snap-amount span { font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 600; opacity: 0.7; }
.snap-amount.green { color: var(--green-d); }
.snap-amount.amber { color: var(--orange-d); }

.snap-btn { width: 100%; padding: 9px 0; background: transparent; color: var(--blue); border: 1.5px solid var(--blue); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 700; cursor: pointer; transition: background 0.14s; }
.snap-btn:hover { background: var(--blue-s); }

.snap-note { font-size: 0.72rem; color: var(--ink3); text-align: center; font-style: italic; }

/* SPLIT: What is HardStaff Connect */
.split-section { display: grid; grid-template-columns: 1fr 1fr; min-height: 480px; border-top: 1px solid var(--b); border-bottom: 1px solid var(--b); }
.split-photo {
  background-image: url('https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=900');
  background-size: cover;
  background-position: center;
  filter: grayscale(30%) brightness(0.88);
}
.split-text { padding: 56px 64px; background: var(--s); display: flex; flex-direction: column; justify-content: center; }
.split-text .section-eyebrow { margin-bottom: 10px; }
.split-text h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; line-height: 1.15; margin-bottom: 10px; }
.split-lead { font-size: 0.9rem; color: var(--ink2); margin-bottom: 20px; line-height: 1.7; }
.split-qs { margin-bottom: 28px; }
.split-q { display: flex; gap: 16px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid var(--b); }
.split-q:last-child { border-bottom: none; }
.split-q-num { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 900; color: var(--b); flex-shrink: 0; width: 32px; line-height: 1; }
.split-q-title { font-size: 0.92rem; font-weight: 700; margin-bottom: 5px; }
.split-q-text { font-size: 0.82rem; color: var(--ink2); line-height: 1.68; }

/* HOW STEPS */
.how-section { background: var(--bg); padding: 64px 24px; border-top: 1px solid var(--b); border-bottom: 1px solid var(--b); }
.how-inner { max-width: 1200px; margin: 0 auto; }
.how-inner .section-header { margin-bottom: 36px; }

.how-cards { display: flex; align-items: stretch; gap: 0; }
.how-connector { display: flex; align-items: center; justify-content: center; color: var(--b); flex-shrink: 0; padding: 0 4px; margin-top: -40px; }

.how-card { flex: 1; background: var(--s); border: 1px solid var(--b); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.18s; }
.how-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.08); }

.how-card-img { height: 160px; background-size: cover; background-position: center; }
.img-search {
  background-image: url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800');
  filter: grayscale(30%) brightness(0.88);
}
.img-rural {
  background-image: url('https://images.pexels.com/photos/1687093/pexels-photo-1687093.jpeg?auto=compress&cs=tinysrgb&w=800');
  filter: grayscale(25%) brightness(0.85);
}
.img-compare {
  background-image: url('https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800');
  filter: grayscale(30%) brightness(0.88);
}

.how-card-body { padding: 24px 28px; display: flex; flex-direction: column; flex: 1; }
.how-card-num { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 900; color: var(--b); line-height: 1; margin-bottom: 6px; }
.how-card-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 900; margin-bottom: 8px; }
.how-card-text { font-size: 0.84rem; color: var(--ink2); line-height: 1.68; margin-bottom: 20px; flex: 1; }
.btn-ghost { padding: 9px 20px; background: transparent; color: var(--blue); border: 1.5px solid var(--blue); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.14s; align-self: flex-start; }
.btn-ghost:hover { background: var(--blue-s); }

.state-section-header {
  padding: 40px 80px 20px;
  background: var(--bg);
  text-align: center;
  border-top: 1px solid var(--b);
}
.state-section-header .section-eyebrow { margin-bottom: 8px; }
.state-section-header h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; margin-bottom: 8px; }
.state-section-header p { font-size: 0.9rem; color: var(--ink2); margin-bottom: 20px; }

/* STATE SECTION */
.state-section { display: grid; grid-template-columns: 1fr 1fr; min-height: 320px; }
.state-card { position: relative; background-size: cover; background-position: center; display: flex; align-items: flex-end; overflow: hidden; }

/* QLD: warm dry Australian outback — Pexels */
.qld-card {
  background-image: url('https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=900');
  filter: grayscale(20%) brightness(0.80);
}

/* NSW: green rural Australian paddocks — Pexels */
.nsw-card {
  background-image: url('https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=900');
  filter: grayscale(25%) brightness(0.80);
}

.state-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,16,32,0.95) 0%, rgba(8,16,32,0.45) 50%, rgba(8,16,32,0.1) 100%); }
.state-card-content { position: relative; z-index: 1; padding: 30px 40px; color: #fff; }
.state-flag { height: 22px; width: auto; border-radius: 3px; margin-bottom: 10px; display: block; }
.state-card-content h3 { font-family: 'Playfair Display', serif; font-size: 1.55rem; font-weight: 900; margin-bottom: 8px; line-height: 1.2; }
.state-card-content p { font-size: 0.84rem; color: rgba(255,255,255,0.72); line-height: 1.65; margin-bottom: 12px; max-width: 360px; }
.state-stats { display: flex; gap: 24px; margin-bottom: 16px; }
.state-stat span { display: block; font-size: 0.63rem; color: rgba(255,255,255,0.48); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 2px; }
.state-stat strong { font-size: 0.87rem; color: #fff; font-weight: 700; }
.btn-state { padding: 9px 20px; background: rgba(255,255,255,0.14); color: #fff; border: 1.5px solid rgba(255,255,255,0.36); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.15s; }
.btn-state:hover { background: rgba(255,255,255,0.28); }

/* TRUST STRIP */
.trust-strip { background: var(--s); border-top: 1px solid var(--b); padding: 32px 0; }
.trust-inner { padding: 0 80px; display: flex; align-items: center; }
.trust-item { flex: 1; text-align: center; padding: 0 24px; }
.trust-icon { width: 42px; height: 42px; border-radius: 11px; background: var(--blue-s); color: var(--blue); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; }
.trust-title { font-size: 0.92rem; font-weight: 700; margin-bottom: 5px; }
.trust-text { font-size: 0.79rem; color: var(--ink2); line-height: 1.55; }
.trust-div { width: 1px; height: 52px; background: var(--b); flex-shrink: 0; }

/* FINAL CTA — dark navy gradient, no image dependency */
.final-cta {
  position: relative;
  padding: 100px 0;
  background: linear-gradient(135deg, #0D1F3C 0%, #1A3557 50%, #0F2D4A 100%);
  overflow: hidden;
}

.final-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 30% 50%, rgba(31,111,235,0.15) 0%, transparent 50%),
    radial-gradient(circle at 75% 30%, rgba(30,158,86,0.08) 0%, transparent 40%);
  pointer-events: none;
}

.final-cta-overlay { display: none; }

.final-cta-inner { position: relative; z-index: 1; text-align: center; padding: 0 80px; max-width: 680px; margin: 0 auto; }
.final-cta-inner h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; color: #fff; margin-bottom: 14px; line-height: 1.15; }
.final-cta-inner p { font-size: 1rem; color: rgba(255,255,255,0.62); line-height: 1.7; margin-bottom: 30px; }
.final-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* MOBILE */
@media (max-width: 900px) {
  .hero-content { padding: 60px 20px 0; width: 100%; box-sizing: border-box; margin-top: 0; }
  .hero-eyebrow { letter-spacing: 0.04em; font-size: 0.7rem; text-transform: none; }
  .hero-h1 { font-size: 2.8rem; }
  .hero-sub { font-size: 1rem; }
  .hero-stats-bar { padding: 22px 24px; flex-wrap: wrap; gap: 16px; }
  .hstat { min-width: 100px; }
  .hstat-sep { display: none; }
  .why-section { padding: 52px 24px; }
  .why-grid { grid-template-columns: 1fr; gap: 16px; }
  .snapshot { padding: 52px 0; }
  .snapshot-inner { padding: 0 24px; }
  .snap-grid { grid-template-columns: 1fr; gap: 14px; }
  .connect-section { padding: 48px 24px; }
  .connect-qs { grid-template-columns: 1fr; }
  .connect-q-div { width: auto; height: 1px; margin: 24px 0; }
  .connect-q-num { font-size: 1.6rem; }
  .how-section { padding: 48px 24px; }
  .how-cards { flex-direction: column; }
  .how-connector { transform: rotate(90deg); margin: 0; padding: 4px 0; }
  .how-card-img { height: 140px; }
  .state-section-header { padding: 24px 24px 0; }
  .state-section { grid-template-columns: 1fr; }
  .state-card { min-height: 220px; }
  .state-card-content { padding: 20px 24px; }
  .trust-strip { padding: 20px 0; }
  .trust-inner { flex-wrap: wrap; padding: 0 24px; }
  .trust-item { min-width: 160px; padding: 16px; }
  .trust-div { display: none; }
  .section-header h2 { font-size: 1.9rem; }
  .final-cta { padding: 64px 0; }
  .final-cta-inner { padding: 0 24px; }
  .final-cta-inner h2 { font-size: 1.9rem; }
}

@media (max-width: 540px) {
  .hero-h1 { font-size: 2.1rem; }
  .btn-hero-p, .btn-hero-s { width: 100%; display: block; text-align: center; }
  .areas-grid { grid-template-columns: 1fr; }
  .how-step-body { padding: 28px 20px; }
}
</style>