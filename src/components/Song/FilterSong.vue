<template>
    <div class="filter-device"> 
        <div class="filter-group flex">
            <el-input size="small" class="filter-device-version" placeholder="Filter by name"
                v-model="formFilter.keyword"
                clearable
                @keyup.enter.native="onFilter()"
                @clear="onReset()">
                <template slot="append"><i class="el-icon-search" @click="onFilter()"></i></template>
            </el-input>
        </div>
    </div>
</template>
<script lang="ts"> 
import { Vue, Component } from 'vue-property-decorator'
const querystring = require('querystring');

@Component
export default class FilterSong extends Vue {
    formFilter: any = {}
    onReset() {
        return this.$router.push('/song');
    }
   
    onFilter() {
        const pageUrl = `?${querystring.stringify(this.formFilter)}`;
        return this.$router.push(pageUrl)
        
    }
    created() {
        this.formFilter = {
            keyword: this.$route.query.keyword
        }
    }
}
</script>

<style lang="scss" >
    div.filter-device {
        float: right;
    }
    .filter-group {
        margin-right: 15px;
    }
    .filter-group >div{
        margin: 0 5px;
        .el-input-group__append {
            width: auto;
            padding: 0;
            &:hover {
                background-color: teal;
                color: #fff;
                cursor: pointer;
            }
            .el-icon-search {
                width: 35px;
                line-height: 30px;
            }
        }
        &.filter-device-version {
            display: flex;
            width: 100%;
            align-items: center;
            line-height: 30px;
        }
    }
    
</style>