import React, { useState, useEffect } from "react";
import Layout from "./../components/layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();

    //INITIAL PRODUCT DETAILS
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    //GET PRODUCT
    const getProduct = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    //GET SIMILAR PRODUCT
    const getSimilarProduct = async (pid, cid) => {
        try {
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="row container mt-3">
                <div className="col-md-6">
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top custom-image" alt={product.name} />
                </div>
                <div className="col-md-6">
                    <h1 className="text-center">PRODUCT DETAILS</h1>
                    <h6>NAME :  {product.name}</h6>
                    <h6>DESCRIPTION :  {product.description}</h6>
                    <h6>PRICE :  ₦ {product.price}</h6>
                    <h6>Category : {product.category?.name}</h6>

                    <button 
                        class="btn btn-secondary mt-4"
                        onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem("cart", JSON.stringify([...cart, product]))
                            toast.success("Item added to cart successfully!");
                        }}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h1 className="text-center mt-7">RELATED PRODUCTS</h1>
                {relatedProducts.length < 1 && (<p className="text-center">No Related Products found</p>)}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map(p => (
                                <div className="card m-2" style={{width: '18rem'}}>
                                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 25)}...</p>
                                        <p className="card-text"> ₦ {p.price}</p>
                                        <button 
                                            class="btn btn-secondary mt-4"
                                            onClick={() => {
                                                setCart([...cart, product]);
                                                localStorage.setItem("cart", JSON.stringify([...cart, product]))
                                                toast.success("Item added to cart successfully!");
                                            }}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
            </div>
        </Layout>
    )
};

export default ProductDetails;