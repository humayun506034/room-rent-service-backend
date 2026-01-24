import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { HouseRulesService } from "./houseRules.service";

const getAllHouseRules = catchAsync(async (req, res) => {
  const result = await HouseRulesService.getHouseRules();
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "House Rules fetched Successfully",
    data: result,
  });
});

const addHouseRules = catchAsync(async (req, res) => {
  const result = await HouseRulesService.addHourseRules(req.body);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "House Rules added Successfully",
    data: result,
  });
});

const deleteHouseRules = catchAsync(async (req, res) => {
  const result = await HouseRulesService.deleteHourseRules(
    req.params.id as string
  );
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "House Rules deleted Successfully",
    data: result,
  });
});

export const HouseRulesController = {
  getAllHouseRules,
  addHouseRules,
  deleteHouseRules
};
