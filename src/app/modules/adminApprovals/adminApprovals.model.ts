import { Schema, model } from "mongoose";
import { IAdminApprovals } from "./adminApprovals.interface";

const AdminApprovalsSchema = new Schema<IAdminApprovals>(
  {
    isNeedApartmentAdminApproved: {
      type: Boolean,
      default: true,
    },
    isNormalApartmentShow: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AdminApprovals = model<IAdminApprovals>(
  "AdminApprovals",
  AdminApprovalsSchema
);