import Vue from 'vue'
import axios from 'axios'

import router from '../router/routes'

const axiosInstance = axios.create({
    // baseURL: "https://jsonplaceholder.typicode.com",
    baseURL: process.env.buyPowerNow_API,
    headers: {
        // 'content-type': '',
        // Authorization: 'Bearer {'+ Store.getters.getToken +'}'
    }
});
axiosInstance.interceptors.request.use(function (request) {
    const token = localStorage.getItem('token'); 

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    } 
    return request;
}, function (error) { 
    // alert('ERROR FROM POSTDATA INTERECEPTOR: '+error.response.data);
    return Promise.reject(error.response.data);
});

axiosInstance.interceptors.response.use(function (response) { 
    return response;
}, function (error) { 
    console.log(error.response.data)
    if (error.response.data.error.statusCode === 401) {
        // call the logout store action, which will clear the authentication bearer token and all
        // redirect to login using the router
        router.push('/auth')
    }
    return Promise.reject(error.response.data);
});



export default ( { Vue } ) => {
    Vue.prototype.$axios = axiosInstance
}

export { axiosInstance  }
