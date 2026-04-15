<template>
  <nav>
    <div class="nav-brand" @click="$emit('navigate', 'home')">
      <svg class="nav-pin" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 1C8.268 1 2 7.268 2 15C2 26 16 41 16 41C16 41 30 26 30 15C30 7.268 23.732 1 16 1Z" fill="#1F6FEB"/>
        <circle cx="16" cy="15" r="7.5" fill="white"/>
        <text x="16" y="19.5" text-anchor="middle" font-family="Georgia,serif" font-size="10" font-weight="900" fill="#1F6FEB">H</text>
        <rect x="10" y="6" width="12" height="2.5" rx="1.25" fill="#F59E0B"/>
        <rect x="8" y="3.5" width="16" height="2" rx="1" fill="#F59E0B" opacity="0.45"/>
      </svg>
      <span class="nav-brand-text">HardStaff<span class="nav-dot">.</span>Connect</span>
    </div>
    <div class="nav-links">
      <a v-for="link in links" :key="link.id" class="nl" :class="{ active: currentPage === link.id }" @click="$emit('navigate', link.id)">{{ link.label }}</a>
    </div>
    <button class="nav-hamburger" @click="mobileOpen = !mobileOpen" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-nav-drawer" :class="{ open: mobileOpen }">
    <div v-for="link in links" :key="link.id" class="mobile-nl" :class="{ active: currentPage === link.id }" @click="navigate(link.id)">{{ link.label }}</div>
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
function navigate(id) { mobileOpen.value = false; emit('navigate', id) }
</script>

<style scoped>
.nav-brand { display: flex; align-items: center; gap: 10px; cursor: pointer; margin-right: 28px; flex-shrink: 0; }
.nav-pin { width: 30px; height: 38px; flex-shrink: 0; }
.nav-brand-text { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 900; color: var(--ink); letter-spacing: -0.01em; white-space: nowrap; }
.nav-dot { color: #1F6FEB; }
</style>