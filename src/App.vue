<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <div class="container__page">
        <div class="header">
          <h1 class="header__title">My WORKS</h1>
          <button @click="createTodo()" class="header__button">New</button>
        </div>
        <div v-for="(todoGroup, i) in todosGroupedByDate" :key="`todo-group-${i}`" class="todo-group">
          <span class="date">{{ todoGroup.date | formattedDate }}</span>
          <TODO
            v-for="(todo, j) in todoGroup.todos"
            :key="`todo-${i}-${j}`"
            class="todo"
            v-model="todoGroup.todos[j]"
            @deleted="deleteTodo(todo.date)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import Navbar from './components/Navbar.vue';
import TODO from './components/TODO.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    TODO,
  },
  data() {
    return {
      todos: [],
    };
  },
  computed: {
    todosGroupedByDate() {
      const grouped = [];
      this.todos.forEach((todo) => {
        const group = grouped.find((group) => {
          const todoDate = DateTime.fromISO(todo.date).toLocaleString(DateTime.DATE_SHORT);
          const groupDate = DateTime.fromISO(group.date).toLocaleString(DateTime.DATE_SHORT);
          return todoDate === groupDate;
        });
        if (group) {
          group.todos.push(todo);
        } else {
          grouped.push({
            date: todo.date,
            todos: [todo],
          });
        }
      });
      grouped.sort((a, b) => {
        const dateA = DateTime.fromISO(a.date);
        const dateB = DateTime.fromISO(b.date);
        if (dateA < dateB) {
          return 1;
        }
        if (dateA > dateB) {
          return -1;
        }
        return 0;
      });
      return grouped;
    },
  },
  filters: {
    formattedDate(iso) {
      return DateTime.fromISO(iso).toFormat('cccc, d LLLL');
    },
  },
  watch: {
    todos: {
      handler() {
        this.save();
      },
      deep: true,
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    createTodo() {
      this.todos.push({
        text: '',
        state: {
          text: 'TODO',
          code: 'todo',
          color: '#e0e0e0',
        },
        blocked: false,
        date: DateTime.now().toISO(),
      });
    },

    deleteTodo(date) {
      const index = this.todos.findIndex((todo) => todo.date === date);
      this.todos.splice(index, 1);
    },

    save() {
      window.localStorage.setItem('todos', JSON.stringify(this.todos));
    },

    load() {
      const todosJson = window.localStorage.getItem('todos');
      if (!todosJson) {
        return;
      }
      this.todos = JSON.parse(todosJson);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Open Sans', sans-serif;
}

.container {
  display: flex;
  justify-content: center;
}

.container__page {
  width: 70%;
  padding-top: 64px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__title {
  font-size: 48px;
  font-weight: bold;
  color: #191919;
}

.header__button {
  height: fit-content;
  padding: 8px 64px;
  cursor: pointer;
  background: #ff0099;
  border: none;
  border-radius: 64px;
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.todo-group {
  margin-top: 32px;
}

.date {
  margin-bottom: 16px;
  display: block;
  font-size: 16px;
}

.todo {
  margin-bottom: 16px;
}
</style>
