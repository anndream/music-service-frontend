<template>
    <div class="main-content">
        <div class="container">
            <curation-list></curation-list>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import CurationList from '@/components/Curation/index.vue'

@Component({
    name: 'Playlist',
    components: {
        CurationList
    }
}) 
export default  class Index extends Vue{
}
</script>