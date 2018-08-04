import { IAddress } from "./location";
import { GenderEnum } from "../../enums/gender.enum";

/**
 * It represent a user Profile.
 */
export interface IProfile {
    id?: string;
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    gender?: GenderEnum;
    phone?: string;
    email?: string;
}