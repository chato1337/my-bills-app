import "./BillForm.styles.scss";
import { useCreateBill } from "../../hooks/useCreateBill";
import Select from "react-select";
import { Option } from "../../hooks/useSelect";
import { SelectParser } from "../../utils";

const BillForm = () => {
	const {
		handleSubmit,
		onSubmit,
		errors,
		register,
		userOptions,
		handleChangeUser,
		selectedUser,
        handleChangeCode,
        selectedOptionCode
	} = useCreateBill();

	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
		<div className="form-container">
			<h2>Crear nueva deuda:</h2>
			<form className="bill-form" onSubmit={handleSubmit(onSubmit)}>
				{/* include validation with required or other standard HTML validation rules */}
				<div className="form-group">
					<label htmlFor="inpuValue">Value bill:</label>
					<input
						className={errors.value && "error"}
						type="number"
						id="inpuValue"
						min="0"
						prefix="$"
						step="10"
						{...register("value", { required: true })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="inpuDate">Date:</label>
					<input
						className={errors.date && "error"}
						type="date"
						id="inpuDate"
						{...register("date", { required: true })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="inpuMoney">Money type:</label>
                    <Select
                        defaultValue={selectedOptionCode}
                        onChange={handleChangeCode}
                        //TODO: fix this casting
                        options={SelectParser.genCurrencyOptions() as Option[]}
                    />
				</div>
				<div className="form-group">
					<label htmlFor="inputOwner">Owner:</label>
                    <Select
                        defaultValue={selectedUser}
                        onChange={handleChangeUser}
                        //TODO: fix this casting
                        options={userOptions as Option[]}
                    />
				</div>
				<div className="form-group">
					<label htmlFor="inputConcept">Concept:</label>
					<input
						className={errors.concept && "error"}
						id="inputConcept"
						{...register("concept", { required: true })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="inputExta">Extra percentage:</label>
					<input
						type="number"
						id="inputExta"
						{...register("extra", { max: 10 })}
					/>
				</div>
				{/* errors will return when field validation fails  */}

				<button>Submit</button>
			</form>
		</div>
	);
};

export default BillForm;
