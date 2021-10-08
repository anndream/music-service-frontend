import Api from '@/services/Api'


export const state = {
    data:[],
    item: [],
    songData:[],
    errorMessage: [],
    query: {},
    totalItems: 0,
    itemPerPage: 0

}
export const mutations = {
    SET_DATA(state: any, response: any) {
        console.log('response check', response, response.page_size);
        state.data = response.results
        state.totalItems = typeof response.count !== 'undefined' ?  response.count : 0
        state.itemPerPage = typeof response.page_size !== 'undefined' ? response.page_size: 20
        state.query.page = typeof response.current !== 'undefined' ? response.current : 1;
        console.log('state.itemPerPage', state.itemPerPage, state.totalItems, state.query.page);
    },
    SET_ITEM(state: any, reponse: any){
        state.item = reponse
    },
    SET_SONGDATA(state: any, response: any) {
        state.songData = response.results
        state.totalItems = typeof response.count !== 'undefined' ?  response.count : 0
        state.itemPerPage = typeof response.page_size !== 'undefined' ? response.page_size: 20
        state.query.page = typeof response.current !== 'undefined' ? response.current : 1;
    },
    SET_ERROR(state: any, response: any) {
        state.errorMessage = response
    },
    
    ADD_DATA(state: any, response: any) {
        state.data.unshift(response)
    }, 
    UPDATE_DATA(state: any, response: any){
        const index = state.data.findIndex((item: any) => item.id === response.id)
        state.data.splice(index, 1, response)
    },
    ADD_SONG(state: any, response: any) {
        state.songData.unshift(response)
    }, 
    DELETE_DATA(state: any, id: any){
        const index = state.data.findIndex((item: any) => item.id === id)
        state.data.splice(index, 1)
    },
    DELETE_SONG(state: any, id: any){
        console.log('song id', id);
        const index = state.songData.findIndex((item: any) => item.id === id)
        console.log('index', index);
        state.data.splice(index, 1)
    }
    
}
export const actions = {

    async get_all({ commit }: any, { query }: any) {

        const response = await Api().get('/playlist', {
            params: query
        })
        // console.log('all file', response.data);
        return commit("SET_DATA", response.data) 
    },
    async get_one({ commit }: any, { id }: any) {
        const response =  await Api().get(`playlist/${id}`)
        return commit("SET_ITEM", response.data)
        
    },
    async song_playlist({ commit }: any, {query }: any){
        const response = await Api().get('/song', {
            params: query
        })
        return commit("SET_SONGDATA", response.data) 
    },
   
    async add_item({ commit }: any, { valueForm  }: any){
        // console.log('allUpdate', valueForm);
        const response = await Api().post('/playlist', valueForm )
        .then((res: any) => {
            console.log('response update', res.data);
            commit('ADD_DATA', res.data)
        })
        .catch((e: any) => {
            console.log('error', e.response.data);
        })
    },
    async update_playlist({ commit }: any, { id, updateForm }: any){
        const response = await Api().put(`/playlist/${id}`, updateForm )
        .then((res: any) => {
            // console.log('response update', res.data);
            commit('UPDATE_DATA', res.data)
            commit('SET_ERROR', res.data)
        })
        .catch((e: any) => {
            console.log('error', e.response.data);
            commit('SET_ERROR', e.response.data)
        })
    },
    async add_song({ commit }: any, { id, nct_key }: any){
        console.log('id, nct_key', id, nct_key);
        const response = await Api().post(`playlist/${id}/song`, {
            nct_key: nct_key
        }) 
        .then((res: any) => {
                // console.log('response update', res.data);
                commit('SET_ERROR', res.data)
                commit('ADD_SONG', res.data)
        })      
        .catch((e: any) => {
            console.log('error', e.response.data);
            commit('SET_ERROR', e.response.data)
        })
    },
    async delete({ commit }: any, { id }: any){
        const response = await Api().delete(`/playlist/${id}`)
        return commit('DELETE_DATA', id)
    },
    async song_delete({ commit }: any, { id, song_id }: any){
        const response = await Api().delete(`/playlist/${id}/song/${song_id}`)
        return commit('DELETE_SONG', song_id)
    }
    
}

export const playlist = {
    namespaced: true,
    state,
    actions ,
    mutations
 }

