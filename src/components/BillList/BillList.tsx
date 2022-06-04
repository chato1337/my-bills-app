import { useDispatch } from "react-redux";
import { Bill } from "../../models/Bill";
import { setCurrentBill } from "../../redux/billSlice";
import { ParserNumber } from "../../utils";
import "./BillList.styles.scss";
import { useCreateBill } from '../../hooks/useCreateBill';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../../hooks/useBill';


const BillList = () => {
	const dispatch = useDispatch();
	const { handleShowForm } = useCreateBill()
	const navigate = useNavigate()
	const { bills } = useBill()

	const handleBillDispatch = (bill: Bill) => {
		dispatch(setCurrentBill(bill))
		navigate('/detail', { replace: true })
		handleShowForm(false)
	}

	return (
		<ul>
			{bills.map((el: Bill) => {
				const priceValue = ParserNumber.colDecimals(el.value);
				return (
					<li key={el._id}>
						{el.date} - {el.concept} - {priceValue} {el.money}
                        <button onClick={ () => handleBillDispatch(el) }>detalles</button>
					</li>
				);
			})}
		</ul>
	);
};

export default BillList;
