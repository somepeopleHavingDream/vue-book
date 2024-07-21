<template>
  <div class="ebook-reader">
    <div id="read" class="read-class"></div>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'

global.ePub = Epub

export default {
  mixins: [ebookMixin],
  methods: {
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu () {
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu () {
      this.setMenuVisible(false)
    },
    initEpub () {
      const url = 'http://192.168.1.107:8081/' + this.fileName + '.epub'
      this.book = new Epub(url, {
        view: 'inline'
      })

      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        allowScriptedContent: true
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

    this.setFileName(fileNameParam.split('|').join('/'))
      .then(() => {
        this.initEpub()
      })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.read-class {
  margin-top: px2rem(30);
}
</style>
