import React from 'react';
import PropTypes from 'prop-types';
import ClockView from './Components/ClockView';
import HoursPicker from './Components/HoursPicker';
import MinutesPicker from './Components/MinutesPicker';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'ClockView', // one of [ClockView, minutesPicker, hoursPicker]
    };
    this.handleClockClick = this.handleClockClick.bind(this);
    this.handleHoursPickerClick = this.handleHoursPickerClick.bind(this);
  }

  handleHoursPickerClick(value) {
  }

  handleMinutesPickerClick(value) {
  }

  handleClockClick(pair, action) {
    if (action === 'more') {
      this.setState({
        display: pair === 'h' ? 'hoursPicker' : 'minutesPicker',
      });
    }
    // handleClockClick([h, m], [more, plus, minus])
  }


  render() {
    const { time } = this.props;
    const { display } = this.state;

    if (display === 'hoursPicker') {
      return (
        <HoursPicker
          handleClick={this.handleHoursPickerClick}
        />);
    } else if (display === 'minutesPicker') {
      return (
        <MinutesPicker
          handleClick={this.handleMinutesPickerClick}
        />);
    }

    return (
      <ClockView
        time={time}
        handleClick={this.handleClockClick}
      />);
  }
}

TimePicker.propTypes = {
  time: PropTypes.string.isRequired,
};

export default TimePicker;
