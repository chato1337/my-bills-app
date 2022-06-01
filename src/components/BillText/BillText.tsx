import { ParserNumber } from '../../utils';
import { useBill } from '../../hooks/useBill';
import './BillText.styles.scss';


const BillText = () => {
	const { currentBillSelected } = useBill()
	const textValue = currentBillSelected ? ParserNumber.colDecimals(currentBillSelected.value) : 0

	return (
		<div className="value-bill">
			<label>Deuda a la fecha:</label>
			<p>
				{textValue}
				<span>{ currentBillSelected?.money }</span>
			</p>
			<label>{ currentBillSelected?.owner }</label>
		</div>
	);
};

export default BillText;
