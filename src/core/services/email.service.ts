


export interface EmailService {
    sentToMany(recipents: string[], data: any): Promise<any>
    sentToOne(email: string, data: any): Promise<any>
}