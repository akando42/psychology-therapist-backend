import { GenderEnum } from "../../../../../../enums/gender.enum";


export interface IUserProfileMySql {

    UserID?: string;
    UserCreatedRef?: string;
    UserFirstName?: string;
    UserLastName?: string;
    UserEmailID?: string;
    UserPassword?: string;
    UserProfileImage?: string;
    UserPhone?: string;
    UserLongitude?: string;
    UserLattitude?: string;
    UserAddress?: string;
    UserUserType?: string;
    UserAccountStatus?: string;
    UserGender?: GenderEnum
}