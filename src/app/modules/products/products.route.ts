import { Router } from "express";

import auth from "../../middlewares/auth";
import { ProductControllers } from "./products.controller";
import { upload } from "../../middlewares/upload";

const router = Router();




router.get('/get-all',ProductControllers.getAllProduct)
router.get('/get-single/:id', ProductControllers.getSingleProduct)
router.get("/get-myself-product",auth("ADMIN" , "RENTER","OWNER"), ProductControllers.getMySelfProduct)

router.post(
  "/",
  auth("ADMIN" , "RENTER","OWNER"),
  upload.array("images"),
  ProductControllers.addProduct
);

router.post('/add-booking-date/:id',  auth("ADMIN" , "RENTER","OWNER"),
 ProductControllers.addBookingDate)

 router.post('/add-viewed-product/:id', auth("ADMIN" , "RENTER","OWNER"), ProductControllers.addViewedProduct)


  router.post('/add-query-product/:id', auth("ADMIN" , "RENTER","OWNER"), ProductControllers.addQueryProduct)


export const productRoute=router;
