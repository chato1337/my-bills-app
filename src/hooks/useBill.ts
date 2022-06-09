import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { Bill } from '../models/Bill';
import { setCurrentBill } from '../redux/billSlice';
import { Bills } from '../services/Api';
import { BillService } from '../services/Bill.service';

export const useBill = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const currentBill = useSelector((state: RootState) => state.bill.currentBill)
    const { data, isSuccess, isLoading } = useQuery(['bills', user?._id], Bills.getBills)
    const dispatch = useDispatch()

    const refreshCurrentBill = useCallback((id: string, bills: Bill[]) => {
        const updatedBill = bills?.find((el: Bill) => el._id === id) ?? null
        if(updatedBill && currentBill){
            if(updatedBill.value !== currentBill.value)
                dispatch(setCurrentBill(updatedBill))
        }
    }, [dispatch, currentBill])

    useEffect(() => {
        if(currentBill) refreshCurrentBill(currentBill._id, data)
    }, [data, currentBill, refreshCurrentBill])

    useEffect(() => {
        if (BillService.getBill()) {
            dispatch(setCurrentBill(BillService.getBill()))
        }
    }, [currentBill, dispatch])

    return {
        currentBillSelected: currentBill,
        bills: data,
        isLoading,
        isSuccess
    }
}