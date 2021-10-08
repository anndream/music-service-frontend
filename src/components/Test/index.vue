<template>
    <div class="test-inspect-page">
        <div class="form-data">
            <el-form ref="formInfo" :model="formInfo" label-width="100px">
                <el-form-item label="Song key" prop="songkey">
                    <el-input type="text" placeholder="Enter a song key" v-model="formInfo.songkey"></el-input>
                </el-form-item>
                <el-form-item label="Listkey" prop="listkey">
                    <el-input type="text" placeholder="Enter a listkey" v-model="formInfo.listkey"></el-input>
                </el-form-item>
                <el-form-item label="Song Name" prop="song">
                    <el-input type="text" placeholder="Enter a song name" v-model="formInfo.song"></el-input>
                </el-form-item>
                <el-form-item label="Topic" prop="topic">
                    <el-input type="text" placeholder="Enter a topic" v-model="formInfo.topic"></el-input>
                </el-form-item>
                <el-form-item label="Artlist" prop="artlist">
                    <el-input type="text" placeholder="Artists, spearated by comma" v-model="formInfo.artlist"></el-input>
                </el-form-item>
                <el-form-item label="Composer" prop="composer">
                    <el-input type="text" placeholder="Enter a composer" v-model="formInfo.composer"></el-input>
                </el-form-item>
                <el-form-item label="Sortby" prop="sortby">
                    <el-input type="text" placeholder="Enter a composer" v-model="formInfo.sortby"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleExecute()">Update</el-button>
            </div>
        </div>
        <div class="data-inspect">
            <vue-custom-scrollbar class="scroll-area">
                <pre>{{ jsonData }}</pre>
            </vue-custom-scrollbar>
        </div>
       
    </div>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { State, Action } from 'vuex-class';
import vueCustomScrollbar from "vue-custom-scrollbar";

@Component({
    components:{
        vueCustomScrollbar
    }
})
export default class TestInspect extends Vue {
    @State(state => state.inspection.data) jsonData: any
    @Action("inspection/get_inspect") listAction : any;

    inspectForm: any = {} 
    formInfo: any = {}
    $refs: any = {
        formInfo: HTMLFormElement
    }
    async handleExecute() { 
        this.listAction({ query: this.formInfo })
    }
}
</script>

<style lang="scss" scoped>
   .test-inspect-page {
       padding: 20px 50px;
       display: flex;
       align-items: center;
       >div {
           margin: 0 20px;
           width: 50%;
           &.data-inspect {
               border: 1px solid #ddd;
               padding: 20px;
               max-height: 480px;
               text-align: left;
           }
       }
   }
   .scroll-area {
       height: 480px;
   }
</style>