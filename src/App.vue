// HTML
<template>
  <!-- 디렉티브 -->
  <h1 @click.once="add">값 : {{ count }}</h1>
  <p :class="test"> 클랙스 지정 </p>
  <br>
  <!-- 반복문 -->
  <Fruits/>

</template>

// JS
<script>
console.log('start!')

import Fruits from '~/components/Fruits.vue'
export default {
  components: {
    Fruits
  },
  data() {
    return {
      count: 2
    }
  },
  methods: {
    add() {
      this.count += " (확인 완료!)"
    }
  },
  beforeCreate() {
    console.log('Before Create!', this.count)
  },
  created() {
    console.log('Created!', this.count)
  },
  mounted() {
    console.log('Mounted!')
  },
  beforeCreate() {
    console.log('Before Create!')
  }
}
</script>

// SCSS
<style lang="scss">

</style>