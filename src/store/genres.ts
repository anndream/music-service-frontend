import Api from '@/services/Api'


export const state = {
    data:[],
    errorMessage: [],
    query: {},
    totalItems: 0,
    itemPerPage: 0
}
export const mutations = {
    SET_DATA(state: any, response: any) {
        console.log('response check', response, response.recordPerPage);
        state.data = response.results
        state.totalItems = typeof response.count !== 'undefined' ?  response.count : 0
        state.itemPerPage = typeof response.page_size !== 'undefined' ? response.page_size: 20
        state.query.page = typeof response.current !== 'undefined' ? response.current : 1;
        console.log('state.itemPerPage', state.itemPerPage, state.totalItems, state.query.page);    
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
    DELETE_DATA(state: any, id: any){
        const index = state.data.findIndex((item: any) => item.id === id)
        state.data.splice(index, 1)
    }
    
}
export const actions = {

    async get_all({ commit }: any, { query }: any) {

        const response = await Api().get('/genre', {
            params: query
        })
        // console.log('all file', response.data);
        return commit("SET_DATA", response.data) 
    },
    async search_genre({ commit }: any, { name }: any) {

        const response = await Api().get(`/genre?name=${name}`)
        // console.log('all file', response.data);
        return response.data
    },
    async get_one({ commit }: any, { id }: any) {
        const response =  await Api().get(`genre/${id}`)
        return response.data
        
    },
   
    async add_item({ commit }: any, { valueForm  }: any){
        console.log('allUpdate', valueForm);
        const response = await Api().post('/genre', valueForm )
        .then((res: any) => {
            console.log('response update', res.data);
            commit('ADD_DATA', res.data)
        })
        .catch((e: any) => {
            console.log('error', e.response.data);
        })

    },
    async update_genre({ commit }: any, { id, updateForm }: any){
        const response = await Api().put(`/genre/${id}`, updateForm )
        .then((res: any) => {
            console.log('response update', res.data);
            commit('UPDATE_DATA', res.data)
            commit('SET_ERROR', res.data)
        })
        .catch((e: any) => {
            console.log('error', e.response.data);
            commit('SET_ERROR', e.response.data)
        })
    },
    async delete({ commit }: any, { id }: any){
        const response = await Api().delete(`/genre/${id}`)
        return commit('DELETE_DATA', id)
    }
    
}

export const genres = {
    namespaced: true,
    state,
    actions ,
    mutations
 }

