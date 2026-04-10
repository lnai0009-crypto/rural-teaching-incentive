<template>
  <div class="srow" :class="{ open: isOpen }">
    <div class="srow-main" @click="$emit('toggle', school.id)">
      <div class="srow-left">
        <div class="srow-name">{{ school.name }}</div>
        <div class="srow-meta">
          <span>{{ school.suburb }}</span>
          <span class="chip" :class="school.state_id === '1' ? 'cq' : 'cn'">
            {{ school.state_id === '1' ? 'QLD' : 'NSW' }}
          </span>
          <span class="chip" :class="RC[school.remoteness_id] || 'c3'">{{ school.remoteness }}</span>
          <span style="color:var(--ink3)">{{ school.type }}</span>
        </div>
      </div>
      <div class="srow-metric">
        <template v-if="sort === 'inc'">
          <div v-if="school.annual_incentive > 0" class="mv mv-inc">
            ${{ Math.round(school.annual_incentive).toLocaleString() }}<span style="font-size:0.6rem;font-weight:400">/yr</span>
          </div>
          <div v-else class="mv mv-none">No incentive</div>
          <div class="msub">incentive</div>
        </template>
        <template v-else-if="sort === 'hc'">
          <div class="mv">{{ school.healthcare_count }}</div>
          <div class="msub">health svcs</div>
        </template>
        <template v-else-if="sort === 'dist'">
          <div class="mv">{{ Math.round(school.distance_to_city) }}km</div>
          <div class="msub">from {{ school.nearest_city || 'city' }}</div>
        </template>
      </div>
      <div class="srow-acts" @click.stop>
        <button
          class="btn-cmp"
          :class="{ added: inCmp }"
          @click="$emit('toggle-cmp', school.id)"
        >{{ inCmp ? '✓' : '+' }} Compare</button>
        <button class="btn-exp" @click="$emit('toggle', school.id)">
          {{ isOpen ? 'Close ↑' : 'Details ↓' }}
        </button>
      </div>
    </div>

    <Transition name="detail">
      <div v-if="isOpen" class="srow-detail">
        <div class="inc-box">
          <div class="inc-box-title">💰 Incentive Package</div>
          <template v-if="school.annual_incentive > 0">
            <div class="inc-big">${{ Math.round(school.annual_incentive).toLocaleString() }}</div>
            <div class="inc-sublbl">{{ school.inc_label }} · per year</div>
            <div class="inc-rows">
              <div class="inc-r">
                <span class="inc-rk">Eligibility</span>
                <span class="inc-rv" :class="empType === 'perm' ? 'good' : 'warn'">
                  {{ empType === 'perm' ? 'Permanent — fully eligible' : 'Temporary — check eligibility' }}
                </span>
              </div>
              <div class="inc-r">
                <span class="inc-rk">System</span>
                <span class="inc-rv">{{ school.state_id === '1' ? 'QLD Directive 16/18' : 'NSW RTI Review 2020' }}</span>
              </div>
              <div class="inc-r">
                <span class="inc-rk">Remoteness</span>
                <span class="inc-rv">{{ school.remoteness }}</span>
              </div>
            </div>
            <div class="inc-src">Verify directly with {{ school.state_id === '1' ? 'Teach.QLD' : 'Teach.NSW' }} before deciding.</div>
          </template>
          <div v-else class="no-inc">No incentive data linked to this school.</div>
          <div class="life-lnk" @click="$emit('view-lifestyle', school.id)">
            🌿 View lifestyle for {{ school.suburb }} →
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { RC } from '../data/db.js'

defineProps({
  school: Object,
  isOpen: Boolean,
  inCmp: Boolean,
  sort: String,
  empType: String,
})
defineEmits(['toggle', 'toggle-cmp', 'view-lifestyle'])
</script>
