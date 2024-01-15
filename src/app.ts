/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';
import cluster from 'cluster';
import os from 'os';
import { ErrorResponse } from './services/ErrorService';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
	console.log(`Master ${process.pid} is running`);

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died`);
	});
} else {
	const app = express();
	
	app.use(cors({
		origin: ['localhost', '192.168.0.183']
	}));


	app.use(express.json());

	app.use(router);

	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof ErrorResponse) {
			return res.status(err.code).json({
				error: err.message,
			});
		}
		return res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
		});
	});


	const server = app.listen(8099, () => {
		console.log('Server is running on port 8099');
	});

	// Desliga Filho
	process.on('message', (message) => {
		if (message === 'shutdown') {
			console.log(`Worker ${process.pid} is shutting down...`);
			server.close(() => {
				console.log(`Worker ${process.pid} has shut down.`);
				process.exit(0);
			});
		}
	});
}
// Desliga Tudo
process.on('SIGINT', () => {
	console.log('Master received SIGINT signal.');

	// Send shutdown message to all workers
	for (const id in cluster.workers) {
		cluster.workers[id]?.send('shutdown');
	}

	// Disconnect the master
	cluster.disconnect(() => {
		console.log('Master has disconnected.');
		process.exit(0);
	});
});
