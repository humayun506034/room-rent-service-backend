import httpStatus from "http-status";
import { AppError } from "../../utils/app_error";

import { BuildingAmenities } from "./buildingAmenities.model";
import { IBuildingAmenities } from "./buildingAmenities.interface";

const getBuildingAmenities = async () => {
  const result = await BuildingAmenities.find().lean();
  return result;
};

const addBuildingAmenities = async (data: IBuildingAmenities) => {
  const isBuildingAmenitiesExist = await BuildingAmenities.findOne({
    amenitiesName: data.amenitiesName,
  }).lean();

  if (isBuildingAmenitiesExist) {
    throw new AppError("Building Amenities already exist", httpStatus.CONFLICT);
  }

  const result = await BuildingAmenities.create(data);
  return result;
};

const deleteBuildingAmenities = async (id: string) => {
  const isBuildingAmenitiesExist = await BuildingAmenities.findById(id);

  if (!isBuildingAmenitiesExist) {
    throw new AppError("Building Amenities not found", httpStatus.NOT_FOUND);
  }

  await BuildingAmenities.findByIdAndDelete(id);
  return null;
};

export const BuildingAmenitiesService = {
  getBuildingAmenities,
  addBuildingAmenities,
  deleteBuildingAmenities,
};
