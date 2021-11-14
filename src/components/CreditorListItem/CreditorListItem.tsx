import { BiSave } from 'react-icons/bi'
import { useApproveBill } from '../../hooks/useApproveBill'
import { HistoryPay } from '../../models/Bill'

type CreditorListItemProps = {
    data: HistoryPay
}

const CreditorListItem = ({ data }: CreditorListItemProps) => {

    const isCompleted = data.title !== "pending" ? true : false
    const { body, title, _id, append } = data
    const text = `${title} - ${body}`

    const { handleChange, handleSubmit } = useApproveBill()

    return (
        <li>
            <span>{text}</span>
            { !isCompleted && (
                <div>
                    <select name="action-select" onChange={handleChange}>
                        <option value="Aprobar">Aprobar</option>
                        <option value="Rechazar">Rechazar</option>
                    </select>
                    <button onClick={() => handleSubmit(_id, append.value)}><BiSave size={23} /> </button>
                </div>
            )}
        </li>
    )
}

export default CreditorListItem
