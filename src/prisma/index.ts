/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient as PrismaClientAuth } from '../../prisma/databases/auth';
import { PrismaClient } from '../../prisma/databases/main';
import { decodeToken } from '../services/UtilService';

export const prismaAuth = new PrismaClientAuth();

// Função para obter a string de conexão do banco de dados com base na empresa
async function getDatabaseConnectionStringForCompany(companyId: number): Promise<string> {   
	const company  = await prismaAuth.empresas.findUnique({where:{id: companyId}});
	const databaseConfig = `mysql://softclever:soft@1973@localhost:3306/${company?.banco}?schema=public`;
	return databaseConfig;
}

export async function createPrismaClientFromJWT(token: string): Promise<PrismaClient> {
	try {
		const decoded: any = decodeToken(token);

		const companyId = decoded.id_company;
		const connectionString = await getDatabaseConnectionStringForCompany(companyId);

		const prisma = new PrismaClient({
			datasources: {
				db: {
					url: connectionString
				}
			}
		});

		return prisma;
	} catch (error) {
		throw error;
	}

}
