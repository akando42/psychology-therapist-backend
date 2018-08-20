import { Router, Request, Response } from "express";
import { ITaskComment } from "../../models/task-comment";
import { IWriteReadController } from "../../../../behavior/controllers/write-read-controller.interface";
import { WRAbstractRouter } from "../../../../behavior/routers/w-r-abstract.router";
import { TasksHistoryControllerInstance } from "./tasks-history.controller";


export class TasksHistoryRouter extends WRAbstractRouter<ITaskComment> {

    constructor(protected _controller: IWriteReadController<ITaskComment>) {
        super(_controller);
        this.resourcePath = 'history'
    }


    init(): Router {
        const router: Router = Router({ mergeParams: true });
        //Get Resource
        router.get(`/${this.resourcePath}`, this.getTaskHistory.bind(this));
        //Delete Resource
        router.delete(`/${this.resourcePath}/:id`, this.delete.bind(this));
        //Create Resource
        router.post(`/${this.resourcePath}`, this.create.bind(this));
        //Update Resource
        router.put(`/${this.resourcePath}/:id`, this.update.bind(this));


        return router;
    }

    getTaskHistory(req: Request, res: Response): void {
        req.query = { taskId: req.params['task_id'] }
        super.getAll(req, res);
    }
}


export const TasksHistoryRouterInstance: TasksHistoryRouter = new TasksHistoryRouter(TasksHistoryControllerInstance);
