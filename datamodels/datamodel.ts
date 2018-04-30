export class DataModel{
    public static tables= {
        
    }
    public static accountStatus={
        waiting:0,
        accepted:1,
        blocked:2,
        declined:3,
        deleted:4,

        //Different Phase Statuses foe providers
        phaseOne:11,
        phaseTwo:12,
        phaseOneRejected:13,
        phaseTwoRejected:14,
        phaseOneDocSubmitted:15,
        phaseTwoDocSubmitted:16,

        //Document Status
        docUploaded:50,
        docApproved:51,
        docReRequested:52,
        docIgnored:53,
    }
    public static responseStatus={
        tokenError:513,
        originError:514,
    }
}