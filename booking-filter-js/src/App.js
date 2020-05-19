import React from "react"
import { Grid } from "@atlaskit/page"
import NumberSelect from "./components/NumberSelect"
import CountrySelect from "./components/CountrySelect"
import DateSelect from "./components/DateSelect"
import TourCard from "./components/TourCard"
import adultCountSelectOptions from "./data/adults"
import childs from "./data/childs"
import countryIdToName from "./data/countries"
import tours from "./data/tours"

class App extends React.Component {
  constructor(props) {
    super(props)

    const now = new Date()

    this.state = {
      adultCount: 1,
      arrivalDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      childOptions: childs,
      children: [],
      countryId: "all",
      departureDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      ),
    }

    this.handleCountryIdChange = this.handleCountryIdChange.bind(this)
    this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this)
    this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this)
    this.handleAdultCountChange = this.handleAdultCountChange.bind(this)
    this.handleChildrenChange = this.handleChildrenChange.bind(this)
  }

  handleCountryIdChange(id) {
    this.setState({ countryId: id })
  }

  handleArrivalDateChange(date) {
    const { departureDate } = this.state
    this.updateDatePeriod(date, departureDate)
  }

  handleDepartureDateChange(date) {
    const { arrivalDate } = this.state
    this.updateDatePeriod(arrivalDate, date)
  }

  updateDatePeriod(arrivalDate, departureDate) {
    let minDate
    if (arrivalDate <= departureDate) {
      minDate = arrivalDate
    } else {
      minDate = departureDate
    }
    let maxDate
    if (arrivalDate > departureDate) {
      maxDate = arrivalDate
    } else {
      maxDate = departureDate
    }
    this.setState({
      arrivalDate: minDate,
      departureDate: maxDate,
    })
  }

  handleAdultCountChange(values) {
    this.setState({ adultCount: values[0].value })
  }

  handleChildrenChange(values) {
    const { childOptions } = this.state
    this.setState({
      childOptions: [
        {
          label: values[values.length - 1].label,
          value: values[values.length - 1].value + 100,
        },
        ...childOptions,
      ],
      children: values.map((selectedOption) => selectedOption.value),
    })
  }

  render() {
    const {
      countryId,
      departureDate,
      arrivalDate,
      adultCount,
      children,
      childOptions,
    } = this.state
    const filteredTours = tours.filter(
      (tour) =>
        (countryId === "all" || countryId === tour.countryId) &&
        departureDate < tour.endDate
    )

    return (
      <div>
        <div className="app">
          <Grid layout="fluid" spacing="compact">
            <div className="filter_element">
              <CountrySelect
                onCountryIdChange={this.handleCountryIdChange}
                options={countryIdToName}
                value={countryId}
              />
            </div>
            <div className="filter_element">
              <DateSelect
                onDateChange={this.handleArrivalDateChange}
                periodDate={departureDate}
                prefix="Дата заезда: "
                value={arrivalDate}
              />
            </div>
            <div className="filter_element">
              <DateSelect
                onDateChange={this.handleDepartureDateChange}
                periodDate={arrivalDate}
                prefix="Дата выезда: "
                value={departureDate}
              />
            </div>
            <div className="filter_element">
              <div className="number_select">
                <NumberSelect
                  onSelectedOptionChange={this.handleAdultCountChange}
                  options={adultCountSelectOptions}
                  placeholder="Выберите количество взрослых"
                  prefix="Количество взрослых: "
                  values={[adultCount]}
                />
              </div>
            </div>
            <div className="filter_element">
              <div className="number_select">
                <NumberSelect
                  isMultiple
                  onSelectedOptionChange={this.handleChildrenChange}
                  options={childOptions}
                  placeholder="Выберите количество детей"
                  prefix="Возрасты детей: "
                  values={children}
                />
              </div>
            </div>
          </Grid>
        </div>
        <div className="content">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.name}
              endDate={tour.endDate}
              imageUrl={tour.imageUrl}
              name={tour.name}
              place={countryIdToName.get(tour.countryId)}
              rate={tour.rate}
            />
          ))}
          <span
            className="tours_not_found_message"
            style={{ display: filteredTours.length === 0 ? "block" : "none" }}
          >
            Туры не найдены
          </span>
        </div>
      </div>
    )
  }
}

export default App
