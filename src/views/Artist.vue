<template>
    <div class="main-content">
        <div class="container">
            <artist-list></artist-list>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ArtistList from '@/components/Artist/index.vue'

@Component({
    name: 'Playlist',
    components: {
        ArtistList
    }
}) 
export default  class Index extends Vue{
}
</script>