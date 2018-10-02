import { AbstractDocumentsTypeRepository } from "../../documents-type.repository";
import { IDocumentType } from "../../../../../models/document-type";
import { IDocumentsTypeMySql } from "../models/my-sql-documents-type";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";
import { GetByQuery } from "../../../../../behavior/queries/my-sql/get-by-query.notation";
import { Convert } from "../../../../../behavior/converters/converter.notation";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";


const propsMap = {
    description: 'DocumentTypeDescription',
    id: 'DocumentTypeID',
    name: 'DocumentTypeName',
    categoryId: 'CategoryID'
}

@Repository('DOCUMENTS_TYPES')
export class MySqlDocumentsTypeRepository implements AbstractDocumentsTypeRepository {

    @Convert(propsMap)
    @GetByQuery({ DocumentTypeID: 0 })
    getById(typeId: number): Promise<IDocumentType[]> {
        return null;
    }

    @Convert(propsMap,true)
    @GetByQuery({})
    getAllDocumentTypes(): Promise<IDocumentType[]> {
        return null;
    }
    
    @Convert(propsMap)
    @GetByQuery({ CategoryID: 0 })
    getAllDocumentTypesByCategory(categoryId: any): Promise<IDocumentType[]> {
        return null;
    }

    @CreateQuery({return:true,primary:'DocumentTypeID'},propsMap)
    createType(id: any): Promise<IDocumentType> {return null;}

}

