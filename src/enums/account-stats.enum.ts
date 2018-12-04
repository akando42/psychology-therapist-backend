

export enum AccountStatusEnum {
    waiting = 0,
    accepted = 1,
    blocked = 2,
    declined = 3,
    deleted = 4,

    //Different Phase Statuses foe providers
    phaseOneAssigned = 10,
    phaseOnePending = 11,
    phaseOneRejected = 13,
    phaseOneDocSubmitted = 15,
    phaseOneReRequest = 16,

    //Document Status
    docUploaded = 50,
    docApproved = 51,
    docReRequested = 52,
    docIgnored = 53,
}