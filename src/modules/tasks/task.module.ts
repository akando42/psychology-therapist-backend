import * as express from 'express';
import { Application } from "express";
import { TasksRouterInstance } from './tasks.router';


/**
 * Module to tasks
 */
export class TasksModule {
    public application: Application;
    constructor() {

        this.application = express();


    }

    public init(): Application {
        this._mounthRouter();
        return this.application;
    }

    private _mounthRouter(): void {
        const router = TasksRouterInstance.init();
        this.application.use( router)
        // this.application.use(router);

    }

}