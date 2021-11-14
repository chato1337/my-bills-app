import { ApprovePay } from './../models/Bill';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from "react"
import { Bills } from '../services/Api';
import { ToastContainer, toast } from 'react-toastify';

const notify = (msj: string) => toast(msj, { autoClose: 5000 })

export const useApproveBill = () => {
    const queryClient = useQueryClient()

    const { mutate } = useMutation(Bills.approvePay, {
        onSuccess: (data, variables, context) => {
            // queryClient.setQueryData(["bill-history", { _id: variables.id }], data.data._doc)
            queryClient.refetchQueries()
            notify(`la transaccion fue ${generateTextResponse(selectValue)} con exito!`)
            console.log("do something")
        }
    })

    const generateTextResponse = (transaction: string):string => {
        if(transaction === "Aprobar") {
            return "aprobada"
        }else {
            return "rechazada"
        }
    }

    const [selectValue, setSelectValue] = useState("Aprobar")

    const handleChange = (e: any) => {
        setSelectValue(e.target.value)
    }

    const handleSubmit = (id: string, value: number) => {
        const toApprove: ApprovePay = {
            id: id,
            value: value,
            status: selectValue
        }
        mutate(toApprove)
    }

    return {
        handleChange,
        handleSubmit,
        selectValue,
        ApprovePayToast: ToastContainer
    }
}