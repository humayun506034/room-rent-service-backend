// import { NextFunction, Request, Response } from 'express';
// import { AppError } from '../utils/app_error';
// import { configs } from '../configs';
// import { jwtHelpers, JwtPayloadType } from '../utils/JWT';
// import { User_Model } from '../modules/user/user.schema';

// type Role = "ADMIN" | "USER"

// const auth = (...roles: Role[]) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const token = req.headers.authorization;
//             if (!token) {
//                 throw new AppError('You are not authorize!!', 401);
//             }
//             const verifiedUser = jwtHelpers.verifyToken(
//                 token,
//                 configs.jwt.access_token as string,
//             );
//             if (!roles.length || !roles.includes(verifiedUser.roles)) {
//                 throw new AppError('You are not authorize!!', 401);
//             }
//             // check user
//             const isUserExist = await User_Model.findOne({ email: verifiedUser?.email }).lean()
//             if (!isUserExist) {
//                 throw new AppError("Account not found !", 404)
//             }
//             if (isUserExist?.accountStatus == "INACTIVE") {
//                 throw new AppError("This Account is INACTIVE !", 401)
//             }
//             if (isUserExist?.accountStatus == "SUSPENDED") {
//                 throw new AppError("This Account is SUSPENDED !", 401)
//             }
//             if (isUserExist?.isDeleted) {
//                 throw new AppError("This account is deleted", 401)
//             }
//             if (!isUserExist?.isVerified) {
//                 throw new AppError("This account is not verified ", 401)
//             }

//             console.log(isUserExist)
//             req.user = verifiedUser as JwtPayloadType;
//             next();
//         } catch (err) {
//             next(err);
//         }
//     };
// };

// export default auth;

import { Request, Response, NextFunction, RequestHandler } from "express";
import { AppError } from "../utils/app_error";
import { jwtHelpers, JwtPayloadType } from "../utils/JWT";
import { configs } from "../configs";
import { User_Model } from "../modules/user/user.schema";

const auth = (...allowedRoles: string[]): RequestHandler => {
  return async (req: Request & { loggedUser?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError("You are not authorized!", 401);
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        configs.jwt.access_token as string
      );

      req.user = verifiedUser as JwtPayloadType;
      // console.log(verifiedUser)
      const isUserExist = await User_Model.findOne({
        phone: verifiedUser.phone,
      }).lean();

      if (!isUserExist) {
        throw new AppError("Account not found!", 404);
      }

      if (isUserExist.accountStatus === "INACTIVE") {
        throw new AppError("Account is INACTIVE!", 401);
      }

      if (isUserExist.accountStatus === "SUSPENDED") {
        throw new AppError("Account is SUSPENDED!", 401);
      }

      if (isUserExist.isDeleted) {
        throw new AppError("Account is deleted", 401);
      }

      if (!isUserExist.isVerified) {
        throw new AppError("Account is not verified", 401);
      }

      // role check for array supported
      if (allowedRoles.length > 0) {
        const userRoles = Array.isArray(verifiedUser.roles)
          ? verifiedUser.roles
          : [verifiedUser.roles];

        const isAllowed = userRoles.some((role) => allowedRoles.includes(role));

        if (!isAllowed) {
          throw new AppError("You are not authorized for this action!", 403);
        }
      }
      req.loggedUser = isUserExist

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
