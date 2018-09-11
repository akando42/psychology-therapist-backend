

export interface IEmailService {

    sentMailToOne(recipent: string, data: any): Promise<any>;

    sentMailToMany(recipents: string[], data: any): Promise<any>;

}