<template>
    <div class="playlist-page ota-main-content">
        <div class="inner-device-manage" >
            <div class="top-page flex ">
                <div class="left"><filter-artist></filter-artist></div>
                <div class="block-right-group ">
                    <add-artist :loadData="loadData"></add-artist>
                </div>
            </div>
            <pagination :totalItems="totalItems" :recordPerPage="itemPerpage" :currentPage="query.page" ></pagination>
            <el-table   
            id="table-id"
            style="width: 100%" 
            :data="artistData"
            row-key=""
            :default-sort = "{ Order:'Descending '} " 
            >
            <el-table-column label="Name">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="Other name">
                <template slot-scope="scope">
                    {{ scope.row.other_names }}
                </template>
            </el-table-column>
             <el-table-column label="Type">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.type === 1" size="mini">Composer</el-tag>
                    <el-tag v-if="scope.row.type === 0" type="success" size="mini">Singer</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="View" align="center">
                <template slot-scope="scope" >
                    <div class="btn-group flex justify-content-center">
                        <delete-button :id="scope.row.id"></delete-button>
                        <edit-artist :id="scope.row.id"></edit-artist>
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

import FilterArtist from '@/components/Artist/FilterArtist.vue'
import AddArtist from '@/components/Artist/AddArtist.vue'
import EditArtist from '@/components/Artist/edit/EditArtist.vue'
import DeleteButton from '@/components/Artist/Delete.vue'
import Pagination from '@/components/Pagination.vue'


@Component({
    components: {
        FilterArtist,
        AddArtist,
        EditArtist,
        DeleteButton,
        Pagination
    }
})
export default class ArtistList extends Vue {
    @State(state => state.artist.data) data: any;
    @State(state => state.artist.itemPerPage) itemPerpage: any; 
    @State(state => state.artist.totalItems) totalItems: any;
    @State(state => state.artist.query) query: any;
    @Action("artist/get_all") listAction : any;

    @Watch('$route')
    onPageChanged() {
        this.loadData();
    }

    get artistData() {
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