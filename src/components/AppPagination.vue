<template>
  <div v-if="totalPages > 1">
    <div class="pg-info">Showing {{ start }}–{{ end }} of {{ total }} schools</div>
    <div class="pagination">
      <button class="pg-btn" :disabled="page === 1" @click="$emit('change', page - 1)">←</button>
      <template v-for="i in totalPages" :key="i">
        <button
          v-if="showPage(i)"
          class="pg-btn"
          :class="{ active: i === page }"
          @click="$emit('change', i)"
        >{{ i }}</button>
        <span v-else-if="Math.abs(i - page) === 2" class="pg-ellipsis">…</span>
      </template>
      <button class="pg-btn" :disabled="page === totalPages" @click="$emit('change', page + 1)">→</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { PAGE_SIZE } from '../data/db.js'

const props = defineProps({ total: Number, page: Number })
defineEmits(['change'])

const totalPages = computed(() => Math.ceil(props.total / PAGE_SIZE))
const start = computed(() => (props.page - 1) * PAGE_SIZE + 1)
const end = computed(() => Math.min(props.page * PAGE_SIZE, props.total))

function showPage(i) {
  return i === 1 || i === totalPages.value || Math.abs(i - props.page) <= 1
}
</script>
