import { useCreateBill } from "../../hooks/useCreateBill";
import { useDispatch } from "react-redux";
import { resetBillSelected } from "../../redux/billSlice";
import { useBill } from "../../hooks/useBill";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
	// const user = useSelector((state: RootState) => state.auth.user)
	const { showForm, handleShowForm } = useCreateBill();
	const { isBillSelected } = useBill();
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { pathname } = useLocation();

	const handleResetBill = () => {
		dispatch(resetBillSelected());
		navigate('debtor', { replace: true })
		handleShowForm(false);
	};

	return (
		<nav>
			{pathname === "/creditor" && <Link to="/debtor">Debtor</Link>}
			{pathname === "/debtor" && <Link to="/creditor">Creditor</Link>}
			{pathname !== "/login" && !isBillSelected && (
				<button onClick={() => handleShowForm(!showForm)}>
					{!showForm ? "Nueva deuda:" : "Cancelar"}
				</button>
			)}
			{isBillSelected && <button onClick={handleResetBill}>volver</button>}
		</nav>
	);
};

export default Navbar;
