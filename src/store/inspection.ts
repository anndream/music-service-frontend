import Api from '@/services/Api'

export const state = {
    data:[],
    errorMessage: [],
}
export const mutations = {
    SET_DATA(state: any, response: any) {
        state.data = response
    },
    SET_ERROR(state: any, response: any) {
        state.errorMessage = response
    }
}
export const actions = {
    async get_inspect({ commit }: any, { query }: any) {

        const response = await Api().get('/inspection/inspect', {
            params: query
        })
        .then((res: any) => {
            console.log('response update', res.data);
            commit('SET_DATA', res.data)
            commit('SET_ERROR', res.data)
        })
        .catch((e: any) => {
            console.log('error', e.response.data);
            commit('SET_ERROR', e.response.data)
        })
    }
}
export const inspection = {
    namespaced: true,
    state,
    actions ,
    mutations
 }
