import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Bill } from '../models/Bill';
import { BillService } from '../services/Bill.service';

const initialBill: Bill = {
    date: "",
    extra: "",
    money: "",
    owner: "",
    status: "",
    value: 0,
    _id: ""
}

export const useBill = () => {
    const [ isSelected, setIsSelected ] = useState(false)
    const [ currentBill, setCurrentBill ] = useState<Bill>(initialBill)
    const billStore = useSelector((state: RootState) => state.bill.currentBill)

    useEffect(() => {
        if (BillService.isBillSelected(billStore)) {
            setIsSelected(true)
            //TODO: FIX THIS SHIT
            setCurrentBill(billStore as Bill)
        } else {
            setIsSelected(false)
        }
    }, [billStore])

    return {
        isBillSelected: isSelected,
        currentBillSelected: currentBill
    }
}