import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 3m;
  overflow: none;
  background: blue;
`;

const IncDecBtns = styled.button`
  color: #ddd;
  border: none;
  border-radius: 0.2em;
  margin: 0.5em;
  padding: 0.3em;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  background: #006bef;
  width: 2em;
  &:focus {
    outline: none;
    color: #eee;
  };
  &:hover {
    outline: none;
    color: #fff;
  };
`;

const MonthYear = styled.p`
  display: inline-block;
  width: 11em;
  font-weight: bold;
`;

const Header = ({ viewMonth, viewYear, handleClick }) => {
  const date = new Date(viewYear, viewMonth);
  const monthName = date.toLocaleString('en-us', { month: 'long' });
  return (
    <Wrapper>
      <IncDecBtns
        type="button"
        className="dec-view-month"
        onClick={() => handleClick('decMonth')}
      > <i className="fa fa-arrow-left" aria-hidden="true" />
      </IncDecBtns>
      <MonthYear>{monthName} {viewYear}</MonthYear>
      <IncDecBtns
        type="button"
        className="inc-view-month"
        onClick={() => handleClick('incMonth')}
      > <i className="fa fa-arrow-right" aria-hidden="true" />
      </IncDecBtns>
    </Wrapper>
  );
};
Header.propTypes = {
  viewMonth: PropTypes.number.isRequired,
  viewYear: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Header;
