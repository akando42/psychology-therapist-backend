import { IDualConverter } from "./converter.interface";

// TODO implement
export class GenericConverter implements IDualConverter<any, any> {
    static instance: GenericConverter
    constructor(private modelMap: any, ) {
    }

    converDomainToDBModel(raw: any) {
        let converted = {};
        for (const domainProp in this.modelMap) {
            if (this.modelMap.hasOwnProperty(domainProp)) {
                const dbProp = this.modelMap[domainProp];
                console.log(`${domainProp}`,raw[domainProp])
                converted[dbProp] = raw[domainProp];
            }
        }
        return converted;
    }
    convertDBModelToDomain(raw: any) {
        
        if (!raw) { return null }
        let converted = {};

        for (const domainProp in this.modelMap) {
            if (this.modelMap.hasOwnProperty(domainProp)) {
                const dbProp = this.modelMap[domainProp];
                converted[domainProp] = raw[dbProp];
            }
        }
        return converted;
    }
    converManyDomainToDBModel(raw: any[]): any[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: any[]): any[] {
        return raw.map((item) => this.convertDBModelToDomain(item));

    }
}