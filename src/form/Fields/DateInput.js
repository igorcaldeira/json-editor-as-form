import React from 'react'
import Datetime from 'react-datetime'
import './DateInput.scss'

const DateInput = ({
  field: { name, value },
  id,
  className,
  setFieldValue,
  getDate,
  getTime,
  placeholder
}) => {
  return <div className={ className }>
    <Datetime
      dateFormat={ `${ getDate ? 'YYYY-MM-DD' : '' }` }
      timeFormat={ getTime ? true : false }
      inputProps={ { id, placeholder } }
      value={ value }
      onChange={ param => setFieldValue(name, param) } />
  </div>
}

export default DateInput
