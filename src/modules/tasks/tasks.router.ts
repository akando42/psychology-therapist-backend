// import { Router, Request, Response } from "express";

// import { TasksControllerInstance, TasksController } from "./tasks.controller";
// import { WRAbstractRouter } from "../../core/routers/w-r-abstract.router";
// import { TokenValidationMiddleware } from "../../middlewares/token-validation.middleware";
// import { ITask } from "../../models/task";
// import { TasksCommentsRouterInstance } from "./sub-modules/task-comments/tasks-comments.router";
// import { TasksHistoryRouterInstance } from "./sub-modules/task-history/tasks-history.router";
// // import { TasksHistoryRouterInstance } from "./sub-modules/task-history/tasks-history.component";

// export class TasksRouter extends WRAbstractRouter<ITask> {

//     constructor(protected _controller: TasksController) {
//         super(_controller);
//         this.resourcePath = 'tasks'
//     }


//     init(): Router {
//         const router: Router = Router({ mergeParams: true });
//         //Get All Resource
//         // router.get(`/tasks`, this.getAll.bind(this));


//         router.get(`/tasks`, this.getByAssignedUser.bind(this));
//         router.get(`/tasks/search`, this.getAll.bind(this));
//         //Delete Resource
//         router.delete(`/tasks/:task_id`, this.delete.bind(this));
//         //Create Resource
//         router.post(`/tasks`, this.createAndNotify.bind(this));
//         //Update Resource
//         router.put(`/tasks/:task_id`, TokenValidationMiddleware, this.update.bind(this));

//         //COMMENTS
//         router.use('/tasks/:task_id', TasksCommentsRouterInstance.init());
//         // HITORY
//         router.use('/tasks/:task_id', TasksHistoryRouterInstance.init())

//         return router;
//     }


//     search(req: Request, res: Response): void {
//         this._controller.getAllBy(req.query)
//             .then((result) => {

//                 console.log(result)
//                 res.status(200).json(result);
//             })
//             .catch((err) => {
//                 res.status(200).json(err);
//             })
//     }


//     getByAssignedUser(req: Request, res: Response): void {
//         this._controller['getTasksByUserAssigned'](req.params['user_id'])
//             .then((result) => {
//                 res.status(200).json(result);
//             })
//             .catch((err) => {
//                 res.status(200).json(err);
//             })
//     }

//     createAndNotify(req: Request, res: Response): void {
//         this._controller.createTaskAndNotify(req.body)
//             .then((result) => {
//                 res.status(200).json(result);
//             })
//             .catch((err) => {
//                 res.status(200).json(err);
//             })
//     }

// }


// export const TasksRouterInstance: TasksRouter = new TasksRouter(TasksControllerInstance);
