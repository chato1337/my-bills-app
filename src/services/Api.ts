import { AddPay, ApprovePay, CreateBillDTO } from './../models/Bill';
import axios from 'axios'
import { User, GetUserResponse } from '../models/User';

const baseUrl = process.env.REACT_APP_API_URL

export class Bills {
    static getBills = async (query: any) => {
        const { queryKey } = query
        const id = queryKey[1]

        if (id) {
            const res = await axios.get(baseUrl+`bills?id=${id}`)
            return res.data
        }else {
            return []
        }
    }

    static getHistory = async (query: any) => {
        const { queryKey } = query
        const billId = queryKey[1]

        if (!billId) {
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

export class Auth {
    static login = async (query: any) => {
        return query
            ? await axios.post<GetUserResponse>(baseUrl+"login", query)
            : console.log(query)
    }

    static createAccount = (newUser: User) => axios.post(baseUrl+'signup', newUser) 
}

export class UserProfile {
    static getProfile = async () => {
        const res = await axios.get(baseUrl+'profile')
        return res.data
    }
}