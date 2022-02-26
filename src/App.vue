<template>
  <h1 @click="increase">{{ message }} {{count}}</h1>
  <h1 v-if="count > 4">4보다 크넹!</h1>
  <ul>
    <Fruit
    v-for="fruit in fruits" 
    :key="fruit" 
    :name="fruit">
      {{ fruit }}
    </Fruit>
  </ul>
  <HelloWorld/>
</template>

<script>
import HelloWorld from '~/components/HelloWorld.vue'
import Fruit from '~/components/Fruit.vue'

export default {
  components: {
    HelloWorld,
    Fruit: Fruit  //Fruit로도 작성 가능
  },
  data() {
    return{
      message: '클릭해보시겠어요? : ',
      count: 0,
      fruits: ['사과', '토마토','바나나']
    } 
  },
  methods: {
    increase() {
      this.count += 1
    }
  },
}
</script>

<style lang="scss">

</style>