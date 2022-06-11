import { useRegister } from '../../hooks/useRegister';
import './Register.styles.scss'
import { Link } from 'react-router-dom';
import { PinInput } from 'react-input-pin-code';

const Register = () => {

    const { register, handleSubmit, errors, onSubmit, values, handleChangePin, handleCompleteInput } = useRegister()

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Create account</h2>
                <div className="register-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                    <input className={errors.email && 'error'} id='email' type="email" {...register("email", {required: true})} />
                    </div>
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
                        <label htmlFor="password">Password:</label>
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