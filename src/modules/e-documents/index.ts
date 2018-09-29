import { MySqlRawDocumentRepository } from "./dao/my-sql/repositories/my-sql-raw-documents.repository";
import { MySqlEDocumentRepository } from "./dao/my-sql/repositories/my-sql-e-document.repository";
import { DocumentServiceImpl } from "./core/documents/document-impl.service";
import { DocumentsComponent } from "./core/documents/documents.component";
import { DocumentModuleImpl } from "./core/documents-impl.module";
import { DocumentsCategoriesImplService } from "./core/documents-categories/documents-categories-impl.service";
import { MySqlDocumentsCategoriesRepository } from "./dao/my-sql/repositories/my-sql-documents-categoriesrepository";
import { MySqlDocumentsTypeRepository } from "./dao/my-sql/repositories/my-sql-documents-type.repository";
import { DocumentsTypeImplService } from "./core/documents-type/documents-type-impl.service";
import { DocumentsClasificationComponent } from "./core/documents-type/documents-clasification.component";
import { MySqlSystemDocumentRepository } from "./dao/my-sql/repositories/my-sql-system-document.repository";
import { SystemDocumentService } from "./core/system-documents/system-document-impl.service";
import { SystemDocumentsComponent } from "./core/system-documents/system-documents.component";
import { MySqlRequiredDocumentsRepository } from "./dao/my-sql/repositories/my-sql-required-document.repository";


// respositories

const mysqlRawDocRepo = new MySqlRawDocumentRepository();
const mysqlDocRefRepo = new MySqlEDocumentRepository();

const mysqlCategoriesRepo = new MySqlDocumentsCategoriesRepository();
const mysqlTypesRepo = new MySqlDocumentsTypeRepository();

const mysqlSystemDocRepo = new MySqlSystemDocumentRepository();
const mysqlRequiredDocsRepo = new MySqlRequiredDocumentsRepository()
//services

const documentService = new DocumentServiceImpl(mysqlDocRefRepo, mysqlRawDocRepo);
const documentsCategoriesService = new DocumentsCategoriesImplService(mysqlCategoriesRepo);
const documentsTypesService = new DocumentsTypeImplService(mysqlTypesRepo);
const systemDocService = new SystemDocumentService(mysqlSystemDocRepo, mysqlRequiredDocsRepo);
//components

const documentsComponent = new DocumentsComponent(documentService);
const documentsClasificationComponent = new DocumentsClasificationComponent(documentsTypesService, documentsCategoriesService)
const systemDocumentComponent = new SystemDocumentsComponent(documentsComponent, systemDocService)

const TODDocumentsModule = new DocumentModuleImpl(
    documentsComponent,
    documentsClasificationComponent,
    systemDocumentComponent);


export {
    TODDocumentsModule
}