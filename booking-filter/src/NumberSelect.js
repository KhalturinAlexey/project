import * as React from 'react';
import Select from '@atlaskit/select';

class NumberSelect extends React.Component {
  defaultProps = {
    'isMultiple': false,
    'placeholder': '',
    'prefix': '',
  };
  constructor(props) {
    super(props);
    
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  render() {
    return (
      <Select
        isMulti={this.props.isMultiple}
        isSearchable={false}
        onChange={this.handleSelectChange}
        options={this.props.options}
        placeholder={this.props.placeholder}
      />
    );
  }
  handleSelectChange(selectedOptions, action) {
    if (action.action == 'select-option') {
      if (Array.isArray(selectedOptions)) {
        this.props.onSelectedOptionChange(selectedOptions);
      } else {
        this.props.onSelectedOptionChange([selectedOptions]);
      }
    }
  }
}

export default NumberSelect;
