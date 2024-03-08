import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    transactionReference: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    order: {
        type: mongoose.ObjectId,
        ref: "orders",
    },
}, 
        {timestamps: true,}
    );

export default mongoose.model("Payment", paymentSchema);
