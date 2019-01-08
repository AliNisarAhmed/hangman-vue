<template>
  <div class="wordDisplay">
    <template v-for="(letterObj, i) in word">
      <span v-if="letterObj.isShowing" class="letter" :key="letterObj.letter + i">{{letterObj.letter}}</span>
      <span v-else class="letter" :key="letterObj.letter + i">*</span>
    </template>  
  </div>
</template>

<script>
export default {
  name: 'WordDisplay',
  props: {
    word: Array,
  }
};
</script>

<style scoped lang="scss">

</style>
