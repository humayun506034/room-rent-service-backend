import { configs } from "../../configs";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { auth_services } from "./auth.service";
import httpStatus from 'http-status';

const register_user = catchAsync(async (req, res) => {
    const result = await auth_services.register_user_into_db(req?.body)
    manageResponse(res, {
        success: true,
        message: "Account created successful",
        statusCode: httpStatus.OK,
        data: result
    })
})

const temp_register = catchAsync(async (req, res) => {
    const result = await auth_services.temp_register(req?.body)
    manageResponse(res, {
        success: true,
        message: "Account created successful",
        statusCode: httpStatus.OK,
        data: result
    })
})

const resend_register_otp = catchAsync(async (req, res) => {
    const result = await auth_services.resend_register_otp(req?.body)
    manageResponse(res, {
        success: true,
        message: "Opt resend successful",
        statusCode: httpStatus.OK,
        data: result
    })
})

const verify_register_otp = catchAsync(async (req, res) => {
    const result = await auth_services.verify_register_otp(req?.body)
    manageResponse(res, {
        success: true,
        message: "Account verified successful",
        statusCode: httpStatus.OK,
        data: result
    })
})



const login_user = catchAsync(async (req, res) => {
    const result = await auth_services.login_user_from_db(req.body);

   
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successful !',
        data: result,
      

    });
});


const resend_login_otp = catchAsync(async (req, res) => {
    const result = await auth_services.resend_login_otp(req?.body)
    manageResponse(res, {
        success: true,
        message: "Opt resend successful",
        statusCode: httpStatus.OK,
        data: result
    })
})

const verify_login_otp = catchAsync(async (req, res) => {
    const result = await auth_services.verify_login_otp(req?.body)
    manageResponse(res, {
        success: true,
        message: "Login successful",
        statusCode: httpStatus.OK,
        data: result
    })
})

export const auth_controllers = {
    register_user,
    verify_register_otp,
    login_user,
    resend_register_otp,
    resend_login_otp,
    verify_login_otp,
    temp_register
  
}