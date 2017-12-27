import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../sharedComponents/Wrapper';
import ClockView from './Components/ClockView';
import HoursPicker from './Components/HoursPicker';
import MinutesPicker from './Components/MinutesPicker';
import sumAndSubTime from '../helpers/sumAndSubTime';
import pad2 from '../helpers/pad2';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'ClockView', // one of [ClockView, minutesPicker, hoursPicker]
    };
    this.handleClockClick = this.handleClockClick.bind(this);
    this.handleHoursPickerClick = this.handleHoursPickerClick.bind(this);
    this.handleMinutesPickerClick = this.handleMinutesPickerClick.bind(this);
  }

  handleHoursPickerClick(value) {
    const [, minutes] = this.props.time.split(':');
    this.setState({ display: 'ClockView' });
    return this.props.onChange(`${pad2(value)}:${minutes}`);
  }

  handleMinutesPickerClick(value) {
    const [hours] = this.props.time.split(':');
    this.setState({ display: 'ClockView' });
    return this.props.onChange(`${hours}:${pad2(value)}`);
  }

  handleClockClick(pair, action) {
    if (action === 'more') {
      return this.setState({
        display: pair === 'h' ? 'hoursPicker' : 'minutesPicker',
      });
    }
    const newAction = action === 'plus' ? 'sum' : 'sub';
    return this.props.onChange(sumAndSubTime(this.props.time, pair, newAction));
  }


  render() {
    const { time } = this.props;
    const { display } = this.state;
    if (display === 'hoursPicker') {
      return (
        <Wrapper>
          <HoursPicker
            handleClick={this.handleHoursPickerClick}
          />
        </Wrapper>);
    } else if (display === 'minutesPicker') {
      return (
        <Wrapper>
          <MinutesPicker
            handleClick={this.handleMinutesPickerClick}
          />
        </Wrapper>);
    }

    return (
      <Wrapper>
        <ClockView
          time={time}
          handleClick={this.handleClockClick}
        />
      </Wrapper>);
  }
}

TimePicker.propTypes = {
  time: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TimePicker;
