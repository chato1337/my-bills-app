import { useEffect, useState } from "react"
import { SelectParser } from "../utils"
import { Option, useSelect } from "./useSelect"
import { useUser } from "./useUser"

export const useOwnerSelect = () => {
    const [userOptions, setUserOptions] = useState<null | Option[]>(null)
    const { handleChange, selectedOption } = useSelect()

    const generateOptions = (users: any) => {
        const parseOpt = SelectParser.genUserOptions(users)
        setUserOptions(parseOpt)
    }

    const { users } = useUser()

    useEffect(() => {
        generateOptions(users)
    }, [users])

    return {
        userOptions,
        handleChangeUser: handleChange,
        selectedUser: selectedOption
    }
}