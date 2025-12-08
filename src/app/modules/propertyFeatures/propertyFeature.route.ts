import { Router } from "express";
import { propertyFeatureController } from "./propertyFeatures.controller";
import auth from "../../middlewares/auth";

const propertyFeatureRoute = Router();

propertyFeatureRoute.get("/", propertyFeatureController.getAllPropertyFeature);

propertyFeatureRoute.post(
  "/",
  auth("ADMIN"),
  propertyFeatureController.addPropertyFeature
);

propertyFeatureRoute.delete(
  "/:id",
  auth("ADMIN"),
  propertyFeatureController.deletePropertyFeature
);

export default propertyFeatureRoute;
