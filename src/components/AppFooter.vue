<template>
  <footer>
    <div class="wrap foot-in">
      <div>
        <div class="foot-brand">HardStaff<span class="foot-dot">.</span>Connect</div>
        <div class="foot-tag">Decision-support for Australian teachers. We show differences, not recommendations.</div>
      </div>
      <div>
        <div class="foot-ct">Navigate</div>
        <div class="foot-links">
          <a @click="$emit('navigate', 'home')">Home</a>
          <a @click="$emit('navigate', 'explorer')">Explorer</a>
          <a @click="$emit('navigate', 'insights')">Lifestyle Insights</a>
          <a @click="$emit('navigate', 'about')">About</a>
        </div>
      </div>
      <div>
        <div class="foot-ct">Data Sources</div>
        <div class="foot-links">
          <a>ACARA My School 2025</a>
          <a>ABS Census 2021 SA2</a>
          <a>QLD Directive 16/18</a>
          <a>NSW RTI Review 2020</a>
        </div>
      </div>
    </div>
    <div class="wrap foot-bottom">
      <span>© 2025 HardStaff Connect · University Prototype</span>
      <span>Data indicative only · Not financial advice</span>
    </div>
  </footer>
</template>

<script setup>
defineEmits(['navigate'])
</script>
