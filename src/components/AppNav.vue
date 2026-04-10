<template>
  <nav>
    <div class="nav-brand" @click="$emit('navigate', 'home')">
      <span class="nav-gem">HC</span>HardStaff Connect
    </div>
    <div class="nav-links">
      <a
        v-for="link in links"
        :key="link.id"
        class="nl"
        :class="{ active: currentPage === link.id }"
        @click="$emit('navigate', link.id)"
      >{{ link.label }}</a>
    </div>
    <div class="nav-right">
      <button class="nav-cta" @click="$emit('navigate', 'explorer')">Find Schools →</button>
    </div>
    <button class="nav-hamburger" @click="mobileOpen = !mobileOpen" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-nav-drawer" :class="{ open: mobileOpen }">
    <div
      v-for="link in links"
      :key="link.id"
      class="mobile-nl"
      :class="{ active: currentPage === link.id }"
      @click="navigate(link.id)"
    >{{ link.label }}</div>
    <button class="mobile-nav-cta" @click="navigate('explorer')">Find Schools →</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ currentPage: String })
const emit = defineEmits(['navigate'])

const mobileOpen = ref(false)
const links = [
  { id: 'home', label: 'Home' },
  { id: 'explorer', label: 'Explorer' },
  { id: 'insights', label: 'Lifestyle Insights' },
  { id: 'about', label: 'About' },
]

function navigate(id) {
  mobileOpen.value = false
  emit('navigate', id)
}
</script>
