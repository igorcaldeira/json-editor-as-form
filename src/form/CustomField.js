import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TextField from './Fields/TextField'

class CustomField extends PureComponent {
  render () {
    const { name, type, selectPropertie, displayPropertie, label, placeholder, mask, error, selectItems, setFieldValue, value, labelValueList, list, onChangeCallback, defaultValue, disabled, rows, editExibition } = this.props
    let input = <TextField
          name={ name }
          id={ name }
          setFieldValue={ setFieldValue }
          value={ value }
          { ...{ name, placeholder, type, placeholder, disabled } } />

    return <div className='input-field' >
      { label && type !== "radiogroup" ? <label htmlFor={ name }>{ label }</label> : null }
      { input }
      { error ? <span className='error-label'>{ error }</span> : null }
    </div>
  }
}

CustomField.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string
}

CustomField.defaultProps = {
  name: '',
  error: ''
}

export default CustomField
