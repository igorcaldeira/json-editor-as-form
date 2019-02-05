import React from 'react'

const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id, label, className, ...props
  }) => {
    const identifier = name+'Radio'+id
    return (
      <div className='radio-input'>
        <input
          name={name}
          id={identifier}
          type='radio'
          value={id}
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          {...props} />
        <label htmlFor={identifier}>{label}</label>
        <div className='check'></div>
      </div>
    )
  }

  export default RadioButton