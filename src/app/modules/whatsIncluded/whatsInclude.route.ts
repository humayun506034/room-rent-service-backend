import { Router } from "express";
import auth from "../../middlewares/auth";
import { WhatsIncludeController } from "./whatsInclude.controller";

const whatsIncludeRoute = Router();

whatsIncludeRoute.get("/", WhatsIncludeController.getWhatsInclude);

whatsIncludeRoute.post(
  "/",
  auth("ADMIN"),
  WhatsIncludeController.addWhatsInclude
);

whatsIncludeRoute.delete(
  "/:id",
  auth("ADMIN"),
  WhatsIncludeController.deleteWhatsInclude
);

export default whatsIncludeRoute;
