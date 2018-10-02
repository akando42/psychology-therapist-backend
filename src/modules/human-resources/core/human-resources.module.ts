import { AbstractHumanResourcesModule } from "./abstract-human-resources.module";
import { TODResponse } from "../../../dto/tod-response";
import { IHRProfile } from "../../../models/hr-profile";


export class HumanResourcesModule extends AbstractHumanResourcesModule {


    constructor(profilesComponent) {
        super(profilesComponent);
    }

    createHRAgentProfile(profile: IHRProfile): Promise<TODResponse> {
        return new Promise<TODResponse>(async (resolve, reject) => {
            try {
                const profileCreated = await this._hrProfilesComponent.createProfile(profile);
                return resolve(profileCreated);
            } catch (error) {
                console.log(error)
                return reject(error);
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