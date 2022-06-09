import { useBillForm } from "../../hooks/useFormBill";
import { useHistoryBill } from "../../hooks/useHistoryBill";
import { HistoryPay } from "../../models/Bill";
import BillText from "../../components/BillText/BillText";
import "./Debtor.styles.scss";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { ParserNumber } from "../../utils";
import BillBarchart from "../../components/BillBarChart/BillBarchart";
import { useBill } from '../../hooks/useBill';

const Debtor = () => {
	const {
		handleShowForm,
		showInput,
		inputValue,
		readOnly,
		handleInput,
		handleCancel,
		handleSubmit,
		concept
	} = useBillForm();

	const { isLoading, isSuccess, currentBillSelected } = useBill()

	const {
		data: historyData,
		isLoading: isLoadingHistory,
		isSuccess: isSuccessHistory,
	} = useHistoryBill(currentBillSelected?._id ?? null);

	return (
		<div>
			<main>
				{isLoading && <LoadingSpinner />}
				{isSuccess && (
					<div>
						<h2>{ currentBillSelected?.concept }</h2>
						<BillText  currentSelected={currentBillSelected} />
						<div className="actions">
							<button onClick={() => handleShowForm("pay")}>Pagar Abono</button>
							<button onClick={() => handleShowForm("credit")}>Realizar Credito</button>
							<button onClick={() => handleShowForm("payAll")}>Pagar Todo</button>
						</div>
						{showInput && (
							<div className="input-form">
								<input
									onChange={(e) => handleInput(e)}
									value={inputValue}
									type="number"
									min="0"
									{...readOnly}
								/>
								<button onClick={handleCancel}>Cancelar</button>
								<button onClick={() => handleSubmit(concept)}>{ concept }</button>
							</div>
						)}
					</div>
				)}
				<div className="history-graph">
					<BillBarchart />
				</div>
				<div className="history-values">
                    {
                        isLoadingHistory && <LoadingSpinner />
                    }
                    {
                        isSuccessHistory && (
                            <ul>
                                {
                                    historyData.map((item:HistoryPay) => {
										const { _id, date, value, currency, concept, status } = item
										const parseValue = ParserNumber.colDecimals(value)
                                        const text = `${status} - ${date} - ${parseValue} ${currency} - ${concept}`
                                        return(
                                            <li key={_id}>{ text }</li>
                                        )
                                    })
                                }
                            </ul>
                        )
                    }
				</div>
			</main>
		</div>
	);
};

export default Debtor;
