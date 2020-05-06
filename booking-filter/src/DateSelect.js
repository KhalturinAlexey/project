import * as React from 'react';
import Popup from '@atlaskit/popup';
import Button from '@atlaskit/button';
import Calendar from '@atlaskit/calendar';

class DateSelect extends React.Component {
  defaultProps = {
    prefix: ''
  };

  monthIndexToName = new Map([
    [0, 'янв'],
    [1, 'фев'],
    [2, 'мар'],
    [3, 'апр'],
    [4, 'май'],
    [5, 'июн'],
    [6, 'июл'],
    [7, 'авг'],
    [8, 'сен'],
    [9, 'окт'],
    [10, 'ноя'],
    [11, 'дек']
  ]);

  constructor(props) {
    super(props);

    this.state = {
      isPopupOpen: false
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCalendarSelect = this.handleCalendarSelect.bind(this);
    this.dateToString = this.dateToString.bind(this);
  }

  getPastDates(date) {
    var result = [];

    var firstDateOfYear = new Date(date.getFullYear(), 0, 1);

    var currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);

    while (currentDate >= firstDateOfYear) {
      result.push(currentDate);
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1
      );
    }

    return result;
  }

  dateToString(date) {
    var year = date.getFullYear().toString();
    var month = this.addLeftZero(date.getMonth());
    var day = this.addLeftZero(date.getDate());

    return year + '-' + month + '-' + day;
  }

  addLeftZero(num) {
    if (num < 10) {
      return '0' + num.toString();
     } else {
       return num.toString();
     }
  }

  convertDateToJsStyle(date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  }

  convertDateToAtlasStyle(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  convertDateToHumanStyle(date) {
    var monthName = '';
    if (this.monthIndexToName.has(date.getMonth())) {
      monthName = this.monthIndexToName.get(date.getMonth());
    }

    return date.getDate().toString() + ' ' + monthName + ' ' + date.getFullYear().toString();
  }

  getDatesBetween(date1, date2) {
    var minDate;
    if (date1 <= date2) {
      minDate = date1;
    } else {
      minDate = date2;
    }
    var maxDate;
    if (date1 > date2) {
      maxDate = date1;
    } else {
      maxDate = date2;
    }

    let currentDate = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate(),
    );

    var result = [];

    while (currentDate <= maxDate) {
      result.push(currentDate);
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
      );
    }

    return result;
  }

  render() {
    return (
      <Popup
        content={() => (
          <Calendar
            defaultDisabled={this.getPastDates(new Date())
              .map(this.convertDateToAtlasStyle)
              .map(this.dateToString)}
            defaultMonth={this.convertDateToAtlasStyle(
              this.props.value,
            ).getMonth()}
            defaultSelected={[
              this.dateToString(
                this.convertDateToAtlasStyle(this.props.value),
              ),
            ]}
            defaultYear={this.props.value.getFullYear()}
            onSelect={this.handleCalendarSelect}
            previouslySelected={this.getDatesBetween(
              this.props.value,
              this.props.periodDate || this.props.value,
            )
              .map(this.convertDateToAtlasStyle)
              .map(this.dateToString)}
          />
        )}
        isOpen={this.state.isPopupOpen}
        onClose={this.handleButtonClick}
        placement='bottom-start'
        trigger={triggerProps => (
          <Button
            aria-controls={triggerProps['aria-controls']}
            aria-expanded={triggerProps['aria-expanded']}
            aria-haspopup={triggerProps['aria-haspopup']}
            isSelected={this.state.isPopupOpen}
            onClick={this.handleButtonClick}
            ref={triggerProps.ref}
          >
            {this.props.prefix + this.convertDateToHumanStyle(this.props.value)}
          </Button>
        )}
      />
    );
  }

  handleButtonClick() {
    this.setState({isPopupOpen: !this.state.isPopupOpen});
  }

  handleCalendarSelect(selectEvent) {
    var selectedDate = this.convertDateToJsStyle(new Date(selectEvent.year, selectEvent.month, selectEvent.day));
    this.setState({isPopupOpen: false});
    this.props.onDateChange(selectedDate);
  }
}

export default DateSelect;
