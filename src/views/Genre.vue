<template>
    <div class="main-content">
        <div class="container">
            <genres-list></genres-list>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import GenresList from '@/components/Genre/index.vue'

@Component({
    name: 'Playlist',
    components: {
        GenresList
    }
}) 
export default  class Index extends Vue{
}
</script>