import { IUser } from "../../../../models/user";
import { IUserProfileService } from "./user-profile.service.interface";
import { IUserIDVerification } from "../../../../models/user-id-verification";
import { ILocationsService } from "../locations/locations.service.interface";
import { ILocation } from "../../../../models/location";
import { IPhoneNumber } from "../../../../models/phone-number";
import { IPhoneNumberService } from "../phone-number/i-phone-number.service";
import { isNullOrUndefined } from "util";


export class UsersProfileComponent {

    constructor(
        private _userService: IUserProfileService,
        private _userLocations: ILocationsService,
        private _phoneNumberService: IPhoneNumberService
    ) {

    }

    async   createUserProfile(user: IUser): Promise<IUser> {
        user.idVerified = false;
        const userCreated: IUser = await this._userService.createUserProfile(user);

        return userCreated;

    }

    async updateUserProfile(id: any, model: IUser): Promise<IUser> {
        try {
            const edited: IUser = await this._userService.updateUserProfile(id, model);

            return edited;
        } catch (error) {
            throw error;
        }
    }

    async getUserProfileByEmail(email: string): Promise<IUser> {
        try {
            const user: IUser = await this._userService.getUserByEmail(email);
            return user;
        } catch (error) {
            throw error;
        }
    }

    verifiedUserIdentity(id: number): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {

                const userVerified: IUser = await this._userService.verifiedUserIdentity(id);
                return resolve(userVerified);

            } catch (error) {
                return reject(error)
            }
        });
    }

    getUserProfileById(id: number): Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                const user = await this._userService.getUserById(id);

                return resolve(user);
            } catch (error) {
                return reject(error);
            }
        })
    }

    createVerificationReport(verifi: IUserIDVerification): Promise<IUserIDVerification> {
        //here probably validate that document exist or not couse already go it from the module.
        return this._userService.createVerificationReport(verifi);
    }

    pushSecondPictureToVerificationReport(picId: number, reporId: number): Promise<IUserIDVerification> {
        return this._userService.pushSecondPicVerificationReport(picId, reporId)
    }

    async createUserLocation(location: ILocation): Promise<ILocation> {
        try {
            const locationCreated = await this._userLocations.createLocation(location);
            return locationCreated;
        } catch (error) {
            throw error;
        }
    }

    async getUserLocation(userId: any): Promise<ILocation> {
        try {
            const userExist = await this._userService.getUserById(userId);
            if (isNullOrUndefined(userExist)) {
                throw { message: `There its no such a user with that id` };
            }
            const location = await this._userLocations.getLocationByUserId(userId);
            return location;
        } catch (error) {
            throw error;
        }

    }

    async createPhoneNumber(phoneNumber: IPhoneNumber): Promise<IPhoneNumber> {
        try {

            const phoneNumberCreated = await this._phoneNumberService.createPhoneNumber(phoneNumber);
            return phoneNumberCreated;
        } catch (error) {
            throw error;
        }
    }
    async getUserPhoneNumber(userId: any): Promise<IPhoneNumber> {
        try {
            const userExist = await this._userService.getUserById(userId);
            if (isNullOrUndefined(userExist)) {
                throw { message: `There its no such a user with that id` };
            }

            const phoneNumber = await this._phoneNumberService.getPhoneNumberByUserId(userId);
            return phoneNumber;

        } catch (error) {
            throw error;
        }
    }
}