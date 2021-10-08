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
export default class DeleteButton extends Vue{
    @Action('genres/delete') deleteAction: any
    @Prop({ type: Number, required: true }) id: any
    visible: boolean = false;
    onCancel() {
        this.visible = false;
    }
    onConfirm() {
        this.deleteAction({
            id: this.id
        })
        .then(() => {
            this.$notify.success({
                title: 'Success',
                message: 'Delete Success',
                offset: 100
            })
            this.visible = false;
        })
    }
}
</script>
<style lang="scss">

</style>