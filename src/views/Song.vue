<template>
    <div class="main-content">
        <div class="container">
            <song-list></song-list>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SongList from '@/components/Song/index.vue'

@Component({
    name: 'Playlist',
    components: {
        SongList
    }
}) 
export default  class Index extends Vue{
}
</script>