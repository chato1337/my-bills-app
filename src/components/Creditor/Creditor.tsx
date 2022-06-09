import { useHistoryBill } from '../../hooks/useHistoryBill'
import CreditorListItem from '../CreditorListItem/CreditorListItem';
import { HistoryPay } from '../../models/Bill';
import BillText from '../BillText/BillText';
import './Creditor.styles.scss'
// import { useApproveBill } from '../../hooks/useApproveBill';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useCreditor } from '../../hooks/useCreditor';

const Creditor = () => {
    // const { ApprovePayToast } = useApproveBill()
    // const { currentBillSelected } = useBill()
    const { currentCredit } = useCreditor()
    const { data, isLoading, isSuccess } = useHistoryBill(currentCredit?._id ?? null)

    return (
        <div className="creditor-container">
            <h1>creditor screen</h1>
            <h2>{ currentCredit?.concept }</h2>
            <BillText currentSelected={currentCredit} />
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
            {/* <ApprovePayToast /> */}
        </div>
    )
}

export default Creditor
