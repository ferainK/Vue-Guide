<template>
  <li>{{ name }}</li>
</template>

<script>
export default {
  props:{
    name:{
      type: String,
      defalut: ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>