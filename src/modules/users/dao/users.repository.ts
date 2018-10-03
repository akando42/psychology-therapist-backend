import { IUser } from "../../../models/user";


export interface IUsersRepository{
    
    createUserProfile(user: IUser): Promise<IUser>;

    getByEmail(email: string): Promise<IUser>;

    getById(id: any): Promise<IUser>;

    updateUser(id: any,model): Promise<IUser>;
}