<template>
  <div class="dropdown">
    <StatesOption @click="open = !open" :color="value.color" :text="value.text" :lightText="value.lightText" />
    <div v-if="open" class="dropdown__options">
      <StatesOption
        v-for="state in options"
        :key="state.text"
        @click="select(state)"
        :color="state.color"
        :text="state.text"
        :lightText="state.lightText"
      />
    </div>
  </div>
</template>

<script>
import StatesOption from './StatesOption.vue';

export default {
  components: {
    StatesOption,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      states: [
        {
          text: 'TODO',
          code: 'todo',
          color: '#e0e0e0',
        },
        {
          text: 'In Dev',
          code: 'in_dev',
          color: '#aeaeae',
        },
        {
          text: 'Design Rev',
          code: 'design_rev',
          color: '#7cb342',
        },
        {
          text: 'PR',
          code: 'pr',
          color: '#039be5',
        },
        {
          text: 'Stake Rev',
          code: 'stake_rev',
          color: '#8e24aa',
          lightText: true,
        },
        {
          text: 'Done',
          code: 'done',
          color: '#fdd835',
        },
      ],
    };
  },
  computed: {
    options() {
      return this.states.filter((state) => state.code !== this.value.code);
    },
  },
  methods: {
    select(state) {
      this.open = false;
      this.$emit('input', state);
    },
  },
};
</script>

<style>
.dropdown {
  height: 100%;
}

.dropdown__options {
  width: 100px;
  position: absolute;
  z-index: 10;
}
</style>
