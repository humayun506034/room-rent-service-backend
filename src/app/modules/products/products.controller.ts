import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { products_service } from "./products.service";

const create_new_products = catchAsync(async (req, res) => {
  const result = await products_service.create_new_products_into_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New products created successfully!",
    data: result,
  });
});

export const products_controller = { create_new_products };
