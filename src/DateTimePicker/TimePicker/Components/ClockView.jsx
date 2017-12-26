import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pad2 from '../../helpers/pad2';
import BasicBtn from '../Components/BasicBtn';

const Set = styled.div`
  background: none;
  display: inline-block;
  width: 50%;
  margin-top: 2.5em;
`;

const ArrowBtn = styled(BasicBtn)`
  font-size: 2em;
  width: 100%;
`;

const DigitsBtn = styled(BasicBtn)`
  font-size: 5em;
  font-weight: bold;
  width: 100%;
`;

const ClockView = ({ time, handleClick }) => {
  const [hours, minutes] = time.split(':');
  return (
    <div>
      <Set>
        <ArrowBtn
          className="hours-plus-btn"
          type="button"
          onClick={() => handleClick('h', 'plus')}
        >
          <i className="fa fa-arrow-up" aria-hidden="true" />
        </ArrowBtn>
        <DigitsBtn
          type="button"
          className="hours-btn"
          onClick={() => handleClick('h', 'more')}
        >
          {pad2(hours)}
        </DigitsBtn>
        <ArrowBtn
          className="hours-minus-btn"
          type="button"
          onClick={() => handleClick('h', 'minus')}
        >
          <i className="fa fa-arrow-down" aria-hidden="true" />
        </ArrowBtn>


      </Set>
      <Set>
        <ArrowBtn
          className="minutes-plus-btn"
          type="button"
          onClick={() => handleClick('m', 'plus')}
        >
          <i className="fa fa-arrow-up" aria-hidden="true" />
        </ArrowBtn>
        <DigitsBtn
          type="button"
          className="minutes-btn"
          onClick={() => handleClick('m', 'more')}
        >
          {pad2(minutes)}
        </DigitsBtn>
        <ArrowBtn
          className="minutes-minus-btn"
          type="button"
          onClick={() => handleClick('m', 'minus')}
        >
          <i className="fa fa-arrow-down" aria-hidden="true" />
        </ArrowBtn>
      </Set>
    </div>);
};
ClockView.propTypes = {
  time: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ClockView;
