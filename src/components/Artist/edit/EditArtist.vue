<template>
    <div class="dialog-popup">
        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="visible=true"></el-button>
        <el-dialog
        title="Edit Artist"
        :visible.sync="visible"
        v-on:open="onOpen"
        v-on:close="onClose"
        width="50%"
        left>
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
            <el-button type="primary" @click="handleSubmit()">Update</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'

@Component
export default class EditArtist extends Vue{
    @Prop({ type: Number, required: true }) id: any
    @State(state => state.artist.errorMessage) errorMessage: any
    @Action("artist/get_one") getAction: any
    @Action("artist/update_artist") updateAction: any
    visible: boolean =  false;
    formInfo: any = {}
    formData: any = {}
    $refs: any = {
        formInfo: HTMLFormElement
    }
    async onOpen(){
        const resData = await this.getAction({ id: this.id })
        this.formInfo = JSON.parse(JSON.stringify(resData))
        this.formData = {};
        this.visible = true;


    }
    onClose() {
        this.formInfo = {};
        this.formData = {};
        this.visible = false;
        this.$refs.formInfo.resetFields();
    }

    handleSubmit() {
        console.log('this.formInfo', this.formInfo);
        this.$refs.formInfo.validate((valid: any) => {
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
               this.updateAction({
                   updateForm: this.formInfo,
                   id: this.formInfo.id
               })
               .then(() => {
                   if(this.errorMessage.message) {
                        this.$notify.error({
                            title: 'Error',
                            message: this.errorMessage.message
                        });
                    } else {
                        this.$notify.success({
                            title: 'Success',
                            message: 'Update is success'
                        });
                        this.visible = false
                    }
               })
            }
            
        })
    }
    
}
</script>   

<style lang="scss">
    .el-date-editor {
        float: left;
    }
    .dialog-popup .el-form-item__content {
        text-align: left;
    }
</style>