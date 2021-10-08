<template>
    <div class="playlist-page ota-main-content">
        <div class="inner-device-manage" >
            <div class="top-page flex ">
                <div class="left"><filter-play-list></filter-play-list></div>
                <div class="block-right-group ">
                    <add-play-list :loadData="loadData"></add-play-list>
                </div>
            </div>
            <pagination :totalItems="totalItems" :recordPerPage="itemPerpage" :currentPage="query.page" ></pagination>
            <el-table   
                id="table-id"
                style="width: 100%" 
                :data="playlistData"
                row-key=""
                :default-sort = "{ Order:'Descending '} " 
                >
                <el-table-column label="Title">
                    <template slot-scope="scope">
                        <el-link :href="'/playlist/'+scope.row.id">{{ scope.row.title }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="Aliases">
                    <template slot-scope="scope">
                        {{ scope.row.other_names }}
                    </template>
                </el-table-column>
                <el-table-column label="Type" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.type }}
                    </template>
                </el-table-column>
                <el-table-column label="Update frequency" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.update_frequency }}
                    </template>
                </el-table-column>
                <el-table-column label="Status" align="center">
                    <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 1" type="success" size="mini">Enable</el-tag>
                    <el-tag v-else-if="scope.row.status === 0" type="danger" size="mini">Disable</el-tag>
                        <span v-else>{{ scope.row.update_frequency }}</span>
                    </template>
                </el-table-column>
                <el-table-column v-if="playlistData[0].hasOwnProperty('date_created')" label="Date Created" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.date_created">{{ formatDate(scope.row.date_created) }}</span>
                    </template>
                </el-table-column>
                <el-table-column  v-if="playlistData[0].hasOwnProperty('date_modified')" label="Date Modified" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.date_modified">{{ formatDate(scope.row.date_modified) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Next update" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.next_update_date">{{ formatDate(scope.row.next_update_date) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="View" align="center">
                    <template slot-scope="scope" >
                        <div class="btn-group flex justify-content-center">
                            <delete-button :id="scope.row.id"></delete-button>
                            <el-link :href="'/playlist/'+scope.row.id"><el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button></el-link>
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
import moment from 'moment'

import FilterPlayList from '@/components/Playlist/FilterPlayList.vue'
import AddPlayList from '@/components/Playlist/AddPlayList.vue'
import EditPlayList from '@/components/Playlist/edit/EditPlayList.vue'
import DeleteButton from '@/components/Playlist/Delete.vue'
import Pagination from '@/components/Pagination.vue'


@Component({
    components: {
        FilterPlayList,
        AddPlayList,
        EditPlayList,
        DeleteButton,
        Pagination
    }
})
export default class PlayList extends Vue {
    @State(state => state.playlist.data) data: any;
    @Action("playlist/get_all") listAction : any; 
    @State(state => state.playlist.itemPerPage) itemPerpage: any; 
    @State(state => state.playlist.totalItems) totalItems: any;
    @State(state => state.playlist.query) query: any;

    @Watch('$route')
    onPageChanged() {
        this.loadData();
    }

    get playlistData() {
        return this.data
    }
    formatDate(item: any){
        return moment(new Date(item).toISOString().slice(0, 10)).format('DD-MM-YYYY');
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
    a.el-link:hover {
        text-decoration: none;
    }
    .el-link.is-underline:hover:after {
        border-bottom-color: transparent;
    }
</style>