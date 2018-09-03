import { ProviderRouterInstance } from './modules/provider/core/provider.router';
import { Application } from 'express';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { AuthenticationRouterInstance } from './modules/authentication';
import { MySqlConnection } from './database-connection/db-connection.mysql';
import { UsersRouterInstance } from './modules/users/users.router';
import { CabinetAuthRouterInstance } from './modules/admin/sub-modules/cabinet/cabinet.router';
import { AdminModule } from './modules/admin/admin.module';
import { NotificationsRouterInstance } from './modules/notifications/notification.router';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { TasksRouterInstance } from './modules/tasks/tasks.router';
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
		let adminModule = new AdminModule();

		this.express.use('/admin', adminModule.init());
		this.express.use('/api/v1', TasksRouterInstance.init());
		this.express.use('/agent', (req, res) => {
			console.log(req.headers.host)
			console.log(req.headers.location)
			console.log(req.headers['user-agent'])
		})
		this.express.use('/api/v1', AuthenticationRouterInstance.init());
		this.express.use('/api/v1', UsersRouterInstance.init());
		this.express.use('/api/v1', CabinetAuthRouterInstance.init());
		this.express.use('/api/v1', NotificationsRouterInstance.init());
		this.express.use('/api/v1', ProviderRouterInstance.init());
	}

	//TODO
	// mover enel front al nuevo sistema de routing,
	// pedir la tasks, tmb cambiar a admin panel el cabinet
	// y modifical la invitacion para la creacion crear paginas de registro
	//patient verification email and phone
	//state require
	//location object have state
	//provider should have a presentation biography, a hig res pic and a video
	//hr get invited.
	//hr func:
	//approve phase one "document verifications"
	//hr aprrove,ask resumision (comments),decline
	//hr after decline, the hr must authorize the provider to upload again
	//the doc otherside proivder will remain blocked

	//provider
	//lock account 
	//falied login attemps
	//documents declined

}

