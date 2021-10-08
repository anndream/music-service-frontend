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
                :data="genreData"
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
                <el-table-column label="View" align="center">
                    <template slot-scope="scope" >
                        <div class="btn-group flex justify-content-center">
                            <delete-button :id="scope.row.id"></delete-button>
                            <edit-play-list :id="scope.row.id"></edit-play-list>
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

import FilterPlayList from '@/components/Genre/FilterGenre.vue'
import AddPlayList from '@/components/Genre/AddGenre.vue'
import EditPlayList from '@/components/Genre/edit/EditGenre.vue'
import DeleteButton from '@/components/Genre/Delete.vue'
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
export default class GenresList extends Vue {
    @State(state => state.genres.data) data: any;
    @State(state => state.genres.itemPerPage) itemPerpage: any; 
    @State(state => state.genres.totalItems) totalItems: any;
    @State(state => state.genres.query) query: any;
    @Action("genres/get_all") listAction : any;

    @Watch('$route')
    onPageChanged() {
        this.loadData();
    }

    get genreData() {
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