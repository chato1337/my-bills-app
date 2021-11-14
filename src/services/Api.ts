import { AddPay, ApprovePay } from './../models/Bill';
import axios from 'axios'

const baseUrl = 'http://localhost:3001/';
// const baseUrl = 'https://young-escarpment-43192.herokuapp.com/';

export class Bills {
    static getBills = async () => {
        const res = await axios.get(baseUrl+"bills")
        return res.data
    }

    static getHistory = async () => {
        const res = await axios.get(baseUrl+"bill-history")
        return res.data
    }

    static approvePay = async (toApprove: ApprovePay) => {
        return await axios.post(baseUrl+"approve-pay", toApprove)
    }

    static addPay = async (toPay: AddPay) => {
        // const toPay = { value: payValue }
        return await axios.post(baseUrl+"add-pay", toPay)
    }
}