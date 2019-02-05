import React, { Component } from 'react'

class TextFieldInput extends Component {
  constructor (props) {
    super(props)
    const initalValueSettings = props.defaultValue ? props.defaultValue : props.value ? props.value : ''
    this.state = { value: initalValueSettings }
  }

  render () {
    const { name, setFieldValue, onChangeCallback, placeholder, disabled } = this.props

    const executeValuePropagation = () => {
      setFieldValue(name, this.state.value)
      if (onChangeCallback && typeof onChangeCallback === 'function')
          onChangeCallback(this.state.value)
    }

    const onBlur = () => executeValuePropagation()

    const handleKeyPress = event => event.key === 'Enter' && executeValuePropagation()

    return <div className='textfield'>
      <input
        placeholder={placeholder}
        type='text'
        value={ this.state.value }
        onChange={e => this.setState({ value: e.target.value })}
        onBlur={onBlur}
        disabled={ disabled }
        onKeyPress={ handleKeyPress } />
    </div>
  }
}

export default TextFieldInput
