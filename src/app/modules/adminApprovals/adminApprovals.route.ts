import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../middlewares/upload";
import { adminApprovals_controllers } from "./adminApprovals.controller";

const router = Router()

router.get('/need-admin-approval-status', auth("ADMIN"), adminApprovals_controllers.isNeedApartmentAdminApprovedStatus)
router.patch('/need-admin-approval-status', auth("ADMIN"), adminApprovals_controllers.changeIsNeedApartmentAdminApprovedStatus)

export const adminApprovalRoutes= router;