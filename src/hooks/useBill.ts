import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setCurrentBill } from '../redux/billSlice';
import { Bills } from '../services/Api';
import { BillService } from '../services/Bill.service';

export const useBill = () => {
    const currentBill = useSelector((state: RootState) => state.bill.currentBill)
    const { data, isSuccess, isLoading } = useQuery('bills', Bills.getBills)

    const dispatch = useDispatch()

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