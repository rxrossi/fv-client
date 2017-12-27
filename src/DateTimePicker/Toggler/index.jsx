import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fromDate from '../helpers/fromDate';
import pad2 from '../helpers/pad2';

const Button = styled.button`
  color: #eee;
  background: blue;
  border: none;
  cursor: pointer;
  font-weight: bold;
  width: 17em;
  height: 3em;

  &:focus {
    outline: none;
    color: ${({ theme }) => theme.hoveredColor};
    text-shadow: 0 0 0.3em ${({ theme }) => theme.textShadowBgBased};
  };
  &:hover {
    outline: none;
    color: ${({ theme }) => theme.hoveredColor};
    text-shadow: 0 0 0.3em ${({ theme }) => theme.textShadowBgBased};
  };
`;

const Toggler = ({ date, show, handleClick }) => {
  const {
    minutes, hours, day, month, year,
  } = fromDate(date);

  if (show === 'date') {
    return (
      <Button
        type="button"
        onClick={handleClick}
      >
        {pad2(year)} {pad2(month + 1)} {pad2(day)}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
    >
      {pad2(hours)}:{pad2(minutes)}
    </Button>
  );
};

Toggler.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  handleClick: PropTypes.func.isRequired,
  show: PropTypes.string.isRequired, // one of [clock, date]
};

export default Toggler;

