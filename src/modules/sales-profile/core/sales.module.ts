import { SalesProfilesComponent } from "./Sales-profile/Sales-profiles.component";


export abstract class AbstractSalesModule {

    constructor(protected _SalesProfilesComponent: SalesProfilesComponent) {

    }

    abstract createSalesAgentProfile(): Promise<any>;

    abstract changeSalesAgentStatus(): Promise<any>;

    abstract getSalesAgentNDADocument(): Promise<any>;

    abstract signNDADocument(): Promise<any>;


}