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
    @State(state => state.genres.errorMessage) errorMessage: any
    @Action("genres/get_one") getAction: any
    @Action("genres/update_genre") updateAction: any

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
                if(this.formInfo.name) {
                    this.formData.name = this.formInfo.name
                }
                if(this.formInfo.other_names) {
                    this.formData.other_names = this.formInfo.other_names
                }
               this.updateAction({
                   updateForm: this.formData,
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