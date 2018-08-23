import { Router, Request, Response } from "express";
import { ITaskComment } from "../../models/task-comment";
import { WRAbstractRouter } from "../../../../behavior/routers/w-r-abstract.router";
import { TasksHistoryControllerInstance, TasksHistoryController } from "./tasks-history.controller";


export class TasksHistoryRouter {

    private resourcePath = 'history'

    constructor(protected _controller: TasksHistoryController) {
    }


    init(): Router {
        const router: Router = Router({ mergeParams: true });
        //Get Resource
        router.get(`/${this.resourcePath}`, this.search.bind(this));

        //Create Resource
        router.post(`/${this.resourcePath}`, this.addToHistory.bind(this));


        return router;
    }


    search(req: Request, res: Response): void {
        this._controller.search(req.query)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(200).json(err);
            })
    }

    addToHistory(req: Request, res: Response): void {
        this._controller.addToHistory(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(200).json(err);
            })
    }


}


export const TasksHistoryRouterInstance: TasksHistoryRouter = new TasksHistoryRouter(TasksHistoryControllerInstance);
