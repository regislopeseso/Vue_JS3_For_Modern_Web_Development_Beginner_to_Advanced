<template>
  <div>
    <template v-if="question">
      <h3>Question {{ countQuestions }} of {{ questions.length }}</h3>

      <ScoreBoard :winCount="winCount" :loseCount="loseCount" />

      <h1 v-html="question"></h1>
      
      <template v-for="(answer, index) in answers" :key="index">
        <input 
          :disabled="answerSubmitted"
          type="radio" 
          name="options" 
          :value="answer"
          v-model="chosenAnswer">
        <label v-html="answer"></label><br>
      </template>    
  
      <button 
        class="send" 
        type="button"
        @click="submitAnswer()"
        v-if="!answerSubmitted"
      >
          Send
      </button>   

      <section 
        class="result" 
        v-if="answerSubmitted"
      >
        <h4 
          v-if="chosenAnswer == correctAnswer"
          v-html="'&#9989;' +  correctAnswer + 'is correct!' "
        >
          
        </h4>

        <h4 
          v-else
          v-html="'&#10060; I am sorry, you picked the wrong answer.'"  
        >
          
        </h4>

        <button 
          class="send" 
          type="button"
          @click="getNewQuestion()"

        >
          Next Question
        </button>
      </section>
    </template>
  </div>
</template>

<script>
  import ScoreBoard from "./components/ScoreBoard.vue"

  export default {
    name: 'App',
    components: {
      ScoreBoard
    },
    data() {
      return {
        questions: null,
        countQuestions: null,
        question: null,
        correctAnswer: null,
        incorrectAnswers: null,
        chosenAnswer: null,
        answerSubmitted: false,
        winCount: 0,
        loseCount: 0,
      }
    },
    computed: {
      answers() {
        var answers = [...this.incorrectAnswers];

        answers.splice(Math.round(Math.random() * answers.length), 0, this.correctAnswer);

        return answers;
      }
    },
    methods: {
      submitAnswer() {
        if(!this.chosenAnswer) {
          alert("Pick one of the options!")
          return;
        }

        this.answerSubmitted = true;

        if(this.chosenAnswer == this.correctAnswer)
        {
          this.winCount++;
          return;
        } 

        this.loseCount++;    
      },

      getQuestions() {
         this.axios
        .get('https://opentdb.com/api.php?amount=10&category=30&type=multiple')
        .then((resp) => {
          this.countQuestions = 1;

          this.answerSubmitted = false;
          this.chosenAnswer = null;
          this.question = null;

          this.winCount = 0;
          this.loseCount = 0;

          this.questions = resp.data.results;         
          this.question = this.questions[0].question;
          this.correctAnswer = this.questions[0].correct_answer;
          this.incorrectAnswers = this.questions[0].incorrect_answers;
        })
      },

      getNewQuestion() {              
        
        if(this.countQuestions >= this.questions.length)
        {
          alert("Retrieving new 10 questions")          
          this.getQuestions()
          return;
        }

        this.answerSubmitted = false;
        this.chosenAnswer = null;
        this.question = null;

        this.question = this.questions[this.countQuestions].question;
        this.correctAnswer = this.questions[this.countQuestions].correct_answer;
        this.incorrectAnswers = this.questions[this.countQuestions].incorrect_answers;

        this.countQuestions++;
      },

    },
    created() { 
      this.getQuestions()
    }

  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type=radio] {
    margin: 12px 4px
  }

  button.send {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    cursor: pointer;
  }
}


</style>

