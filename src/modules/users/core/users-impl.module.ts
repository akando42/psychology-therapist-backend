import { AbstractUsersModule } from "./users.module";
import { IUser } from '../../../models/user';
import { ILocation } from '../../../models/location';
import { UsersProfileComponent } from "./user-profile/user-profile.component";
import { IDocumentUploadDTO } from "../../../dto/document-upload.dto";
import { TODResponse } from "../../../dto/tod-response";
import { AbstractDocumentModule } from "../../e-documents/core/abstract-documents.module";
import { isNullOrUndefined } from "util";
import { IPhoneNumber } from "../../../models/phone-number";


export class UsersImplModule extends AbstractUsersModule {


    constructor(
        userProfileComponent: UsersProfileComponent,
        documentsModule?: AbstractDocumentModule
    ) {
        super(userProfileComponent, documentsModule);
    }

    createUser(user: IUser, roleid: number): Promise<IUser> {
        return this._userProfilesComponent.createUserProfile(user);
    }

    async addUserPhoneNumber(phoneNumber: IPhoneNumber): Promise<TODResponse> {
        try {
            const ph = await this._userProfilesComponent.createPhoneNumber(phoneNumber);
            return this._createTODDTO(ph, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        }
    }
    async getUserDetails(userId: any): Promise<TODResponse> {
        try {
            const details= await this._userProfilesComponent.getDetails(userId);
            return this._createTODDTO(details, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        }
    }

    async getUserPhoneNumber(userId: number): Promise<TODResponse> {
        try {
            const ph = await this._userProfilesComponent.getUserPhoneNumber(userId);
            return this._createTODDTO(ph, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        }
    }

    updateUser(id: string, model: IUser): Promise<IUser> {
        return this._userProfilesComponent.updateUserProfile(id, model);
    }

    getUserByEmail(email: string): Promise<IUser> {
        return this._userProfilesComponent.getUserProfileByEmail(email);
    }

    getUserById(id: number): Promise<IUser> {
        return this._userProfilesComponent.getUserProfileById(id);
    }
    async addUserLocation(location: ILocation): Promise<TODResponse> {
        try {
            const loc = await this._userProfilesComponent.createUserLocation(location);
            return this._createTODDTO(loc, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        }
    }

    async getUserLocation(userId: any): Promise<TODResponse> {
        try {
            const loc = await this._userProfilesComponent.getUserLocation(userId);
            return this._createTODDTO(loc, null);
        } catch (error) {
            return this._createTODDTO(null, error);
        }
    }

    validateUserLocation(locationID: number): Promise<ILocation> {
        throw new Error("Method not implemented.");
    }

    uploadDocument(document: IDocumentUploadDTO): Promise<TODResponse> {
        throw new Error("Method not implemented.");
    }
    uploadIDDocument(document: IDocumentUploadDTO): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {

                if (isNullOrUndefined(document.indentificationID)) {
                    return reject({ message: 'no document id provided' })
                }

                const { payload } = await this._documentsModule.uploadDocumentAsBlob(document);
                //create a verification report
                const verification = await this._userProfilesComponent
                    .createVerificationReport({
                        indentificationID: document.indentificationID,
                        expirationDate: document.expirationDate,
                        documentRef: payload,
                        status: 'pending',
                        userId: document.userId
                    })
                //after upload document should create a task to document verification. on asinc way
                //but need to find a way to handle a bad, so probably make a asigned task on verification

                // Tod
                const response: TODResponse = {
                    message: 'Id verification uploaded succesfully ',
                    payload: { success: true },
                    timestamp: new Date()
                };
                return resolve(response);

            } catch (error) {
                const badResponse: TODResponse = {
                    message: 'Sorry!,document upladed failed',
                    error: error,
                    timestamp: new Date()
                };

                return reject(badResponse);
            }
        });
    }

    uploadSecondIdVerificationPic(document: IDocumentUploadDTO, userid: number): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                //upload the file and get the id of the document.
                document.typeId = 4;//todo reservar uno para el tipo de documento de que se usap ara grabar algo.
                const { payload } = await this._documentsModule.uploadDocumentAsBlob(document);

                const result = await this._userProfilesComponent
                    .pushSecondPictureToVerificationReport(payload, userid);

                return resolve({ timestamp: new Date(), message: 'second picture updated', payload: { success: true } });

            } catch (error) {
                return reject({ error: error });
            }
        })
    }
    protected _createTODDTO(payload: any, error?: any): TODResponse {
        return {
            error: error || null,
            message: 'succefully',
            timestamp: new Date(),
            payload: payload || null
        }
    }

}