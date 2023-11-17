import { Router } from 'express';
import { ErrorMiddleware } from './middlewares/errorMiddleware/ErrorMiddleware';
import { PrismaMiddleware } from './middlewares/MultiTenant/MultiTenant';

const router = Router();
const errorMiddleware = new ErrorMiddleware();
const prismaMiddleware = new PrismaMiddleware();

//ORDER CONTROLLER
// router.get('/ExemploRota', prismaMiddleware.handleAsync(errorMiddleware.handleAsync(new ControllerExemplo().FuncaoExemplo)));

export { router };

