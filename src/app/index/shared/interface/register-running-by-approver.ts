export interface Updateregisterrunningbyapprover {
    trans_id: string
    status: string
    admin_id: string
    reason?: string
    reg_event_id: string
}
export interface Updateregisterrunningbyreject {
    trans_id: string
}

export interface ICreatepayment {
    total_price: number;
    type_payment: string;
    invoice_id: number;
    event_id: number;
    event_join_id: number;
    user_id?: any;
}