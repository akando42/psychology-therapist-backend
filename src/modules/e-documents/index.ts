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
import { DocumentsReportServiceImpl } from "./core/documents-reports/documents-report-impl";
import { DocumentsReportComponent } from "./core/documents-reports/documents-report.component";
import { MySqlRequiredDocumentsReportsRepository } from "./dao/my-sql/repositories/my-sql-required-document-reports.repository";


// respositories

const mysqlRawDocRepo = new MySqlRawDocumentRepository();
const mysqlDocRefRepo = new MySqlEDocumentRepository();

const mysqlCategoriesRepo = new MySqlDocumentsCategoriesRepository();
const mysqlTypesRepo = new MySqlDocumentsTypeRepository();

const mysqlSystemDocRepo = new MySqlSystemDocumentRepository();
const mysqlRequiredDocsRepo = new MySqlRequiredDocumentsRepository();

const mysqlReportsRepo = new MySqlRequiredDocumentsReportsRepository();
//services

const TODDocumentsService = new DocumentServiceImpl(mysqlDocRefRepo, mysqlRawDocRepo);
const documentsCategoriesService = new DocumentsCategoriesImplService(mysqlCategoriesRepo);
const documentsTypesService = new DocumentsTypeImplService(mysqlTypesRepo);
const TODSystemDocService = new SystemDocumentService(mysqlSystemDocRepo, mysqlRequiredDocsRepo);
const TODRequiredDocumentReportService = new DocumentsReportServiceImpl(mysqlReportsRepo);

//components

const documentsComponent = new DocumentsComponent(TODDocumentsService);
const documentsClasificationComponent = new DocumentsClasificationComponent(documentsTypesService, documentsCategoriesService)
const systemDocumentComponent = new SystemDocumentsComponent(documentsComponent, TODSystemDocService);
const documentsReportComponent = new DocumentsReportComponent(TODRequiredDocumentReportService);

const TODDocumentsModule = new DocumentModuleImpl(
    documentsComponent,
    documentsClasificationComponent,
    systemDocumentComponent,
    documentsReportComponent);


export {
    TODDocumentsService,
    TODSystemDocService,
    TODRequiredDocumentReportService,
    TODDocumentsModule
}