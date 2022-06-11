import { useState } from "react";

export const usePinInput = () => {
	const [values, setValues] = useState(["", "", "", ""]);
	const [inputValue, setInputValue] = useState<null | string>(null);

    //TODO: [BUG]: at complete pin jummps console error
	const handleCompleteInput = (el: string[]) => {
		setInputValue(el.join(""));
	};

	const handleChangePin = (
		value: string | string[],
		index: number,
		values: string[]
	) => {
		setValues(values);
	};

	return {
		values,
		handleChangePin,
		inputValue,
		handleCompleteInput,
	};
};
