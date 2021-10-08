<template>
    <div class="edit-playmusic">
        <div class="container">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                <el-breadcrumb-item>playlist</el-breadcrumb-item>
                <el-breadcrumb-item>{{ formInfo.title }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="top-edit-block">
                <h3> Edit playlist: <span class="red-color">{{ formInfo.title }}</span></h3>
                <el-button type="primary" @click="handleSubmit()">Update</el-button>
            </div>
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
                <div class="title-list">Songs:</div>
                <div class="add-song flex">
                    <el-input placeholder="song key, e.g. p8yP2E3kdtwH " v-model="songInput"></el-input>
                    <el-button type="success" @click="addSong()">Add</el-button>
                </div>
                <pagination :totalItems="totalItems" :recordPerPage="itemPerpage" :currentPage="query.page" :handlePageChange="handePageChange" ></pagination>
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
                
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import SongDelete from '@/components/Playlist/edit/SongDelete.vue'
import AudioItem from '@/components/AudioItem.vue'
import Pagination from '@/components/Playlist/edit/Pagination.vue'
import moment from 'moment' 

@Component({
    components: {
        SongDelete,
        AudioItem,
        Pagination
    }
})
export default class EditDetail extends Vue {
    @State(state => state.playlist.item) dataItem
    @State(state => state.playlist.songData) songList: any
    @State(state => state.playlist.errorMessage) errorMessage: any
    @Action("playlist/get_one") getAction: any
    @Action("playlist/song_playlist") songAction: any
    @Action("playlist/add_song") addSongAction: any
    @Action("playlist/update_playlist") updateAction: any
    @State(state => state.playlist.itemPerPage) itemPerpage: any; 
    @State(state => state.playlist.totalItems) totalItems: any;
    @State(state => state.playlist.query) query: any;

    formInfo: any = {}
    songItems: any  = {}
    formData: any = {}

    $refs: any = {
        formInfo: HTMLFormElement
    }
    songInput: any = '';

    @Watch('$route') 
    onPageChanged(){
        this.initData();
        this.loadSongData(1);
    }
    @Watch('dataItem')
    onDataItemChange() {
        this.formInfo = Object.assign({}, this.dataItem)
        if(this.formInfo.next_update_date) {
            this.formInfo.next_update_date = moment(new Date(this.formInfo.next_update_date)).format('DD-MM-YYYY');
        }
    }

    get Id() {
        return this.$route.params.id
    }
    async handePageChange(page){
        return await this.loadSongData(page);
    }

    initData() {
        return this.getAction({ id: this.Id })
    }
    async loadSongData(page) {
        return await this.songAction({query: {
            page: page,
            playlist_id: this.Id
        }})
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
                this.$notify.success({
                    title: 'Success',
                    message: 'Add song is success'
                });
                this.loadSongData(1)
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
                    }
               })
            }
            
        })
    }

    created() {
        this.initData();
        this.loadSongData(1);
    }
}
</script>

<style lang="scss" scoped>
    .edit-playmusic {
        margin: 10px 0 50px 0;
        .container {
            max-width: 1170px;
            margin: auto;
        }
        .top-edit-block {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        h3 {
            text-align: left;
            font-size: 20px;
            position: relative;
            padding-bottom: 10px;
            &:before {
                content: "";
                position: absolute;
                width: 114px;
                height: 2px;
                background-color: #333;
                bottom: 0;
            }
        }
        .red-color {
            color: #ff0033;
        }
        .el-form-item__label {
            text-align: left;
        }
        .title-list {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        
    }
    .song-playlist  {
            text-align: left;
            ul {
                padding-left: 0;
                li {
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    padding: 5px;
                    .item-key {
                        color: #1162f9;
                        margin-right: 10px;
                    }
                    .item-delete-audio {
                        float: right;
                        display: flex;

                    
                    }
                    &:hover {
                        background-color: #dddddda6;
                    }
                }
            }
            .add-song .el-button {
                margin-left: 10px;
            }
        }
</style>