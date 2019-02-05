import React from 'react'
import PropTypes from 'prop-types'

export const CustomSubmit = ({ enabled, text, event, className }) => <button type='submit' onClick={ event } disabled={ !enabled } className={`btn btn--right ${className}`}>{ text }</button>

CustomSubmit.propTypes = {
  enabled: PropTypes.bool,
  t: PropTypes.string,
  event: PropTypes.func
}

CustomSubmit.defaultProps = {
  enabled: false,
  t: 'Save',
  event: () => { }
}

export default CustomSubmit
