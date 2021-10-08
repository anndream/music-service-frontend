<template>
    <div>
        <el-popover
            placement="top"
            width="160"
            v-model="visible"
            ref="myPopover">
            <p>Are you sure to delete this?</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="onCancel()">cancel</el-button>
                <el-button type="primary" size="mini" @click="onConfirm()">confirm</el-button>
            </div>
        </el-popover>
        <el-tooltip content="Delete item" placement="top">
            <el-button v-popover:myPopover type="danger" icon="el-icon-delete" circle size="mini"></el-button>
        </el-tooltip>
    </div>
    
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component
export default class SongDelete extends Vue{
    @Action('playlist/song_delete') deleteAction: any
    @Action("playlist/song_playlist") songAction: any
    @Prop({ type: Number, required: true }) id: any
    @Prop({ type: Number, required: true }) song_id: any
    visible: boolean = false;
    onCancel() {
        this.visible = false;
    }
    onConfirm() {
        this.deleteAction({
            id: this.id,
            song_id: this.song_id
        })
        .then(() => {
            this.$notify.success({
                title: 'Success',
                message: 'Delete Success',
                offset: 100
            })
            this.songAction({ playlist_id: this.id })
            this.visible = false;
        })
    }
}
</script>
<style lang="scss">

</style>