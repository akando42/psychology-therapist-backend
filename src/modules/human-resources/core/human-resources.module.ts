import { AbstractHumanResourcesModule } from "./abstract-human-resources.module";
import { TODResponse } from "../../../dto/tod-response";
import { IHRProfile } from "../../../models/hr-profile";


export class HumanResourcesModule extends AbstractHumanResourcesModule {


    constructor(profilesComponent) {
        super(profilesComponent);
    }

    createHRAgentProfile(userId: IHRProfile): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                // const profile = await this._hrProfilesComponent.c
            } catch (error) {

            }
        });
    }

    getHRAgentProfile(userId: number): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                // const profile
            } catch (error) {

            }
        });
    }


    getHRAgentNDADocument(): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                // const profile
            } catch (error) {

            }
        });
    }

    signNDADocument(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    changeHRAgentStatus(): Promise<any> {
        throw new Error("Method not implemented.");
    }


}