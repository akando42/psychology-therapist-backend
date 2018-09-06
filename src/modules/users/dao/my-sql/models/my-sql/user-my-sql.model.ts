import { GenderEnum } from "../../../../../../enums/gender.enum";
import { UsersRolEnum } from "../../../../../../enums/users-rol.enum";


export interface IUserMySql {
    UserID: string;
    UserPhoneNumber: string;
    UserLastName: string;
    UserFirstName: string;
    UserGender: GenderEnum;
    UserEmail: string;
    UserRole: UsersRolEnum;
    
    UserIDVerified?: boolean;
}