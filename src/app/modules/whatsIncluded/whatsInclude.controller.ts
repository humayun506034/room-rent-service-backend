import { WhatsInclude } from './whatsInclude.model';
import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { WhatsIncludeService } from "./whatsInclude.service";

const getWhatsInclude = catchAsync(async (req, res) => {
  const result = await WhatsIncludeService.getWhatsInclude();
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Whats Include fetched Successfully",
    data: result,
  });
});

const addWhatsInclude = catchAsync(async (req, res) => {
  const result = await WhatsIncludeService.addWhatsInclude(req.body);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Whats Include added Successfully",
    data: result,
  });
});

const deleteWhatsInclude = catchAsync(async (req, res) => {
  const result = await WhatsIncludeService.deleteWhatsInclude(
    req.params.id
  );
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Whats Include deleted Successfully",
    data: result,
  });
});

export const WhatsIncludeController = {
  getWhatsInclude,
  addWhatsInclude,
  deleteWhatsInclude
};
