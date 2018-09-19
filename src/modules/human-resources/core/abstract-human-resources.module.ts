import { HRProfilesComponent } from "./hr-profile/hr-profiles.component";
import { TODResponse } from "../../../dto/tod-response";
import { IHRProfile } from "../../../models/hr-profile";


export abstract class AbstractHumanResourcesModule {

    constructor(protected _hrProfilesComponent: HRProfilesComponent) {

    }

    abstract createHRAgentProfile(profile: IHRProfile): Promise<TODResponse>;

    abstract getHRAgentProfile(userId: number): Promise<TODResponse>;

    abstract changeHRAgentStatus(): Promise<any>;

    abstract getHRAgentNDADocument(): Promise<any>;

    abstract signNDADocument(): Promise<any>;


}