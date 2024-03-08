import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js"
import {
    categoryController,
    singleCategoryController,
    createCategoryController, 
    updateCategoryController,
    deleteCategoryController,
} from "../controllers/categoryController.js";


//ROUTER OBJECT
const router = express.Router();


//ROUTES

// CREATE CATEGORY
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);


//UPDATE CATEGORY
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);


//GETALL CATEGORY
router.get("/get-category", categoryController)


//SINGLE CATEGORY
router.get("/single-category/:slug", singleCategoryController);


//DELETE CATEGORY
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);



export default router;