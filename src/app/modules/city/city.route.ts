import { Router } from "express";
import auth from "../../middlewares/auth";
import { CityController } from "./city.controller";

const cityRoute = Router();

cityRoute.get("/", CityController.getAllCities);

cityRoute.post("/", auth("ADMIN"), CityController.addCity);

cityRoute.delete("/:id", auth("ADMIN"), CityController.deleteCity);

export default cityRoute;
