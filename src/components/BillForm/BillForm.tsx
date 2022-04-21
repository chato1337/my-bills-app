import { useForm, SubmitHandler } from "react-hook-form";
import { CreateBillDTO } from "../../models/Bill";
import "./BillForm.styles.scss";
import { useCreateBill } from '../../hooks/useCreateBill';
// import currencyCodes from "../../utils/currencyCodes.json"

const BillForm = () => {
    const { handleCreateBill } = useCreateBill()
	const {
		register,
		handleSubmit,
		// watch,
		formState: { errors },
	} = useForm<CreateBillDTO>();
	const onSubmit: SubmitHandler<CreateBillDTO> = (data) => {
        console.log(data)
        handleCreateBill(data)
    };

    //console.log(watch("example")); // watch input value by passing the name of it

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
                    <input className={errors.owner && 'error'} id="inputOwner" {...register("owner", { required: true })} />
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
