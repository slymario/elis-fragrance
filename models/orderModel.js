import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products : [
        {
        type: mongoose.ObjectId,
        ref: "Products",
        },
    ],
    quantities: [
        {
            type: Number
        }
    ],
    prices: [
        {
            type: Number
        }
    ],
    buyer: {
        type: mongoose.ObjectId,
        ref: "users",
    },
    status:{
        type: String,
        default: "Not Processed",
        enum: ["Not Processed", "Processed", "Delivered", "Cancelled"]
    },
}, 
    {timestamps: true }
);


export default mongoose.model("Order", orderSchema);