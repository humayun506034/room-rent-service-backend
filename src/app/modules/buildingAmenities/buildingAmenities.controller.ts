import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { BuildingAmenitiesService } from "./buildingAmenities.service";

const getAllBuildingAmenities = catchAsync(async (req, res) => {
  const result = await BuildingAmenitiesService.getBuildingAmenities();
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Building Amenities fetched Successfully",
    data: result,
  });
});

const addBuildingAmenities = catchAsync(async (req, res) => {
  const result = await BuildingAmenitiesService.addBuildingAmenities(req.body);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Building Amenities added Successfully",
    data: result,
  });
});

const deleteBuildingAmenities = catchAsync(async (req, res) => {
  const result = await BuildingAmenitiesService.deleteBuildingAmenities(
    req.params.id as string
  );
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Building Amenities deleted Successfully",
    data: result,
  });
});

export const BuildingAmenitiesController = {
  getAllBuildingAmenities,
  addBuildingAmenities,
  deleteBuildingAmenities,
};
