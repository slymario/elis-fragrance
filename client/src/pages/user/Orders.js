import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

    const getOrders = async () => {
        try {
            console.log('Getting orders...', auth?.token)
            const {data} = await axios.get("/api/v1/auth/orders", {headers: { 'Authorization': `Bearer ${auth?.token}` }});
            console.log("Orders data:", data); // Log the data
            setOrders(data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        console.log("useEffect triggered");
        console.log("Auth token:", auth?.token);
        if (auth?.token) getOrders();
    }, [auth?.token]);
    
    return (
        <Layout title={"Your Orders - ElisFragrance"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Orders</h1>
                    {
                        orders?.map((o, i) => {
                            return (
                                <div className="border shadow" key={i}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment?.success ? "Success": "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {o?.products?.map((p, i) => (
                                    <div className="row mb-2 p-4 card flex-row" key={`${o._id}-${p._id}`}>
                                        <div className="col-md-4">
                                        <img 
                                            src={`/api/v1/product/product-photo/${p._id}`} 
                                            className="card-img-top" 
                                            alt={p.name}
                                            width="100px" height={"350px"}
                                        />
                                        </div>
                                        <div className="col-md-8">
                                            <h4>{p.name}</h4>
                                            <p>{p.description.substring(0, 30)}</p>
                                            <h4>Price: NGN {p.price}</h4>
                                        </div>
                                    </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                </div>
            </div>
        </Layout>
    )
};

export default Orders;



