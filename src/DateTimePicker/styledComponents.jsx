import styled from 'styled-components';

export const WeekAbbreviation = styled.span`
  display: inline-block;
  width: 1.8rem;
  color: #bbb;
  font-weight: bolder;
  text-align: center;
  margin: 0.4rem 0.1rem;
  padding: 0.2rem 0;
  font-size: 0.6rem;
`;

export const MonthHeader = styled.div`
  color: #eef;
  background: #007bff;
  height: 3rem;
  padding-top: 0.5rem;
  text-align: center;
  font-weight: bold;
 `;

export const ToggleBtnWrapper = styled.div`
  color: #eef;
  height: 3rem;
  padding-top: 0.5rem;
  text-align: center;
  font-weight: bold;
 `;

export const ToggleBtn = styled.button`
  color: #eef;
  cursor: pointer;
  font-weight: bold;
  background: none;
  border: none;
`;

export const ClockContainer = styled.div`
  color: #eef;
  background: #007bff;
  text-align: center;
  font-weight: bold;
  position: relative;
  transition: all 0.2s;
  opacity: 1;
  bottom: 0;
  height: 20rem;
  ${props => !props.closed && `
    background: #0059dd;
    height: 20rem;
    bottom: 17rem;
    opacity: 0.95;
  `}
`;

export const WeeksContainer = styled.div`
  padding: 1rem 0 1.3rem 0;
  height: 14rem;
`;

export const WeekRow = styled.div`
  margin: 0 1.5rem;
`;

export const DayBtn = styled.button`
  text-align: right;
  border: none;
  background: none;
  width: 2rem;
  cursor: pointer;
  color: ${props => (props.belongsToThisMonth ? '#333' : '#ccd')};
  &:hover {
    font-weight: bolder;
  }
`;
