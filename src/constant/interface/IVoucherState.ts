interface IVoucherState {
    voucherReducer?: any;
    voucherList: IVoucher[] | null;
    error: string | null;
    loading: boolean
}

export type { IVoucherState };

export interface IVoucher {
    voucherCode: string
    type: boolean
    name: string
    description: string
    discount: number
    startDate: string
    endDate: string
    minOrder: number
    maxDiscount: number
    staff: IStaff
    orders: any
    id: number
}

export interface IStaff {
    account: any
    name: string
    phoneNumber: string
    email: string
    address: string
    startWorkingDate: string
    endWorkingDate: string
    vouchers: any[]
    id: number
}
