import { useHistoryBill } from '../../hooks/useHistoryBill'
import CreditorListItem from '../../components/CreditorListItem/CreditorListItem';
import { HistoryPay } from '../../models/Bill';
import { useBillForm } from '../../hooks/useFormBill';
import BillText from '../../components/BillText/BillText';
import './Creditor.styles.scss'
import { useApproveBill } from '../../hooks/useApproveBill';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Creditor = () => {
    const { data, isLoading, isSuccess } = useHistoryBill()
    const { data: dataBill, isSuccess: isSuccessBill } = useBillForm()
    const { ApprovePayToast } = useApproveBill()

    return (
        <div className="creditor-container">
            <h1>creditor screen</h1>
            <h2>{ isSuccessBill && dataBill[0].owner }</h2>
            { isSuccessBill && <BillText value={dataBill[0].value} money={dataBill[0].money} />}
            <ul>
                { isLoading &&  <LoadingSpinner />}
                { isSuccess && (
                    data.map((item: HistoryPay) => {
                        const { _id } = item
                        return (
                            <CreditorListItem key={ _id } data={ item } />
                        )
                    })
                )}
            </ul>
            <ApprovePayToast />
        </div>
    )
}

export default Creditor
