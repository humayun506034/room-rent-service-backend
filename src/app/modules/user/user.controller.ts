import { Request } from "express";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { user_services } from "./user.service";
import httpStatus from 'http-status';
import { AppError } from "../../utils/app_error";
import { uploadImageToSupabase } from "../../utils/uploadImageToSupabase";

const update_profile = catchAsync(async (
  req: Request & { loggedUser?: any },
  res
) => {

 

  // -----------------------------
  // Step-2: Parse data safely
  // -----------------------------
  let userInfoFromData;
    if(req.body.data) {
    userInfoFromData = JSON.parse(req.body.data);
    }

  if(userInfoFromData?.phone) {
    throw new AppError("Phone number cannot be updated.",httpStatus.BAD_REQUEST, );
  }

  if(req.file){
    console.log(req.file)
    const fileName = `${Date.now()}_${req.file.originalname}`;
          const uploadedUrl = await uploadImageToSupabase(req.file, fileName);
    
          // console.log({uploadedUrl})
    
          userInfoFromData.photo = uploadedUrl
  }


  console.log(userInfoFromData)

  // -----------------------------
  // Step-3: Update in DB
  // -----------------------------
  const result = await user_services.update_profile_into_db(
    req.loggedUser.phone,
    userInfoFromData
  );

  // -----------------------------
  // Step-4: Send Response
  // -----------------------------
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile update successful.",
    data: result,
  });
});

const getMyProfileInfo = catchAsync(async (req:Request & { loggedUser?: any}, res) => {
    const result = await user_services.getMyProfileInfo(req?.loggedUser?.phone)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Profile information fetched successfully.",
        data: result
    })
})


export const user_controllers={
    update_profile,
    getMyProfileInfo
}