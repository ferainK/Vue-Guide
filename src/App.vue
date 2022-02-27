// HTML
<template>
  <!-- 디렉티브 -->
  <h1 @click.once="add">값 : {{ count }}</h1>
  <p :class="test"> 클랙스 지정 </p>
  <br>
  <!-- 반복문 -->
  <Fruits/>

  <!--클래스 -->
  <br>
  <h1 :class = "{ active: isActive }"
  @click="activate">
  TEST!!</h1>

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
      count: 2, 
      isActive: true,
    }
  },
  methods: {
    add() {
      this.count += " (확인 완료!)"
    },
    activate() {
      this.isActive = !this.isActive
    },
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
  },
}
</script>

<style scoped>

</style>