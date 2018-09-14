import { MySqlDocumentsTypeRepository } from "./dao/repositories/my-sql-documents-type.repository";
import { DocumentsTypeImplService } from "./core/documents-type/documents-type-impl.service";
import { DocumentsTypeComponent } from "./core/documents-type/documents-type.component";
import { DocumentModuleImpl } from "./core/documents-impl.module";


//repositories
const mysqlDocTypesRepository = new MySqlDocumentsTypeRepository();

//services
const docTypesService = new DocumentsTypeImplService(mysqlDocTypesRepository);

// components
const documentsTypeComponent = new DocumentsTypeComponent(docTypesService);

//modules
const TODDocumentsModule = new DocumentModuleImpl(documentsTypeComponent);

export {

    TODDocumentsModule

}