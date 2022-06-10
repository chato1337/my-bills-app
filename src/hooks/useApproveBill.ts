import { ApprovePay } from './../models/Bill';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from "react"
import { Bills } from '../services/Api';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const notify = (msj: string) => toast(msj, { autoClose: 5000 })

export const useApproveBill = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state: RootState) => state.auth.token)

    const { mutate } = useMutation(Bills.approvePay, {
        onSuccess: (data, variables, context) => {
            // queryClient.setQueryData(["bill-history", { _id: variables.id }], data.data._doc)
            queryClient.refetchQueries()
            notify(`la transaccion fue ${generateTextResponse(selectValue)} con exito!`)
        }
    })

    const generateTextResponse = (transaction: string):string => {
        if(transaction === "approve") {
            return "aprobada"
        }else {
            return "rechazada"
        }
    }

    const [selectValue, setSelectValue] = useState("approve")

    const handleChange = (e: any) => {
        setSelectValue(e.target.value)
    }

    const handleSubmit = (id: string, value: number) => {
        const toApprove: ApprovePay = {
            id: id,
            value: value,
            status: selectValue
        }
        mutate({toApprove, token})
    }

    return {
        handleChange,
        handleSubmit,
        selectValue,
        ApprovePayToast: ToastContainer
    }
}