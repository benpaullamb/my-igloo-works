<template>
  <div class="todo">
    <div class="todo__main">
      <StatesDropdown v-model="value.state" />
      <input
        type="text"
        v-model="value.text"
        placeholder="WORKS-..."
        class="todo__input"
        :class="{ 'todo__input--blocked': !!value.blocked }"
      />
      <div class="todo__buttons">
        <button v-if="!isSubtask" @click="createSubtask" class="todo__button" title="Add subtask">
          <span class="material-icons todo__icon">add_task</span>
        </button>
        <button @click="value.blocked = !value.blocked" class="todo__button" title="Toggle blocked">
          <span class="material-icons todo__icon" :class="{ 'todo__icon--blocked': !!value.blocked }">flag</span>
        </button>
        <button class="todo__button" :title="jiraUrl ? 'Go to Jira' : 'Include a ticket code in the todo for a link'">
          <a
            :href="jiraUrl"
            target="_blank"
            :style="{ cursor: jiraUrl ? 'pointer' : 'default' }"
            class="material-icons todo__icon"
            >link</a
          >
        </button>
        <button @click="$emit('deleted')" class="todo__button" title="Delete">
          <span class="material-icons todo__icon">delete</span>
        </button>
      </div>
    </div>

    <div v-if="value.subtasks && value.subtasks.length > 0" class="todo__subtasks">
      <span class="material-icons todo__subtask-icon">subdirectory_arrow_right</span>
      <div>
        <Todo
          v-for="(subtask, i) in value.subtasks"
          :key="`subtask-${i}`"
          v-model="value.subtasks[i]"
          @deleted="deleteSubtask(subtask.date)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import StatesDropdown from './StatesDropdown.vue';

export default {
  name: 'Todo',
  components: {
    StatesDropdown,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    jiraUrl() {
      const matches = this.value.text.match(/works-(\d{3})/i);
      if (!matches) {
        return;
      }
      const ticketNumber = matches[1];
      return `https://iglooenergy.atlassian.net/browse/WORKS-${ticketNumber}`;
    },
    isSubtask() {
      return this.value.subtasks === undefined;
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
  methods: {
    createSubtask() {
      this.value.subtasks.push({
        text: '',
        state: 'todo',
        blocked: false,
        date: DateTime.now().toISO(),
      });
    },

    deleteSubtask(date) {
      const index = this.value.subtasks.findIndex((subtask) => subtask.date === date);
      this.value.subtasks.splice(index, 1);
    },
  },
};
</script>

<style>
.todo {
  margin-bottom: 16px;
}

.todo:last-child {
  margin-bottom: 0;
}

.todo__main {
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
  text-decoration: none;
  color: #191919;
}

.todo__icon--blocked {
  color: #ff0099;
}

.todo__subtasks {
  margin-top: 16px;
  display: grid;
  grid-template-columns: auto 1fr;
}

.todo__subtask-icon {
  padding: 0 16px;
}
</style>
