import React,{useState} from 'react'
import Layout from "../../Layout/Layout.jsx"
import {toast} from "react-toastify"
import Axios from "axios"
import { useNavigate } from 'react-router-dom'
import "../../../style/authStyle.css"
const Register = () => {
    const [name,setName]=useState("");
    const [email,setemail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [answer,setAnswer]=useState("");
    const Navigate=useNavigate();
    const submitHandler=async (e)=>{
        e.preventDefault();
        try{
            const res=await Axios.post(`api/v1/auth/register`,
            {name,email,password,phone,address,answer})
            if(res && res.data.success){
                toast.success(res.data.message)
                Navigate("/login");
                // console.log("shi chal raha");
            }
            else{
                toast.error(res.data.message);
            }
        }
        catch(err){
            console.log(err);
            toast.error('Something went wrong')
            // console.log("nhi chal raha");
        }
    }
    return (
        <Layout title="Ecommerce-register">
            <div className="form-container">
                <h4 className="title">Register page</h4>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <input type="text" 
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            
                        }}
                        className="form-control" 
                        id="exampleInputName" 
                        placeholder='Enter Your Name'
                        required 
                        />
                    </div>

                    <div className="mb-3">
                        <input type="email" 
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value)
                        }}
                        className="form-control"
                        id="exampleInputEmail"
                        placeholder='Enter Your Email'
                        required
                        />
                    </div>
                   
                    <div className="mb-3">
                        <input type="password" 
                        value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder='Enter Your Password'
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <input type="text" 
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }} 
                        className="form-control" 
                        id="exampleInputName" 
                        placeholder='Enter Your Phone No.'
                        required
                        />
                    </div>
                   
                    <div className="mb-3">
                        <input type="text" 
                        value={address} 
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                        className="form-control" 
                        id="exampleInputName" 
                        placeholder='Enter Your Adress'
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text" 
                        value={answer} 
                        onChange={(e) => {
                            setAnswer(e.target.value)
                        }}
                        className="form-control" 
                        id="exampleInputName" 
                        placeholder='What is your favourite movie?'
                        required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register