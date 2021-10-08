import Api from '@/services/Api'


export const state = {
    data:[]

}
export const mutations = {
    
}
export const actions = {

    async streaming_audio({commit }: any, { key_song }: any){
        const response = await Api().get(`/nctstreaming/streaming/${key_song}`)
        return response.data
    }
}

export const streaming = {
    namespaced: true,
    state,
    actions ,
    mutations
 }

