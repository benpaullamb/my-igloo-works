<template>
  <div @click="$emit('click')" class="option" :style="{ background: color }">
    <span class="text" :style="{ color: lightText ? 'white' : '#191919' }">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    lightText: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.option {
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.text {
  font-weight: bold;
}
</style>
