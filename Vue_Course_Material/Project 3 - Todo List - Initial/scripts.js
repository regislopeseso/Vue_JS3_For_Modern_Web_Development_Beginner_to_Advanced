toDos = [
  {
    "text": "Learn HTML, CSS and Javascript",
    "done": false,
  },
  {
    "text": "Learn the basics of Vue JS",
    "done": false,
  },
  {
    "text": "Complete Vue JS Challenge with excellence",
    "done": false,
  }
];

const toDosApp = {
  data() {
    return {
      toDos: window.toDos,
      newToDo: {
        text: null,
        done: false
      }
    }
  },
  methods: {
    clearAll : function() {
      this.toDos = []  
      
    },

    addtext : function() {
      if(!this.newToDo.text || this.newToDo.text.trim() === ""){
        alert("Describe what you have to do then add it to the list.  ")
      } else {
        this.toDos.push(this.newToDo)
        localStorage.setItem("toDos", JSON.stringify(this.toDos))
      }

    }
  },
  beforeCreate() {
    this.toDos = localStorage.getItem(toDos);
  }
}

Vue.createApp(toDosApp).mount('#app');