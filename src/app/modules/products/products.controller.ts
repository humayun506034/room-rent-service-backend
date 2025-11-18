import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { ProductService } from "./product.service";

const addProduct = catchAsync(async (req, res) => {
  const result = await ProductService.addProduct(req.body);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile update successful.",
    data: result,
  });
});

export const ProductControllers = {
  addProduct,
};
