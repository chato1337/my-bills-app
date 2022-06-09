import { useAuth } from '../../hooks/useAuth';
import './Login.styles.scss'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const { handleSubmit, onSubmit, errors, register, errorForm, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate(`/debtor`, { replace: true });
    }
  }, [user, navigate])

  return (
    <div className='login-container' >
      <h2>Welcome:</h2>
      { errorForm && <label className='error-msg'>Invalid username or password</label> }
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input className={errors.username && 'error'} type="text" id='username' {...register("username", { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className={errors.password && 'error'} type="text" id='password' {...register("password", { required: true })} />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login