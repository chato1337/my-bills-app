import { useRegister } from '../../hooks/useRegister';
import './Register.styles.scss'
import { Link } from 'react-router-dom';

const Register = () => {

    const { register, handleSubmit, errors, onSubmit } = useRegister()

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Create account</h2>
                <div className="register-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input className={errors.username && 'error'} id='username' type="text" {...register("username", {required: true})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input className={errors.password && 'error'} id='password' type="text" {...register("password", {required: true})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input className={errors.email && 'error'} id='email' type="email" {...register("email", {required: true})} />
                    </div>
                    <button>Register</button>
                </div>
            </form>
            <div className="login-link">
                <Link to={'/login'}>Login</Link>
            </div>
        </div>
    )
}

export default Register