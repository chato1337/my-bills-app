import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { LoginUser } from "../models/User";
import { resetUser, setUser } from "../redux/authSlice";
import { UserService } from "../services/User.service";
import { useMutation } from 'react-query';
import { Auth } from "../services/Api";

export const useAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.auth.user);
	const [errorForm, setErrorForm] = useState(false)
	//TODO: set mutation variables response types
	const { mutate } = useMutation(Auth.login, {
		onSuccess: (variables) => {
			setErrorForm(false)
			console.log(variables)
			handleLogin(variables)
		},
		onError: () => {
			setErrorForm(true)
		}
	})
	
	const {
		register,
		handleSubmit,
		// watch,
        reset,
		formState: { errors },
	} = useForm<LoginUser>();

	const onSubmit: SubmitHandler<LoginUser> = (formData) => {
		mutate(formData)
	}

	const handleLogin = (response: any) => {
		const { data } = response
		dispatch(setUser(data.user));
		UserService.store(data.user);
	};

	const handleLogout = () => {
		dispatch(resetUser())
		UserService.removeUser()
	};

	useEffect(() => {
		if (user) {
			navigate(`/debtor`, { replace: true });
		}
	}, [user, navigate]);

	useEffect(() => {
        if (UserService.getUser()) {
            dispatch(setUser(UserService.getUser()))
        }
    }, [dispatch])

    return {
        handleLogin,
        handleLogout,
		onSubmit,
		register,
		handleSubmit,
		errors,
		reset,
		errorForm
    }
};
