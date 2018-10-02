import { GenericDao } from "../../../../../behavior/mysql/generic.dao";
import { JoinQuery } from "../../../../../query-spec/my-sql/join.query";
import { MySqlSystemDocumentsConverter } from "../../../converters/my-sql/my-sql-system-documents.converter";
import { AbstractRequiredDocumentsRepository } from "../../required-document.repository";
import { IRequiredDocument } from "../../../../../models/required-document";
import { UsersRolEnum } from "../../../../../enums/users-rol.enum";
import { Convert } from "../../../../../behavior/converters/converter.notation";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";
import { IDocumentRequired } from "../../../../../models/document-required";
import { CustomQuery } from "../../../../../behavior/queries/my-sql/custom-query";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";

@Repository('Document_required')
export class MySqlRequiredDocumentsRepository implements AbstractRequiredDocumentsRepository {

    @CreateQuery({ return: true, primary: 'DocumentRequiredID' },
        { id: 'DocumentRequiredID', active: 'DocumentRequiredActive', 
        role:'DocumentRequiredRole',
        documentId: 'DocumentID', systemDocumentId: 'SystemDocumentID' })
    saveDocumentsRequiredToRole(doc: IRequiredDocument): Promise<IRequiredDocument> {
        return null
    }

    @Convert({ id: 'DocumentRequiredID',name:'DocumentName' },true)
    @CustomQuery(new JoinQuery({
        mainTable: 'Document_required', mainProps: ['DocumentRequiredID'],
        joinTables: [
            {
                matchProp: 'DocumentID',
                properties: ['DOCUMENTS.DocumentID','DocumentTypeID', 'DocumentPath','DocumentName', 'RawDocumentID', 'DocumentUploadDate'], table: 'DOCUMENTS'
            }
        ]
    },''))
    getDocumentsRequiredByRole(role: UsersRolEnum): Promise<IRequiredDocument[]> {
        return null;
    }

}

