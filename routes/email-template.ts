
var sprintf = require('sprintf-js').sprintf
var vsprintf = require('sprintf-js').vsprintf

export class EmailTemplates{

    private static templates={
        providerAcceptance:"<h3>Hello %s , </h3>\
            <p></p>"
    }

    public static emailAcceptance(name:string){
        vsprintf(EmailTemplates.templates.providerAcceptance, name);
    }

    public static emailDeclined(name:string){
        vsprintf(EmailTemplates.templates.providerAcceptance, name);
    }

    public static emailResubmit(name:string){
        vsprintf(EmailTemplates.templates.providerAcceptance, name);
    }

    public static emailVerification(name:string){
        vsprintf(EmailTemplates.templates.providerAcceptance, name);
    }
    
}