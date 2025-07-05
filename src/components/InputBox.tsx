import React from "react"

interface InputBoxProps {
    placeholder: string,
    className?: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    type: string
}

export const InputBox = ({ placeholder, className, value, onChange, type }: InputBoxProps) => {
    return (
        <input
            placeholder={placeholder}
            type={type}
            className={`${className} w-full py-2 px-3 mb-4 text-black bg-white rounded`}
            value={value}
            onChange={onChange} />
    )
}