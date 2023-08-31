import React from 'react'

const InputField = ({ placeholder, value, name, handleChange, width }:any) => {
    return (
        <div className={`${width}`}>
            <input
                name={name}
                onChange={handleChange}
                value={value}
                placeholder={placeholder}
                className='outline-none p-3 w-full text-base rounded border border-[#808080]'
            />
        </div>
    )
}

export default InputField