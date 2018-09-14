import { AbstractUsersModule } from "./users.module";
import { IUser } from '../../../models/user';
import { ILocation } from '../../../models/location';
import { UsersProfileComponent } from "./user-profile/user-profile.component";
import { LocationsComponent } from "./locations/locations.component";
import { IDocumentUploadDTO } from "../../../dto/document-upload.dto";
import { TODResponse } from "../../../dto/tod-response";
import { UserDocumentsComponent } from "./documents/user-documents.component";
import { IEDocument } from "../../../models/e-document";
import { resolve } from "dns";
import { reject } from "q";


export class UsersImplModule extends AbstractUsersModule {

    constructor(
        userProfileComponent: UsersProfileComponent,
        userDocumentsComponent: UserDocumentsComponent,
        locationComponent?: LocationsComponent
    ) {
        super(userProfileComponent, locationComponent, userDocumentsComponent);
    }

    createUser(user: IUser, roleid: number): Promise<IUser> {
        return this._userProfilesComponent.createUserProfile(user);
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
    addUserLocation(userId: number, location: ILocation): Promise<ILocation> {
        throw new Error("Method not implemented.");
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
                const docRef: IEDocument = await this._userDocumentsComponent.uploadDocument(document);

                //after upload document should create a task to document verification.

                const response: TODResponse = {
                    message: 'document upladed',
                    payload: docRef,
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

    getDocumentRaw(documentRawid: number): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const docRaw: IEDocument = await this._userDocumentsComponent.getRawDocument(documentRawid);

                const response: TODResponse = {
                    message: 'document upladed',
                    payload: docRaw,
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

}