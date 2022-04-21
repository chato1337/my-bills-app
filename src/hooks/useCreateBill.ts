import { useMutation } from 'react-query';
import { Bills } from '../services/Api';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { CreateBillDTO } from '../models/Bill';
import { useState } from 'react';

export const useCreateBill = () => {
    const queryClient = useQueryClient()
    const [showForm, setShowForm] = useState(false)

    const notify = (msj: string) => toast(msj, { autoClose: 5000 })

    const { mutate } = useMutation(Bills.createBill, {
        onSuccess: (data, variables, context) => {
            console.log(variables)
            queryClient.refetchQueries()
            notify('created!!')
        }
    })

    const handleShowForm = (show: boolean) => {
        setShowForm(show)
    }

    const handleCreateBill = (newBill: CreateBillDTO) => {
        mutate(newBill)
    }

    return {
        handleCreateBill,
        handleShowForm,
        showForm,
    }
}