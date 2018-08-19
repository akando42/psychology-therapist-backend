import { Application } from 'express';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { AuthenticationRouterInstance } from './modules/authentication';
import { MySqlConnection } from './database-connection/db-connection.mysql';
import { NotificationsRouterInstance } from './modules/notifications/notifications.router';
import { UsersRouterInstance } from './modules/users/users.router';
import { CabinetAuthRouterInstance } from './modules/admin/sub-modules/cabinet/cabinet.router';
import { AdminModule } from './modules/admin/admin.module';
import { TasksModule } from './modules/tasks/task.module';


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
        this.express.use(cors('*'));
        this.express.use(bodyParser.json());
        // this.express.use(bodyParser.urlencoded({ extended: false }));

    }

    private mountRoutes(): void {
        let adminModule = new AdminModule();

        this.express.use('/admin', adminModule.init());
        this.express.use('/api/v1', new TasksModule().init());

        this.express.use('/api/v1', AuthenticationRouterInstance.init());
        this.express.use('/api/v1', UsersRouterInstance.init());
        this.express.use('/api/v1', CabinetAuthRouterInstance.init());
        this.express.use('/api/v1', NotificationsRouterInstance.init());
    }




}

