import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../containers/Login/Login";
import ProtectedRoute from "../containers/ProtectedRoute/ProtectedRoute";
import NotFound from "../components/NotFound/NotFound";
import Bills from "../containers/Bills/Bills";
import Navbar from "../components/Navbar/Navbar";
import Creditor from "../containers/Creditor/Creditor";
import Debtor from "../containers/Debtor/Debtor";
import Register from '../containers/Register/Register';
import Profile from "../components/Profile/Profile";

const MainRoutes = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Profile />

			<Routes>
				<Route index element={<Login />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route
					path="debtor"
					element={
						<ProtectedRoute>
							<Bills />
						</ProtectedRoute>
					}
				/>
				<Route
					path="creditor"
					element={
						<ProtectedRoute>
							<Creditor />
						</ProtectedRoute>
					}
				/>
				<Route path="detail" element={
					<ProtectedRoute>
						<Debtor />
					</ProtectedRoute>
				} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default MainRoutes;
