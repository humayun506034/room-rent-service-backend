import httpStatus from "http-status";
import { AppError } from "../../utils/app_error";
import { WhatsInclude } from "./whatsInclude.model";
import { IWhatsInclude } from "./whatsInclude.interface";



const getWhatsInclude = async () => {
  const result = await WhatsInclude.find().lean();
  return result;
};


const addWhatsInclude = async (data: IWhatsInclude) => {
  const isWhatsIncludeExist = await WhatsInclude.findOne({
    name: data.name,
  }).lean();

  if (isWhatsIncludeExist) {
    throw new AppError("Whats Include already exist", httpStatus.CONFLICT);
  }

  const result = await WhatsInclude.create(data);
  return result;
};

const deleteWhatsInclude = async (id: string) => {
  const isWhatsIncludeExist = await WhatsInclude.findById(id);

  if (!isWhatsIncludeExist) {
    throw new AppError("Whats Include not found", httpStatus.NOT_FOUND);
  }

  await WhatsInclude.findByIdAndDelete(id);
  return null;
};

export const WhatsIncludeService = {
  getWhatsInclude,
  addWhatsInclude,
  deleteWhatsInclude,
};
