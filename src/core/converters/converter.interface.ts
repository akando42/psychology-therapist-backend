
/**
 * A basic converter
 */
export interface IConverter {
    converDomainToDBModel(raw: any): any;

    convertDBModelToDomain(raw: any): any;

    converManyDomainToDBModel(raw: any[]): any[];

    convertManyDBModelToDomain(raw: any[]): any[];

}

export interface IDualConverter<K, J> extends IConverter {

    converDomainToDBModel(raw: K): J;

    convertDBModelToDomain(raw: J): K;

    converManyDomainToDBModel(raw: K[]): J[];

    convertManyDBModelToDomain(raw: J[]): K[];
}