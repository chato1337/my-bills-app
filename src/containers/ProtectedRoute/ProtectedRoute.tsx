import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { UserService } from '../../services/User.service';
import { setUser } from '../../redux/authSlice';

type ProtectedRouterProps = {
    children: JSX.Element
    redirectPath?: string,
}

const ProtectedRoute = ({
    redirectPath = '/login',
    children
}: ProtectedRouterProps) => {
    
    const user = useSelector((state: RootState) => state.auth.user)

    const dispatch = useDispatch()

    useEffect(() => {
        if (UserService.getUser()) {
            dispatch(setUser(UserService.getUser()))
        }
    }, [dispatch])

    return !user ? <Navigate to={redirectPath} replace /> : children
}

export default ProtectedRoute
