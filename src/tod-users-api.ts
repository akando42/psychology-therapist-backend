import { ProviderRouterInstance } from './modules/provider/core/provider.router';
import { Application, Request } from 'express';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { MySqlConnection } from './database-connection/db-connection.mysql';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { TODAuthenticationModule } from './modules/authentication';
const fileUpload = require('express-fileupload');

export class TODUsersApi {

	public express: Application;

	// public appContext: AppContext;
	constructor() {
		//create App contenxt
		// this.appContext = appContext;
		this.express = express();
		this.middleware();
		this.mountRoutes();
		createConnection();
		MySqlConnection.connect({
			"server": "localhost",
			"user": "root",
			"password": "",
			"database": "tod",
			"port": 3306
		})
	}

	private middleware() {
		this.express.use(cors({ origin: '*' }));
		this.express.use(bodyParser.json());
		this.express.use(fileUpload());
		// this.express.use(bodyParser.urlencoded({ extended: false }));

	}

	private mountRoutes(): void {
		let router = express.Router();

		router.post('/api/v1/authentication/login', (req, res) => this._res(req, res, TODAuthenticationModule.authenticate));
	}


	private async  _res(req: Request, res: express.Response, handler: { (...args): Promise<any> }) {
		try {
			const body = req.body;
			console.log('lol')
			const result = await handler(body)
			res.status(200).json(result);
		} catch (error) {
			res.status(200).json(error);

		}

	}
}

