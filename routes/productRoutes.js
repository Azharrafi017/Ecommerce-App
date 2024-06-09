import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductContrller,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { updateProfileController } from "../controllers/authController.js";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid",requireSignIn,
isAdmin, deleteProductController);
//filter product
router.post('/product-filters',productFiltersController)

router.get("/product-list/:page", productListController);
//Search Product
router.get("/search/:keyword",searchProductContrller);
//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

router.get("/product-category/:slug", productCategoryController);

//category wise product
router.put("/profile", requireSignIn,updateProfileController);

export default router;
