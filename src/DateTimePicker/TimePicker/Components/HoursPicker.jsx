import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pad2 from '../../helpers/pad2';
import BasicBtn from '../Components/BasicBtn';

const Container = styled.div`
  padding: 1.1em 0;
`;

const Digit = styled(BasicBtn)`
  font-weight: bolder;
  font-size: 1.2em;
  width: 4em;
`;

const HoursPicker = ({ handleClick }) => {
  const hours = Array(24).fill(1).map((x, i) => i);
  return (
    <Container>
      { hours.map(x => (
        <Digit
          type="button"
          key={x}
          onClick={() => handleClick(x)}
        >
          {pad2(x)}
        </Digit>))}
    </Container>);
};
HoursPicker.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
export default HoursPicker;
