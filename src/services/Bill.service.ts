import { Bill } from '../models/Bill';

export class BillService {
    static isBillSelected = (billStore: Bill | {}): boolean =>
        Object.keys(billStore).length > 0 ? true : false
}