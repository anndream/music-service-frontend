<template>
    <div class="page-management main-content">
        <div class="container">
            <play-list></play-list>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import PlayList from '@/components/Playlist/index.vue'

@Component({
    name: 'Playlist',
    components: {
        PlayList
    }
}) 
export default  class Index extends Vue{
}
</script>