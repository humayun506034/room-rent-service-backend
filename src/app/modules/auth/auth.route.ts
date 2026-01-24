import { Router } from "express";
import { auth_controllers } from "./auth.controller";


const authRoute = Router()

authRoute.post("/register",  auth_controllers.register_user)
authRoute.post("/temp-register",  auth_controllers.register_user)
authRoute.post("/login",  auth_controllers.login_user)
authRoute.post('/verify-register-otp', auth_controllers.verify_register_otp)
authRoute.post('/resend-register-otp', auth_controllers.resend_register_otp)
authRoute.post('/resend-login-otp', auth_controllers.resend_login_otp)
authRoute.post('/verify-login-otp', auth_controllers.verify_login_otp)
export default authRoute;
