import { NextFunction, Request, Response, Router } from "express";
import uploader from "../../middlewares/uploader";

import auth from "../../middlewares/auth";
import { ProductControllers } from "./products.controller";

const userRoute = Router();

// userRoute.patch(
//     "/update-profile",
//     auth("ADMIN","USER"),
//     uploader.single("image"),
//     (req: Request, res: Response, next: NextFunction) => {
//         ProductControllers.addProduct()
//     },
// )
userRoute.post(
  "/update-profile",
  auth("ADMIN"),
  // uploader.single("image"),
  ProductControllers.addProduct
);

export default userRoute;
