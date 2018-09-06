import { IUser } from "../../../models/user";


export interface IUserService {

    updateUser(id: string, model: IUser): Promise<boolean>;

    getUserByEmail(id: string): Promise<IUser>;

    getUserById(id: string): Promise<IUser>;
}