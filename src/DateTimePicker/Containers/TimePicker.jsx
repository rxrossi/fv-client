import React from 'react';
import PropTypes from 'prop-types';
import { ClockContainer, ToggleBtnWrapper } from '../styledComponents';
import TimePickView, { Toggle } from '../Containers/TimePickView';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    const currDate = new Date(Date.now());
    this.state = {
      open: this.props.open,
      h: this.props.h || currDate.getHours(),
      m: this.props.m || currDate.getMinutes(),
    };
    this.toggleOpen = this.toggleOpen.bind(this);
    this.changeTime = this.changeTime.bind(this);
  }

  changeTime(type) {
    return (value) => {
      let calculatedValue = value;

      if (type === 'h' && value > 23) {
        calculatedValue = 0;
      } else if (type === 'h' && value < 0) {
        calculatedValue = 23;
      }

      if (type === 'm' && value > 59) {
        calculatedValue = 0;
      } else if (type === 'm' && value < 0) {
        calculatedValue = 59;
      }
      if (type === 'h') {
        this.props.onTimeChange(calculatedValue, this.state.m);
      }
      if (type === 'm') {
        this.props.onTimeChange(this.state.h, calculatedValue);
      }
      this.setState({ [type]: calculatedValue });
    };
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { open, h, m } = this.state;
    const { day, month, year } = this.props;
    return (
      <ClockContainer closed={!open}>
        <Toggle
          handleClick={this.toggleOpen}
          open={open}
          h={h}
          m={m}
          day={day}
          month={month}
          year={year}
        />
        <TimePickView h={h} m={m} closed={!open} handleChange={this.changeTime} />
      </ClockContainer>
    );
  }
}

TimePicker.propTypes = {
  open: PropTypes.bool,
  onTimeChange: PropTypes.func.isRequired,
};

TimePicker.defaultProps = {
  open: true,
};

export default TimePicker;