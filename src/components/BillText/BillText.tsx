import './BillText.styles.scss';

type BillTextProps = {
    value: number,
    money: string
}
const BillText = ({value, money}: BillTextProps) => {
	const textValue = new Intl.NumberFormat("es-CO").format(value)
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
