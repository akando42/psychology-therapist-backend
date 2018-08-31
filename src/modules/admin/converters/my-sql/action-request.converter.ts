import { IDualConverter } from "../../../../behavior/converters/converter.interface";
import { IActionRequest } from "../../../../models/action-request";
import { IActionRequestMySql } from "../../dao/my-sql/models/action-request-my-sql";


export class ActionRequestConverter implements IDualConverter<IActionRequest, IActionRequestMySql> {
    converDomainToDBModel(raw: IActionRequest): IActionRequestMySql {
        if (!raw) { return null }
        return {
            ActionRequestAction: raw.action,
            ActionRequestComment: raw.comment,
            ActionRequestDate: raw.requestDate,
            ActionRequestEmitterID: raw.emitterId,
            ActionRequestID: raw.requestId,
            ActionRequestTargetID: raw.targetId
        }
    }
    convertDBModelToDomain(raw: IActionRequestMySql): IActionRequest {
        if (!raw) { return null }
        return {
            action: raw.ActionRequestAction,
            comment: raw.ActionRequestComment,
            emitterId: raw.ActionRequestEmitterID,
            requestId: raw.ActionRequestID,
            requestDate: raw.ActionRequestDate,
            targetId: raw.ActionRequestTargetID
        }
    }
    converManyDomainToDBModel(raw: IActionRequest[]): IActionRequestMySql[] {
        return raw.map((item) => this.converDomainToDBModel(item));
    }
    convertManyDBModelToDomain(raw: IActionRequestMySql[]): IActionRequest[] {
        return raw.map((item) => this.convertDBModelToDomain(item));
    }

}

export const ActionRequestsConverterInstance: ActionRequestConverter = new ActionRequestConverter();