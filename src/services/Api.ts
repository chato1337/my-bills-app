import { AddPay, ApprovePay, CreateBillDTO } from './../models/Bill';
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

export class Bills {
    static getBills = async () => {
        const res = await axios.get(baseUrl+"bills")
        return res.data
    }

    static getHistory = async (query: any) => {
        const { queryKey } = query
        const billId = queryKey[1] === '' ? 'key-error' : queryKey[1]

        if (billId === 'key-error') {
            return []
        }else {
            const res = await axios.get(`${baseUrl}bill-history?id=${billId}`)
            return res.data
        }
    }

    static approvePay = async (toApprove: ApprovePay) => {
        return await axios.post(baseUrl+"approve-pay", toApprove)
    }

    static addPay = async (toPay: AddPay) => {
        // const toPay = { value: payValue }
        return await axios.post(baseUrl+"add-pay", toPay)
    }

    static createBill = async (newBill: CreateBillDTO) => await axios.post(`${baseUrl}add-bill`, newBill)
}