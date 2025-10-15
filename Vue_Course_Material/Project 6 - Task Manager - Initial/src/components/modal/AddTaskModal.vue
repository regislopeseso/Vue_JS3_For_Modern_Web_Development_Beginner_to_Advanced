<script setup>
  import { reactive } from 'vue'
  
  import { useTasksStore } from '@/stores/tasksStore.js';
  
  const store = useTasksStore();

  let newTask = reactive({completed: false});
</script>

<template>
  <div class="form">             
        <h3>Add a new task</h3>
        <label for="title">Title *</label>

        <input 
          type="text" 
          name="title" 
          placeholder="Enter a title..." 
          v-model="newTask.name"
        >

        <br />

        <label for="description">Description*</label>
        <textarea 
          name="description" 
          rows="4" 
          placeholder="Enter a description..."
          v-model="newTask.description"
        />

        <br />

        <button 
          class="btn gray"
          @click="store.addTask(newTask)"
        >
          Add Task
        </button>
  </div>
</template>