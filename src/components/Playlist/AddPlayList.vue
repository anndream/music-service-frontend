<template>
    <div class="dialog-devicegroup">
        <el-button type="success" @click="visible = true">Add Playlist</el-button>
        <el-dialog
        title="Add new playlist"
        :visible.sync="visible"
        v-on:open="onOpen"
        v-on:close="onClose"
        width="30%"
        center>
        <el-form ref="formInfo" :model="formInfo" label-width="150px">
            <el-form-item label="Title"
                prop="title"
                :rules="[
                { required: true, message: 'Title is required'}
                ]"    
            >
                <el-input type="text" placeholder="Enter a title playlist" v-model="formInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="Aliases" prop="other_names">
                <el-input type="text" placeholder="Enter a aliases" v-model="formInfo.other_names"></el-input>
            </el-form-item>
            <el-form-item label="Type" prop="type">
                <el-input type="text" placeholder="Enter a type" v-model.number="formInfo.type"></el-input>
            </el-form-item>
            <el-form-item label="Update frequency" prop="update_frequency"
                :rules="[{ type: 'number', message: 'Frequency must be a number'}]"
            >
                <el-input type="text" placeholder="Enter a frequency" v-model.number="formInfo.update_frequency"></el-input>
            </el-form-item>
            <el-form-item label="Next Update date" prop="next_update_date">
                <el-date-picker
                v-model="formInfo.next_update_date"
                type="date"
                placeholder="Pick a day" format="dd-MM-yyyy" value-format="dd-MM-yyyy">
                </el-date-picker>
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
export default class AddPlayList extends Vue{
    @Prop({type: Function, required: true}) loadData: any
    @Action("playlist/add_item") addAction: any
    visible: boolean =  false;
    formInfo: any = {}
    formData: any  = {}
    $refs: any = {
        formInfo: HTMLFormElement
    }

    async handleSubmit() {
       await this.$refs.formInfo.validate((valid: any) => {
           if(valid) {
               if(this.formInfo.title) {
                    this.formData.title = this.formInfo.title
                }
                if(this.formInfo.other_names) {
                    this.formData.other_names = this.formInfo.other_names
                }
                if(this.formInfo.type) {
                    this.formData.type = this.formInfo.type
                }
                if(this.formInfo.update_frequency) {
                    this.formData.update_frequency = this.formInfo.update_frequency
                }
                if(this.formInfo.next_update_date) {
                    this.formData.next_update_date = this.formInfo.next_update_date
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
        this.formInfo = {}
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