import { IAddress } from "./location";
import { GenderEnum } from "../../enums/gender.enum";
import { AccountStatusEnum } from "../../enums/account-stats.enum";

/**
 * It represent a user Profile.
 */
export interface IProfile {
    id?: string;
    profileImage?: string;
    phone?: string;
    email?: string;
}