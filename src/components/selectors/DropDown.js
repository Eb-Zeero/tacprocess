import React from 'react'
import propTypes from 'prop-types'
import Select from 'react-select'
import { listForDropdown, compareByValue } from '../../util/filters'

const DropDown = ({ listToDisplay, name, OnChange, value, className }) => (
  <div className={ className || 'left' }>
    <label>{name}</label>
    <Select
      className ='selector'
      name={ name }
      options={ listForDropdown(listToDisplay).sort(compareByValue) }
      value={ value }
      clearable={ false }
      focusedOption={ value }
      onChange={ event => OnChange(event.value) }
    />
  </div>

)
DropDown.defaultProps = {
  name: '',
  className: ''
}

DropDown.propTypes = {
  listToDisplay: propTypes.array.isRequired,
  name: propTypes.string,
  className: propTypes.string,
  value: propTypes.string.isRequired,
  OnChange: propTypes.func.isRequired,
}

export default DropDown
