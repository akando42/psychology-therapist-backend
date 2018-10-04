import { IUser } from "../../../models/user";
import { ILocation } from "../../../models/location";
import { UsersProfileComponent } from "./user-profile/user-profile.component";
import { IDocumentUploadDTO } from "../../../dto/document-upload.dto";
import { TODResponse } from "../../../dto/tod-response";
import { AbstractDocumentModule } from "../../e-documents/core/abstract-documents.module";


export abstract class AbstractUsersModule {
    constructor(
        protected _userProfilesComponent: UsersProfileComponent,
        protected _documentsModule: AbstractDocumentModule
    ) { }

    abstract createUser(user: IUser, roleId: number): Promise<IUser>;

    abstract updateUser(id: any, model: IUser): Promise<IUser>;

    abstract getUserByEmail(email: string): Promise<IUser>;

    abstract getUserById(id: number): Promise<IUser>;

    //////////////////////////////////////////////////////////////
    //USER LOCATIONS FUNCTIONS
    ////////////////////////////////////////////////////////////////
    abstract addUserLocation(location: ILocation): Promise<TODResponse>;
    abstract getUserLocation(userId: any): Promise<TODResponse>;

    abstract validateUserLocation(locationID: number): Promise<ILocation>;

    abstract uploadDocument(document: IDocumentUploadDTO): Promise<TODResponse>;

    abstract uploadIDDocument(document: IDocumentUploadDTO): Promise<TODResponse>;

    abstract uploadSecondIdVerificationPic(document: IDocumentUploadDTO, userId: number): Promise<TODResponse>;



} 