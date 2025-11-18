import { NextFunction, Request, Response, Router } from "express";
import uploader from "../../middlewares/uploader";

import auth from "../../middlewares/auth";
import { ProductControllers } from "./products.controller";

const productRoute = Router();

// userRoute.patch(
//     "/update-profile",
//     auth("ADMIN","USER"),
//     uploader.single("image"),
//     (req: Request, res: Response, next: NextFunction) => {
//         ProductControllers.addProduct()
//     },
// )
productRoute.post(
  "/",
  auth("ADMIN", "RENTER"),
  uploader.array("images"),
  ProductControllers.addProduct
);

export default productRoute;
