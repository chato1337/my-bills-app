import { useQuery } from 'react-query';
import { Bills } from '../services/Api';

export const useHistoryBill = (billId: any) => {
    const { data, isLoading, isSuccess } = useQuery(["bill-history", billId], Bills.getHistory)

    return {
        data,
        isLoading,
        isSuccess
    }
}