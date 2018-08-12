import { Request, Response, Router } from "express";
import { IWriteReadController } from "../controllers/write-read-controller.interface";

export class WRAbstractRouter<T> {

    protected resourcePath: string = '';

    constructor(protected _controller: IWriteReadController<T>) {
    }


    init(): Router {
        throw new Error('Init() method not implemented');

    }




    getAll(req: Request, res: Response): void {
        //temp spec.
        let query = req.query;

        this._controller.getAllBy(query)
            .then((result: T[]) => {

                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });

    }

    update(req: Request, res: Response) {

        this._controller.update(req.params['id'], req.body)
            .then((result: T) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });
    }

    getById(req: Request, res: Response) {
        this._controller['getById'](req.params['id'])
            .then((result: T) => {
                //sent the response.
                res.status(200).json({ payload: result });

            }).catch((err) => {
                //handler error propertly
                res.status(500).json
                    ({ message: 'We are sorry, something did just happend to the earth magnetic field!' });
                console.log('from the router', err)
            });
    }

    create(req: Request, res: Response) {
        this._controller.create(req.body)
            .then((result: any) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log('router')
                console.log(err)
            });
    }

    delete(req: Request, res: Response) {
        this._controller.delete(req.params['id'])
            .then((result: { id: string, success: boolean }) => {
                //sent the response.
                res.status(200).json(result);

            }).catch((err) => {
                //handler error propertly
                console.log(err)
            });
    }
}


