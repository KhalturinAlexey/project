import React from 'react';
import { Grid } from '@atlaskit/page';
import NumberSelect from './NumberSelect';
import CountrySelect from './CountrySelect';
import DateSelect from './DateSelect';
import TourCard from './TourCard';

var countryIdToName = new Map([
  ['all', 'Все'],
  ['au', 'Австралия'],
  ['by', 'Белоруссия'],
  ['vn', 'Вьетнам'],
  ['id', 'Индонезия'],
  ['ca', 'Канада'],
  ['no', 'Норвегия'],
  ['ru', 'Россия'],
  ['us', 'США'],
  ['ee', 'Эстония'],
  ['jp', 'Япония'],
]);

var adultCountSelectOptions = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
];

var tours = [
  {
    name: 'Город-отель Бархатные Сезоны, Русский Дом, Спортивный квартал (участок 17)',
    countryId: 'au',
    endDate: new Date(2020, 5, 1),
    imageUrl: '1.jpg',
    rate: 3,
  },
  {
    name: 'Sigma Sirius Park (ex. Александровский сад)',
    countryId: 'by',
    endDate: new Date(2020, 5, 10),
    imageUrl: '2.jpg',
    rate: 5,
  },
  {
    name: 'Сочи Парк Отель (ex. Азимут Отель Сочи)',
    countryId: 'vn',
    endDate: new Date(2020, 5, 20),
    imageUrl: '3.jpg',
    rate: 4,
  },
  {
    name: 'Горки Город Апартаменты (Gorki Gorod Apartments)',
    countryId: 'id',
    endDate: new Date(2020, 5, 30),
    imageUrl: '4.jpg',
    rate: 3,
  },
  {
    name: 'Аквамарин (Akvamarin)',
    countryId: 'ca',
    endDate: new Date(2020, 6, 1),
    imageUrl: '5.jpg',
    rate: 5,
  },
  {
    name: 'Город-отель Бархатные Сезоны, Екатерининский Квартал (Gorod-Otel Barhatnye Sezony, Ekaterininskij Kvartal)',
    countryId: 'no',
    endDate: new Date(2020, 6, 10),
    imageUrl: '6.jpg',
    rate: 4,
  },
  {
    name: 'Маринс Парк (Marins Park)',
    countryId: 'ru',
    endDate: new Date(2020, 6, 20),
    imageUrl: '7.jpg',
    rate: 3,
  },
  {
    name: 'Город-отель Бархатные Сезоны, Русский Дом Семейный Квартал (участок 14)',
    countryId: 'us',
    endDate: new Date(2020, 6, 30),
    imageUrl: '8.jpg',
    rate: 5,
  },
  {
    name: 'Анатоль (Anatol)',
    countryId: 'ee',
    endDate: new Date(2020, 7, 10),
    imageUrl: '9.jpg',
    rate: 4,
  },
  {
    name: 'Апарт-отель Престиж (корпус 2)',
    countryId: 'jp',
    endDate: new Date(2020, 7, 20),
    imageUrl: '10.jpg',
    rate: 3,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    var now = new Date();

    this.state = {
      adultCount: 1,
      arrivalDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      childOptions: [
        {
          label: 'до 1 года',
          value: 0,
        },
        {
          label: '1 год',
          value: 1,
        },
        {
          label: '2 года',
          value: 2,
        },
        {
          label: '3 года',
          value: 3,
        },
        {
          label: '4 года',
          value: 4,
        },
        {
          label: '5 лет',
          value: 5,
        },
        {
          label: '6 лет',
          value: 6,
        },
        {
          label: '7 лет',
          value: 7,
        },
        {
          label: '8 лет',
          value: 8,
        },
        {
          label: '9 лет',
          value: 9,
        },
        {
          label: '10 лет',
          value: 10,
        },
        {
          label: '11 лет',
          value: 11,
        },
      ],
      children: [],
      countryId: 'all',
      departureDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      ),
    };

    this.handleCountryIdChange = this.handleCountryIdChange.bind(this);
    this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this);
    this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);
    this.handleAdultCountChange = this.handleAdultCountChange.bind(this);
    this.handleChildrenChange = this.handleChildrenChange.bind(this);
  }
  render() {
    return (
      <div>
      <div
        style={{
          alignItems: 'center',
          borderBottom: '1px solid #dddddd',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid layout={'fluid'} spacing={'compact'}>
          <div style={{ margin: '10px' }}>
            <CountrySelect
              onCountryIdChange={this.handleCountryIdChange}
              options={countryIdToName}
              value={this.state.countryId}
            />
          </div>
          <div style={{ margin: '10px' }}>
            <DateSelect
              onDateChange={this.handleArrivalDateChange}
              periodDate={this.state.departureDate}
              prefix={'Дата заезда: '}
              value={this.state.arrivalDate}
            />
          </div>
          <div style={{ margin: '10px' }}>
            <DateSelect
              onDateChange={this.handleDepartureDateChange}
              periodDate={this.state.arrivalDate}
              prefix={'Дата выезда: '}
              value={this.state.departureDate}
            />
          </div>
          <div style={{ margin: '10px' }}>
            <div style={{ 'minWidth': '280px' }}>
              <NumberSelect
                onSelectedOptionChange={this.handleAdultCountChange}
                options={adultCountSelectOptions}
                placeholder={'Выберите количество взрослых'}
                prefix={'Количество взрослых: '}
                values={[this.state.adultCount]}
              />
            </div>
          </div>
          <div style={{ margin: '10px' }}>
            <div style={{ 'minWidth': '260px' }}>
              <NumberSelect
                isMultiple
                onSelectedOptionChange={this.handleChildrenChange}
                options={this.state.childOptions}
                placeholder={'Выберите количество детей'}
                prefix={'Возрасты детей: '}
                values={this.state.children}
              />
            </div>
          </div>
        </Grid>
      </div>
      <div
        style={{
          margin: '20px',
        }}
      >
        {tours
          .filter(
            tour =>
              (this.state.countryId == 'all' ||
                this.state.countryId == tour.countryId) &&
              this.state.departureDate < tour.endDate,
          )
          .map(tour => (
            <div
              key={tour.name}
              style={{
                'display': 'inline-block',
                margin: '18px',
              }}
            >
              <TourCard
                endDate={tour.endDate}
                imageUrl={tour.imageUrl}
                name={tour.name}
                place={countryIdToName.get(tour.countryId)}
                rate={tour.rate}
              />
            </div>
          ))}
      </div>
    </div>
    );
  }

  handleCountryIdChange(id) {
    this.setState({countryId: id});
  }

  handleArrivalDateChange(date) {
    this.updateDatePeriod(date, this.state.departureDate);
  }

  handleDepartureDateChange(date) {
    this.updateDatePeriod(this.state.arrivalDate, date);
  }

  updateDatePeriod(arrivalDate, departureDate) {
    var minDate;
    if (arrivalDate <= departureDate) {
      minDate = arrivalDate;
    } else {
      minDate = departureDate;
    };
    var maxDate;
    if (arrivalDate > departureDate) {
      maxDate = arrivalDate;
    } else {
      maxDate = departureDate;
    }
    this.setState({
      arrivalDate: minDate,
      departureDate: maxDate,
    });
  }

  handleAdultCountChange(values) {
    this.setState({adultCount: values[0].value});
  }

  handleChildrenChange(values) {
    this.setState({
      childOptions: [
        {
          label: values[values.length - 1].label,
          value: values[values.length - 1].value + 100,
        },
        ...this.state.childOptions,
      ],
      children: values.map(selectedOption => selectedOption.value),
    });
  }
}

export default App;
