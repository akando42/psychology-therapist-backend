import { GenderEnum } from "../../enums/gender.enum";

export interface IBasicInfo {
    firstName?: string;
    lastName?: string;
    gender?: GenderEnum;
}