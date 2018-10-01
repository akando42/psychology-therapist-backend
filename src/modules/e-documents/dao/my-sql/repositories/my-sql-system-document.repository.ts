import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { AbstractSystemDocumentRepository } from "../../system-document.repository";
import { MySqlEDocumentConverter } from "../../../converters/my-sql/my-sql-e-document.converter";
import { IEDocument } from "../../../../../models/e-document";
import { ISystemDocument } from "../../../../../models/system.document";
import { MySqlSystemDocumentsFullConverter } from "../../../converters/my-sql/my-sql-system-documents-full.converter";
import { JoinQuery } from "../../../../../query-spec/my-sql/join.query";
import { MySqlSystemDocumentsConverter } from "../../../converters/my-sql/my-sql-system-documents.converter";
import { Convert } from "../../../../../behavior/converters/converter.notation";
import { ISystemDocumentMySql } from "../models/my-sql-system-document";


export class MySqlSystemDocumentRepository extends AbstractSystemDocumentRepository {
    constructor() {
        super(new GenericDao('SYSTEM_DOCUMENTS'), new MySqlSystemDocumentsConverter());
    }

    createSystemDocument(systemDoc: ISystemDocument): Promise<number> {
        let result = <Promise<any>>super.create(systemDoc);
        return result;
    }
    
    @Convert({
        id: 'SystemDocumentID', path: 'DocumentPath', rawReference: 'RawDocumentID',
        documentId: 'DocumentID', uploadDate: 'DocumentUploadDate', typeId: 'DocumentTypeID'
    })
    getSystemDocumentById(systemDocId: any, cv?): Promise<ISystemDocument> {
        return super.query(new JoinQuery({
            mainTable: 'SYSTEM_DOCUMENTS', mainProps: ['SystemDocumentID'],
            joinTables: [
                {
                    matchProp: 'DocumentID',
                    properties: ['DocumentTypeID', 'DocumentPath', 'RawDocumentID', 'DocumentUploadDate'], table: 'DOCUMENTS'
                }
            ]
        }, `Where SystemDocumentID = ${systemDocId} `), cv);
    }

    @Convert({
        id: 'SystemDocumentID', path: 'DocumentPath', rawReference: 'RawDocumentID',
        documentId: 'DocumentID', uploadDate: 'DocumentUploadDate', typeId: 'DocumentTypeID', name: 'DocumentName'
    })
    async getSystemDocument(): Promise<IEDocument[]> {
        return await super.queryAll(new JoinQuery({
            mainTable: 'SYSTEM_DOCUMENTS', mainProps: ['SystemDocumentID'],
            joinTables: [
                {
                    matchProp: 'DocumentID',
                    properties: ['DocumentTypeID', 'DocumentPath', 'RawDocumentID', 'DocumentUploadDate', 'DocumentName'], table: 'DOCUMENTS'
                }
            ]
        }));
    }

}

