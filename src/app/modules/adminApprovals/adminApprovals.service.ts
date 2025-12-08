import { AdminApprovals } from "./adminApprovals.model"

const isNeedApartmentAdminApprovedStatus = async () => {
    const result = AdminApprovals.findOne({}).lean().select("isNeedApartmentAdminApproved")
    // console.log(result)
    return result
}


const changeIsNeedApartmentAdminApprovedStatus = async () => {
  const current = await AdminApprovals.findOne({}).select(
    "isNeedApartmentAdminApproved"
  );

  if (!current) {
    throw new Error("Admin approval settings not found");
  }

 
  const result = await AdminApprovals.findOneAndUpdate(
      {_id:current._id},
      { isNeedApartmentAdminApproved: !current.isNeedApartmentAdminApproved },
      { new: true }
  ).select("isNeedApartmentAdminApproved")

  return result
};
const isNormalApartmentShowStatus = async () => {
    const result = AdminApprovals.findOne({}).lean().select("isNormalApartmentShow")
    // console.log(result)
    return result
}


const changeIsNormalApartmentShowStatus = async () => {
  const current = await AdminApprovals.findOne({}).select(
    "isNormalApartmentShow"
  );

  if (!current) {
    throw new Error("Normal Apartment Show settings not found");
  }

 
  const result = await AdminApprovals.findOneAndUpdate(
      {_id:current._id},
      { isNormalApartmentShow: !current.isNormalApartmentShow },
      { new: true }
  ).select("isNormalApartmentShow")

  return result
};

export const adminApprovals_services = {
    isNeedApartmentAdminApprovedStatus,
    changeIsNeedApartmentAdminApprovedStatus,
    isNormalApartmentShowStatus,
    changeIsNormalApartmentShowStatus
}