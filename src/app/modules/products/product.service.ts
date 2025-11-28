import httpStatus from 'http-status';
import { AppError } from "../../utils/app_error"
import { TApartment } from "./product.interface"
import { Apartment } from "./product.schema"

const addProduct = async(data:TApartment)=>{
    // console.log({data})

    const result = await Apartment.create(data)
    return result
}

const getAllProduct = async (filter?: {
   listing_type: "Normal Apartment" | "Furnished Apartment";
  property_category?: "Home" | "Office";
  price_renger?: [number, number];
  city?: string;
  neighborhoods?: string[];
  bedrooms?: number;
  bathrooms?: number;
  advance_payment?: string;
  security_deposit?: string;
}) => {

    console.log(filter)
  const query: any = {};

  if (filter?.property_category) {
    query.property_category = filter.property_category;
  }

  if (filter?.listing_type) {
    query.listing_type = filter.listing_type;
  }

  if (filter?.price_renger) {
    const [min, max] = filter.price_renger;
    query.monthly_rent = { $gte: min, $lte: max };
  }

  if (filter?.city) {
    query.city_name = filter.city;
  }
  if (filter?.neighborhoods && filter.neighborhoods.length > 0) {
    query.neighborhood = { $in: filter.neighborhoods };
  }

  if (filter?.bedrooms) {
    query.bedrooms = filter.bedrooms;
  }

  if (filter?.bathrooms) {
    query.bathrooms = filter.bathrooms;
  }

  if (filter?.advance_payment) {
    query.advance_payment = filter.advance_payment;
  }

  if (filter?.security_deposit) {
    query.security_deposit = filter.security_deposit;
  }

  const result = await Apartment.find(query);
  return result;
};


const getSingleProduct = async(_id:string)=>{
    // console.log('hello')

    const result = await Apartment.findById(_id)
    // console.log(result)
    return result
}


const addBookingDate = async (_id: string, date: any) => {
  const isProductExist = await Apartment.findById(_id);
  if (!isProductExist) {
    throw new AppError("Product not found", httpStatus.NOT_FOUND);
  }

    if ((isProductExist?.booking_dates as any[]).includes(date)) {
    throw new AppError("This date is already booked", httpStatus.BAD_REQUEST);
  }

  const result = await Apartment.findByIdAndUpdate(
    _id,
   { $push: { booking_dates: date } },
    { new: true }
  );

  return result;
};

const getMySelfProduct = async (filter?: {
   listing_type: "Normal Apartment" | "Furnished Apartment";
  property_category?: "Home" | "Office";
  price_renger?: [number, number];
  city?: string;
  neighborhoods?: string[];
  bedrooms?: number;
  bathrooms?: number;
  advance_payment?: string;
  security_deposit?: string;
}, authorId?:string) => {

    console.log(filter)
  const query: any = {authorId:authorId};

  if (filter?.property_category) {
    query.property_category = filter.property_category;
  }

  if (filter?.listing_type) {
    query.listing_type = filter.listing_type;
  }

  if (filter?.price_renger) {
    const [min, max] = filter.price_renger;
    query.monthly_rent = { $gte: min, $lte: max };
  }

  if (filter?.city) {
    query.city_name = filter.city;
  }
  if (filter?.neighborhoods && filter.neighborhoods.length > 0) {
    query.neighborhood = { $in: filter.neighborhoods };
  }

  if (filter?.bedrooms) {
    query.bedrooms = filter.bedrooms;
  }

  if (filter?.bathrooms) {
    query.bathrooms = filter.bathrooms;
  }

  if (filter?.advance_payment) {
    query.advance_payment = filter.advance_payment;
  }

  if (filter?.security_deposit) {
    query.security_deposit = filter.security_deposit;
  }

  const result = await Apartment.find(query);
  return result;
};

const addViewedProduct = async (_id: string, authorId: string) => {

//  const isAlreadyViewed = await Apartment.find({_id,viewedBy:{$in:[authorId]}})

//  if(isAlreadyViewed.length>0){
//     throw new AppError("Product already viewed", httpStatus.BAD_REQUEST);
//  }
  const result = await Apartment.findByIdAndUpdate(
    _id,
{ $addToSet: { viewedBy: authorId } },
    { new: true }
  );
  return result;
};

const addQueryProduct = async (_id: string, authorId: string) => {

//  const isAlreadyViewed = await Apartment.find({_id,viewedBy:{$in:[authorId]}})

//  if(isAlreadyViewed.length>0){
//     throw new AppError("Product already viewed", httpStatus.BAD_REQUEST);
//  }
  const result = await Apartment.findByIdAndUpdate(
    _id,
{ $addToSet: { queryBy: authorId } },
    { new: true }
  );
  return result;
};



export const ProductService ={
    addProduct,
    getAllProduct,
    getSingleProduct,
    addBookingDate,
    getMySelfProduct,
    addViewedProduct,
    addQueryProduct
}