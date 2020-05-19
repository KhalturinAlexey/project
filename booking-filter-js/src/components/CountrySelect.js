import * as React from "react"
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu"
import PropTypes from "prop-types"

class CountrySelect extends React.Component {
  getSelectedCountryName() {
    const { options, value } = this.props
    if (options.has(value)) {
      return options.get(value)
    }
    return "Страна"
  }

  selectCountry(id) {
    const { onCountryIdChange } = this.props
    onCountryIdChange(id)
  }

  render() {
    const { options } = this.props
    return (
      <DropdownMenu
        trigger={`Страна: ${this.getSelectedCountryName()}`}
        triggerType="button"
      >
        <DropdownItemGroup>
          {Array.from(options).map((entry) => (
            <DropdownItem
              key={entry[0]}
              onClick={() => this.selectCountry(entry[0])}
            >
              {entry[1]}
            </DropdownItem>
          ))}
        </DropdownItemGroup>
      </DropdownMenu>
    )
  }
}

CountrySelect.defaultProps = {
  onCountryIdChange: () => undefined,
}

CountrySelect.propTypes = {
  value: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object.isRequired,
  onCountryIdChange: PropTypes.func,
}

export default CountrySelect
