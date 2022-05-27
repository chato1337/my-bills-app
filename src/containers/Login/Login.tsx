import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { User } from '../../models/User';
import { useEffect } from 'react';
import { setUser } from '../../redux/authSlice';

const mockUser: User = {
  username: 'didier test',
  email: 'me@me.com',
  role: 'creditor',
  country: 'col'
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)

  const handleClick = () => {
    dispatch(setUser(mockUser))
  }

  useEffect(() => {
    console.log(user)
    if (user) {
      navigate(`/debtor`, { replace: true })
    }
  }, [user, navigate])

  return (
    <div>
      <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login