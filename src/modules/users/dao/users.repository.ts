import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IUser } from "../../../models/user";

export interface AbstractUsersRepository {
    
     createUserProfile(user: IUser): Promise<IUser>;

     getByEmail(email: string): Promise<IUser>;

     getById(id: number): Promise<IUser>;

     updateUser(id: any, data): Promise<IUser>;

}