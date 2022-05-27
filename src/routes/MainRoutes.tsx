import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../containers/Login/Login';
import ProtectedRoute from '../containers/ProtectedRoute/ProtectedRoute';
import Debtor from '../containers/Debtor/Debtor';
import NotFound from '../components/NotFound/NotFound';
import Bills from '../containers/Bills/Bills';

const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={ <Login /> } />
            <Route path="login" element={ <Login /> } />
            <Route
                path="creditor"
                element={
                    <ProtectedRoute>
                        <Bills />
                    </ProtectedRoute>
                }
            />
            <Route
                path="debtor"
                element={
                    <ProtectedRoute>
                        <Debtor />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes