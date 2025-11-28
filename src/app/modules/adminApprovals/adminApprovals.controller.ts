import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { adminApprovals_services } from "./adminApprovals.service";

const isNeedApartmentAdminApprovedStatus=catchAsync(async (req, res) => {
    const result = await adminApprovals_services.isNeedApartmentAdminApprovedStatus()
    manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Need Apartment Admin Approved Status fetched Successfully",
    data: result,
  });
})

export const adminApprovals_controllers={
    isNeedApartmentAdminApprovedStatus
}