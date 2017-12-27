import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../sharedComponents/Wrapper';
import DaysComponent from './Components/Days';
import Header from './Components/Header';
import getDays from '../helpers/getDays';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewYear: this.props.date.getFullYear(),
      viewMonth: this.props.date.getMonth(),
    };
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handleDaysClick = this.handleDaysClick.bind(this);
  }

  handleHeaderClick(action) {
    if (action === 'incMonth') {
      if (this.state.viewMonth === 11) {
        return this.setState({
          viewMonth: 0,
          viewYear: this.state.viewYear + 1,
        });
      }
      return this.setState({ viewMonth: this.state.viewMonth + 1 });
    } else if (action === 'decMonth') {
      if (this.state.viewMonth === 0) {
        return this.setState({
          viewMonth: 11,
          viewYear: this.state.viewYear - 1,
        });
      }
      return this.setState({ viewMonth: this.state.viewMonth - 1 });
    }
    return null;
  }

  handleDaysClick(date) {
    this.props.onChange(date);
  }

  render() {
    const { viewMonth, viewYear } = this.state;
    const { date } = this.props;

    const days = getDays(viewMonth, viewYear);
    return (
      <Wrapper>
        <Header
          viewMonth={viewMonth}
          viewYear={viewYear}
          handleClick={this.handleHeaderClick}
        />
        <DaysComponent
          days={days}
          selectedDay={date}
          viewMonth={viewMonth}
          handleClick={this.handleDaysClick}
        />
      </Wrapper>
    );
  }
}

DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
