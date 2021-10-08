<template>
	<el-menu
    :unique-opened="true"
    background-color="transparent"
    class="main-navigation-menu"
	mode="horizontal"
  >
    <template>
        <el-menu-item>
          <router-link to="/">Playlist</router-link>
        </el-menu-item>
        <el-menu-item>
          <router-link to="/genre">Genres</router-link>
        </el-menu-item>
        <el-menu-item> 
          <router-link to="/artist">Artists</router-link>
        </el-menu-item> 
        <el-menu-item> 
          <router-link to="/song">Song</router-link>
        </el-menu-item> 
         <el-menu-item> 
          <router-link to="/curation">Curation</router-link>
        </el-menu-item> 
        <el-menu-item>
          <router-link to="/test">Test</router-link> 
        </el-menu-item> 
    </template>
  </el-menu>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class MainMenu extends Vue {
}
</script>
<style lang="scss" scoped>
  .el-menu--horizontal > .el-menu-item {
    padding: 0;
    a {
      color: #000;
      text-decoration: none;
      line-height: 60px;
      display: inline-block;
      padding: 0 20px;
      border-bottom: 2px solid transparent;
      &.router-link-exact-active, &:hover {
        border-color: #ff0033;
      }
    }
  } 
  
</style>
