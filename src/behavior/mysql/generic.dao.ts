import { AbstractDao } from "./abstract.dao";


export class GenericDao extends AbstractDao<any>{
    constructor(protected table?: string) { super(table); }
}