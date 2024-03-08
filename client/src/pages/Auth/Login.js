import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "./../../components/layouts/Layout";
import axios from "axios";
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import {useAuth} from "../../context/Auth.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {email, password})
            if (res && res.data.success){
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            }else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong, please try again")
        }
        
    }


return (
    <Layout tite={"Register - ElisFragrance"}>
        <div className="form-container">
            <h1>LOGIN</h1>

            <form onSubmit={handleSubmit}>
                

                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Enter your Passsword" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                <button type="submit" className="btn btn-primary">LOGIN</button>
                </div>

                <button type="submit" className="btn btn-primary" onClick={() => {navigate("/forgot-password")}}>FORGOT PASSWORD ?</button>
            
            
            </form>
        </div>   
    </Layout>
)
}

export default Login;