<template>
  <div class="ebook">
    <e-book-reader></e-book-reader>
  </div>
</template>

<script>
import EBookReader from "@/components/ebook/EBookReader.vue";

export default {
  components: {EBookReader}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
</style>
