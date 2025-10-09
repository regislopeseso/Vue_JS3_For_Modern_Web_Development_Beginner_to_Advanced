toDos = [
  {
    "task": "Learn HTML, CSS and Javascript",
    "finished": false,
  },
  {
    "task": "Learn the basics of Vue JS",
    "finished": false,
  },
  {
    "task": "Complete Vue JS Challenge with excellence",
    "finished": false,
  }
];

const toDosApp = {
  data() {
    return {
      toDos: window.toDos,
      newToDo: {
        task: null,
        finished: false
      }
    }
  },
  methods: {
    clearAll : function() {
      this.toDos = []  
      
    },

    addTask : function() {
      if(!this.newToDo.task){
        alert("Describe what you have to do then add it to the list.  ")
      } else {
        this.toDos.push(this.newToDo)
        this.newToDo = {}
      }

    }
  }
}

Vue.createApp(toDosApp).mount('#app');