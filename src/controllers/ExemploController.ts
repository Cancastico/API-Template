/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import { ErrorResponse } from '../services/ErrorService';
import { CustomRequest } from '../models/utils.model';
export class ProductController{

	async addExemplo(req: CustomRequest, res: Response){
		const prisma = req.prisma;
		try {
			//Exemplo de criação do service
			const Service = '';
		} catch (error) {
			if (error  instanceof Error){
				throw new ErrorResponse(500,error.message);
			}else { throw new ErrorResponse(500,'Erro Desconhecido');}
            
		}
	}
}