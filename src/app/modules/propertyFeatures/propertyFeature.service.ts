import httpStatus from "http-status";
import { AppError } from "../../utils/app_error";
import { IPropertyFeature } from "./propertyFeatures.interface";
import { PropertyFeature } from "./propertyFeatures.model";


const getAllPropertyFeature = async () => {
    const result = await PropertyFeature.find().lean();
    return result;
};

const addPropertyFeature = async (data: IPropertyFeature) => {
  const isPropertyFeatureExist = await PropertyFeature.findOne({
    featureName: data.featureName,
  }).lean();

  if (isPropertyFeatureExist) {
    throw new AppError("Property Feature already exist", httpStatus.CONFLICT);
  }

  const result = await PropertyFeature.create(data);
  return result;
};

const deletePropertyFeature = async (id: string) => {
  const isPropertyFeatureExist = await PropertyFeature.findById(id);

  if (!isPropertyFeatureExist) {
    throw new AppError("Property Feature not found", httpStatus.NOT_FOUND);
  }

  await PropertyFeature.findByIdAndDelete(id);
  return null;
};

export const propertyFeatureService = {
  addPropertyFeature,
  deletePropertyFeature,
  getAllPropertyFeature
};
