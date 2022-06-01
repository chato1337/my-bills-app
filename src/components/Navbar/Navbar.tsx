import { useCreateBill } from "../../hooks/useCreateBill";
import { useDispatch, useSelector } from "react-redux";
import { resetBillSelected } from "../../redux/billSlice";
import { useBill } from "../../hooks/useBill";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
	// const user = useSelector((state: RootState) => state.auth.user)
	const { showForm, handleShowForm } = useCreateBill();
	const { currentBillSelected } = useBill();
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { pathname } = useLocation();
	const user = useSelector((state: RootState) => state.auth.user)
	const { handleLogout } = useAuth()

	const handleResetBill = () => {
		dispatch(resetBillSelected());
		navigate('debtor', { replace: true })
		handleShowForm(false);
	};

	return (
		<nav>
			{pathname === "/creditor" && <Link to="/debtor">Debtor</Link>}
			{pathname === "/debtor" && <Link to="/creditor">Creditor</Link>}
			{pathname !== "/login" && !currentBillSelected && (
				<button onClick={() => handleShowForm(!showForm)}>
					{!showForm ? "Nueva deuda:" : "Cancelar"}
				</button>
			)}
			{currentBillSelected && <button onClick={handleResetBill}>volver</button>}
			{ user && <button onClick={handleLogout}>Logout</button> }
		</nav>
	);
};

export default Navbar;
