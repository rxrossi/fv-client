import React from 'react';
import PropTypes from 'prop-types';
import { ClockContainer } from '../styledComponents';
import TimePickView, { Toggle } from '../Containers/TimePickView';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
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
        this.props.onTimeChange(calculatedValue, this.props.date.getMinutes());
      }
      if (type === 'm') {
        this.props.onTimeChange(this.props.date.getHours(), calculatedValue);
      }
    };
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { open } = this.props;
    const { date } = this.props;
    console.log(this.state);
    return (
      <ClockContainer closed={!open}>
        <TimePickView date={date} closed={!open} handleChange={this.changeTime} />
      </ClockContainer>
    );
  }
}

TimePicker.propTypes = {
  open: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
  onTimeChange: PropTypes.func.isRequired,
};

TimePicker.defaultProps = {
  open: true,
};

export default TimePicker;
