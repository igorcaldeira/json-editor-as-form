import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import PropTypes from 'prop-types'

const menuStyle = {
  left: '0px',
  top: '0px',
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  display: 'inline-block',
  position: 'relative',
  overflow: 'auto',
  maxHeight: '200px',
  backgroundColor: '#f6f5f1',
}

const wrapperStyle = {
  position: 'absolute',
  left: '0',
  display: 'inline-block',
  backgroundColor: 'transparent',
  zIndex: '2',
  maxHeight: '200px'
}

const itemStyle = (highlighted) => ({
  backgroundColor: highlighted ? '#eee' : 'transparent',
  padding: '4px 8px',
  cursor: 'pointer',
  transition: 'all 500ms linear'
})

const simpleId = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}

class AutoCompleteInput extends Component {
  constructor (props) {
    super(props)

    const { displayPropertie, selectPropertie, defaultValue, value, disabled } = props

    const initalValueSettings = defaultValue ? defaultValue : ''
    const valueDefined = initalValueSettings ? initalValueSettings : (value && value) !== '' ? value : ''

    let displayValue = valueDefined === undefined ? '' : valueDefined.toString()
    const formikValue = valueDefined === undefined ? '' : valueDefined.toString()

    if(selectPropertie !== 'label' && !defaultValue){
      displayValue = this.getDisplayValueByFormikValue(valueDefined)
    }

    this.state = { displayValue, formikValue, displayPropertie, selectPropertie }
  }

  getFormikValueByDisplayValue = displayedValue => {
    const { list, displayPropertie, selectPropertie } = this.props

    let valueFound = ''

    list.map(item => {
      if(item[displayPropertie] == displayedValue)
        valueFound = item[selectPropertie]
    })

    return valueFound
  }

  getDisplayValueByFormikValue = formikValue => {
    const { list, displayPropertie, selectPropertie } = this.props

    let valueFound = ''

    list.map(item => {
      if(item[selectPropertie] == formikValue)
        valueFound = item[displayPropertie]
    })

    return valueFound
  }

  onBlur = () => this.setState({ displayValue: this.getDisplayValueByFormikValue(this.state.formikValue) })

  clearData = name => {
    this.setState({ displayValue: '', formikValue: '' })
    this.props.setFieldValue(this.props.name, '')
  }

  render () {
    const { name, placeholder, setFieldValue, onChangeCallback, selectPropertie, list, displayPropertie,disabled } = this.props

    return <div className='autocomplete'>
      <Autocomplete
        items={ this.props.list ? this.props.list : [] }
        shouldItemRender={ (item, value) => {
          return (item.label+'').toLowerCase().indexOf((value+'').toLowerCase()) > -1
        } }
        getItemValue={ item => {
          return item[displayPropertie]
        } }
        renderItem={ (item, highlighted) => <div
          key={simpleId()}
          style={ itemStyle(highlighted) }>
          { item[displayPropertie] }
        </div> }
        wrapperStyle={ wrapperStyle }
        menuStyle={ menuStyle }
        value={ this.state.displayValue }
        onChange={ e => { this.setState({ displayValue: e.target.value }) } }
        onSelect={ value => {
          const displayValue = value
          const formikValue = this.getFormikValueByDisplayValue(value)

          this.setState({ displayValue, formikValue })
          setFieldValue(name, formikValue)

          if (onChangeCallback && typeof onChangeCallback === 'function') {
            let data = {}
            list.map(item => {
              if(item[selectPropertie] === formikValue)
                  data = item
            })
            onChangeCallback(data)
          }
        } }
        inputProps={ { placeholder, onBlur: this.onBlur, disabled } } />
      { this.state.formikValue && this.state.formikValue != '' ? <a className='clear-data-btn'onClick={() => this.clearData()}>X</a> : null}
    </div>
  }
}

AutoCompleteInput.propTypes = {
  selectPropertie: PropTypes.string,
  displayPropertie: PropTypes.string,
  list: PropTypes.array,
  disabled: PropTypes.bool
}

AutoCompleteInput.defaultProps = {
  selectPropertie: 'label',
  displayPropertie: 'label',
  list: [],
  disabled: false
}

export default AutoCompleteInput
