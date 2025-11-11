import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { products_controller } from "./products.controller";
import { products_validations } from "./products.validation";

const products_router = Router();

products_router.post(
  "/create",
  RequestValidator(products_validations.create),
  products_controller.create_new_products
);

export default products_router;
