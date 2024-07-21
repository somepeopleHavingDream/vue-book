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
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    toggleTitleAndMenu () {

    },
    initEpub () {
      const url = 'http://192.168.1.107:8081/' + this.fileName + '.epub'
      this.book = new Epub(url, {
        view: 'inline'
      })

      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight
      })
      this.rendition.display()
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime

        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }

        event.stopPropagation()
      })
    }
  },
  mounted () {
    const fileNameParam = this.$route.params.fileName
    if (!fileNameParam) {
      return
    }

    const fileName = fileNameParam.split('|').join('/')
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
