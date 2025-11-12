import { Response } from "express"
interface IResponse<T> {
    success: boolean,
    statusCode: number,
    message: string,
    data?: T,
    meta?: {
        page?: number,
        limit?: number,
        skip?: number,
        total?: number
    }
}

const manageResponse = <T>(res: Response, payload: IResponse<T>) => {
  const body = {
    success: payload.success,
    ...(payload.message !== undefined ? { message: payload.message } : {}),
    ...(payload.data != null ? { data: payload.data } : {}),   // only if not null/undefined
    ...(payload.meta != null ? { meta: payload.meta } : {}),   // only if not null/undefined
  };

  res.status(payload.statusCode).json(body);
};
export default manageResponse