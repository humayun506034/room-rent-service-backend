import { Router } from "express";
import { auth_controllers } from "./auth.controller";


const authRoute = Router()

authRoute.post("/register",  auth_controllers.register_user)
// authRoute.post("/login",  auth_controllers.login_user)


export default authRoute;
