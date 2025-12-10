import { Router } from "express";
import auth from "../../middlewares/auth";
import { HouseRulesController } from "./houseRules.controller";

const houseRulesRoute = Router();

houseRulesRoute.get("/", HouseRulesController.getAllHouseRules);

houseRulesRoute.post(
  "/",
  auth("ADMIN"),
  HouseRulesController.addHouseRules
);

houseRulesRoute.delete(
  "/:id",
  auth("ADMIN"),
  HouseRulesController.deleteHouseRules
);

export default houseRulesRoute;
