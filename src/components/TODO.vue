<template>
  <div class="todo">
    <StatesDropdown v-model="value.state" />
    <input
      type="text"
      v-model="value.text"
      placeholder="WORKS-..."
      class="todo__input"
      :class="{ 'todo__input--blocked': !!value.blocked }"
    />
    <div class="todo__buttons">
      <button @click="value.blocked = !value.blocked" class="todo__button" title="Toggle blocked">
        <span class="material-icons todo__icon" :class="{ 'todo__icon--blocked': !!value.blocked }">flag</span>
      </button>
      <button class="todo__button" title="Go to Jira">
        <span class="material-icons todo__icon">link</span>
      </button>
      <button @click="$emit('deleted')" class="todo__button" title="Delete">
        <span class="material-icons todo__icon">delete</span>
      </button>
    </div>
  </div>
</template>

<script>
import StatesDropdown from './StatesDropdown.vue';

export default {
  components: {
    StatesDropdown,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
};
</script>

<style>
.todo {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  align-items: center;
}

.todo__input {
  padding-bottom: 4px;
  margin-left: 16px;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid #191919;
  outline: none;
}

.todo__input--blocked {
  text-decoration: line-through;
  color: #ff0099;
}

.todo__button {
  margin-left: 16px;
  cursor: pointer;
  background: none;
  border: none;
}

.todo__icon {
  font-size: 24px;
}

.todo__icon--blocked {
  color: #ff0099;
}
</style>
