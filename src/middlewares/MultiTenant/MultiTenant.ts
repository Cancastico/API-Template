/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, RequestHandler, Response } from 'express';
import { CustomRequest } from '../../models/utils.model';
import { createPrismaClientFromJWT } from '../../prisma';
import { ErrorResponse } from '../../services/ErrorService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class PrismaMiddleware {
	public handleAsync =
		(fn: RequestHandler) =>
			async (req: CustomRequest, res: Response, next: NextFunction) => {
				try {
					const authHeader = req.headers.authorization;

					if (!authHeader) {
						return res.status(401).send({ error: 'No token provided' });
					}
	
					const parts = authHeader.split(' ');

					if (parts.length !== 2) {
						return res.status(401).send({ error: 'Token error' });
					}

					const [scheme, token] = parts;

					if (!/^Bearer$/i.test(scheme)) {
						return res.status(401).send({ error: 'Token malformatted' });
					}
					req.prisma = await createPrismaClientFromJWT(token);
					if(req.prisma == undefined){throw new ErrorResponse(500,'Não foi possivel Gerar Conexão com o Banco');}
					


					
					try {
						const fnResponse = await Promise.resolve(fn(req, res, next)).finally(async () => {
							try {
								await req.prisma!.$disconnect();
							} catch (error) {
								console.error('Erro ao desconectar:', error);
							}
						});
						return res;
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} catch (error:any) {
						return res.status(error.code).json({erro:error.message});
					}
				} catch (err) {
					return next(err);
				}
			};
}