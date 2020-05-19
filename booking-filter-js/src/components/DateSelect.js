import * as React from "react"
import Popup from "@atlaskit/popup"
import Button from "@atlaskit/button"
import Calendar from "@atlaskit/calendar"
import PropTypes from "prop-types"
import monthIndexToName from "../data/months"

class DateSelect extends React.Component {
  static getPastDates(date) {
    const result = []

    const firstDateOfYear = new Date(date.getFullYear(), 0, 1)

    let currentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    )

    while (currentDate >= firstDateOfYear) {
      result.push(currentDate)
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1
      )
    }

    return result
  }

  static dateToString(date) {
    const year = date.getFullYear().toString()
    const month = DateSelect.addLeftZero(date.getMonth())
    const day = DateSelect.addLeftZero(date.getDate())

    return `${year}-${month}-${day}`
  }

  static addLeftZero(num) {
    if (num < 10) {
      return `0${num.toString()}`
    }
    return num.toString()
  }

  static convertDateToJsStyle(date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
  }

  static convertDateToAtlasStyle(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
  }

  static convertDateToHumanStyle(date) {
    let monthName = ""
    if (monthIndexToName.has(date.getMonth())) {
      monthName = monthIndexToName.get(date.getMonth())
    }

    return `${date
      .getDate()
      .toString()} ${monthName} ${date.getFullYear().toString()}`
  }

  constructor(props) {
    super(props)

    this.state = {
      isPopupOpen: false,
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleCalendarSelect = this.handleCalendarSelect.bind(this)
  }

  static getDatesBetween(date1, date2) {
    let minDate
    if (date1 <= date2) {
      minDate = date1
    } else {
      minDate = date2
    }
    let maxDate
    if (date1 > date2) {
      maxDate = date1
    } else {
      maxDate = date2
    }

    let currentDate = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate()
    )

    const result = []

    while (currentDate <= maxDate) {
      result.push(currentDate)
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      )
    }

    return result
  }

  handleButtonClick() {
    const { isPopupOpen } = this.state
    this.setState({ isPopupOpen: !isPopupOpen })
  }

  handleCalendarSelect(selectEvent) {
    const selectedDate = DateSelect.convertDateToJsStyle(
      new Date(selectEvent.year, selectEvent.month, selectEvent.day)
    )
    const { onDateChange } = this.props
    this.setState({ isPopupOpen: false })
    onDateChange(selectedDate)
  }

  render() {
    const { value, periodDate, prefix } = this.props
    const { isPopupOpen } = this.state
    return (
      <Popup
        content={() => (
          <Calendar
            defaultDisabled={DateSelect.getPastDates(new Date())
              .map(DateSelect.convertDateToAtlasStyle)
              .map(DateSelect.dateToString)}
            defaultMonth={DateSelect.convertDateToAtlasStyle(value).getMonth()}
            defaultSelected={[
              DateSelect.dateToString(
                DateSelect.convertDateToAtlasStyle(value)
              ),
            ]}
            defaultYear={value.getFullYear()}
            onSelect={this.handleCalendarSelect}
            previouslySelected={DateSelect.getDatesBetween(
              value,
              periodDate || value
            )
              .map(DateSelect.convertDateToAtlasStyle)
              .map(DateSelect.dateToString)}
          />
        )}
        isOpen={isPopupOpen}
        onClose={this.handleButtonClick}
        placement="bottom-start"
        trigger={(triggerProps) => (
          <Button
            aria-controls={triggerProps["aria-controls"]}
            aria-expanded={triggerProps["aria-expanded"]}
            aria-haspopup={triggerProps["aria-haspopup"]}
            isSelected={isPopupOpen}
            onClick={this.handleButtonClick}
            ref={triggerProps.ref}
          >
            {prefix + DateSelect.convertDateToHumanStyle(value)}
          </Button>
        )}
      />
    )
  }
}

DateSelect.defaultProps = {
  prefix: "",
  onDateChange: () => undefined,
  periodDate: undefined,
}

DateSelect.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  periodDate: PropTypes.object,
  onDateChange: PropTypes.func,
  prefix: PropTypes.string,
}

export default DateSelect
