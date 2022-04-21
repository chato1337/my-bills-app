import { BarChartType } from "../models/BarChart"
import { HistoryPay, PayAppend } from "../models/Bill"

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