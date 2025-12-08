import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { adminApprovals_services } from "./adminApprovals.service";

const isNeedApartmentAdminApprovedStatus = catchAsync(async (req, res) => {
  const { isNeedApartmentAdminApproved } =
    (await adminApprovals_services.isNeedApartmentAdminApprovedStatus()) as any;
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Need Apartment Admin Approved Status fetched Successfully",
    data: {
      isNeedApartmentAdminApproved,
    },
  });
});

const changeIsNeedApartmentAdminApprovedStatus = catchAsync(
  async (req, res) => {
    const { isNeedApartmentAdminApproved } =
      (await adminApprovals_services.changeIsNeedApartmentAdminApprovedStatus()) as any;
    manageResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Need Apartment Admin Approved Status changed Successfully",
      data: {
        isNeedApartmentAdminApproved,
      },
    });
  }
);

const isNormalApartmentShowStatus = catchAsync(async (req, res) => {
  const { isNormalApartmentShow } =
    (await adminApprovals_services.isNormalApartmentShowStatus()) as any;
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Normal Apartment Show Status fetched Successfully",
    data: {
      isNormalApartmentShow,
    },
  });
});

const changeIsNormalApartmentShowStatus = catchAsync(async (req, res) => {
  const { isNormalApartmentShow } =
    (await adminApprovals_services.changeIsNormalApartmentShowStatus()) as any;
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Normal Apartment Show Status changed Successfully",
    data: {
      isNormalApartmentShow,
    },
  });
});

export const adminApprovals_controllers = {
  isNeedApartmentAdminApprovedStatus,
  changeIsNeedApartmentAdminApprovedStatus,
  isNormalApartmentShowStatus,
  changeIsNormalApartmentShowStatus,
};
