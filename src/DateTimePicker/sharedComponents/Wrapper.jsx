import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

export const basicTheme = () => ({
  bg: '#007bff',
  hoveredBg: '#006bef',
  textShadowBgBased: '#002baf',
  color: '#eee',
  hoveredColor: '#fff',
});

const Main = styled.div`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.color};
  text-align: center;
  width: 17em;
  height: 17em;
`;

const Wrapper = ({ children }) => (
  <ThemeProvider theme={basicTheme}>
    <Main>
      {children}
    </Main>
  </ThemeProvider>
);

Wrapper.propTypes = {
  children: PropTypes.node,
};

Wrapper.defaultProps = {
  children: undefined,
};

export default Wrapper;
