import { Request } from "express"
import uploadCloud from "../../utils/cloudinary";
import { User_Model } from "./user.schema";
import { TUser } from "./user.interface";

const update_profile_into_db = async (phone:string, data:Partial<TUser>) => {

    const isUserExist = await User_Model.findOne({ phone }).lean()
    if(!isUserExist) {
        throw new Error("User not found")
    }
    const result = await User_Model.findOneAndUpdate({ phone }, data, { new: true })
    return result   

}


const getMyProfileInfo = async(phone:string) => {
    const result = await User_Model.findOne({ phone }).lean()
    return result
}



export const user_services = {
    update_profile_into_db,
    getMyProfileInfo,
    
}