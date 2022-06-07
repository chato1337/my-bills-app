import { useMutation } from 'react-query';
import { Bills } from '../services/Api';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { CreateBillDTO } from '../models/Bill';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setShowForm } from '../redux/settingsSlice';
import { useForm, SubmitHandler } from "react-hook-form";
import { useOwnerSelect } from './userOwnerSelect';
import { useSelect } from './useSelect';
import { SelectParser } from '../utils';
import { useEffect } from 'react';

const initialCurrency = {
    value: 'COP',
    label: 'Colombian Peso (COP)'
}

export const useCreateBill = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const showForm = useSelector((state: RootState) => state.settings.showForm)
    const user = useSelector((state: RootState) => state.auth.user)
    const { userOptions, handleChangeUser, selectedUser } = useOwnerSelect()
    const { handleChange: handleChangeCode, selectedOption: selectedOptionCode } = useSelect(initialCurrency)

    const notify = (msj: string) => toast(msj, { autoClose: 5000 })

    const {
		register,
		handleSubmit,
		// watch,
        reset,
		formState: { errors },
	} = useForm<CreateBillDTO>();

    const resetFormfields = (show: boolean = false) => {
        handleChangeCode(initialCurrency)
        handleChangeUser(null)
        reset()
        dispatch(setShowForm(show))
    }

    //close form and reset input fields
    //TODO: improve using useCallback
    useEffect(() => {
        if (!user) {
            handleChangeCode(initialCurrency)
            handleChangeUser(null)
            reset()
            dispatch(setShowForm(false))    
        }
    }, [user, dispatch, handleChangeCode, handleChangeUser, reset])

	const onSubmit: SubmitHandler<CreateBillDTO> = (data) => {
        const selUser = SelectParser.getOptionSelected(selectedUser, 'no-user')
        const selMoney = SelectParser.getOptionSelected(selectedOptionCode, 'no-currency')
        const id = user?._id ?? ''
        const billDTO = { 
            ...data,
            user_id: id,
            owner_id: selUser,
            money: selMoney
        }
        handleCreateBill(billDTO)
    };

    //console.log(watch("example")); // watch input value by passing the name of it

    const { mutate } = useMutation(Bills.createBill, {
        onSuccess: (data, variables, context) => {
            console.log(variables)
            queryClient.refetchQueries()
            //reset fields
            resetFormfields()
            notify('created!!')
        }
    })

    const handleShowForm = (show: boolean) => {
        dispatch(setShowForm(show))
    }

    const handleCreateBill = (newBill: CreateBillDTO) => {
        mutate(newBill)
    }

    return {
        handleShowForm,
        showForm,
        onSubmit,
        register,
        handleSubmit,
        errors,
        userOptions,
        handleChangeUser,
        selectedUser,
        handleChangeCode,
        selectedOptionCode
    }
}