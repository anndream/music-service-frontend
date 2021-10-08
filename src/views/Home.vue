<template>
  <div class="home main-content">
    <div class="container">
      <play-list></play-list>
  </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import PlayList from '@/components/Playlist/index.vue'


@Component({
  name: 'Home',
  components: {
    PlayList
  }
})
export default class Index extends Vue {
}
</script>
