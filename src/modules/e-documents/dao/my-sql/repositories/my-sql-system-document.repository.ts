import { AbstractSystemDocumentRepository } from "../../system-document.repository";
import { IEDocument } from "../../../../../models/e-document";
import { ISystemDocument } from "../../../../../models/system.document";
import { JoinQuery } from "../../../../../query-spec/my-sql/join.query";
import { Convert } from "../../../../../behavior/converters/converter.notation";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";
import { CustomQuery } from "../../../../../behavior/queries/my-sql/custom-query";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";

const propsMap = {
    id: 'SystemDocumentID', path: 'DocumentPath', rawReference: 'RawDocumentID',
    documentId: 'DocumentID', uploadDate: 'DocumentUploadDate', typeId: 'DocumentTypeID'
}

@Repository('System_Documents')
export class MySqlSystemDocumentRepository implements AbstractSystemDocumentRepository {

    @CreateQuery({ return: true, primary: 'SystemDocumentID' },{
        id: 'SystemDocumentID',documentId:'DocumentID'
    })
    createSystemDocument(systemDoc: ISystemDocument): Promise<number> {
        return null;
    }

    @Convert({
        id: 'SystemDocumentID', path: 'DocumentPath', rawReference: 'RawDocumentID',
        documentId: 'DocumentID', uploadDate: 'DocumentUploadDate', typeId: 'DocumentTypeID', name: 'DocumentName'
    })
    @CustomQuery(new JoinQuery({
        mainTable: 'SYSTEM_DOCUMENTS', mainProps: ['SystemDocumentID'],
        joinTables: [
            {
                matchProp: 'DocumentID',
                properties: ['SYSTEM_DOCUMENTS.DocumentID','DocumentTypeID', 'DocumentPath', 'RawDocumentID', 'DocumentUploadDate'], table: 'DOCUMENTS'
            }
        ]
    }, `Where SystemDocumentID = $0 `))
    getSystemDocumentById(systemDocId: any ): Promise<ISystemDocument> {
        return null
    }

    @Convert({
        id: 'SystemDocumentID', path: 'DocumentPath', rawReference: 'RawDocumentID',
        documentId: 'SYSTEM_DOCUMENTS.DocumentID', uploadDate: 'DocumentUploadDate', typeId: 'DocumentTypeID', name: 'DocumentName'
    },true)
    @CustomQuery(new JoinQuery({
        mainTable: 'SYSTEM_DOCUMENTS', mainProps: ['SystemDocumentID'],
        joinTables: [
            {
                matchProp: 'DocumentID',
                properties: ['DocumentTypeID', 'DocumentPath', 'RawDocumentID', 'DocumentUploadDate', 'DocumentName'], table: 'DOCUMENTS'
            }
        ]
    }))
    async getSystemDocument(): Promise<IEDocument[]> { return null; }

}

