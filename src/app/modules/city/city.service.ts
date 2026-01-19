import httpStatus from "http-status";
import { AppError } from "../../utils/app_error";
import { City } from "./city.model";
import { ICity } from "./city.interface";

const getCities = async () => {
  const result = await City.find().lean();
  return result;
};

const addCity = async (data: ICity) => {
  const isCityExist = await City.findOne({
    cityName: data.cityName,
  }).lean();

  if (isCityExist) {
    throw new AppError("City already exist", httpStatus.CONFLICT);
  }

  const result = await City.create(data);
  return result;
};

const deleteCity = async (id: string) => {
  const isCityExist = await City.findById(id);

  if (!isCityExist) {
    throw new AppError("City not found", httpStatus.NOT_FOUND);
  }

  await City.findByIdAndDelete(id);
  return null;
};

export const CityService = {
  getCities,
  addCity,
  deleteCity,
};
