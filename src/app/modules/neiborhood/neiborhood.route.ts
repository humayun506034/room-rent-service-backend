import { Router } from "express";
import auth from "../../middlewares/auth";
import { NeiborhoodController } from "./neiborhood.controller";

const neiborhoodRoute = Router();

neiborhoodRoute.get("/", NeiborhoodController.getAllNeiborhoods);

neiborhoodRoute.post("/", auth("ADMIN"), NeiborhoodController.addNeiborhood);

neiborhoodRoute.delete(
  "/:id",
  auth("ADMIN"),
  NeiborhoodController.deleteNeiborhood
);

export default neiborhoodRoute;
