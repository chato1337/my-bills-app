import { useDispatch } from "react-redux";
import { Bill } from "../../models/Bill";
import { setCurrentBill } from "../../redux/billSlice";
import { ParserNumber } from "../../utils";
import "./BillList.styles.scss";
import { useCreateBill } from '../../hooks/useCreateBill';
import { useNavigate } from 'react-router-dom';

type BillListProps = {
	data: Bill[],
};

const BillList = ({ data }: BillListProps) => {
	const dispatch = useDispatch();
	const { handleShowForm } = useCreateBill()
	const navigate = useNavigate()

	const handleBillDispatch = (bill: Bill) => {
		dispatch(setCurrentBill(bill))
		navigate('/detail', { replace: true })
		handleShowForm(false)
	}

	return (
		<ul>
			{data.map((el: Bill) => {
				const priceValue = ParserNumber.colDecimals(el.value);
				return (
					<li key={el._id}>
						{el.date} - {el.owner} - {priceValue} {el.money}
                        <button onClick={ () => handleBillDispatch(el) } >detalles</button>
					</li>
				);
			})}
		</ul>
	);
};

export default BillList;
