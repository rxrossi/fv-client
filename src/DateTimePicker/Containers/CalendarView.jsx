import React from 'react';
import PropTypes from 'prop-types';
import Week from '../Components/Week';
import WeeksHeader from '../Components/WeeksHeader';
import MonthHeader from '../Components/MonthHeader';
import getWeeks from '../functions/getFullWeeksForAMonth';
import { WeeksContainer } from '../styledComponents';
import { Toggle } from '../Containers/TimePickView';
import TimePicker from '../Containers/TimePicker';

class CalendarView extends React.Component {
  constructor(props) {
    super(props);

    const currDate = this.props.date;
    this.state = {
      weeks: getWeeks(this.props.date.getMonth(), this.props.date.getFullYear()),
      pickingDay: this.props.pickingDay,
      date: this.props.date,
      viewMonth: this.props.month || currDate.getMonth(),
      viewYear: this.props.year || currDate.getFullYear(),
    };
    this.receiveTime = this.receiveTime.bind(this);
    this.addMonth = this.addMonth.bind(this);
    this.subMonth = this.subMonth.bind(this);
    this.pickDay = this.pickDay.bind(this);
    this.togglePickingDay = this.togglePickingDay.bind(this);
  }

  togglePickingDay() {
    this.setState({
      pickingDay: !this.state.pickingDay,
    });
  }

  receiveTime(h, m) {
    const { year, month, day } = this.state;
    this.setState({
      date: new Date(year, month, day, h, m),
    });
  }

  pickDay(date) {
    console.log('from click', { date });
    const newDate = new Date(date);
    this.setState({
      day: newDate.getDate(),
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.state.date.getHours(), this.state.date.getMinutes()),
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
      weeks, pickingDay, h, m, viewMonth, viewYear, day, month, year, date,
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
          // height: '20em',
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
            date={date}
            onTimeChange={this.receiveTime}
          />
          <Toggle
            handleClick={this.togglePickingDay}
            open={!pickingDay}
            date={this.props.date}
          />
        </div>
      </div>
    );
  }
}
CalendarView.propTypes = {
  pickingDay: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
};
CalendarView.defaultProps = {
  pickingDay: true,
  date: new Date(Date.now()),
};

export default CalendarView;
