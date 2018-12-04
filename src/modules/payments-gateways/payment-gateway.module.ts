

enum GatewayPaymentEnum {
    STRiPE = 0
}

export interface IPaymentGatewayModule {

    proccessPayment(gateway: GatewayPaymentEnum, billingInfo: any): Promise<any>;

}