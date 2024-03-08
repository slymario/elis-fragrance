import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
// import { paymentController } from "../controllers/paymentController.js"
import { 
    registerController, 
    loginController, 
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    createOrderController,
    getAllOrdersController,
    orderStatusController,
} from "../controllers/authController.js";


//router object
const router = express.Router();

//ROUTING
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//FORGOT PASSWORD || METHOD POST
router.post("/forgot-password", forgotPasswordController);

//TEST ROUTES
router.get("/test", requireSignIn, isAdmin, testController);

//PROTECTED USER ROUTES AUTHORIZATION
router.get("/user-auth", (req, res) => {
    res.status(200).send({ok: true});
});

//PROTECTED ADMIN ROUTES AUTHORIZATION
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
});

//UPDATE USER PROFILE
router.put("/profile", requireSignIn, updateProfileController);

//ORDERS
router.get("/orders", requireSignIn, getOrdersController);

router.post("/orders-create", requireSignIn, createOrderController);

//ALL ORDERS
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//ORDER STATUS UPDATE
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

//PAYMENT
// router.post("/payment", requireSignIn, paymentController);


export default router;