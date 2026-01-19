import httpStatus from "http-status";
import { AppError } from "../../utils/app_error";
import { Neiborhood } from "./neiborhood.model";
import { INeiborhood } from "./neiborhood.interface";

const getNeiborhoods = async () => {
  const result = await Neiborhood.find().lean();
  return result;
};

const addNeiborhood = async (data: INeiborhood) => {
  const isNeiborhoodExist = await Neiborhood.findOne({
    neiborhoodName: data.neiborhoodName,
  }).lean();

  if (isNeiborhoodExist) {
    throw new AppError("Neiborhood already exist", httpStatus.CONFLICT);
  }

  const result = await Neiborhood.create(data);
  return result;
};

const deleteNeiborhood = async (id: string) => {
  const isNeiborhoodExist = await Neiborhood.findById(id);

  if (!isNeiborhoodExist) {
    throw new AppError("Neiborhood not found", httpStatus.NOT_FOUND);
  }

  await Neiborhood.findByIdAndDelete(id);
  return null;
};

export const NeiborhoodService = {
  getNeiborhoods,
  addNeiborhood,
  deleteNeiborhood,
};
