import { ParserNumber } from '../../utils';
import './BillText.styles.scss';

type BillTextProps = {
    value: number,
    money: string
}
const BillText = ({value, money}: BillTextProps) => {
	const textValue = ParserNumber.colDecimals(value)
	return (
		<div className="value-bill">
			<label>Deuda a la fecha:</label>
			<p>
				{textValue}
				<span> {money}</span>
			</p>
		</div>
	);
};

export default BillText;
