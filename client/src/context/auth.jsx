import React,{useState,useEffect,useContext,createContext} from 'react'
import axios from 'axios';
const AuthContext=createContext();

const AuthProvider = ({children}) => {
    
    const [auth,setauth]=useState({
        user:null,
        token:""
    })
     //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
    useEffect(()=>{
        const data=localStorage.getItem('auth')
        if(data){
            const parseData=JSON.parse(data);
            setauth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
        }
        //eslint disble next line
    },[])
    // console.log(children);
  return (
    <AuthContext.Provider value={[auth,setauth]}>
        {children}
    </AuthContext.Provider>
  )
}
export {AuthContext,AuthProvider};
