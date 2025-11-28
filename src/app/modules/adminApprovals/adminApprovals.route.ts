import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../middlewares/upload";
import { adminApprovals_controllers } from "./adminApprovals.controller";

const router = Router()

router.get('/need-admin-approval-status', auth("ADMIN, OWNER, RENTER"), adminApprovals_controllers.isNeedApartmentAdminApprovedStatus)

export const adminApprovalRoutes= router;