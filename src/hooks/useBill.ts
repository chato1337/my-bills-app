import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { Bill } from '../models/Bill';
import { resetBillSelected, setCurrentBill } from '../redux/billSlice';
import { Bills } from '../services/Api';
import { BillService } from '../services/Bill.service';
import { useNavigate } from 'react-router-dom';
import { useCreateBill } from './useCreateBill';

export const useBill = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const currentBill = useSelector((state: RootState) => state.bill.currentBill)
    const { data, isSuccess, isLoading } = useQuery(['bills', user?._id], Bills.getBills)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { handleShowForm } = useCreateBill()
    
    const refreshCurrentBill = useCallback((id: string, bills: Bill[]) => {
        const updatedBill = bills?.find((el: Bill) => el._id === id) ?? null
        if(updatedBill && currentBill){
            if(updatedBill.value !== currentBill.value)
                dispatch(setCurrentBill(updatedBill))
        }
    }, [dispatch, currentBill])

    //track if the query changes
    useEffect(() => {
        if(currentBill) refreshCurrentBill(currentBill._id, data)
    }, [data, currentBill, refreshCurrentBill])

    useEffect(() => {
        if (BillService.getBill()) {
            dispatch(setCurrentBill(BillService.getBill()))
        }
    }, [currentBill, dispatch])

    const handleResetBill = () => {
		dispatch(resetBillSelected());
		navigate('debtor', { replace: true })
		handleShowForm(false);
	};

    return {
        currentBillSelected: currentBill,
        bills: data,
        isLoading,
        isSuccess,
        handleResetBill
    }
}