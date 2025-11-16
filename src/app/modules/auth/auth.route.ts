import { Router } from "express";
import { auth_controllers } from "./auth.controller";


const authRoute = Router()

authRoute.post("/register",  auth_controllers.register_user)
authRoute.post("/login",  auth_controllers.login_user)
authRoute.post('/verify-register-otp', auth_controllers.verify_register_otp)


export default authRoute;
