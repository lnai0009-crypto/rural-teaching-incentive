<template>
  <div class="page active">
    <!-- Hero -->
    <div class="hero">
      <div class="wrap hero-in">
        <div>
          <div class="hero-ey">Decision support for Australian teachers</div>
          <h1 class="hero-h1">Find where you <em>belong</em> —<br>not just a job.</h1>
          <p class="hero-sub">Search schools by incentive package, then explore what life actually looks like there. QLD and NSW, real government data.</p>
          <div class="hero-acts">
            <button class="btn btn-p btn-lg" @click="$emit('navigate', 'explorer')">Find Schools →</button>
            <button class="btn btn-s btn-lg" @click="$emit('navigate', 'insights')">Explore Lifestyle</button>
          </div>
        </div>
        <div class="hcard">
          <div class="hcard-head">
            <span class="hcard-title">Top incentive schools</span>
            <span class="hcard-badge">Live data</span>
          </div>
          <div class="hcard-body">
            <div
              v-for="(l, i) in heroTop"
              :key="l.id"
              class="hcard-row"
              @click="$emit('view-lifestyle', l.id)"
            >
              <span class="hre">{{ l.state_id === '1' ? '☀️' : '🌉' }}</span>
              <div class="hri">
                <div class="hrn">{{ l.name }}</div>
                <div class="hrs">{{ l.suburb }} · {{ l.state_id === '1' ? 'QLD' : 'NSW' }} · {{ l.remoteness }}</div>
              </div>
              <div class="hrr">
                <div class="hrsc" :style="{ color: cols[i] }">${{ Math.round(l.annual_incentive / 1000) }}k</div>
                <div class="hrbar">
                  <div class="hrbar-f" :style="{ width: Math.min(100, Math.round(l.annual_incentive / 300)) + '%', background: cols[i] }"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="hcard-note">
            <div class="hcard-note-lbl">✦ Two tabs, one decision</div>
            <div class="hcard-note-txt">Explorer shows the money. Lifestyle Insights shows what life there looks like. The two are linked.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- How strip -->
    <div class="how-strip">
      <div class="wrap how-in">
        <div class="how-item">
          <span class="how-icon">💰</span>
          <div class="how-num">01</div>
          <div class="how-title">Find by incentive</div>
          <p class="how-text">Search directly or answer 3 guided questions. Schools sorted by what matters to you.</p>
        </div>
        <div class="how-item">
          <span class="how-icon">🌿</span>
          <div class="how-num">02</div>
          <div class="how-title">View the lifestyle</div>
          <p class="how-text">Jump from any school to Lifestyle Insights — healthcare, nature, distance, community. Real ABS data.</p>
        </div>
        <div class="how-item">
          <span class="how-icon">⚖️</span>
          <div class="how-num">03</div>
          <div class="how-title">Compare side by side</div>
          <p class="how-text">Add up to 4 schools. Compare incentives in Explorer, lifestyle in Insights. Same tray, two views.</p>
        </div>
      </div>
    </div>

    <!-- Mid section -->
    <div class="home-mid">
      <div class="wrap home-mid-in">
        <div>
          <h2>Two tabs, one decision.</h2>
          <p>The <strong>Explorer</strong> tab is about money — find schools with the best incentive package for your situation.</p>
          <p>The <strong>Lifestyle Insights</strong> tab is about life — once you've found schools, see what those areas are actually like to live in, side by side.</p>
          <button class="btn btn-p" @click="$emit('navigate', 'explorer')" style="margin-top:8px">Start in Explorer →</button>
        </div>
        <div>
          <div class="fc"><span class="fi">📚</span><div><div class="ft">ACARA + ABS + State incentives</div><div class="fd">5,050 schools from My School 2025. ABS Census SA2 metrics. QLD Directive 16/18 and NSW RTI Review 2020.</div></div></div>
          <div class="fc"><span class="fi">🔗</span><div><div class="ft">Explorer and Insights are linked</div><div class="fd">Any school in Explorer has a "View Lifestyle →" button. Your compare tray carries across both tabs.</div></div></div>
          <div class="fc"><span class="fi">⚖️</span><div><div class="ft">Differences, not recommendations</div><div class="fd">We show higher vs lower, more vs less. You decide based on your own priorities and life situation.</div></div></div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="home-cta">
      <div>
        <h3>Ready to explore real placements?</h3>
        <p>No sign-up · 5,050 real schools · ACARA 2025</p>
      </div>
      <button class="btn btn-s btn-lg" @click="$emit('navigate', 'explorer')">Start Exploring →</button>
    </div>
  </div>
</template>

<script setup>
import { useExplorer } from '../composables/useExplorer.js'

defineEmits(['navigate', 'view-lifestyle'])

const { heroTop } = useExplorer()
const cols = ['var(--green-d)', 'var(--blue)', 'var(--orange-d)', 'var(--purple)']
</script>
