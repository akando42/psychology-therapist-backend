import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { JoinQuery } from "../../../../../query-spec/my-sql/join.query";
import { MySqlSystemDocumentsConverter } from "../../../converters/my-sql/my-sql-system-documents.converter";
import { AbstractRequiredDocumentsRepository } from "../../required-document.repository";
import { IRequiredDocument } from "../../../../../models/required-document";
import { UsersRolEnum } from "../../../../../enums/users-rol.enum";
import { Convert } from "../../../../../behavior/converters/converter.notation";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";
import { IDocumentRequired } from "../../../../../models/document-required";


export class MySqlRequiredDocumentsRepository extends AbstractRequiredDocumentsRepository {

    constructor() {
        super(new GenericDao('Document_required'), new MySqlSystemDocumentsConverter());
    }

    @CreateQuery({ return: false, primary: 'RequiredDocumentID' },
    { id: 'RequiredDocumentID', active: 'RequiredDocumentActive', documentId: 'DocumentID',systemDocumentId:'SystemDocumentID' })
    saveDocumentsRequiredToRole(doc: IRequiredDocument): Promise<IRequiredDocument> {
        return null
    }

    @Convert({ id: 'DocumentRequiredID' })
    getDocumentsRequiredByRole(role: UsersRolEnum, cv?): Promise<IRequiredDocument[]> {
        return super.getAllBy(new JoinQuery({
            mainTable: 'Document_required', mainProps: ['DocumentRequiredID'],
            joinTables: [
                {
                    matchProp: 'DocumentID',
                    properties: ['DocumentTypeID', 'DocumentPath', 'RawDocumentID', 'DocumentUploadDate'], table: 'DOCUMENTS'
                }
            ]
        }), cv);

    }

}

