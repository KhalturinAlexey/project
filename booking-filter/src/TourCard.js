import * as React from 'react';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import StarIcon from '@atlaskit/icon/glyph/star';

class TourCard extends React.Component {
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
    [11, 'дек'],
  ]);

  getStarIcon(filled, label) {
    if (filled) {
      return <StarFilledIcon label={label} primaryColor='#ffc400' />
    } else {
      return <StarIcon label={label} primaryColor='#ffc400' />
    };
  }

  convertDateToHumanStyle(date) {
    var monthName = '';
    if (this.monthIndexToName.has(date.getMonth())) {
      monthName = this.monthIndexToName.get(date.getMonth());
    }

    return date.getDate().toString() + ' ' + monthName + ' ' + date.getFullYear().toString();
  }

  render() {
    return (
      <div
        style={{
          border: '1px solid #999',
          borderRadius: '10px',
          height: '400px',
          overflow: 'hidden',
          width: '350px',
        }}
      >
        <div
          style={{
            backgroundImage: 'url("' + this.props.imageUrl + '")',
            backgroundPosition: '50%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '60%',
          }}
        />
        <div style={{ margin: '5px' }}>
          <span style={{ fontWeight: 'bold' }}>{this.props.name}</span>
        </div>
        <div style={{ margin: '5px' }}>
          <span>{this.props.place}</span>
        </div>
        <div style={{ margin: '5px' }}>
          {this.getStarIcon(this.props.rate > 0, 'Terrible')}
          {this.getStarIcon(this.props.rate > 1, 'Meh')}
          {this.getStarIcon(this.props.rate > 2, 'Good')}
          {this.getStarIcon(this.props.rate > 3, 'Great')}
          {this.getStarIcon(this.props.rate > 4, 'Fantastic!')}
        </div>
        <div style={{ margin: '5px' }}>
          <span>
            {'Доступно до: ' + this.convertDateToHumanStyle(this.props.endDate)}
          </span>
        </div>
      </div>
    );
  }
}

export default TourCard;
