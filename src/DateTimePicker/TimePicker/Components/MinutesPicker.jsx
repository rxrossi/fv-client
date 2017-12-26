import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pad2 from '../../helpers/pad2';
import BasicBtn from '../Components/BasicBtn';

const Container = styled.div`
  padding: 5.2em 0;
`;

const Digit = styled(BasicBtn)`
  font-weight: bolder;
  font-size: 1.4em;
  width: 4em;
`;

const MinutesPicker = ({ handleClick }) => {
  const interval = 5;
  const buttonsCount = 60 / interval;
  const minutes = Array(buttonsCount)
    .fill(0).map((x, i) => i * interval);
  return (
    <Container>
      { minutes.map(x => (
        <Digit
          type="button"
          key={x}
          onClick={() => handleClick(x)}
        >
          {pad2(x)}
        </Digit>))}
    </Container>);
};
MinutesPicker.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default MinutesPicker;
