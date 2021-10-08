<template>
    <div class="dialog-devicegroup">
        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="visible=true"></el-button>
        <el-dialog
        title="Edit playlist"
        :visible.sync="visible"
        v-on:open="onOpen"
        v-on:close="onClose"
        width="50%"
        left>
        <el-form ref="formInfo" :model="formInfo" label-width="150px">
            <el-form-item label="Key"
                prop="key"
                :rules="[
                { required: true, message: 'Key is required'}
                ]"    
            >
                <el-input type="text" placeholder="Enter a key name" v-model="formInfo.key"></el-input>
            </el-form-item>
            <el-form-item label="Keyword" 
                prop="keyword"
                :rules="[
                { required: true, message: 'Keyword is required'}
                ]"   >
                <el-input type="text" placeholder="Enter a keyword" v-model="formInfo.keyword"></el-input>
            </el-form-item>
            <el-form-item label="Artist" 
                prop="artist">
                <el-input type="text" placeholder="Enter a artist" v-model="formInfo.artist"></el-input>
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
export default class EditGenre extends Vue{
    @Prop({ type: Number, required: true }) id: any
    @State(state => state.curation.errorMessage) errorMessage: any
    @Action("curation/get_one") getAction: any
    @Action("curation/update_genre") updateAction: any

    visible: boolean =  false;
    formInfo: any = {}
    formData: any  = {}
    $refs: any = {
        formInfo: HTMLFormElement
    }
    async onOpen(){
        const resData = await this.getAction({ id: this.id })
        this.formInfo = JSON.parse(JSON.stringify(resData))
        // console.log('this.formInfo',  resData);
        this.visible = true;

    }
    onClose() {
        this.formInfo = {}
        this.visible = false;
        this.$refs.formInfo.resetFields();
    }

    handleSubmit() {
        this.$refs.formInfo.validate((valid: any) => {
            if(valid) {
                if(this.formInfo.key) {
                    this.formData.key = this.formInfo.key
                }
                if(this.formInfo.keyword) {
                    this.formData.keyword = this.formInfo.keyword
                }
                 if(this.formInfo.artist) {
                    this.formData.artist = this.formInfo.artist
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
</style>