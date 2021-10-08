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
            <div class="song-playlist">
                <div class="title-list">Songs</div>
                <ul>
                    <li v-for="item in songList" :key="item.id">
                        <div class="key-title flex">
                            <div class="item-key">{{ item.nct_key }}</div>
                            <div class="item-title">{{ item.title }}</div>
                        </div>
                        <div class="item-delete-audio">
                            <song-delete :id="formInfo.id" :song_id="item.id"></song-delete>
                            <audio-item :keySong="item.nct_key"></audio-item>
                        </div>
                    </li>
                </ul>
                <div class="add-song flex">
                    <el-input placeholder="song key, e.g. p8yP2E3kdtwH " v-model="songInput"></el-input>
                    <el-button type="success" @click="addSong()">Add</el-button>
                </div>
            </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onClose()">Cancel</el-button>
            <el-button type="primary" @click="handleSubmit()">Update</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import SongDelete from '@/components/Playlist/edit/SongDelete.vue'
import AudioItem from '@/components/AudioItem.vue'
import moment from 'moment' 

@Component({
    components: {
        SongDelete,
        AudioItem
    }
})
export default class EditPlayList extends Vue{
    @Prop({ type: Number, required: true }) id: any
    @State(state => state.playlist.songData) songList: any
    @State(state => state.playlist.errorMessage) errorMessage: any
    @Action("playlist/get_one") getAction: any
    @Action("playlist/song_playlist") songAction: any
    @Action("playlist/add_song") addSongAction: any
    @Action("playlist/update_playlist") updateAction: any
    visible: boolean =  false;
    formInfo: any = {}
    songItems: any  = {}
    formData: any = {}

    $refs: any = {
        formInfo: HTMLFormElement
    }
    songInput: any = '';

    async onOpen(){
        this.songItems = {}
        this.formData = {}
        const resData = await this.getAction({ id: this.id })
        this.formInfo = JSON.parse(JSON.stringify(resData))
        if(this.formInfo.next_update_date) {
            this.formInfo.next_update_date = moment(new Date(this.formInfo.next_update_date).toISOString().slice(0, 10)).format('DD-MM-YYYY');
        }
        // console.log('this.formInfo',  resData);
        /* Get song */ 
        this.songAction({ playlist_id: this.id })
        this.visible = true;

    }
    onClose() {
        this.formInfo = {}
        this,this.formData = {}
        this.visible = false;
        this.$refs.formInfo.resetFields();
    }
    async addSong() {
        console.log('this.songInput', this.songInput, this.formInfo.id);
        await this.addSongAction({
            nct_key: this.songInput,
            id: this.formInfo.id
        })
        .then((res: any) => {
            console.log('this.errorMessage', this.errorMessage);
            if(this.errorMessage.message) {
                this.$notify.error({
                    title: 'Error',
                    message: this.errorMessage.message
                });
            } else {
                this.songAction({ playlist_id: this.formInfo.id })
                this.songInput = '';
            }
            
        })
    }

    handleSubmit() {
        this.$refs.formInfo.validate((valid: any) => {
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