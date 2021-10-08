<template>
    <div class="dialog-devicegroup">
        <el-button type="success" @click="visible = true">Add new</el-button>
        <el-dialog
        title="Add new curation"
        :visible.sync="visible"
        v-on:open="onOpen"
        v-on:close="onClose"
        width="30%"
        center>
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
            <el-button type="primary" @click="handleSubmit()">Create</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'

@Component
export default class AddGenre extends Vue{
    @Prop({type: Function, required: true}) loadData: any
    @Action("curation/add_item") addAction: any
    @State(state => state.genres.errorMessage) errorMessage: any
    visible: boolean =  false;
    formInfo: any = {}
    formData: any = {};
    $refs: any = {
        formInfo: HTMLFormElement
    }

    async handleSubmit() {
       await this.$refs.formInfo.validate((valid: any) => {
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
                this.addAction({
                    valueForm: this.formData
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
                            message: 'Add is success'
                        });
                        this.visible = false
                    }
               })
           }
            })          
    }
    onOpen(){
        this.formInfo = {}
        this.visible = true;
    }
    onClose() {
        this.visible = false;
        this.$refs.formInfo.resetFields();
        this.formInfo = {}
    }
}
</script>   

<style lang="scss">

</style>