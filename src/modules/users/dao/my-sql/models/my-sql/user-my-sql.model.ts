import { GenderEnum } from "../../../../../../enums/gender.enum";
import { UsersRolEnum } from "../../../../../../enums/users-rol.enum";


export interface IUserMySql {
    USERID: string;
    PHONE_NUMBER: string;
    LAST_NAMEE: string;
    FIRST_NAME: string;
    GENDER: GenderEnum;
    EMAIL: string;
    USER_ROL: UsersRolEnum;
}