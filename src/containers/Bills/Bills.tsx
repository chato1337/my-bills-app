import BillList from '../../components/BillList/BillList';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useBill } from '../../hooks/useBill';

// type BillsProps = {
//     actionCallback: (value:number) => void
// }

const Bills = () => {
    const { isLoading, isSuccess } = useBill()

    return (
        <div>
            <h2>Tus deudas activas:</h2>
            {
                isLoading && <LoadingSpinner />
            }
            {
                isSuccess && <BillList />
            }
        </div>
    )
}

export default Bills
