import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { ProductService } from "./product.service";

const addProduct = catchAsync(async (req, res) => {
  console.log(req.body.data);
  console.log(req.file);

  const productData = JSON.parse(req.body.data);
  console.log({productData})
  
  const result = await ProductService.addProduct(req.body);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Added Successfully",
    data: result,
  });
});

export const ProductControllers = {
  addProduct,
};
