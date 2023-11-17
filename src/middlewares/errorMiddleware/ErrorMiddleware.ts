import { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { ErrorResponse } from '../../services/ErrorService';
import { CustomRequest } from '../../models/utils.model';


export class ErrorMiddleware {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public handle(err: Error, req: Request, res: Response, next: NextFunction) {
		if (err instanceof ErrorResponse)
			return res.status(err.code).json({ message: err.message });

		return res.status(500).json({ erro: 'Internal Server Error' });
	}

	public handleAsync =
		(fn: RequestHandler) =>
			async (req: CustomRequest, res: Response, next: NextFunction) => {
				try {
					await Promise.resolve(fn(req, res, next));
					next();
				} catch (err) {
					return next(err);
				}
			};
}