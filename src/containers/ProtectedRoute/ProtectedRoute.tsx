import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { UserService } from '../../services/User.service';
import { setToken, setUser } from '../../redux/authSlice';

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

    //restore session from local storage
    useEffect(() => {
        if (UserService.getUser()) {
            dispatch(setUser(UserService.getUser()))
        }
    }, [dispatch])

    useEffect(() => {
        if (UserService.getToken()) {
            dispatch(setToken(UserService.getToken()))
        }
    }, [dispatch])

    // return !user ? <Navigate to={redirectPath} replace /> : children
    if (user) {
        return children
    }else {
        return <Navigate to={redirectPath} replace /> 
    }
}

export default ProtectedRoute
