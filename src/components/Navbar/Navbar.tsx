import { useCreateBill } from "../../hooks/useCreateBill";
import { useSelector } from "react-redux";
import { useBill } from "../../hooks/useBill";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../app/store";
import { useAuth } from '../../hooks/useAuth';
import { useCreditor } from '../../hooks/useCreditor';

const Navbar = () => {
	const { showForm, handleShowForm } = useCreateBill();
	const { currentBillSelected, handleResetBill } = useBill();
	const { currentCredit, handleResetCredit } = useCreditor()
	const { pathname } = useLocation();
	const user = useSelector((state: RootState) => state.auth.user)
	const { handleLogout } = useAuth()

	return (
		<nav>
			{pathname === "/creditor" && <Link to="/debtor">Debtor</Link>}
			{pathname === "/debtor" && <Link to="/creditor">Creditor</Link>}
			{(pathname !== "/login" && pathname !== "/register") && !currentBillSelected && (
				<button onClick={() => handleShowForm(!showForm)}>
					{!showForm ? "Nueva deuda:" : "Cancelar"}
				</button>
			)}
			{currentBillSelected && <button onClick={handleResetBill}>volver</button>}
			{currentCredit && <button onClick={handleResetCredit}>volver</button>}
			{ user && <button onClick={handleLogout}>Logout</button> }
		</nav>
	);
};

export default Navbar;
