import { useState } from "react"

export type Option = {
    value: string,
    label: string
}

export const useSelect = () => {
    const [selectedOption, setSelectedOption] = useState<Option | Option[] | null>(null)

    const handleChange = (selected: Option | Option[] | null) => {
        setSelectedOption(selected)
    }

    return {
        selectedOption,
        handleChange
    }
}