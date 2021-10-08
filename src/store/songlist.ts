import Api from '@/services/Api'

export const state = {
    data:[],
    errorMessage: [],
    songData:[],
    query: {},
    totalItems: 0,
    itemPerPage: 0
}
export const mutations = {
    SET_DATA(state: any, response: any) {
        // console.log('response check', response, response.recordPerPage);
        state.data = response.results
        state.totalItems = typeof response.count !== 'undefined' ?  response.count : 0
        state.itemPerPage = typeof response.page_size !== 'undefined' ? response.page_size: 20
        state.query.page = typeof response.current !== 'undefined' ? response.current : 1;
    },
    SET_ERROR(state: any, response: any) {
        state.errorMessage = response
    },
    SET_SONGDATA(state: any, response: any) {
        // console.log('response check', response, response.recordPerPage);
        state.songData = response.results
    },
    
    ADD_DATA(state: any, response: any) {
        state.data.unshift(response)
    }, 
    UPDATE_DATA(state: any, response: any){
        const index = state.data.findIndex((item: any) => item.id === response.id)
        state.data.splice(index, 1, response)
    },
    DELETE_DATA(state: any, id: any){
        const index = state.data.findIndex((item: any) => item.id === id)
        state.data.splice(index, 1)
    }
}
export const actions = {
    async get_all({ commit }: any, { query }: any) {

        const response = await Api().get('/song', {
            params: query
        })
        // console.log('all file', response.data);
        return commit("SET_DATA", response.data) 
    },
    async song_playlist({ commit }: any, {query, playlist_id }: any){
        const response = await Api().get(`/song?playlist_id=${playlist_id}`, {
            params: query
        })
        return commit("SET_SONGDATA", response.data) 
    },
    async get_one({ commit }: any, { id }: any) {
        const response =  await Api().get(`song/${id}`)
        return response.data
        
    },
   
    async check_update({ commit }: any, { updateVersion, deviceId, patchSelection, updateChecking, rebootSchedule }: any){
        console.log('infoUpdate', updateVersion, deviceId, patchSelection, updateChecking, rebootSchedule);
        const response = await Api().post(`/api/v1/updates/${updateVersion}/send?deviceID=${deviceId}`,{
            
            patchSelection: patchSelection,
            updateChecking: updateChecking,
            rebootSchedule: rebootSchedule
            
        })
        .then((res: any) => {
            // console.log('response infoUpdate', res.data);
            commit('GET_CODE', res.data)
        })
        .catch((e: any) => {
            console.log('error', e.response.data);
            commit('GET_CODE', e.response.data)
        })
    },
    async add_song({ commit }: any, { valueForm  }: any){
        console.log('allUpdate', valueForm);
        const response = await Api().post('/song', valueForm )
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
    async update_song({ commit }: any, { updateForm, id  }: any){
        console.log('allUpdate', updateForm);
        const response = await Api().put(`/song/${id}`, updateForm )
        .then((res: any) => {
            // console.log('response update', res.data);
            commit('ADD_DATA', res.data)
            commit('SET_ERROR', res.data)
        })
        .catch((e: any) => {
            console.log('error', e.response.data);
            commit('SET_ERROR', e.response.data)
        })

    },
    async delete({ commit }: any, { id }: any){
        const response = await Api().delete(`/song/${id}`)
        return commit('DELETE_DATA', id)
    }
}
export const songlist = {
    namespaced: true,
    state,
    actions ,
    mutations
 }
