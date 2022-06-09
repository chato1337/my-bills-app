import { BiSave } from 'react-icons/bi'
import { useApproveBill } from '../../hooks/useApproveBill'
import { HistoryPay } from '../../models/Bill'
import { ParserNumber } from '../../utils'

type CreditorListItemProps = {
    data: HistoryPay
}

const CreditorListItem = ({ data }: CreditorListItemProps) => {

    const { status, _id, value, date, currency, concept } = data
    const isCompleted = data.status !== "pending" ? true : false
    const parseValue = ParserNumber.colDecimals(value)
    const text = `${status} ${date} - ${parseValue} ${currency} - ${concept}`

    const { handleChange, handleSubmit } = useApproveBill()

    return (
        <li>
            <span>{text}</span>
            { !isCompleted && (
                <div>
                    <select name="action-select" onChange={handleChange}>
                        <option value="approve">Aprobar</option>
                        <option value="reject">Rechazar</option>
                    </select>
                    <button onClick={() => handleSubmit(_id, value)}><BiSave size={23} /> </button>
                </div>
            )}
        </li>
    )
}

export default CreditorListItem
