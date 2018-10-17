import { AbstractRequiredDocumentsRepository } from "../../required-document.repository";
import { IRequiredDocument } from "../../../../../models/required-document";
import { UsersRolEnum } from "../../../../../enums/users-rol.enum";
import { Convert } from "../../../../../core/converters/converter.notation";
import { ByNameRepository } from "../../../../../core/repositories/by-name-repository.notation";
import { JoinQuery, Join } from "../../../../../core/queries/my-sql/join-query.notation";

const matchProp = {
    id: 'DocumentRequiredID', active: 'DocumentRequiredActive',
    role: 'DocumentRequiredRole',
    documentId: 'DocumentID', systemDocumentId: 'SystemDocumentID'
}

@ByNameRepository('DOCUMENT_REQUIRED', {
    converterProps: matchProp,
    primaryKey: 'DocumentRequiredID',
    resourceName: 'Documents Required',
    create: { return: true }
})
export class MySqlRequiredDocumentsRepository implements AbstractRequiredDocumentsRepository {


    createDocumentsRequiredToRole(doc: IRequiredDocument): Promise<IRequiredDocument> {
        return null
    }

    @Convert({ id: 'DocumentRequiredID', name: 'DocumentName' }, true)
    @JoinQuery({ DocumentRequiredRole: 0 }, [
        new Join('DOCUMENTS', 'DocumentID', ['DocumentName'])], 'DOCUMENT_REQUIRED')
    c_getDocumentsRequiredByRole(role: UsersRolEnum): Promise<IRequiredDocument[]> {
        return null;
    }

}

