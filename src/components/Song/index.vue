<template>
    <div class="playlist-page ota-main-content">
        <div class="inner-device-manage" >
            <div class="top-page flex ">
                <div class="left"><filter-song></filter-song></div>
                <div class="block-right-group ">
                    <add-song :loadData="loadData"></add-song>
                </div>
            </div>
            <pagination :totalItems="totalItems" :recordPerPage="itemPerpage" :currentPage="query.page" ></pagination>
            <el-table   
                id="table-id"
                style="width: 100%" 
                :data="songData"
                row-key=""
                :default-sort = "{ Order:'Descending '} " 
                >
                <el-table-column label="Title">
                    <template slot-scope="scope">
                        {{ scope.row.title }}
                    </template>
                </el-table-column>
                <el-table-column label="Key">
                    <template slot-scope="scope">
                        <el-tag type="success">{{ scope.row.nct_key }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Status">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === 1">Enable</el-tag>
                        <el-tag v-if="scope.row.status === 0" type="danger">Disable</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="View" align="center">
                    <template slot-scope="scope" >
                        <div class="btn-group flex justify-content-center">
                            <delete-button :id="scope.row.id"></delete-button>
                            <edit-song :id="scope.row.id"></edit-song>
                            <audio-item :keySong="scope.row.nct_key"></audio-item>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :totalItems="totalItems" :recordPerPage="itemPerpage" :currentPage="query.page" ></pagination>

        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class';

import FilterSong from '@/components/Song/FilterSong.vue'
import AddSong from '@/components/Song/AddSong.vue'
import EditSong from '@/components/Song/edit/EditSong.vue'
import DeleteButton from '@/components/Song/Delete.vue'
import Pagination from '@/components/Pagination.vue'
import AudioItem from '@/components/AudioItem.vue'

@Component({
    components: {
        FilterSong,
        AddSong,
        EditSong,
        DeleteButton,
        Pagination,
        AudioItem
    }
})
export default class SongList extends Vue {
    @State(state => state.songlist.data) data: any;
    @State(state => state.songlist.itemPerPage) itemPerpage: any; 
    @State(state => state.songlist.totalItems) totalItems: any;
    @State(state => state.songlist.query) query: any;
    @Action("songlist/get_all") listAction : any;

    @Watch('$route')
    onPageChanged() {
        this.loadData();
    }

    get songData() {
        return this.data
    }
    async loadData() {
        return this.listAction({ query: this.$route.query }); 
    }
    created() {
        this.loadData();
    }
}
</script>

<style lang="scss" scoped>
    
    .el-select {
        width: 100%;
    }
    .group-block .el-button {
        margin-left: 15px;
    }
    .top-page  {
        justify-content: space-between;
        margin-bottom: 40px;
    }
    .left {
        text-align: left;
    }
    .playlist-page {
        .btn-group >div {
            margin: 0 5px;
        }
    }
</style>