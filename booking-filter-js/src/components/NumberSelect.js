import * as React from "react"
import Select from "@atlaskit/select"
import PropTypes from "prop-types"

class NumberSelect extends React.Component {
  constructor(props) {
    super(props)

    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange(selectedOptions, action) {
    if (action.action === "select-option") {
      const { onSelectedOptionChange } = this.props
      if (Array.isArray(selectedOptions)) {
        onSelectedOptionChange(selectedOptions)
      } else {
        onSelectedOptionChange([selectedOptions])
      }
    }
  }

  render() {
    const { isMultiple, options, placeholder } = this.props
    return (
      <Select
        isMulti={isMultiple}
        isSearchable={false}
        onChange={this.handleSelectChange}
        options={options}
        placeholder={placeholder}
      />
    )
  }
}

NumberSelect.defaultProps = {
  isMultiple: false,
  placeholder: "",
}

NumberSelect.propTypes = {
  isMultiple: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onSelectedOptionChange: PropTypes.func.isRequired,
}

export default NumberSelect
