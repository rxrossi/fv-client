import React from 'react';
import PropTypes from 'prop-types';
import Week from '../Components/Week';
import WeeksHeader from '../Components/WeeksHeader';
import MonthHeader from '../Components/MonthHeader';
import getWeeks from '../functions/getFullWeeksForAMonth';
import { WeeksContainer, ClockContainer, ToggleBtn, ClockFooter } from '../styledComponents';
import TimePickView from '../Containers/TimePickView';
import TimePicker from '../Containers/TimePicker';

class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: getWeeks(this.props.month, this.props.year),
      pickingDay: this.props.pickingDay,
      // pickingDay: true,
    };
  }

  render() {
    const { month, year } = this.props;
    const { weeks, pickingDay } = this.state;
    return (
      <div style={{
        overflow: 'hidden',
        background: '#fff',
        margin: '1rem',
        width: '17rem',
        height: '20rem',
        fontSize: '1em',
      }}
      >
        <div>
          <MonthHeader month={month} year={year} />
          <WeeksContainer>
            <WeeksHeader />
            {
            weeks.map(week => <Week key={week[0]} week={week} month={month} />)
          }
          </WeeksContainer>
        </div>
        <TimePicker open={!pickingDay} />
      </div>
    );
  }
}
CalendarView.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  pickingDay: PropTypes.bool,
};
CalendarView.defaultProps = {
  pickingDay: true,
};

export default CalendarView;
