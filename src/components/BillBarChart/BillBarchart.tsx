import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell } from 'recharts'
import { useHistoryBill } from '../../hooks/useHistoryBill';
import { ChartDataUtil } from '../../utils/index';
import './BillBarChart.style.scss'
import { useBill } from '../../hooks/useBill';
import { useState, useEffect } from 'react';
import { BarChartType } from '../../models/BarChart';
import { HistoryPay } from '../../models/Bill';
import useWindowDimensions from '../../hooks/useWindowDimensions';



const BillBarchart = () => {
    const { currentBillSelected, isBillSelected } = useBill()
    const { data: historyData, isSuccess } = useHistoryBill(currentBillSelected._id)
    const [ chartData, setChartData ] = useState<BarChartType[] | null>(null)
    const [ maxValue, setMaxValue ] = useState(0)
    const { width: widthScreen } = useWindowDimensions()
    // const chartData = ChartDataUtil.getBarData(historyData)
    const addValue = 100000
    // const maxValue = ChartDataUtil.getMaxDataValue(historyData, addValue)

    useEffect(() => {
        if (isSuccess && isBillSelected) {
            // TODO: exist a better way to do that?
            setChartData(ChartDataUtil.getBarData(historyData as HistoryPay[]))
            setMaxValue(ChartDataUtil.getMaxDataValue(historyData as HistoryPay[], addValue))
        }else {
            setChartData(null)
            setMaxValue(0)
        }
    }, [isSuccess, currentBillSelected, isBillSelected, historyData])

    return (
        <div className="barchart-container">
            {
                isSuccess && chartData && (
                    <BarChart width={widthScreen - 50} height={250} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis type="number" domain={[ 0, maxValue ]} />
                        <Tooltip />
                        <Legend />
                        <Bar stackId="a" dataKey="value" >
                            {chartData.map((entry) => (
                                <Cell key={entry.id} fill={entry.name === "pay" ? '#2FC3BC' : '#FA8144' }/>
                            ))}
                        </Bar>
                    </BarChart>
                )
            }
        </div>
    )
};

export default BillBarchart;
