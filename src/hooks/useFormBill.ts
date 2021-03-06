import { AddPay } from './../models/Bill';
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { ToastContainer, toast } from 'react-toastify';
import { Bills } from "../services/Api"
import { useBill } from './useBill';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export const useBillForm = () => {
    const queryClient = useQueryClient()
    const [inputValue, setInputValue] = useState<number | string>("")
    const [showInput, setShowInput] = useState(false)
    const [isReadOnly, setIsReadOnly] = useState(false)
    const { currentBillSelected } = useBill()
    const token = useSelector((state:RootState) => state.auth.token)

    const notify = (msj: string) => toast(msj, { autoClose: 5000 })

    const { mutate } = useMutation(Bills.addPay, {
        onSuccess: (data, variables, context) => {
            queryClient.refetchQueries()
            notify(`el abono por ${variables.toPay.value} ha sido enviado!`)
        }
    })

    const [concept, setConcept] = useState("pay")

    const handleShowForm = (action:string) => {
        if(action === 'payAll') {
            setIsReadOnly(true)
            if(currentBillSelected) setInputValue(currentBillSelected.value)
            setConcept(action)
        }else if(action === 'pay') {
            setIsReadOnly(false)
            setInputValue("")
            setConcept(action)
        }else {
            setIsReadOnly(false)
            setInputValue("")
            setConcept(action)
        }
        setShowInput(!showInput)
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleCancel = () => {
        setInputValue(0)
        setIsReadOnly(false)
        setShowInput(false)
    }

    const handleSubmit = (typeConcept: string) => {
        if(inputValue && inputValue <= 0) return alert('el valor no puede ser 0')
        if(currentBillSelected) {
            const toPay:AddPay = { id: currentBillSelected._id, value: inputValue as number, concept: typeConcept }
            mutate({toPay, token})
        }
        handleCancel()
    }

    const readOnly = isReadOnly ? { readOnly:true } : { readOnly:false }


    return {
        inputValue,
        showInput,
        readOnly,
        handleShowForm,
        handleInput,
        handleSubmit,
        handleCancel,
        concept,
        BillFormToast: ToastContainer
    }
}