import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../../components/layouts/Layout";
import axios from "axios";
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgot-password", {email, newPassword, answer})
            if (res && res.data.success){
                toast.success(res.data && res.data.message)
                navigate("/login");
            }else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong, please try again")
        }
        
    }
    return (
        <Layout tite={"Forgot Password - ElisFragrance"}>
        <div className="form-container">
            <h1>RESET PASSWORD</h1>


            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Enter your favourite Fragrance" 
                        value={answer}
                        onChange={(event) => setAnswer(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Enter your Passsword" 
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">RESET</button>

                
            </form>
        </div>   
    </Layout>
    );
};

export default ForgotPassword;