import * as React from 'react';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';

class CountrySelect extends React.Component {
  render() {
    return (
      <DropdownMenu
        trigger={'Страна: ' + this.getSelectedCountryName()}
        triggerType='button'
      >
        <DropdownItemGroup>
          {Array.from(this.props.options).map(entry => (
            <DropdownItem
              key={entry[0]}
              onClick={() => this.selectCountry(entry[0])}
            >
              {entry[1]}
            </DropdownItem>
          ))}
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
  selectCountry(id) {
    this.props.onCountryIdChange(id);
  }
  getSelectedCountryName() {
    if (this.props.options.has(this.props.value)) {
      return this.props.options.get(this.props.value);
    } else {
      return 'Страна';
    }
  }
}

export default CountrySelect;
