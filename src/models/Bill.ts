export interface Bill {
    _id: string;
    value: number,
    date: string,
    money: string,
    owner: string,
    extra: string,
    status: string
}

export interface CreateBillDTO extends Omit<Bill, '_id' | 'status'> {}
export interface HistoryPay {
    _id: string,
    title: string,
    body: string,
    footer: string,
    color: string,
    append: PayAppend
}

export interface PayAppend {
    concept: string,
    date: string,
    money: string,
    value: number
}

export interface AddPay {
    id: string,
    value: number,
    concept: string
}

export interface ApprovePay {
    id: string,
    value: number,
    status: string
}