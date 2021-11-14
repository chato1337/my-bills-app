import { BiUserCircle } from "react-icons/bi";
import { useBillForm } from "../../hooks/useFormBill";
import { useHistoryBill } from "../../hooks/useHistoryBill";
import { HistoryPay } from "../../models/Bill";
import BillText from "../../components/BillText/BillText";
import "./Debtor.styles.scss";
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Debtor = () => {
	const {
		handleShowForm,
		showInput,
		inputValue,
		readOnly,
		handleInput,
		handleCancel,
		handleSubmit,
		isSuccess,
		isLoading,
		data,
		BillFormToast,
		concept
	} = useBillForm();

	const {
		data: historyData,
		isLoading: isLoadingHistory,
		isSuccess: isSuccessHistory,
	} = useHistoryBill();

	return (
		<div>
			<header>
				<h1>Mis deudas app</h1>
				<div className="profile">
					<BiUserCircle size={48} />
				</div>
			</header>
			<main>
				{isLoading && <LoadingSpinner />}
				{isSuccess && (
					<div>
						<BillText value={data[0].value} money={data[0].money} />
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
									{...readOnly}
								/>
								<button onClick={handleCancel}>Cancelar</button>
								<button onClick={() => handleSubmit(concept)}>{ concept }</button>
							</div>
						)}
					</div>
				)}
				<div className="history-graph">
					<span>...cargando grafico</span>
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
                                        const { _id, body, title } = item
                                        const text = `${title} ${body}`
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
			<BillFormToast />
		</div>
	);
};

export default Debtor;
