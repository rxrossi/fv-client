import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DayBtn = styled.button`
  color: ${props => (props.belongsToThisMonth ? '#347' : '#aaa')};
  border: none;
  text-align: right;
  width: 2.428em;
  cursor: pointer;
  background: none;
  border-radius: 0.5em;
  font-weight: ${props => (props.selected ? 'bold' : 'none')};
  background: ${props => props.selected && '#adf'};
  &:focus {
    outline: none;
    color: #79c;
  };
  &:hover {
    outline: none;
    color: #79c;
  };
`;

const Day = ({
  date, handleClick, selectedDay, viewMonth,
}) => (
  <DayBtn
    type="button"
    belongsToThisMonth={date.getMonth() === viewMonth}
    selected={date === selectedDay}
    onClick={() => handleClick(date)}
  >
    {date.getDate()}
  </DayBtn>);
Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date),
  viewMonth: PropTypes.number.isRequired,
};
Day.defaultProps = {
  selectedDay: undefined,
};

export default Day;
