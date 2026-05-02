import { createContext, useEffect, useState } from "react";
import api from "../api/api";
import Cookies from "js-cookie";

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();


export default function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [isAuth,setIsAuth] = useState(false);
    const [isLoading,setIsLoading] = useState(true);

    const checkAuth = async()=>{
        try{
            const res = await api.get('/me');
            setUser(res.data.user);
            setIsAuth(true);
            
        }catch{
            setUser(null);
            setIsAuth(false);
        }finally{
            setIsLoading(false);
        }

    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        checkAuth();
    },[])

    const login = async (data)=>{
        const res = await api.post('/login',data);
        setUser(res.data.user);
        setIsAuth(true);
        return res;



    }

    const verifyEmail = async (data)=>{
        
            const res = await api.post('/verify-email',data);
            if(res.status === 200){
                setIsAuth(true);
            }
            return res;

        
    }

    const signup = async (data)=>{
        const res = await api.post('/signup',data);
        setUser(res.data.user);
        setIsAuth(false);
        setIsLoading(false);
        return res;
    }

    const generateOtp = async (data)=>{
        const res = await api.post('/generate-otp',data);
        return res;
    }

    const logout = async ()=>{
        try{
            await api.post('/logout');
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');

        }finally{
            setUser(null);
            setIsAuth(false);
            setIsLoading(false);
        }
    }

    return(
        <authContext.Provider value={{signup,login,verifyEmail,generateOtp,logout,user,isAuth,isLoading}}>
            {!isLoading && children}
        </authContext.Provider>
    )
}
