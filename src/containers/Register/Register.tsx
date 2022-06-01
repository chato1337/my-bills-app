import { useRegister } from '../../hooks/useRegister';

const Register = () => {

    const { register, handleSubmit, errors, onSubmit } = useRegister()

    return (
        <div>
            <form className="register-contaier" onSubmit={handleSubmit(onSubmit)}>
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
        </div>
    )
}

export default Register