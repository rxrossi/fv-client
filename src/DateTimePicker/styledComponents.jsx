import styled from 'styled-components';

export const WeekAbbreviation = styled.span`
  display: inline-block;
  width: 1.8em;
  color: #bbb;
  font-weight: bolder;
  text-align: center;
  margin: 0.4em 0.76em;
  padding: 0.2em 0;
  font-size: 0.6em;
`;

export const MonthHeader = styled.div`
  color: #eef;
  background: #007bff;
  height: 3.5em;
  font-size: 0.8em;
  padding-top: 0.5em;
  text-align: center;
  font-weight: bold;
 `;

export const ToggleBtnWrapper = styled.div`
  color: #eef;
  padding-top: 0.8em;
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
  height: 20em;
  ${props => !props.closed && `
    background: #0059dd;
    bottom: 17em;
    opacity: 0.95;
  `}
`;

export const WeeksContainer = styled.div`
  padding: 1em 0 1.3em 0;
  height: 14em;
`;

export const WeekRow = styled.div`
  margin: 0 1.5em;
`;

export const DayBtn = styled.button`
  text-align: right;
  border: none;
  width: 2em;
  cursor: pointer;
  background: ${props => (props.selected ? '#adf' : 'none')};
  color: ${props => (props.belongsToThisMonth ? '#333' : '#ccd')};
  &:hover {
    font-weight: bolder;
  }

`;
