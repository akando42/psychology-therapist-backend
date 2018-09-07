import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IUser } from "../../../models/user";

export abstract class AbstractUsersRepository extends AbstractRepository<IUser>{
    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }

    abstract createUserProfile(user: IUser): Promise<IUser>;

    abstract getByEmail(email: string): Promise<IUser>;

    abstract getById(id: number): Promise<IUser>;

    abstract updateUser(id: any, data): Promise<boolean>;

}