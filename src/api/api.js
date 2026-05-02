import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    withCredentials: true
})

api.interceptors.response.use(
    (res)=>res,
    async (err)=>{
        const originalreq = err.config;
        if(err.response.status === 401 && !originalreq._retry && !originalreq.url.includes('generatenewaccesstoken') && !originalreq.url.includes('/login')){
            originalreq._retry = true; 
            try{
                await axios.post(`${api.defaults.baseURL}/generatenewaccesstoken`,{},{withCredentials: true} )
                return axios(originalreq);
            }catch(refreshErr){
                return Promise.reject(refreshErr)
            }
        }
        return Promise.reject(err)
    }

);

export default api