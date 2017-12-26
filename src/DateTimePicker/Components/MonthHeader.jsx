import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MonthHeader } from '../styledComponents';

const MinusPlusBtn = styled.button`
  background: none;
  border: none;
  color: #eee;
  cursor: pointer;
  font-size: 1em;
  margin: 0 1.8em;
`;

const MonthHeaderComponent = ({
  year, month, addMonth, subMonth,
}) => (
  <MonthHeader>
    <MinusPlusBtn type="button" onClick={subMonth}>
      <i className="fa fa-arrow-left" aria-hidden="true" />
    </MinusPlusBtn>
    {`${new Date(year, month).toLocaleString('en-us', { month: 'long' })} ${year}`}
    <MinusPlusBtn type="button" onClick={addMonth}>
      <i className="fa fa-arrow-right" aria-hidden="true" />
    </MinusPlusBtn>
  </MonthHeader>
);

MonthHeaderComponent.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  addMonth: PropTypes.func.isRequired,
  subMonth: PropTypes.func.isRequired,
};

export default MonthHeaderComponent;
