import { useAuth } from '../../hooks/useAuth';
import './Login.styles.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PinInput } from 'react-input-pin-code';

const Login = () => {
  const { handleSubmit, onSubmit, errors, register, errorForm, user, values, handleChangePin, handleCompleteInput } = useAuth()
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
          <label htmlFor="username">Phone:</label>
          <input
            className={errors.username && 'error'}
            type="number"
            pattern="\d*"
            maxLength={10}
            id='username'
            {...register("username", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          {/* <input className={errors.password && 'error'} type="text" id='password' {...register("password", { required: true })} /> */}
          <PinInput
            values={values}
            onChange={(value, index, values) => handleChangePin(value, index, values)}
            onComplete={handleCompleteInput}
            size={'lg'}
            mask={true}
            required={true}
            errorBorderColor={'rgb(232, 240, 254)'}
            type={'number'}
          />
        </div>
        <button>Login</button>
      </form>
      <div className="register-link">
        <Link to={'/register'}>Create Account</Link>
      </div>
    </div>
  )
}

export default Login