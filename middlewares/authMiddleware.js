import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";


//PROTECTED ROUTES TOKEN BASE
export const requireSignIn = async (req, res, next) => {
    try {
        console.log("AUTH", req.headers)
        console.log("Authorization Header:", req.headers.authorization);
        let token = getToken(req.headers.authorization)
        console.log("Token:", token);
        if (!token) {
            console.log("Token not provided");
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token not provided",
            });
        }
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        console.log("Decoded user:", decode);
        req.user = decode;
        next();
    } catch (error) {
        console.log('Error', error);
    }
};

//ADMIN ACCESS
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in Admin Middleware"
        })
    }
};

const getToken = (authorization) => {
    if (authorization && authorization.split(" ")[0] === "Bearer") {
        return authorization.split(" ")[1];
    } 
    return authorization;
}