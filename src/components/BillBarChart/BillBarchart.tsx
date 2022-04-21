import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from 'recharts'
import { useHistoryBill } from '../../hooks/useHistoryBill';
import { ChartDataUtil } from '../../utils/index';
import './BillBarChart.style.scss'
import { useBill } from '../../hooks/useBill';

const BillBarchart = () => {
    const { currentBillSelected } = useBill()
    const { data: historyData, isSuccess } = useHistoryBill(currentBillSelected._id)
    const chartData = ChartDataUtil.getBarData(historyData)
    const addValue = 100000
    const maxValue = ChartDataUtil.getMaxDataValue(historyData, addValue)

    return (
        <div className="barchart-container">
            {
                isSuccess && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={355} height={220} data={chartData}>
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
                    </ResponsiveContainer>
                )
            }
        </div>
    )
};

export default BillBarchart;
