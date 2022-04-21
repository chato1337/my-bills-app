import { useHistoryBill } from '../../hooks/useHistoryBill'
import CreditorListItem from '../../components/CreditorListItem/CreditorListItem';
import { HistoryPay } from '../../models/Bill';
import BillText from '../../components/BillText/BillText';
import './Creditor.styles.scss'
import { useApproveBill } from '../../hooks/useApproveBill';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useBill } from '../../hooks/useBill';

const Creditor = () => {
    const { ApprovePayToast } = useApproveBill()
    const { currentBillSelected } = useBill()
    const { data, isLoading, isSuccess } = useHistoryBill(currentBillSelected._id)

    return (
        <div className="creditor-container">
            <h1>creditor screen</h1>
            <h2>{ currentBillSelected.owner }</h2>
            <BillText value={ currentBillSelected.value } money={ currentBillSelected.money } />
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
