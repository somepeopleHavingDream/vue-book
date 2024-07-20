<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'

global.ePub = Epub

export default {
  computed: {
    ...mapGetters(['fileName'])
  },
  methods: {
    initEpub () {
      const url = 'http://192.168.1.107:8081/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
      // this.rendition.on('touchstart', event => {
      //   console.log(event)
      // })
      // this.rendition.on('touchend', event => {
      //   console.log(event)
      // })

      console.log(this.book)
    }
  },
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName', fileName)
      .then(() => {
        this.initEpub()
      })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
</style>
