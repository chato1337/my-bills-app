import "./BillForm.styles.scss";
import { useCreateBill } from '../../hooks/useCreateBill';

const BillForm = () => {
    const { handleSubmit, onSubmit, errors, register } = useCreateBill()

	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div className="form-container">
            <h2>Crear nueva deuda:</h2>
            <form className="bill-form" onSubmit={handleSubmit(onSubmit)}>
                {/* include validation with required or other standard HTML validation rules */}
                <div className="form-group">
                    <label htmlFor="inpuValue">Value bill:</label>
                    <input className={errors.value && 'error'} type="number" id="inpuValue" {...register("value", { required: true })} />
                </div>
                <div className="form-group">
                    <label htmlFor="inpuDate">Date:</label>
                    <input className={errors.date && 'error'} type="date" id="inpuDate" {...register("date", { required: true })} />
                </div>
                <div className="form-group">
                    <label htmlFor="inpuMoney">Money type:</label>
                    <input className={errors.money && 'error'} id="inpuMoney" type="text" {...register("money", { required: true })} />
                    {/* <select className={errors.money && 'error'} { ...register("money", { required: true }) }>
                        {
                            Object.values(currencyCodes).map((el) => {
                                console.log(el)
                                return (
                                    <option value={el.code}>{el.code}</option>
                                )
                            })
                        }
                    </select> */}
                </div>
                <div className="form-group">
                    <label htmlFor="inputOwner">Owner:</label>
                    <input className={errors.owner_id && 'error'} id="inputOwner" {...register("owner_id", { required: true })} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputConcept">Concept:</label>
                    <input className={errors.concept && 'error'} id="inputConcept" {...register("concept", { required: true })} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputExta">Extra percentage:</label>
                    <input type="number" id="inputExta" {...register("extra", { max: 10 })} />
                </div>
                {/* errors will return when field validation fails  */}

                <button>Submit</button>
            </form>
        </div>
	);
};

export default BillForm;
