<template>
    <el-button
        type="primary"
        class="circle audio-player" :class="playing ? 'Pause' : 'Play'"
        @click="onPlayPause"
    ></el-button>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'
@Component
export default class AudioItem extends Vue{
    @Prop() keySong: any
    @Action("streaming/streaming_audio") streamAction: any
    url: any ='https://aredir.nixcdn.com/NhacCuaTui1001/Tabun-YOASOBI-6351735.mp3?st=vFwrekGJABB8Ol9YqmnQYw&e=1601112107';
    playing: boolean = false;
    player: any = null;

   async onPlayPause() {
      
        if (this.playing === true && this.player !== null) {
            this.player.pause();
            this.playing = false;
        } else if (this.playing == false && this.player !== null) {
            this.player.play();
            this.playing = true;
        } else {
            const resSong = await this.streamAction({ key_song: this.keySong })
            const mySound = new Audio(resSong.url);
            mySound.play();
            this.playing = true;
            this.player = mySound;
            this.player.addEventListener("ended", () => {
                this.playing = false;
            })
        }
    }
}
</script>
<style lang="scss">
.el-button.audio-player {
    border-radius: 50%;
    padding: 7px;
    width: 30px;
    height: 30px;
    &.audio-player {
        padding: 0 !important;
        font-size: 0;
        position: relative;
        margin-left: 10px;
        &.Play:before {
            font-family: element-icons!important;
            content: "\e7c0";
            font-size: 20px;
        }
        &.Pause:before {
            font-family: element-icons!important;
            content: "\e7c1";
            font-size: 20px;
        }
    }
}
</style> 