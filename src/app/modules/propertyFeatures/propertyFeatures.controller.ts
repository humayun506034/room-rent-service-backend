import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { propertyFeatureService } from './propertyFeature.service';

const getAllPropertyFeature = catchAsync(async (req, res) => {
    const result = await propertyFeatureService.getAllPropertyFeature();
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property Feature fetched Successfully",
        data: result,
    });
})

const addPropertyFeature = catchAsync(async (req, res) => {
    const result = await propertyFeatureService.addPropertyFeature(req.body);
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property Feature added Successfully",
        data: result,
    });
});

const deletePropertyFeature = catchAsync(async (req, res) => {
    const result = await propertyFeatureService.deletePropertyFeature(req.params.id as string);
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property Feature deleted Successfully",
        data: result,
    });
});

export const propertyFeatureController = {
    addPropertyFeature,
    deletePropertyFeature,
    getAllPropertyFeature
}