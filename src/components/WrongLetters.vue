<template>
  <div class="wrongLetters">
    <h4 class="wrongLetters__heading">Wrong Letters: </h4>
    <div class="wrongLetters__container">
      <p class="wrongLetters__text">
        <template v-for="(letter, i) in wrongLetters">
          <span v-if="i === wrongLetters.length - 1" :key="letter + i">{{letter}}</span>
          <span v-else :key="letter + i">{{letter}}, </span>
        </template>
      </p>
    </div>
  
  </div>
</template>

<script>
export default {
  props: {
    wrongLetters: Array,
  }
}
</script>

<style>

</style>
