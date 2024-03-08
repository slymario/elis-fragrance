import orderModel from "../models/orderModel.js";
import paymentModel from "../models/paymentModel.js";
import axios from "axios";

// PAYMENT CONTROLLER
export const paymentController = async (req, res) => {
    try {
        // Extract necessary data from the request body
        const { orderId, paymentMethod, amount } = req.body;
        console.log('Body', req.body);

        // Validate the required fields
        if (!orderId || !paymentMethod || !amount) {
            return res.status(400).send({
                success: false,
                message: "orderId, paymentMethod, and amount are required fields",
            });
        }

        // Fetch the order details
        const order = await orderModel.findById(orderId);

        // Check if the order exists
        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found",
            });
        }

        // Perform payment processing logic here (e.g., connect to a payment gateway)
        const paystackResponse = await initiatePaystackPayment(amount, order.reference); // Implement this function

        // Check if payment initiation was successful
        if (!paystackResponse.success) {
            return res.status(500).send({
                success: false,
                message: 'Error initiating payment with Paystack',
                error: paystackResponse.error,
            });
        }

        // Update the order status or perform any other necessary actions
        order.status = "Paid";
        await order.save();

        // Save payment information using the paymentModel
        const payment = new paymentModel({
            orderId,
            paymentMethod,
            amount,
            // Add any other payment-related fields here
        });
        await payment.save();

        // Respond with a success message
        res.status(200).send({
            success: true,
            message: "Payment successful",
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error processing payment",
            error,
        });
    }
};

// Function to initiate payment with Paystack API
const initiatePaystackPayment = async (amount, reference) => {
    try {
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                amount: amount * 100, // Paystack expects amount in kobo
                reference,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response.data,
        };
    }
};