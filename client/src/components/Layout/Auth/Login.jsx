import React, { useContext, useState } from 'react'
import Layout from "../../Layout/Layout.jsx"
import { toast } from "react-toastify"
import Axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom'
import "../../../style/authStyle.css"
import { AuthContext } from '../../../context/auth.jsx';


const Login = () => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const location = useLocation();
    const [auth, setauth] = useContext(AuthContext);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios.post(`api/v1/auth/login`,
                { email, password })
            if (res && res.data.success) {
                toast.success(res.data.message)
                setauth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                // console.log(location.state);
                Navigate(location.state || "/");
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.error('Something went wrong')
            // console.log("nhi chal raha");
        }
    }

    return (
        <Layout title="Ecommerce-register">
            <div className="form-container">
                <h4 className="title">Login Form</h4>
                <form onSubmit={submitHandler}>

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
                    <div className="btnx">
                        <button type="button" className="btn btn1 btn-primary" onClick={() => {
                            Navigate("/forgot-password")
                        }}>Forgot Password</button>
                        <button type="submit" className="btn btn-primary">LOGIN</button>
                    </div>

                </form>

            </div>
        </Layout>
    )
}

export default Login