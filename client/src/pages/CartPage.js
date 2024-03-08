import React from "react";
import Layout from "./../components/layouts/Layout";
import axios from "axios";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";

    const CartPage = () => {
        const [auth] = useAuth();
        const [cart, setCart] = useCart();
        const navigate = useNavigate();



        // DELETE CART ITEM
        const removeCartItem = (pid) => {
            try {
                let myCart = [...cart];
                let index = myCart.findIndex((item) => item._id === pid);
                myCart.splice(index, 1);
                setCart(myCart);
                localStorage.setItem("cart", JSON.stringify(myCart));
            } catch (error) {
                console.log(error);
            }
            };


        // 
        
        const getActualAmount = () => {
            try {
                console.log("CartPage", cart);
                let total = 0;
                cart?.forEach((item) => {
                    console.log('Each', item.price, item.quantity)
                    total += item.price * item.quantity;
                });
                return total * 100// The total might already be in Naira, not kobo
            } catch (error) {
                console.log(error);
            }
        };
        
        

        const config = {
            reference: (new Date()).getTime().toString(),
            email: auth?.user?.email || "user@example.com",
            amount: getActualAmount(),
            publicKey: "pk_test_51a3eca40afdb2fc9f29d7510d9abf3076766a76",
        };

        console.log('COnfi', config)


        const initializePayment = usePaystackPayment(config);
        
        // Trigger payment on a button click or any other user interaction
        const handlePaymentButtonClick = async () => {
            try {
                console.log('Button clicked...')
                // Save payment details
                await savePayment();
            } catch (error) {
                console.error("Error initiating payment", error);
            }
        };
        


        const totalPrice = () => {
            try {
                let total = 0;
        
                cart?.forEach((item) => {
                    total += item.price * item.quantity; 
                });
        
                return total?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                }) || "N/A";
            } catch (error) {
                console.log(error);
            }
        };
        
    
        const savePayment = async() => {
            try {
                console.log('Token', cart)
                const {data} = await axios.post("/api/v1/auth/orders-create", {cart}, {headers: { 'Authorization': `Bearer ${auth?.token}` }});
                console.log('Data...', data)
                if(data.success){
                    console.log('Amount', config)
                    // After saving payment details, initiate the payment
                    initializePayment(handleSuccess, handleClose);
                }
                console.log('Success')
            } catch (error) {
                console.error("Error initiating payment", error);
            }
            
        }
    
        const handleSuccess = (reference) => {
        console.log(reference);
        // Clear the cart after successful payment
        setCart([]);
        localStorage.removeItem("cart");
        // Redirect to homepage after successful payment
        navigate("/");
        };
    
        const handleClose = () => {
        console.log("closed");
        };
    
        const componentProps = {
        ...config,
        text: "Payment",
        onSuccess: (reference) => handleSuccess(reference),
        onClose: handleClose,
        };



    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length
                            ? `You have ${cart.length} items in your cart.... ${auth?.token ? "" : "Please Login to checkout."}` 
                            : "Your cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {/* <div className="row"> */}
                            {
                                cart?.map((p) => (
                                    <div className="row mb-2 p-4 card flex-row">
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
                                            <p>{p.description.substring(0, 180)}</p>
                                            <h4>Price: NGN {p.price}</h4>
                                            <button className="btn btn-danger mt-4"
                                                onClick={() => removeCartItem(p._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        {/* </div> */}
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p> Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button 
                                        className="btn btn-info"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <button 
                                        className="btn btn-info"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                    ) : (
                                        <button 
                                        className="btn btn-outline-dark"
                                        onClick={() => 
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Please Login to checkout
                                    </button>
                                    )
                                }
                            </div>
                        )}
                        <div className="d-grid gap-2">
                            {auth?.token && (
                                    <button {...componentProps} 
                                        className="btn btn-success btn-lg"
                                        style={{
                                                    "--bs-btn-padding-y": ".5rem",
                                                    "--bs-btn-padding-x": "5.5rem",
                                                    "--bs-btn-font-size": "1.3rem",
                                                }}
                                        onClick={handlePaymentButtonClick}>
                                            Payment
                                    </button>
                            )}
                        </div> 
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;