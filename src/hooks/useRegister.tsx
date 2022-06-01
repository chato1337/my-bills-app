import { SubmitHandler, useForm } from "react-hook-form"
import { User } from "../models/User"
import { useMutation } from 'react-query';
import { Auth } from "../services/Api";

export const useRegister = () => {
    const { register, handleSubmit, reset, formState: {errors} } = useForm<User>()

    const onSubmit: SubmitHandler<User> = (formData) => {
        console.log({formData})
        mutate(formData)
    }

    const { mutate } = useMutation(Auth.createAccount, {
        onSuccess: () => {
            console.log('created')
        }
    })

    return {
        register,
        handleSubmit,
        reset,
        errors,
        onSubmit
    }
}