import {Router } from "express";
import auth from "../../middlewares/auth";
import { adminApprovals_controllers } from "./adminApprovals.controller";

const router = Router()

router.get('/need-admin-approval-status', auth("ADMIN"), adminApprovals_controllers.isNeedApartmentAdminApprovedStatus)
router.get('/need-show-normal-apartment-status', auth("ADMIN"), adminApprovals_controllers.isNormalApartmentShowStatus)
router.patch('/need-admin-approval-status', auth("ADMIN"), adminApprovals_controllers.changeIsNeedApartmentAdminApprovedStatus)
router.patch('/need-show-normal-apartment-status', auth("ADMIN"), adminApprovals_controllers.changeIsNormalApartmentShowStatus)

export const adminApprovalRoutes= router;