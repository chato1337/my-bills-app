import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useCreditor } from "../../hooks/useCreditor";
import { Bill } from "../../models/Bill";
import { ParserNumber } from "../../utils";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateBill } from '../../hooks/useCreateBill';
import { setCurrentCreditor } from "../../redux/billSlice";

const CreditorList = () => {
	const { creditorBills, isLoading, isSuccess } = useCreditor();
    const { handleShowForm } = useCreateBill()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleCreditorDispatch = (bill: Bill) => {
		dispatch(setCurrentCreditor(bill))
        navigate('/creditor-detail', { replace: true })
        handleShowForm(false)
    }

	return (
		<div>
			<h2>Tus deudores activos</h2>
			{isLoading && <LoadingSpinner />}
			{isSuccess && (
				<ul>
					{creditorBills?.map((el: Bill) => {
						const priceValue = ParserNumber.colDecimals(el.value);
						return (
							<li key={el._id}>
								{el.date} - {el.concept} - {priceValue} {el.money}
								<button onClick={() => handleCreditorDispatch(el)}>detalles</button>
							</li>
						);
					})}
				</ul>
			)}
            { creditorBills?.length === 0 && 'no data :(' }
		</div>
	);
};

export default CreditorList;
