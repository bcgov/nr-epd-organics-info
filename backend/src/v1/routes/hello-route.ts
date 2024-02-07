import express, {Request, Response} from 'express';
import {utils} from "../services/util-service";
import {helloService} from '../services/hello-service';

const router = express.Router();
router.get(
  '',
  utils.asyncHandler(async (_req: Request, res: Response) => {
    const message = await helloService.getHello();
    res.status(200).json({'message': message});
  }),
);

export = router;
