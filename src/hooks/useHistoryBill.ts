import { useQuery } from 'react-query';
import { Bills } from '../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export const useHistoryBill = () => {

    const storedBill = useSelector((state: RootState) => state.bill.currentBill)
    const billId = storedBill ? storedBill._id : null

    const { data, isLoading, isSuccess } = useQuery(["bill-history", billId], Bills.getHistory)

    return {
        data,
        isLoading,
        isSuccess
    }
}