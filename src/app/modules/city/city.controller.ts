import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { CityService } from "./city.service";

const getAllCities = catchAsync(async (req, res) => {
  const result = await CityService.getCities();
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "City fetched Successfully",
    data: result,
  });
});

const addCity = catchAsync(async (req, res) => {
  const result = await CityService.addCity(req.body);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "City added Successfully",
    data: result,
  });
});

const deleteCity = catchAsync(async (req, res) => {
  const result = await CityService.deleteCity(req.params.id);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "City deleted Successfully",
    data: result,
  });
});

export const CityController = {
  getAllCities,
  addCity,
  deleteCity,
};
