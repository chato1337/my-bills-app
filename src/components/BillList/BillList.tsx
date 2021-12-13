import { Bill } from "../../models/Bill";
import { ParserNumber } from "../../utils";
import "./BillList.styles.scss";

type BillListProps = {
	data: Bill[],
    actionCallback: (value:number) => void
};

const BillList = ({ data, actionCallback }: BillListProps) => {
	return (
		<ul>
			{data.map((el: Bill, index) => {
				const priceValue = ParserNumber.colDecimals(el.value);
				return (
					<li key={el._id}>
						{el.date} - {el.owner} - {priceValue} {el.money}
                        <button onClick={ () => actionCallback(index) } >detalles</button>
					</li>
				);
			})}
		</ul>
	);
};

export default BillList;
