import { Application } from 'express';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { MySqlConnection } from './database-connection/db-connection.mysql';
import "reflect-metadata";
import { AuthenticationRouter } from './modules/authentication';
import { DocumentsRouter } from './modules/e-documents/documents.router';
import { UsersRouter } from './modules/users/users.router';
import { AdminRouter } from './modules/admin/admin.router';
import { MySqlAdminProfilesRepository } from './modules/admin/dao/my-sql/repositories/my-sql-admin-profiles.repository';
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


		this.express.use('/api/v1/admin', new AdminRouter().init());
		// this.express.use('/api/v1', TasksRouterInstance.init());



		this.express.use('/api/v1', new AuthenticationRouter().init());
		this.express.use('/api/v1', new DocumentsRouter().init());
		this.express.use('/api/v1', new UsersRouter().init());
		// this.express.use('/api/v1', CabinetAuthRouterInstance.init());
		// this.express.use('/api/v1', NotificationsRouterInstance.init());
		// this.express.use('/api/v1', ProviderRouterInstance.init());



	}
}

