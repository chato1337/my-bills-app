import { useMutation } from 'react-query';
import { Bills } from '../services/Api';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { CreateBillDTO } from '../models/Bill';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setShowForm } from '../redux/settingsSlice';
import { useForm, SubmitHandler } from "react-hook-form";

export const useCreateBill = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const showForm = useSelector((state: RootState) => state.settings.showForm)
    const user = useSelector((state: RootState) => state.auth.user)

    const notify = (msj: string) => toast(msj, { autoClose: 5000 })

    const {
		register,
		handleSubmit,
		// watch,
        reset,
		formState: { errors },
	} = useForm<CreateBillDTO>();

	const onSubmit: SubmitHandler<CreateBillDTO> = (data) => {
        const id = user?._id ?? ''
        const billDTO = { ...data, user_id: id }
        handleCreateBill(billDTO)
    };

    //console.log(watch("example")); // watch input value by passing the name of it

    const { mutate } = useMutation(Bills.createBill, {
        onSuccess: (data, variables, context) => {
            console.log(variables)
            queryClient.refetchQueries()
            reset()
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
        errors
    }
}