import {NextFunction, Request, Response} from "express";

const utils = {
  asyncHandler: (fn: (arg0: Request, arg1: Response, arg2: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  },
};
export {utils};
