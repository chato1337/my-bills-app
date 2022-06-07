import { useState } from "react"

export type Option = {
    value: string,
    label: string
}

export const useSelect = (defaultOpt: Option | null = null) => {
    const [selectedOption, setSelectedOption] = useState<Option | Option[] | null>(defaultOpt)

    const handleChange = (selected: Option | Option[] | null) => {
        setSelectedOption(selected)
    }

    return {
        selectedOption,
        handleChange
    }
}