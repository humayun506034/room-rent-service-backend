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

const login_user = catchAsync(async (req, res) => {
    const result = await auth_services.login_user_from_db(req.body);

   
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successful !',
        data: result,
      

    });
});


export const auth_controllers = {
    register_user,
    login_user,
  
}