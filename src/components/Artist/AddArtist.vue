<template>
    <div class="dialog-devicegroup">
        <el-button type="success" @click="visible = true">Add Artist</el-button>
        <el-dialog
        title="Add new artist"
        :visible.sync="visible"
        v-on:open="onOpen"
        v-on:close="onClose"
        width="30%"
        center>
        <el-form ref="formInfo" :model="formInfo" label-width="80px">
            <el-form-item label="Name"
                prop="name"
                :rules="[
                { required: true, message: 'Name is required'}
                ]"    
            >
                <el-input type="text" placeholder="Enter a genre name" v-model="formInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="Aliases" prop="other_names">
                <el-input type="text" placeholder="Enter a aliases" v-model="formInfo.other_names"></el-input>
            </el-form-item>
            <el-form-item>
                <el-radio-group v-model="formInfo.type">
                    <el-radio :label="1">Composer</el-radio>
                    <el-radio :label="0">Singer</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onClose()">Cancel</el-button>
            <el-button type="primary" @click="handleSubmit()">Create</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component
export default class AddArtist extends Vue{
    @Prop({type: Function, required: true}) loadData: any
    @Action("artist/add_item") addAction: any
    visible: boolean =  false;
    selectType: any = ''
    formInfo: any = {}
    formData: any = {}
    $refs: any = {
        formInfo: HTMLFormElement
    }

    async handleSubmit() {
       await this.$refs.formInfo.validate((valid: any) => {
           if(valid) {
                if(this.formInfo.name) {
                    this.formData.name = this.formInfo.name
                }
                if(this.formInfo.other_names) {
                    this.formData.other_names = this.formInfo.other_names
                }
                if(this.formInfo.type == 0 || this.formInfo.type == 1) {
                    this.formData.type = this.formInfo.type
                }
                this.addAction({
                    valueForm: this.formData
                })
                .then((res: any) => {
                    console.log('res', res);
                    this.$notify.success({
                        title: 'Success',
                        message: 'Add Success',
                        offset: 100
                    })
                    this.visible = false;
                })
           }
            })          
    }
    onOpen(){
        this.formInfo = {};
        this.formData = {};
        this.visible = true;
    }
    onClose() {
        this.visible = false;
        this.$refs.formInfo.resetFields();
        this.formInfo = {};
        this.formData = {};
    }
}
</script>   

<style lang="scss">

</style>