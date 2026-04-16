<template>
  <footer>
    <div class="foot-main">
      <div class="foot-in">
        <div class="foot-col foot-col-brand">
          <div class="foot-brand-row">
            <svg class="foot-pin" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 1C8.268 1 2 7.268 2 15C2 26 16 41 16 41C16 41 30 26 30 15C30 7.268 23.732 1 16 1Z" fill="#1F6FEB"/>
              <circle cx="16" cy="15" r="7.5" fill="white"/>
              <text x="16" y="19.5" text-anchor="middle" font-family="Georgia,serif" font-size="10" font-weight="900" fill="#1F6FEB">H</text>
              <rect x="10" y="6" width="12" height="2.5" rx="1.25" fill="#F59E0B"/>
              <rect x="8" y="3.5" width="16" height="2" rx="1" fill="#F59E0B" opacity="0.45"/>
            </svg>
            <span class="foot-brand-name">HardStaff<span class="foot-dot">.</span>Connect</span>
          </div>
          <div class="foot-tag">Decision support for Australian teachers searching for rural placements. We show differences, not recommendations.</div>
          <div class="foot-states-row">
            <img src="../assets/flag-qld.png" alt="Queensland" class="foot-flag" />
            <span class="foot-state-label">Queensland</span>
            <span class="foot-state-sep">·</span>
            <img src="../assets/flag-nsw.png" alt="New South Wales" class="foot-flag" />
            <span class="foot-state-label">New South Wales</span>
          </div>
        </div>
        <div class="foot-col">
          <div class="foot-ct">Navigate</div>
          <div class="foot-links">
            <a @click="$emit('navigate', 'home')">Home</a>
            <a @click="$emit('navigate', 'explorer')">Explorer</a>
            <a @click="$emit('navigate', 'insights')">Lifestyle Insights</a>
            <a @click="$emit('navigate', 'about')">About</a>
          </div>
        </div>
        <div class="foot-col">
          <div class="foot-ct">Data Sources</div>
          <div class="foot-links">
            <a href="https://www.myschool.edu.au" target="_blank" rel="noopener">ACARA My School 2025</a>
            <a href="https://www.abs.gov.au/census" target="_blank" rel="noopener">ABS Census 2021 SA2</a>
            <a href="https://www.forgov.qld.gov.au" target="_blank" rel="noopener">QLD Government Directive 16/18</a>
            <a href="https://education.nsw.gov.au" target="_blank" rel="noopener">NSW RTI Review 2020</a>
          </div>
        </div>
        <div class="foot-col">
          <div class="foot-ct">About</div>
          <div class="foot-links">
            <a @click="$emit('navigate', 'about')">About this platform</a>
            <a @click="$emit('navigate', 'about')">Data methodology</a>
            <a @click="$emit('navigate', 'about')">Data disclaimer</a>
          </div>
        </div>
      </div>
    </div>
    <div class="foot-bottom">
      <div class="foot-bottom-in">
        <span>© 2025 HardStaff Connect. All rights reserved.</span>
        <span class="foot-bottom-right">
          <span>Data indicative only</span>
          <span class="foot-sep">·</span>
          <span>Not financial advice</span>
          <span class="foot-sep">·</span>
          <span>Always verify with your state education department</span>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineEmits(['navigate'])
</script>

<style scoped>
footer { background: var(--ink); color: rgba(255,255,255,0.55); }
.foot-main { border-bottom: 1px solid rgba(255,255,255,0.08); }
.foot-in { padding: 56px 80px 48px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
.foot-brand-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.foot-pin { width: 26px; height: 34px; flex-shrink: 0; }
.foot-brand-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 900; color: #fff; }
.foot-dot { color: #1F6FEB; }
.foot-tag { font-size: 0.82rem; line-height: 1.65; margin-bottom: 16px; max-width: 280px; }
.foot-states-row { display: flex; align-items: center; gap: 7px; }
.foot-flag { height: 16px; width: auto; border-radius: 2px; opacity: 0.75; }
.foot-state-label { font-size: 0.72rem; color: rgba(255,255,255,0.4); font-weight: 500; }
.foot-state-sep { color: rgba(255,255,255,0.2); font-size: 0.72rem; }
.foot-ct { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 14px; }
.foot-links { display: flex; flex-direction: column; gap: 9px; }
.foot-links a { font-size: 0.82rem; color: rgba(255,255,255,0.55); cursor: pointer; transition: color 0.12s; text-decoration: none; }
.foot-links a:hover { color: #fff; }
.foot-bottom { padding: 16px 0; }
.foot-bottom-in { padding: 0 80px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 0.72rem; color: rgba(255,255,255,0.28); }
.foot-bottom-right { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
.foot-sep { color: rgba(255,255,255,0.18); }

@media (max-width: 900px) {
  .foot-in { grid-template-columns: 1fr 1fr; padding: 40px 24px 32px; gap: 32px; }
  .foot-col-brand { grid-column: 1 / -1; }
  .foot-bottom-in { padding: 0 24px; flex-direction: column; align-items: flex-start; gap: 4px; }
}
@media (max-width: 540px) {
  .foot-in { grid-template-columns: 1fr; }
}
</style>