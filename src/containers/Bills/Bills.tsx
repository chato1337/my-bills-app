import BillList from '../../components/BillList/BillList';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useBillForm } from '../../hooks/useFormBill';

// type BillsProps = {
//     actionCallback: (value:number) => void
// }

const Bills = () => {
    const { data, isLoading, isSuccess } = useBillForm()

    return (
        <div>
            {
                isLoading && <LoadingSpinner />
            }
            {
                isSuccess && <BillList data={data} />
            }
        </div>
    )
}

export default Bills
