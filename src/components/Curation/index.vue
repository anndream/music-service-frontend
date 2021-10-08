<template>
    <div class="playlist-page ota-main-content">
        <div class="inner-device-manage" >
            <div class="top-page flex ">
                <div class="left"><filter-curation></filter-curation></div>
                <div class="block-right-group ">
                    <add-curation :loadData="loadData"></add-curation>
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
                <el-table-column label="Key">
                    <template slot-scope="scope">
                        {{ scope.row.key }}
                    </template>
                </el-table-column>
                <el-table-column label="Keyword">
                    <template slot-scope="scope">
                        {{ scope.row.keyword }}
                    </template>
                </el-table-column>
                <el-table-column label="Artist">
                    <template slot-scope="scope">
                        {{ scope.row.artist }}
                    </template>
                </el-table-column>
                <el-table-column label="View" align="center">
                    <template slot-scope="scope" >
                        <div class="btn-group flex justify-content-center">
                            <delete-button :id="scope.row.id"></delete-button>
                            <edit-curation :id="scope.row.id"></edit-curation>
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

import FilterCuration from '@/components/Curation/FilterCuration.vue'
import AddCuration from '@/components/Curation/AddCuration.vue'
import EditCuration from '@/components/Curation/edit/EditCuration.vue'
import DeleteButton from '@/components/Curation/Delete.vue'
import Pagination from '@/components/Pagination.vue'


@Component({
    components: {
        FilterCuration,
        AddCuration,
        EditCuration,
        DeleteButton,
        Pagination
    }
})
export default class CurationList extends Vue {
    @State(state => state.curation.data) data: any;
    @State(state => state.curation.itemPerPage) itemPerpage: any; 
    @State(state => state.curation.totalItems) totalItems: any;
    @State(state => state.curation.query) query: any;
    @Action("curation/get_all") listAction : any;

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