<template>
    <div class="main-content">
        <div class="container">
            <test-inspect></test-inspect>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import TestInspect from '@/components/Test/index.vue'

@Component({
    name: 'Playlist',
    components: {
        TestInspect
    }
}) 
export default  class Index extends Vue{
}
</script>