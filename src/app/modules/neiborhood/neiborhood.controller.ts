import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { NeiborhoodService } from "./neiborhood.service";

const getAllNeiborhoods = catchAsync(async (req, res) => {
  const result = await NeiborhoodService.getNeiborhoods();
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Neiborhood fetched Successfully",
    data: result,
  });
});

const addNeiborhood = catchAsync(async (req, res) => {
  const result = await NeiborhoodService.addNeiborhood(req.body);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Neiborhood added Successfully",
    data: result,
  });
});

const deleteNeiborhood = catchAsync(async (req, res) => {
  const result = await NeiborhoodService.deleteNeiborhood(req.params.id as string);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Neiborhood deleted Successfully",
    data: result,
  });
});

export const NeiborhoodController = {
  getAllNeiborhoods,
  addNeiborhood,
  deleteNeiborhood,
};
