import { Router } from "express";
import auth from "../../middlewares/auth";
import { BuildingAmenitiesController } from "./buildingAmenities.controller";

const buildingAmenitiesRoute = Router();

buildingAmenitiesRoute.get("/", BuildingAmenitiesController.getAllBuildingAmenities);

buildingAmenitiesRoute.post(
  "/",
  auth("ADMIN"),
  BuildingAmenitiesController.addBuildingAmenities
);

buildingAmenitiesRoute.delete(
  "/:id",
  auth("ADMIN"),
  BuildingAmenitiesController.deleteBuildingAmenities
);

export default buildingAmenitiesRoute;
