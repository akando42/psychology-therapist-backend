import { Application } from 'express';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { MySqlConnection } from './database-connection/db-connection.mysql';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { AuthenticationRouter } from './modules/authentication';
import { AdminRouter } from './modules/admin/admin.module';
import { DocumentsRouter } from './modules/e-documents/documents.router';
import { UsersRouter } from './modules/users/users.router';
const fileUpload = require('express-fileupload');

export class API {

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

		this.express.use('/admin', new AdminRouter().init());
		// this.express.use('/api/v1', TasksRouterInstance.init());

		this.express.use('/agent', (req, res) => {
			console.log(req.headers.host)
			console.log(req.headers.location)
			console.log(req.headers['user-agent'])
		});

		this.express.use('/api/v1', new AuthenticationRouter().init());
		this.express.use('/api/v1', new DocumentsRouter().init());
		this.express.use('/api/v1', new UsersRouter().init());
		// this.express.use('/api/v1', CabinetAuthRouterInstance.init());
		// this.express.use('/api/v1', NotificationsRouterInstance.init());
		// this.express.use('/api/v1', ProviderRouterInstance.init());

		//tempora;
		this.express.use('/api/v1/users/:id/profile', (req, res) => {

		});

	}
}

