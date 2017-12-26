import React from 'react';
import PropTypes from 'prop-types';
import Week from '../Components/Week';
import WeeksHeader from '../Components/WeeksHeader';
import MonthHeader from '../Components/MonthHeader';
import getWeeks from '../functions/getFullWeeksForAMonth';
import { WeeksContainer } from '../styledComponents';
import TimePicker from '../Containers/TimePicker';

class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    const currDate = new Date(Date.now());
    console.log(currDate.toString());
    this.state = {
      weeks: getWeeks(this.props.month || currDate.getMonth(), this.props.year || currDate.getFullYear()),
      pickingDay: this.props.pickingDay,
      h: this.props.h,
      m: this.props.m,
      day: this.props.day || currDate.getDate(),
      month: this.props.month || currDate.getMonth(),
      year: this.props.year || currDate.getFullYear(),
      viewMonth: this.props.month || currDate.getMonth(),
      viewYear: this.props.year || currDate.getFullYear(),
    };
    this.receiveTime = this.receiveTime.bind(this);
    this.addMonth = this.addMonth.bind(this);
    this.subMonth = this.subMonth.bind(this);
    this.pickDay = this.pickDay.bind(this);
  }

  receiveTime(h, m) {
    this.setState({ h, m });
  }

  pickDay(date) {
    console.log('from click', { date });
    const newDate = new Date(date);
    this.setState({
      day: newDate.getDate(),
      month: newDate.getMonth(),
      viewMonth: newDate.getMonth(),
      year: newDate.getFullYear(),
      viewYear: newDate.getFullYear(),
      weeks: getWeeks(newDate.getMonth(), newDate.getFullYear()),
    });
  }

  addMonth() {
    const { viewMonth, viewYear } = this.state;
    const newDate = new Date(new Date(viewYear, viewMonth));
    newDate.setMonth(newDate.getMonth() + 1);
    this.setState({
      viewMonth: newDate.getMonth(),
      viewYear: newDate.getFullYear(),
      weeks: getWeeks(newDate.getMonth(), newDate.getFullYear()),
    });
  }

  subMonth() {
    const { day, viewMonth, viewYear } = this.state;
    const newDate = new Date(new Date(viewYear, viewMonth, day));
    newDate.setMonth(newDate.getMonth() - 1);
    this.setState({
      viewMonth: newDate.getMonth(),
      viewYear: newDate.getFullYear(),
      weeks: getWeeks(newDate.getMonth(), newDate.getFullYear()),
    });
  }

  render() {
    const {
      weeks, pickingDay, h, m, viewMonth, viewYear, day, month, year,
    } = this.state;
    return (
      <div style={{ fontSize: '1em' }} >
        <p>{h}:{m}</p>
        <p>{day}:{month}:{year}</p>
        <div style={{
          overflow: 'hidden',
          background: '#fff',
          margin: '1em',
          width: '17em',
          height: '20em',
        }}
        >
          <div>
            <MonthHeader
              month={viewMonth}
              year={viewYear}
              subMonth={this.subMonth}
              addMonth={this.addMonth}
            />
            <WeeksContainer>
              <WeeksHeader />
              {
              weeks.map(week =>
                (<Week
                  key={week[0]}
                  week={week}
                  month={viewMonth}
                  year={viewYear}
                  day={day}
                  handleClick={this.pickDay}
                />))
            }
            </WeeksContainer>
          </div>
          <TimePicker
            open={!pickingDay}
            h={h}
            m={m}
            day={day}
            month={month}
            year={year}
            onTimeChange={this.receiveTime}
          />
        </div>
      </div>
    );
  }
}
CalendarView.propTypes = {
  h: PropTypes.number,
  m: PropTypes.number,
  day: PropTypes.number,
  month: PropTypes.number,
  year: PropTypes.number,
  pickingDay: PropTypes.bool,
};
CalendarView.defaultProps = {
  pickingDay: true,
  h: new Date(Date.now()).getHours(),
  m: new Date(Date.now()).getMinutes(),
  day: undefined,
  month: undefined,
  year: undefined,
};

export default CalendarView;
