import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../../components/layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    //FORM FUNCTION
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/register", {name, email, password, phone, address, answer})
            if (res && res.data.success){
                toast.success(res.data && res.data.message)
                navigate("/login");
            }else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong, please try again")
        };
        
    };


return (
    <Layout tite={"Register - ElisFragrance"}>
        <div className="form-container">
            <h1>USER REGISTRATION FORM</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(event) => setName(event.target.value)}
                        className="form-control" 
                        id="exampleInputName" 
                        placeholder="Enter your Name" 
                        required
                        autoFocus
                    />
                </div>

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
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Enter your Passsword" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Enter your Phone Number" 
                        value={phone} 
                        onChange={(event) => setPhone(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder="Enter your address" 
                    value={address} 
                    onChange={(event) => setAddress(event.target.value)}
                    required
                    />
                </div>

                <div className="mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder="What is your favorite Fragrance" 
                    value={answer} 
                    onChange={(event) => setAnswer(event.target.value)}
                    required
                    />
                </div>

                <button type="submit" className="btn btn-primary">REGISTER</button>
            </form>
        </div>   
    </Layout>
)
};

export default Register;