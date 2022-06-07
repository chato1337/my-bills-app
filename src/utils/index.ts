import { BarChartType } from "../models/BarChart"
import { HistoryPay, PayAppend } from "../models/Bill"
import { User } from '../models/User';
import codes from './currencyCodes.json'

export class ParserNumber {
    static colDecimals = (value: number) => {
        return new Intl.NumberFormat("es-CO").format(value)
    }
}

export class BuildTextUtil {
    static billText = (data: PayAppend) => {
        const { date, value, money, concept } = data
        const parseValue = ParserNumber.colDecimals(value)

        return `${date} - ${parseValue} ${money} - ${concept}`
    }
}

export class QueryUtils {
    static getQueryParam = (query: any) => {
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
            ({ value: obj.code, label: obj.code }))
}

export class ChartDataUtil {
    static getBarData = (data: HistoryPay[]):BarChartType[] => {

        const barData = data.map((dataItem: HistoryPay):BarChartType => {
            const { concept, value } = dataItem.append

            return {
                "id": dataItem._id,
                "name": concept,
                "value": value
            }
        })

        return barData
    }

    static getMaxDataValue = (data: HistoryPay[], addValue = 0):number => {

        return Math.max.apply(Math, data.map((item:HistoryPay) => item.append.value)) + addValue
    }
}