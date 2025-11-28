import { AdminApprovals } from "./adminApprovals.model"

const isNeedApartmentAdminApprovedStatus = async () => {
    const result = AdminApprovals.findOne({}).lean()
    console.log(result)
}

export const adminApprovals_services = {
    isNeedApartmentAdminApprovedStatus
}