import { useQuery } from 'react-query';
import { Bills } from '../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export const useHistoryBill = (id: string | null) => {

    // const storedBill = useSelector((state: RootState) => state.bill.currentBill)
    const billId = id ? id : null
    const token = useSelector((state: RootState) => state.auth.token)
    
    const { data, isLoading, isSuccess } = useQuery(["bill-history", billId, token], Bills.getHistory)

    return {
        data,
        isLoading,
        isSuccess
    }
}