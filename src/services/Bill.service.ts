import { Bill } from '../models/Bill';

export class BillService {
    static store = (bill: Bill) => localStorage.setItem('currentBill', JSON.stringify(bill))

    static getBill = (): Bill => {
        const storedBill = localStorage.getItem('currentBill')

        return storedBill ? JSON.parse(storedBill) : null
    }
}