import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Bills } from '../services/Api';

export const useCreditor = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const token = useSelector((state: RootState) => state.auth.token)
    const currentCredit = useSelector((state: RootState) => state.bill.currentCredit)
    const { data, isSuccess, isLoading } = useQuery(['creditor-bills', user?._id, token], Bills.getCreditorBills)

    return {
        creditorBills: data,
        isLoading,
        isSuccess,
        currentCredit
    }
}
