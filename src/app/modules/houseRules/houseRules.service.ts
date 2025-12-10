import httpStatus from "http-status";
import { AppError } from "../../utils/app_error";
import { HouseRules } from "./houseRules.model";
import { IHouseRules } from "./houseRules.interface";



const getHouseRules = async () => {
  const result = await HouseRules.find().lean();
  return result;
};

const addHourseRules = async (data: IHouseRules) => {
  const isHourseRulesExist = await HouseRules.findOne({
    rulesName: data.rulesName,
  }).lean();

  if (isHourseRulesExist) {
    throw new AppError("House Rules already exist", httpStatus.CONFLICT);
  }

  const result = await HouseRules.create(data);
  return result;
};

const deleteHourseRules = async (id: string) => {
  const isHourseRulesExist = await HouseRules.findById(id);

  if (!isHourseRulesExist) {
    throw new AppError("House Rules not found", httpStatus.NOT_FOUND);
  }

  await HouseRules.findByIdAndDelete(id);
  return null;
};

export const HouseRulesService = {
  getHouseRules,
  addHourseRules,
  deleteHourseRules,
};
