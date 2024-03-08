import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {

    //CONTEXT
    const [auth, setAuth] = useAuth();

    //STATE
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //GET USER DATA
    useEffect(() => {
        const { name, email, phone, address } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user])

    //FORM FUNCTION
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put("/api/v1/auth/profile", {name, email, password, phone, address});
            if (data?.error) {
                toast.error(data?.error)
            }else {
                setAuth({...auth, user: data?.updatedUser});
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile updated successfully")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong, please try again")
        };
        
    };


    return (
        <Layout title={" Your Profile - ElisFragrance"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="form-container">
                            <h1>USER PROFILE</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control" 
                                        id="exampleInputName" 
                                        placeholder="Enter your Name" 
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
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled
                                    />
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="exampleInputPassword1" 
                                        placeholder="Enter your Passsword" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="exampleInputEmail1" 
                                        placeholder="Enter your Phone Number" 
                                        value={phone} 
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    placeholder="Enter your address" 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">UPDATE</button>
                            </form>
                        </div> 
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;