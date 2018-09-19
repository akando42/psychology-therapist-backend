import { HRProfilesComponent } from "./hr-profile/hr-profiles.component";


export abstract class AbstractModuleResourcesModule {

    constructor(protected _hrProfilesComponent: HRProfilesComponent) {

    }

    abstract createHRAgentProfile(): Promise<any>;

    abstract changeHRAgentStatus(): Promise<any>;

    abstract getHRAgentNDADocument(): Promise<any>;

    abstract signNDADocument(): Promise<any>;


}