import { SubmitHandler, useForm } from "react-hook-form"
import { User } from "../models/User"
import { useMutation } from 'react-query';
import { Auth } from "../services/Api";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { usePinInput } from './usePinInput';

export const useRegister = () => {
    const { register, handleSubmit, reset, formState: {errors} } = useForm<User>()
    const navigate = useNavigate()
    const { values, inputValue, handleChangePin,handleCompleteInput } = usePinInput()
    const notify = (msj: string) => toast(msj, { autoClose: 5000 })

    const onSubmit: SubmitHandler<User> = (formData) => {
        if(inputValue) {
            const data = { ...formData, password: inputValue }
            mutate(data)
        }
    }

    const { mutate } = useMutation(Auth.createAccount, {
        onSuccess: (data, variables, context) => {
            navigate('/login', { replace: true })
            notify(`user created!`)
            reset()
        },
        onError: (data, variables, context) => {
            notify(`[error]: user or email already exist!`)
        }
    })

    return {
        register,
        handleSubmit,
        reset,
        errors,
        onSubmit,
        values,
        inputValue,
        handleCompleteInput,
        handleChangePin
    }
}