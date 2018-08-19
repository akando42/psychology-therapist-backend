import * as express from 'express';
import { Application } from "express";
import { TasksRouterInstance } from './tasks.router';



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
        this.application.use(TasksRouterInstance.init());

    }

}