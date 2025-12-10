import httpStatus from "http-status";
import { AppError } from "../../utils/app_error";
import { TApartment } from "./product.interface";
import { Apartment } from "./product.schema";
import { User_Model } from "../user/user.schema";
import { AdminApprovals } from "../adminApprovals/adminApprovals.model";

const addProduct = async (data: TApartment) => {
  const isNeedApartmentAdminApprovedStatus = await AdminApprovals.findOne(
    {}
  ).lean();
  // console.log();

  const isNeedApprovedStatus =
    !isNeedApartmentAdminApprovedStatus?.isNeedApartmentAdminApproved;

  const productData = {
    ...data,
    isApproved: isNeedApprovedStatus,
  };

  const result = await Apartment.create(productData);
  return result;
};

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
  // console.log(filter);

  const isApartmentAdminApprovalStatus = await AdminApprovals.findOne(
    {}
  ).lean();
  // console.log();

  const isNormalApartmentShowStatus =
    isApartmentAdminApprovalStatus?.isNormalApartmentShow;

  // console.log(isNormalApartmentShowStatus);

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
  if (isNormalApartmentShowStatus === false) {
    query.listing_type = { $ne: "Normal Apartment" };
  }

  query.isApproved = true;

  const result = await Apartment.find(query);
  return result;
};

const getSingleProduct = async (_id: string) => {
  // console.log('hello')

  const result = await Apartment.findById(_id);
  // console.log(result)
  return result;
};

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

const getMySelfProduct = async (
  filter?: {
    listing_type: "Normal Apartment" | "Furnished Apartment";
    property_category?: "Home" | "Office";
    price_renger?: [number, number];
    city?: string;
    neighborhoods?: string[];
    bedrooms?: number;
    bathrooms?: number;
    advance_payment?: string;
    security_deposit?: string;
  },
  authorId?: string
) => {
  console.log(filter);
  const query: any = { authorId: authorId };

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

const getStack = async (authorId: string) => {
  const result = await Apartment.find({ authorId });

  const totalApartments = result.length;

  const totalViews = result.reduce(
    (sum, apt) => sum + (apt.viewedBy?.length || 0),
    0
  );

  const totalQueries = result.reduce(
    (sum, apt) => sum + (apt.queryBy?.length || 0),
    0
  );

  return {
    totalApartments,
    totalViews,
    totalQueries,
  };
};

const addFevouriteApartment = async (_id: any, apartmentId: string) => {
  const isItYourOwnApartment = await Apartment.findById(apartmentId);
  console.log(isItYourOwnApartment);

  if (isItYourOwnApartment?.authorId?.toString() === _id.toString()) {
    throw new AppError(
      "You can't favourite your own product",
      httpStatus.BAD_REQUEST
    );
  }

  const isAlreadyFevourite = await User_Model.find({
    _id,
    fevouriteAppartments: { $in: [apartmentId] },
  });
  console.log(_id);

  if (isAlreadyFevourite.length > 0) {
    throw new AppError("Product already fevourite", httpStatus.BAD_REQUEST);
  }

  const result = await User_Model.findOneAndUpdate(
    { _id },
    { $addToSet: { fevouriteAppartments: apartmentId } },
    { new: true }
  );
  return result;
};

const myselfFevouriteApartment = async (_id: any) => {
  const result = await User_Model.findById(_id)
    .populate("fevouriteAppartments")
    .select("fevouriteAppartments");
  return result;
};

const deleteFevouriteApartment = async (_id: any, apartmentId: string) => {
  await User_Model.findOneAndUpdate(
    { _id },
    { $pull: { fevouriteAppartments: apartmentId } },
    { new: true }
  );
};

// const getAllNotPublishedProduct = async () => {
//   const result = await Apartment.find({ isApproved: false });
//   return result;
// };

const getAllNotPublishedProduct = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const data = await Apartment.find({ isApproved: false })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // optional newest first

  const total = await Apartment.countDocuments({ isApproved: false });

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};

const makeProductPublished = async (_id: string) => {
  const findProduct = await Apartment.findOne({
    _id,
  });
  // console.log(findProduct);
  if (!findProduct) {
    throw new AppError("Product not found", httpStatus.BAD_REQUEST);
  }

  if (findProduct.isApproved) {
    throw new AppError("Product already published", httpStatus.CONFLICT);
  }
  const result = await Apartment.findOneAndUpdate(
    { _id },
    { isApproved: true },
    { new: true }
  );
  return result;
};

export const ProductService = {
  addProduct,
  getAllProduct,
  getSingleProduct,
  addBookingDate,
  getMySelfProduct,
  addViewedProduct,
  addQueryProduct,
  getStack,
  addFevouriteApartment,
  myselfFevouriteApartment,
  deleteFevouriteApartment,
  getAllNotPublishedProduct,
  makeProductPublished,
};
