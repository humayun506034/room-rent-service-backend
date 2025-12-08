import { Router } from "express";
import authRoute from "./app/modules/auth/auth.route";
import { userRoute } from "./app/modules/user/user.route";
import { productRoute } from "./app/modules/products/products.route";
import { adminApprovalRoutes } from "./app/modules/adminApprovals/adminApprovals.route";
import propertyFeatureRoute from "./app/modules/propertyFeatures/propertyFeature.route";
import buildingAmenitiesRoute from "./app/modules/buildingAmenities/buildingAmenities.route";

const appRouter = Router();

const moduleRoutes = [
  { path: "/auth", route: authRoute },
  { path: "/user", route: userRoute },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/admin-approval",
    route: adminApprovalRoutes,
  },
  {
    path: "/property-feature",
    route: propertyFeatureRoute,
  },
  {
    path: "/building-amenities",
    route: buildingAmenitiesRoute,
  },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
export default appRouter;
