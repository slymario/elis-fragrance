import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { 
    createProductController, 
    deleteProductController, 
    getProductController,
    getSingleProductController,
    productPhotoController,
    productFiltersController,
    productCountController,
    productListController,
    searchProductController,
    updateProductController,
    relatedProductController,
    productCategoryController,
} from "../controllers/productController.js";
import formidable from "express-formidable";



const router = express.Router();




//ROUTES
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

//UPDATE PRODUCT
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

//GET PRODUCTS
router.get("/get-product", requireSignIn, isAdmin, formidable(), getProductController);

//SINGLE PRODUCT
router.get("/get-product/:slug", getSingleProductController );

//GET PHOTO
router.get("/product-photo/:pid", productPhotoController);

//DELETE PRODUCT
router.delete("/delete-product/:pid", deleteProductController);

//FILTER PRODUCT
router.post("/product-filters", productFiltersController);

//PRODUCT COUNT
router.get("/product-count", productCountController);

//PRODUCT PER PAGE
router.get("/product-list/:page", productListController);

//SEARCH PRODUCT
router.get("/search/:keyword", searchProductController);

//SIMILAR PRODUCTS
router.get("/related-product/:pid/:cid", relatedProductController);

//CATEGORYWISE PRODUCT
router.get("/product-category/:slug", productCategoryController);



export default router;