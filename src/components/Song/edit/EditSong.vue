<template>
    <div class="dialog-devicegroup">
        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="visible=true"></el-button>
        <el-dialog
        title="Edit Song"
        :visible.sync="visible"
        v-on:open="onOpen"
        v-on:close="onClose"
        width="50%"
        left>
        <el-form ref="formInfo" :model="formInfo" label-width="150px">
            <el-form-item label="Title"
                prop="title"
                :rules="[
                { required: true, message: 'Title is required'}
                ]"    
            >
                <el-input type="text" placeholder="Enter a genre name" v-model="formInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="Song Key" prop="nct_key"
                :rules="[
                    { required: true, message: 'Song Key is required'}
                    ]"  
            >
                <el-input type="text" placeholder="Enter a song key" v-model="formInfo.nct_key"></el-input>
            </el-form-item>
             <el-form-item label="URL" prop="nct_url"
                :rules="[
                    { required: true, message: 'URL is required'} 
                    ]"  
            >   
                <el-input type="text" placeholder="Enter a url" v-model="formInfo.nct_url"></el-input>
            </el-form-item>
            <el-form-item label="Listened" prop="nct_listen_count"
                :rules="[{ type: 'number', message: 'Listened must be a number'}]"
            >   
                <el-input type="text" placeholder="Enter a listen count" v-model.number="formInfo.nct_listen_count"></el-input>
            </el-form-item>
            <el-form-item label="Uploader" prop="uploader">   
                <el-input type="text" placeholder="Enter a uploader" v-model="formInfo.uploader"></el-input>
            </el-form-item>
            <el-form-item label="Artist" prop="artists">   
                <el-select
                    v-model="selectedArtist"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Please enter a keyword"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Genre" prop="genre">   
                <el-select
                    v-model="selectedGenre"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Please enter a keyword"
                    :remote-method="remoteGenre"
                    :loading="loading">
                    <el-option
                    v-for="item in optionsGenre"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Aliases" prop="other_names">   
                <el-input type="text" placeholder="Enter a alias" v-model="formInfo.other_names"></el-input>
            </el-form-item>
            <el-form-item label="Status" prop="status">
                <el-radio-group v-model="formInfo.status">
                    <el-radio :label="1">Enable</el-radio>
                    <el-radio :label="0">Disable</el-radio>
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
export default class EditSong extends Vue{
    @Prop({ type: Number, required: true }) id: any
    @State(state => state.songlist.errorMessage) errorMessage: any
    @Action("songlist/get_one") getAction: any
    @Action("songlist/update_song") updateAction: any
    @Action("artist/search_artist") artistAction : any; 
    @Action("genres/search_genre") genreAction : any; 

    visible: boolean =  false;
    formInfo: any = {}
    formData: any = {}
    $refs: any = {
        formInfo: HTMLFormElement
    }
    tag: any = ''
    selectedArtist: any =[]
    selectedGenre: any =[]
    options: any = []
    optionsGenre: any = []
    loading: boolean = false

    async onOpen(){
        const resData = await this.getAction({ id: this.id })
        this.formInfo = JSON.parse(JSON.stringify(resData))
        // console.log('this.formInfo',  resData);
        this.visible = true;
        this.formInfo.artists.map((item: any) => {
            this.selectedArtist.push(item.id)
            this.options.push(item)
        })
        this.formInfo.genres.map((item: any) => {
            this.selectedGenre.push(item.id)
            this.optionsGenre.push(item)
        })
        this.formData = {};
    }
    onClose() {
        this.formInfo = {}
        this.formData = {};
        this.options = []
        this.optionsGenre = []
        this.selectedArtist =[]
        this.selectedGenre =[]
        this.visible = false;
        this.$refs.formInfo.resetFields();
    }
    async remoteMethod(query: any) {
        if (query !== '') {
            this.loading = true;    
            await this.artistAction({name: query})
            .then((res: any) => {
                res.results.forEach((item: any) => {
                    if(!this.options.find((el: any) => el.id === item.id)) {
                        this.options.push(item)
                    }
                })
                this.loading = false;
                console.log('res.results', res.results);
                console.log('this.options', this.options);
            })
        } else {
          this.options = [];
        }
    }
    async remoteGenre(query: any) {
        if (query !== '') {
            this.loading = true;
            await this.genreAction({name: query})
            .then((res: any) => {
                res.results.forEach((item: any) => {
                    if(!this.optionsGenre.find((el: any) => el.id === item.id)) {
                        this.optionsGenre.push(item)
                    }
                })
                this.loading = false;
                console.log('res.results', res.results);
                console.log('this.optionsGenre', this.options);
            })
        } else {
          this.optionsGenre = [];
        }
    }

    handleSubmit() {
        this.$refs.formInfo.validate((valid: any) => {
            if(valid) {
                this.formInfo.artists = []
                this.formInfo.genres = []
                this.selectedArtist.forEach((item: any) => {
                    this.formInfo.artists.push({'id': item})
                })
                this.selectedGenre.forEach((item: any) => {
                    this.formInfo.genres.push({'id': item})
                })
                if(this.formInfo.title) {
                    this.formData.title = this.formInfo.title
                }
                if(this.formInfo.nct_key) {
                    this.formData.nct_key = this.formInfo.nct_key
                }
                if(this.formInfo.nct_url) {
                    this.formData.nct_url = this.formInfo.nct_url
                }
                if(this.formInfo.nct_listen_count) {
                    this.formData.nct_listen_count = this.formInfo.nct_listen_count
                }
                if(this.formInfo.uploader) {
                    this.formData.uploader = this.formInfo.uploader
                }
                if(this.formInfo.artists) {
                    this.formData.artists = this.formInfo.artists
                }
                if(this.formInfo.genres) {
                    this.formData.genres = this.formInfo.genres
                }
                if(this.formInfo.other_names) {
                    this.formData.other_names = this.formInfo.other_names
                }
                if(this.formInfo.status == 0 || this.formInfo.status == 1) {
                    this.formData.status = this.formInfo.status
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

<style lang="scss" scoped>
    .el-date-editor {
        float: left;
    }
    .el-select  {
        width: 100%;
    }
    .el-radio-group {
        display: inline-block;
        width: 100%;
        text-align: left;
    }
</style>