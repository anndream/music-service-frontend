import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { playlist } from './playlist'
import { genres } from './genres'
import { artist } from './artist'
import { songlist } from './songlist'
import { inspection } from './inspection'
import { streaming } from './streaming'
import { curation } from './curtation'
export const store =  new Vuex.Store({

  modules: {
    playlist,
    genres,
    songlist,
    artist,
    inspection,
    streaming,
    curation
    
  }
})
