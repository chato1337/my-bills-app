import { useQuery } from 'react-query';
import { Bills } from '../services/Api';
export const useHistoryBill = () => {
    const { data, isLoading, isSuccess } = useQuery("bill-history", Bills.getHistory)
    return {
        data,
        isLoading,
        isSuccess
    }
}