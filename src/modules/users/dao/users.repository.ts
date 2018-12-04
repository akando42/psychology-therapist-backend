import { IUser } from "../../../models/user";


export interface IUsersRepository{
    
    createUserProfile(user: IUser): Promise<IUser>;

    getUserByEmail(email: string): Promise<IUser>;

    getUserById(id: any): Promise<IUser>;

    updateUser(id: any,model): Promise<IUser>;
}