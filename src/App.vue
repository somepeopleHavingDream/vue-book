<template>
  <div id="app">
    <span class="text">ABCDEFG</span>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const getters = {
  a: () => 1,
  b: () => 2
}

function fn (keys) {
  const data = {}
  keys.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(getters, key)) {
      data[key] = getters[key]
    }
  })
  return data
}

export default {
  computed: {
    ...mapGetters(['test']),
    ...fn(['a', 'b'])
  },
  mounted () {
    // this.$store.dispatch('setTest', 90).then(() => {
    //   console.log(this.test)
    // })

    console.log(this.a, this.b, this.c, this.test)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>

<style lang="scss" scoped>
  @import "./assets/styles/global.scss";
  .text {
    font-family: 'Days One',serif;
    font-size: px2rem(20);
    color: orange;
  }
</style>
