import React, {useEffect, useState} from "react";

const InputText = ({title, value, setValue, isUpdate = false}) => {

    const [isFocused, setIsFocused] = useState(false);
    const handleInputChange = (event) => {
        const valueInput = event.target.value;
        console.log(valueInput)
        setValue(valueInput);
        setIsFocused(valueInput !== "");
        // setIsFocused(event.target.value !== '');
    };

    useEffect(() => {
         setIsFocused(value !== "");
    }, [value]);

    return (
        <div className="relative mb-5">
            <input
                type="text"
                id="username"
                className={`w-full border-b py-1 focus:outline-none focus:border-red-400 hover:border-red-400 truncate  ${
                    isFocused ? 'border-red-400 border-b-2' : ''
                } transition-colors peer`}
                autoComplete="off"
                value={value}
                onChange={handleInputChange}
            />
            <label
                htmlFor="username"
                className={`absolute left-0 text-gray-600 cursor-text ${
                    isFocused ? 'text-xs -top-4 text-red-400' : 'top-1'
                } transition-all`}
            >
                {title}
            </label>
        </div>)
}

export default InputText