import React from 'react';
import styled from 'styled-components';
import { ToggleBtn, ToggleBtnWrapper } from '../styledComponents';

const pad2 = x => (x > 9 ? x : `0${x}`);

const PairOfDigitsContainer = styled.div`
  display: inline-block;
  width: 2em;
  font-size: 2.8em;
  margin-top: 0.5em;
  text-align: center;
`;

const MinusPlusBtn = styled.button`
  background: none;
  border: none;
  color: #eee;
  cursor: pointer;
  font-size: 1em;
`;

const DigitsBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.7em;
  margin: 0 0.7em;
  color: #fff;
`;

const RowOfBtns = ({ row, toSum = 0, handleClick }) => (
  <div>
    {
      row.map(x => <DigitsBtn onClick={() => handleClick(x)}>{pad2(x + toSum)}</DigitsBtn>)
    }
  </div>
);

export const HoursIntervals = ({ pm, handleClick }) => {
  const rows = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [16, 17, 18, 19],
    [20, 21, 22, 23],
  ];

  return (
    <div>
      {
        rows.map(row => <RowOfBtns handleClick={handleClick} row={row} toSum={pm ? 12 : 0} />)
      }
    </div>
  );
};

export const FiveMinutesIntervals = ({ handleClick }) => {
  const rows = [
    [0, 5, 10],
    [15, 20, 25],
    [30, 35, 40],
    [45, 50, 55],
  ];

  return (
    <div style={{ marginTop: '2.5em' }}>
      {
        rows.map(row => <RowOfBtns row={row} handleClick={handleClick} />)
      }
    </div>
  );
};

export const Toggle = ({
  open, handleClick, h, m, day, month, year,
}) => (
  <ToggleBtnWrapper>
    <ToggleBtn type="button" onClick={handleClick} >
      {
        open ?
          <span>
            <i className="fa fa-calendar-o" aria-hidden="true" /> {day} {month} {year}
          </span> :
          <span>
            {pad2(h)}:{pad2(m)} <i className="fa fa-clock-o" aria-hidden="true" />
          </span>
      }
    </ToggleBtn>
  </ToggleBtnWrapper>
);

const TimeDigitsBtn = styled.button`
  text-align: center;
  color: #FFF;
  border: none;
  background: none;
`;

const PairOfDigits = ({ digits, handleChange, handleClick }) => (
  <PairOfDigitsContainer>
    <MinusPlusBtn onClick={() => handleChange(digits + 1)}>
      <i className="fa fa-arrow-up" aria-hidden="true" />
    </MinusPlusBtn>
    <TimeDigitsBtn onClick={handleClick}>
      {pad2(digits)}
    </TimeDigitsBtn>
    <MinusPlusBtn onClick={() => handleChange(digits - 1)}>
      <i className="fa fa-arrow-down" aria-hidden="true" />
    </MinusPlusBtn>
  </PairOfDigitsContainer>
);

class TimePickView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'pairs',
    };
    this.displayHoursIntervals = this.displayHoursIntervals.bind(this);
    this.displayMinutesIntervals = this.displayMinutesIntervals.bind(this);
    this.displayPairs = this.displayPairs.bind(this);
    this.pickMinutes = this.pickMinutes.bind(this);
    this.pickHours = this.pickHours.bind(this);
  }

  displayHoursIntervals() {
    this.setState({ display: 'hoursIntervals' });
  }

  displayMinutesIntervals() {
    this.setState({ display: 'minutesIntervals' });
  }

  displayPairs() {
    this.setState({ display: 'pairs' });
  }

  pickMinutes(value) {
    this.setState({ display: 'pairs' });
    this.props.handleChange('m')(value);
  }
  pickHours(value) {
    this.setState({ display: 'pairs' });
    this.props.handleChange('h')(value);
  }

  render() {
    const {
      h, m, closed, handleChange,
    } = this.props;
    const { display } = this.state;

    if (display === 'minutesIntervals') {
      return (
        <FiveMinutesIntervals handleClick={this.pickMinutes} />
      );
    }

    if (display === 'hoursIntervals') {
      return (
        <HoursIntervals handleClick={this.pickHours} />
      );
    }

    return (
      <div style={{ display: closed && 'none' }}>
        <PairOfDigits
          digits={h}
          handleChange={handleChange('h')}
          handleClick={this.displayHoursIntervals}
        />
        <PairOfDigits
          digits={m}
          handleChange={handleChange('m')}
          handleClick={this.displayMinutesIntervals}
        />
      </div>
    );
  }
}

export default TimePickView;

