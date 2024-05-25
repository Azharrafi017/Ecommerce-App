import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
const Spinner = ({path="login"}) => {
    let [count,setcount]=useState(3);
    const Navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        const interval=setInterval(() => {
            if(count!==0){
                setcount(--count);
            }
            else{
                Navigate(`/${path}`,{
                    state:location.pathname
                });
                
            }
        }, 1000);

        return ()=>clearInterval(interval);
        
    },[count,Navigate,location,path]);
    // console.log(location);

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"70vh"}}>
            <h1 className="Text-center">Redirecting to Login page in {count} second </h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}

export default Spinner
