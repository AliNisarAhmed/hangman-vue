<template>
  <div class="App">
    <h1 id="title">Hangman Game</h1>
    <div class="msg">
      <p>{{this.message}}</p>
    </div>
    <WordDisplay :word="word"></WordDisplay>
    <WrongLetters :wrongLetters="wrongLetters"></WrongLetters>
    <div class="guessesLeft" v-if="this.status === 'play'">
      <p>Guesses Left: {{this.guessesLeft}}</p>
    </div>
    <form v-on:submit.prevent="onGuessSubmit">
      <input ref="inputForm" v-focus type="text" v-model="guess" :disabled="this.status !== 'play'" maxlength="1" pattern="[a-zA-Z]" required >
    </form>
    <button @click="resetGame" :class="{ btn: true, callToAction: this.status !== 'play', }">New Word?</button>
  </div>
</template>

<script>
import WordDisplay from './components/WordDisplay';
import WrongLetters from './components/WrongLetters';
import FormComponent from './components/FormComponent';

import words from './words.js';
import generateRandomWord from './helperFunctions/generateRandomWord.js';
import mapToLetterObj from './helperFunctions/mapToLetterObject.js';

export default {
  name: 'app',
  components: {
    WordDisplay,
    WrongLetters,
  },
  created () {
    let word = generateRandomWord(words);
    let letterObjectArr = mapToLetterObj(word);
    this.word = letterObjectArr;
  },
  updated () {
    this.$refs.inputForm.focus();
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus();
      }
    }
  },
  data () {
    return {
      message: 'Take a guess',
      guessesLeft: 5,
      word: [],
      wrongLetters: [],
      guess: '',
      status: 'play', // "win" "lose" "play"
    };
  },
  methods: {
    onGuessSubmit () {  
      let guess = this.guess;
      this.checkGuess(guess);
      this.guess = '';
    },
    checkGuess (guess) {
      let wordArr = this.word.map(letterObj => letterObj.letter);
      if (wordArr.includes(guess)) {  // correct guess
        this.displayWord(guess);
      } else if (this.wrongLetters.includes(guess)) {
        this.message = "You have already used this word";
        setTimeout(() => {
          this.message = "Try a word which you have'nt already used";
        }, 2000);
      } else {
        this.wrongLetters.push(guess);
        this.guessesLeft--;
        this.checkForLoss();
      }
    },
    displayWord (guess) {
      this.word = this.word.map(letterObj => {
        if (letterObj.letter === guess) {
          return {
            letter: letterObj.letter,
            isShowing: true,
          };
        } else {
          return letterObj;
        }
      });
      this.checkForWin();
    },
    checkForWin () {
      let bools = this.word.map(letterObj => letterObj.isShowing);
      if (bools.every(bool => bool)) {
        this.message = `You won with ${this.guessesLeft} turns remaining!!!`;
        this.status = "win";
      }
    },
    checkForLoss () {
      if (this.guessesLeft === 0) {
        this.status = "lose";
        this.message = 'You lost (lol)';
        setTimeout(() => {
          this.message = "The correct word was...";
          this.word = this.word.map(letterObj => ({
            letter: letterObj.letter,
            isShowing: true,
          }));
        }, 2000)
      }
    },
    resetGame () {
      this.message = "Take a guess";
      let word = generateRandomWord(words);
      this.word = mapToLetterObj(word);
      this.guessesLeft = 5;
      this.wrongLetters = [];
      this.guess = '';
      this.status = 'play';
      console.log(this.$refs);
      this.$refs.inputForm.focus();
    }
    // handleKeyDown (event) {
    //   let value = event.target.value;
    //   console.log(value);
    //   if (/^[a-z]{0,1}$/.test(value)) {
    //     this.guess = value;
    //   } else {
    //     event.preventDefault();
    //     console.log('ignored')
    //   }
    // }
  },
  // watch: {
  //   guess (value) {
  //     if (!value) {
  //       return '';
  //     }
  //     if (/^[a-z]{0,1}$/.test(value) && value.length <= 1) {
  //       this.$set(this, value);
  //     }
  //   }
  // }
  // computed: {
  //   guess: {
  //     get: function () {
  //       return '';
  //     },
  //     set: function (newValue) {
  //       console.log(newValue);
  //       if (/^[a-z]{0,1}$/.test(newValue) && newValue.length <= 1) {
  //         return newValue;
  //       } else {
  //         console.log('hello')
  //       }
  //     }
  //   }
  // }
};
</script>






<style lang="scss">
$color-gold: rgb(255, 222, 38);
$color-black: #282c34;
$color-red: rgb(235, 26, 26);

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}

.App {
  background-color: $color-black;
  max-width: 100vw;
  margin: 0 auto;
  padding-bottom: 40px;
  box-sizing: border-box;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  input {
    background-color: $color-black;
    border: none;
    outline: none;
    color: $color-gold;
    font-size: 50px;
    width: 40px;
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid $color-gold;
  }
}

#title {
  text-align: center;
  margin-bottom: auto;
}

.wordDisplay {
  color: $color-gold;
  font-size: 40px;
  margin-top: 40px;
  text-align: center;
  transition: all .2s;

  .letter {
    display: inline-block;
    width: 35px;
    border-bottom: 1px solid $color-gold;
    margin: 5px;
    padding-bottom: 10px;
  }
}

.wrongLetters {
  color: $color-red;
  font-size: 20px;
  margin-top: 25px;

  &__container {
    height: 30px;
    text-align: center;
  }

  &__text {
    font-size: 24px;
  }
}

button {
  background-color: $color-black;
  border: none;
  outline: none;
  cursor: pointer;
}

.btn {
  color: white;
  font-size: 15px;
  transition: all .2s;

  &:hover, &:active {
    color: $color-gold;
    transform: scale(1.3);
  }
}

.guessesLeft {
  text-align: center;
  height: 40px;
  p {
    margin: 0;
  }
}

.callToAction {
  color: $color-gold; 
  transition: all .1s;
  animation: cta 1s linear 2s infinite backwards;

  &:hover {
    animation-play-state: paused;
  }
}

@keyframes cta {
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
}

.msg {
  height: 45px;
  
  p {
    margin: 0;
  }
}

.gold {
  color: $color-gold;
  transform: scale(1.2);
}

.red {
  color: $color-red;
  transform: scale(1.2);
}
</style>
