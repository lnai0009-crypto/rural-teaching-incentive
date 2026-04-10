<template>
  <Transition name="tray">
    <div v-if="cmpList.length" class="cmp-tray show">
      <span class="tray-lbl">Compare:</span>
      <div class="tray-items">
        <div v-for="id in cmpList" :key="id" class="tray-item">
          {{ shortName(id) }}
          <span class="tray-x" @click="$emit('remove', id)">×</span>
        </div>
        <div v-for="i in (4 - cmpList.length)" :key="'slot-'+i" class="tray-slot">+ add</div>
      </div>
      <button class="tray-go" @click="$emit('open-compare')">Compare →</button>
      <span class="tray-clear" @click="$emit('clear')">Clear</span>
    </div>
  </Transition>
</template>

<script setup>
import { useExplorer } from '../composables/useExplorer.js'

const { DB } = useExplorer()

const props = defineProps({ cmpList: Array })
defineEmits(['remove', 'clear', 'open-compare'])

function shortName(id) {
  const l = DB.find(x => x.id === id)
  return l ? l.name.split(' ').slice(0, 3).join(' ') : '—'
}
</script>
