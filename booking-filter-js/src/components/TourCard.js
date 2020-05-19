import * as React from "react"
import StarFilledIcon from "@atlaskit/icon/glyph/star-filled"
import StarIcon from "@atlaskit/icon/glyph/star"
import PropTypes from "prop-types"
import monthIndexToName from "../data/months"

class TourCard extends React.Component {
  static getStarIcon(filled, label) {
    if (filled) {
      return <StarFilledIcon label={label} primaryColor="#ffc400" />
    }
    return <StarIcon label={label} primaryColor="#ffc400" />
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

  render() {
    const { imageUrl, name, place, rate, endDate } = this.props
    return (
      <div className="tour_card">
        <div
          className="tour_card_image"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
        <div className="tour_card_margin">
          <span className="tour_card_title">{name}</span>
        </div>
        <div className="tour_card_margin">
          <span>{place}</span>
        </div>
        <div className="tour_card_margin">
          {TourCard.getStarIcon(rate > 0, "Terrible")}
          {TourCard.getStarIcon(rate > 1, "Meh")}
          {TourCard.getStarIcon(rate > 2, "Good")}
          {TourCard.getStarIcon(rate > 3, "Great")}
          {TourCard.getStarIcon(rate > 4, "Fantastic!")}
        </div>
        <div className="tour_card_margin">
          <span>{`Доступно до: ${TourCard.convertDateToHumanStyle(
            endDate
          )}`}</span>
        </div>
      </div>
    )
  }
}

TourCard.defaultProps = {
  name: "",
  place: "",
  imageUrl: "",
  rate: 0,
}

TourCard.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  place: PropTypes.string,
  rate: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  endDate: PropTypes.object.isRequired,
}

export default TourCard
