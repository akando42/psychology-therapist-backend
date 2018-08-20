import { Router, Request, Response } from "express";

import { TasksControllerInstance } from "./tasks.controller";
import { IWriteReadController } from "../../behavior/controllers/write-read-controller.interface";
import { WRAbstractRouter } from "../../behavior/routers/w-r-abstract.router";
import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";
import { ITask } from "./models/task";
import { TasksCommentsRouterInstance } from "./sub-modules/task-comments/tasks-comments.router";
import { TasksHistoryRouterInstance } from "./sub-modules/task-history/tasks-history.router";

export class TasksRouter extends WRAbstractRouter<ITask> {

    constructor(protected _controller: IWriteReadController<ITask>) {
        super(_controller);
        this.resourcePath = 'tasks'
    }


    init(): Router {
        const router: Router = Router({ mergeParams: true });
        //Get All Resource
        router.get(`/tasks`, this.getAll.bind(this));


        // router.get(`/tasks`, this.getByAssignedUser.bind(this));
        //Delete Resource
        router.delete(`/tasks/:task_id`, this.delete.bind(this));
        //Create Resource
        router.post(`/tasks`, this.create.bind(this));
        //Update Resource
        router.put(`/tasks/:task_id`, TokenValidationMiddleware, this.update.bind(this));

        //COMMENTS
        router.use('/tasks/:task_id', TasksCommentsRouterInstance.init());
        // HITORY
        router.use('task/task_id', TasksHistoryRouterInstance.init())

        return router;
    }

    getByAssignedUser(req: Request, res: Response): void {
        this._controller['getByUserAssigned'](req.params['user_id'])
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }

}


export const TasksRouterInstance: TasksRouter = new TasksRouter(TasksControllerInstance);
