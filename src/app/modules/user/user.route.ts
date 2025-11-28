import { NextFunction, Request, Response, Router } from "express";
import { user_controllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { upload } from "../../middlewares/upload";

const router = Router()


router.get('/get-myself-profile', auth("ADMIN","USER","RENTER"), user_controllers.getMyProfileInfo)

router.patch(
    "/update-profile",
    auth("ADMIN" , "RENTER","OWNER"),
    upload.single("image"),
   user_controllers.update_profile
)


export const userRoute= router;