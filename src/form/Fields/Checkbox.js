import React from 'react'

export const Checkbox = ({
        field: { name, value, onChange, onBlur },
        id, label, className, ...props
}) => {
    return <div>
        <input
            name={name}
            id={id}
            type='checkbox'
            value={value}
            checked={value}
            onChange={onChange}
            onBlur={onBlur} />
        <label htmlFor={id}>{label}</label>
    </div>
}