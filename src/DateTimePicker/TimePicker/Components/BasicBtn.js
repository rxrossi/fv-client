import styled from 'styled-components';

export default styled.button`
  color: ${({ theme }) => theme.color};
  background: none;
  border: none;
  cursor: pointer;
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
