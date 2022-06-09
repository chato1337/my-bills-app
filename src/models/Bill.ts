export interface Bill {
    _id: string,
    user_id: string,
    value: number,
    date: string,
    money: string,
    owner_id: string,
    concept: string,
    extra: string,
    status: string
}

export interface CreateBillDTO extends Omit<Bill, '_id' | 'status'> {}

export interface HistoryPay {
    _id: string,
    bill_id: string,
    owner_id: string,
    concept: 'pay' | 'payAll' | 'credit',
    date: string,
    value: number,
    currency: string,
    status: string
}

export interface AddPayParams {
    toPay: AddPay,
    token: string | null
}

export interface AddPay {
    id: string,
    value: number,
    concept: string
}

export interface ApprovePayParams {
    toApprove: ApprovePay,
    token: string | null
}

export interface ApprovePay {
    id: string,
    value: number,
    status: string
}