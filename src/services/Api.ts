import { AddPayParams, ApprovePayParams, CreateBillDTO } from './../models/Bill';
import axios from 'axios'
import { User, GetUserResponse } from '../models/User';
import { QueryUtils } from '../utils/index';
import { Params } from '../models/index';

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

    static getCreditorBills = async (query: any) => {
        const hasQueryToken: Params = query
        const billId = QueryUtils.getQueryParam(query)
        const token = hasQueryToken.queryKey[2] ?? ''
        const config = QueryUtils.getQueryToken(token)

        if (billId) {
            const res = await axios.get(`${baseUrl}history-list?id=${billId}`, config)
            return res.data
        }else {
            return []
        }
    } 

    static getHistory = async (query: any) => {
        const hasQueryToken: Params = query
        const billId = QueryUtils.getQueryParam(query)
        const token = hasQueryToken.queryKey[2] ?? ''
        const config = QueryUtils.getQueryToken(token)
        if (billId) {
            const res = await axios.get(`${baseUrl}history?id=${billId}`, config)
            return res.data
        }else {
            return []
        }
    }

    static approvePay = async (params: ApprovePayParams) => {
        const hasToken = params.token ? params.token : undefined
        return await axios.post(baseUrl+"approve-pay", params.toApprove, QueryUtils.getQueryToken(hasToken))
    }

    static addPay = async (params: AddPayParams) => {
        const hasToken = params.token ? params.token : undefined
        return await axios.post(baseUrl+"add-pay", params.toPay, QueryUtils.getQueryToken(hasToken))
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

    static getUsers = async (query: any) => {
        const token = QueryUtils.getQueryParam(query)

        if(token){
            const res = await axios.get(baseUrl+`customers`, QueryUtils.getQueryToken(token))
            return res.data
        }else {
            return []
        }
    }
}

export class UserProfile {
    static getProfile = async (query: any) => {
        const userId = QueryUtils.getQueryParam(query)
        if (userId) {
            const res = await axios.get(baseUrl+`profile?id=${userId}`)
            return res.data
        }else {
            return []
        }
    }
}