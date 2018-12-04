import { SalesProfilesComponent } from "./Sales-profile/Sales-profiles.component";
import { TODResponse } from "../../../dto/tod-response";


export abstract class AbstractSalesModule {

    constructor(protected _SalesProfilesComponent: SalesProfilesComponent) {

    }

    abstract createSalesAgentProfile(usrId:number): Promise<TODResponse>;

    abstract changeSalesAgentStatus(): Promise<any>;

    abstract getSalesAgentNDADocument(): Promise<any>;

    abstract signNDADocument(): Promise<any>;


}