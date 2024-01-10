import { ErrorResponse } from './ErrorService';
export class ExemploService {
	async get() {
		try {
			//aqui é onde fica o service
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const dados = '';
			
		} catch (error) {
			throw new ErrorResponse(500, 'Erro ao Procurar Produtos');
		}
	}
}