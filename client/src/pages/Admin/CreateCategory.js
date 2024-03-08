import React, { useEffect, useState } from "react";
import Layout from "./../../components/layouts/Layout";
import AdminMenu from "./../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //HANDLE FORM
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("/api/v1/category/create-category", {name})
            if (data?.success) {
                toast.success(`${name} created successfully`)
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred in input form")
        }
    }

    //GET ALL CATEGORIES
    const getAllCategory = async () => {
        try {
            const {data} = await axios.get("/api/v1/category/get-category")
            if(data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong with getting all category")
        }
};

useEffect(() => {
    getAllCategory();
}, []);


//UPDATE CATEGORY
const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name: updatedName})
        if (data.success) {
            toast.success(`${updatedName} successfully updated`)
            setSelected(null);
            setUpdatedName("");
            setVisible(false);
            getAllCategory();
        }else {
            toast.error(data.message)
        }
    } catch (error) {
    toast.error("Something went wrong with updating category")
    }
};


//DELETE CATEGORY
const handleDelete = async (pId) => {
    try {
        const {data} = await axios.delete(`/api/v1/category/delete-category/${pId}`)
        if (data.success) {
            toast.success(" Category successfully deleted")
        }else {
            toast.error(data.message)
        }
    } catch (error) {
    toast.error("Something went wrong with deleting category")
    }
};


    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div> 
                    <div className="col-md-9">
                        <h1>MANAGE CATEGORY</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className="w-75">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">NAME</th>
                                    <th scope="col">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {categories?.map(c => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button 
                                                    className="btn btn-primary ms-2" 
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }}
                                                    >
                                                        EDIT
                                                    </button>
                                                    <button className="btn btn-danger ms-2" onClick={() => {handleDelete(c._id)}}>DELETE</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                            </tbody>
                        </table>
                        </div>
                        <Modal 
                        onCancel={() => setVisible(false)} 
                        footer={null} visible={visible}
                        > 
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/> 
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;