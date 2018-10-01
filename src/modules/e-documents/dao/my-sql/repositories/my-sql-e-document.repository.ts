import { AbstractEDocumentRepository } from "../../e-document.repository";
import { IEDocument } from "../../../../../models/e-document";
import { CreateQuery } from "../../../../../behavior/queries/my-sql/create-query.notation";
import { GetByQuery } from "../../../../../behavior/queries/my-sql/get-by-query.notation";
import { Repository } from "../../../../../behavior/repositories/repositoy.notation";
import { Convert } from "../../../../../behavior/converters/converter.notation";

const propMath = {
    id: 'DocumentID', path: 'DocumentPath',
    rawReference: 'RawDocumentID', name: 'DocumentName', typeId: 'DocumentTypeID', uploadDate: 'DocumentUploadDate'
};

@Repository('Documents')
export class MySqlEDocumentRepository implements AbstractEDocumentRepository {

    @CreateQuery({ return: true, primary: 'DocumentID' }, propMath)
    createDocumentRef(document: IEDocument): Promise<IEDocument> { return null;}

    @Convert(propMath)
    @GetByQuery({})
    getDocumentRef(rawDocumentId: IEDocument): Promise<IEDocument> {return null;}
}

