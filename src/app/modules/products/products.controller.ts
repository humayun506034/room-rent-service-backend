import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { ProductService } from "./product.service";
import { uploadImageToSupabase } from "../../utils/uploadImageToSupabase";
import { Request } from "express";

const addProduct = catchAsync(
  async (req: Request & { loggedUser?: any }, res) => {
    // console.log(req.body.data);
    // console.log(req.files);
    console.log(req.loggedUser._id);

    const images = [];

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    for (const file of files) {
      const fileName = `${Date.now()}_${file.originalname}`;
      const uploadedUrl = await uploadImageToSupabase(file, fileName);

      // console.log({uploadedUrl})

      images.push({ link: uploadedUrl });
    }

    // console.log({images})

    const productData = JSON.parse(req.body.data);
    // console.log({productData})

    const payload = {
      ...productData,
      images,
      authorId: req.loggedUser._id,
    };

    // console.log(payload)

    const result = await ProductService.addProduct(payload);

    if (result.isApproved === true) {
      manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Product Added Successfully",
        data: result,
      });
    } else {
      manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Product Added Successfully wait for admin approval",
      });
    }
  }
);

const getAllProduct = catchAsync(async (req, res) => {
  const {
    property_category,
    listing_type,
    price_min,
    price_max,
    city,
    neighborhoods,
    bedrooms,
    bathrooms,
    advance_payment,
    security_deposit,
  } = req.query as any;

  const filter: any = {};

  if (property_category) filter.property_category = property_category;
  if (price_min && price_max) {
    filter.price_renger = [Number(price_min), Number(price_max)];
  }
  if (city) filter.city = city;

  if (neighborhoods) {
    filter.neighborhoods = Array.isArray(neighborhoods)
      ? neighborhoods
      : neighborhoods.split(",");
  }

  if (bedrooms) filter.bedrooms = Number(bedrooms);
  if (bathrooms) filter.bathrooms = Number(bathrooms);
  if (advance_payment) filter.advance_payment = advance_payment;
  if (security_deposit) filter.security_deposit = security_deposit;
  if (listing_type) filter.listing_type = listing_type;
  const result = await ProductService.getAllProduct(filter);

  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product fetched Successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const result = await ProductService.getSingleProduct(req.params.id);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product fetched Successfully",
    data: result,
  });
});

const addBookingDate = catchAsync(async (req, res) => {
  const result = await ProductService.addBookingDate(
    req.params.id,
    req.body.date
  );
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product booking date added Successfully",
    data: result,
  });
});

const getMySelfProduct = catchAsync(
  async (req: Request & { loggedUser?: any }, res) => {
    const {
      property_category,
      listing_type,
      price_min,
      price_max,
      city,
      neighborhoods,
      bedrooms,
      bathrooms,
      advance_payment,
      security_deposit,
    } = req.query as any;

    const filter: any = {};

    if (property_category) filter.property_category = property_category;
    if (price_min && price_max) {
      filter.price_renger = [Number(price_min), Number(price_max)];
    }
    if (city) filter.city = city;

    if (neighborhoods) {
      filter.neighborhoods = Array.isArray(neighborhoods)
        ? neighborhoods
        : neighborhoods.split(",");
    }

    if (bedrooms) filter.bedrooms = Number(bedrooms);
    if (bathrooms) filter.bathrooms = Number(bathrooms);
    if (advance_payment) filter.advance_payment = advance_payment;
    if (security_deposit) filter.security_deposit = security_deposit;
    if (listing_type) filter.listing_type = listing_type;
    const result = await ProductService.getMySelfProduct(
      filter,
      req.loggedUser._id
    );
    manageResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product fetched Successfully",
      data: result,
    });
  }
);

const addViewedProduct = catchAsync(
  async (req: Request & { loggedUser?: any }, res) => {
    const result = await ProductService.addViewedProduct(
      req.params.id,
      req.loggedUser._id
    );
    manageResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product viewed Successfully",
      data: result,
    });
  }
);

const addQueryProduct = catchAsync(
  async (req: Request & { loggedUser?: any }, res) => {
    const result = await ProductService.addQueryProduct(
      req.params.id,
      req.loggedUser._id
    );
    manageResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product queried Successfully",
      data: result,
    });
  }
);

const getStack = catchAsync(
  async (req: Request & { loggedUser?: any }, res) => {
    const result = await ProductService.getStack(req.loggedUser._id);
    manageResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Stack get Successfully",
      data: result,
    });
  }
);

const addFevouriteApartment = catchAsync(
  async (req: Request & { loggedUser?: any }, res) => {
    const result = await ProductService.addFevouriteApartment(
      req.loggedUser._id,
      req.body.apartmentId
    );
    manageResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product fevourite Successfully",
      data: result,
    });
  }
);

const myselfFevouriteApartment = catchAsync(
  async (req: Request & { loggedUser?: any }, res) => {
    const result = await ProductService.myselfFevouriteApartment(
      req.loggedUser._id
    );
    manageResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: " fevourites apartment get Successfully",
      data: result,
    });
  }
);

const deleteFevouriteApartment = catchAsync(
  async (req: Request & { loggedUser?: any }, res) => {
    const result = await ProductService.deleteFevouriteApartment(
      req.loggedUser._id,
      req.body.apartmentId
    );
    manageResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Deleted Successfully",
      data: result,
    });
  }
);

const getAllNotPublishedProduct = catchAsync(
  async (req: Request & { loggedUser?: any }, res) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const result = await ProductService.getAllNotPublishedProduct(
      page,
      limit
    );

    manageResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product fetched Successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);


const makeProductPublished =catchAsync(
  async (req: Request & { loggedUser?: any }, res) => {
    const result = await ProductService.makeProductPublished(req.params._id);
    manageResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product approved Successfully",
      data: result,
    });
  }
)


export const ProductControllers = {
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
  makeProductPublished
};
