import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import DatePicker from './DatePicker/';
import TimePicker from './TimePicker/';
import Toggler from './Toggler/';
import pad2 from './helpers/pad2';
import fromDate from './helpers/fromDate';

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picking: this.props.picking,
    };
    this.handleTogglerClick = this.handleTogglerClick.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
  }

  handleTogglerClick() {
    this.setState({
      picking: this.state.picking === 'time' ? 'date' : 'time',
    });
  }

  handleChangeDate(receivedDate) {
    const { day, month, year } = fromDate(receivedDate);
    const { hours, minutes } = fromDate(this.props.date);
    const value = new Date(year, month, day, hours, minutes);
    this.props.onChange(this.props.name)({ target: { value } });
  }

  handleChangeTime(receivedTime) {
    const [hours, minutes] = receivedTime.split(':');
    const { year, month, day } = fromDate(this.props.date);
    const value = new Date(year, month, day, hours, minutes);
    this.props.onChange(this.props.name)({ target: { value } });
  }

  render() {
    const { date } = this.props;
    const time = `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
    const { picking } = this.state;
    return (
      <div style={{ display: 'inline-block' }}>
        <Label>{this.props.label}</Label>
        {
          this.state.picking === 'date' ?
            <DatePicker
              date={date}
              onChange={this.handleChangeDate}
            /> :
            <TimePicker
              time={time}
              onChange={this.handleChangeTime}
            />
        }
        <Toggler
          date={date}
          show={picking === 'time' ? 'date' : 'clock'}
          handleClick={this.handleTogglerClick}
        />
      </div>
    );
  }
}
DateTimePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  picking: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
DateTimePicker.defaultProps = {
  date: new Date(),
  picking: 'time',
};

export default DateTimePicker;
