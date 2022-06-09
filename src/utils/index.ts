import { BarChartType } from "../models/BarChart"
import { HistoryPay } from "../models/Bill"
import { User } from '../models/User';
import codes from './currencyCodes.json'
import { Option } from '../hooks/useSelect'
import { Params } from '../models/index';
export class ParserNumber {
    static colDecimals = (value: number) => {
        return new Intl.NumberFormat("es-CO").format(value)
    }
}

export class QueryUtils {
    static getQueryParam = (query: Params) => {
        const { queryKey } = query
        const param = queryKey[1]

        return param
    }

    static getQueryToken = (token?: string) => {
        const authToken = token ?? 'no-token'

        return {
            headers: {
                Authorization: `Bearer ${authToken}`,
                ApiKey: process.env.REACT_APP_API_KEY ?? 'no-api'
            }
        }
    }
}

export class SelectParser {
    static genUserOptions = (userList: User[] | null) => {
        if (userList) {
            return userList.map((user: User) => ({
                label: user.username,
                value: user._id
            }))
        }else {
            return null
        }
    }

    static genCurrencyOptions = () =>
        Object.values(codes).map((obj) =>
            ({ value: obj.code, label: `${obj.name} (${obj.code})`}))
    
    static getOptionSelected = (selected:Option | Option[] | null, defaultSel: string):string => {
        if (typeof selected === 'object' && selected !== null) {
            const parseToObj = selected as Option 
            return parseToObj.value
        }else if(Array.isArray(selected)) {
            const parseToArr = selected as Option[]
            return parseToArr.length > 0 ? 'array method here' : defaultSel
        }else {
            return defaultSel
        }
    }
}

export class ChartDataUtil {
    static getBarData = (data: HistoryPay[]):BarChartType[] => {

        const barData = data.map((dataItem: HistoryPay):BarChartType => {
            const { concept, value, date } = dataItem

            return {
                "id": dataItem._id,
                "name": `${concept} - ${date}`,
                "concept": concept,
                "value": value
            }
        })

        return barData.slice(0, 8)
    }

    static getMaxDataValue = (data: HistoryPay[], addValue = 0):number => {

        return Math.max.apply(Math, data.map((item:HistoryPay) => item.value)) + addValue
    }
}