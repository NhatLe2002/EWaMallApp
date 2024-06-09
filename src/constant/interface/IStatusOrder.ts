import { orderStatus } from "../types/statusOrderType";
interface IOrderStatusState {
    orderStatusReducer?: any;
    statusList: orderStatus[] | null;
    error: string | null;
    loading: boolean
}

export type { IOrderStatusState };