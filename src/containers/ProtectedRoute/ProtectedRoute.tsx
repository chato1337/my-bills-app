import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

type ProtectedRouterProps = {
    children: JSX.Element
    redirectPath?: string,
}

const ProtectedRoute = ({
    redirectPath = '/login',
    children
}: ProtectedRouterProps) => {
    
    const user = useSelector((state: RootState) => state.auth.user)

    return !user ? <Navigate to={redirectPath} replace /> : children
}

export default ProtectedRoute
