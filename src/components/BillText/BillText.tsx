import { ParserNumber } from '../../utils';
import './BillText.styles.scss';
import { Bill } from '../../models/Bill';

type BillTextProps = {
	currentSelected: Bill | null
}

const BillText = ({ currentSelected }: BillTextProps) => {
	const textValue = currentSelected ? ParserNumber.colDecimals(currentSelected.value) : 0

	return (
		<div className="value-bill">
			<label>Deuda a la fecha:</label>
			<p>
				{textValue}
				<span>{ currentSelected?.money }</span>
			</p>
		</div>
	);
};

export default BillText;
