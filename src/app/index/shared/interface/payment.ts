import { basePagination } from "./pagination";

export interface IPaymentAllQuery extends basePagination {
    event_id: number
}