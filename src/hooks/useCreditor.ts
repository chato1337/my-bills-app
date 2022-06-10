import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { resetCreditSelected, setCurrentCreditor } from '../redux/billSlice';
import { Bills } from '../services/Api';
import { useNavigate } from 'react-router-dom';
import { useCreateBill } from './useCreateBill';
import { useCallback, useEffect } from 'react';
import { Bill } from '../models/Bill';

export const useCreditor = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const token = useSelector((state: RootState) => state.auth.token)
    const currentCredit = useSelector((state: RootState) => state.bill.currentCredit)
    const { data, isSuccess, isLoading } = useQuery(['creditor-bills', user?._id, token], Bills.getCreditorBills)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { handleShowForm } = useCreateBill()

    const handleResetCredit = () => {
        dispatch(resetCreditSelected())
        navigate('creditor', { replace: true })
        handleShowForm(false)
    }

    const refreshCurrentBill = useCallback((id: string, bills: Bill[]) => {
        const updatedBill = bills?.find((el: Bill) => el._id === id) ?? null
        if(updatedBill && currentCredit){
            if(updatedBill.value !== currentCredit.value)
                dispatch(setCurrentCreditor(updatedBill))
        }
    }, [dispatch, currentCredit])

    //track if the query changes
    useEffect(() => {
        if(currentCredit) refreshCurrentBill(currentCredit._id, data)
    }, [data, currentCredit, refreshCurrentBill])

    return {
        creditorBills: data,
        isLoading,
        isSuccess,
        currentCredit,
        handleResetCredit
    }
}
