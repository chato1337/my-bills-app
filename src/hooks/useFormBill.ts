import { AddPay } from './../models/Bill';
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { ToastContainer, toast } from 'react-toastify';
import { Bills } from "../services/Api"

export const useBillForm = () => {
    const queryClient = useQueryClient()
    const { data, isSuccess, isLoading } = useQuery('bills', Bills.getBills)
    const [bill, setBill] = useState(0)
    const [inputValue, setInputValue] = useState<number | string>("")
    const [showInput, setShowInput] = useState(false)
    const [isReadOnly, setIsReadOnly] = useState(false)

    const notify = (msj: string) => toast(msj, { autoClose: 5000 })

    const { mutate } = useMutation(Bills.addPay, {
        onSuccess: (data, variables, context) => {
            // console.log(data)
            // console.log(variables)
            // console.log(context)
            queryClient.refetchQueries()
            notify(`el abono por ${variables.value} ha sido enviado!`)
        }
    })

    const [concept, setConcept] = useState("pay")

    useEffect(() => {
        if(isSuccess){
            setBill(data[0].value)
        }
    }, [data, isSuccess])

    const handleShowForm = (action:string) => {
        if(action === 'payAll') {
            setIsReadOnly(true)
            setInputValue(bill)
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

    const handleInput = (e: any) => {
        setInputValue(e.target.value)
    }

    const handleCancel = () => {
        setInputValue(0)
        setIsReadOnly(false)
        setShowInput(false)
    }

    const handleSubmit = (typeConcept: string) => {
        if(inputValue && inputValue <= 0) return alert('el valor no puede ser 0')
        const toPay:AddPay = { id: data[0]._id, value: inputValue as number, concept: typeConcept }
        mutate(toPay)
        handleCancel()
    }

    const readOnly = isReadOnly ? { readOnly:true } : { readOnly:false }


    return {
        bill,
        inputValue,
        showInput,
        readOnly,
        handleShowForm,
        handleInput,
        handleSubmit,
        handleCancel,
        isSuccess,
        isLoading,
        data,
        concept,
        BillFormToast: ToastContainer
    }
}