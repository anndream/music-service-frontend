import axios from 'axios'

export default() => {
    let defaultURL = 'https://music-service-restapi-jx-olli-ai-music-service-pr-48.jenkins-x1.iviet.com/api/1'
    // const currentLocation = window.location.origin;
    // if(currentLocation.includes('localhost')) {
    //   defaultURL = 'https://music-service-restapi-jx-olli-ai-music-service-pr-28.jenkins-x1.iviet.com/api/1'
    // } 
    // else {
    //   defaultURL = 'https://music-service-restapi-jx-olli-ai-music-service-pr-28.jenkins-x1.iviet.com/api/1'
    // }
    // console.log('currentLocation', currentLocation) 
    // console.log('api link', defaultURL)


    return axios.create({
        baseURL: defaultURL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        //withCredentials: true,
    })
}