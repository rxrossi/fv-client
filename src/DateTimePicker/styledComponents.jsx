import styled from 'styled-components';

export const WeekAbbreviation = styled.span`
  display: inline-block;
  width: 1.8rem;
  color: #bbb;
  font-weight: bolder;
  text-align: center;
  margin: 0 0.1rem;
  border-bottom: 1px solid #68a;
  padding: 0.2rem 0;
  font-size: 0.6rem;
`;

export const MonthHeader = styled.div`
  color: #eef;
  background: #68b;
  width: 17rem;
  margin: 0.2rem 0 -0.4rem 1rem;
  border-radius: 1rem 1rem 0 0;
  padding: 0.3rem 0 0.7rem 0;
  text-align: center;
  font-weight: bold;
 `;

export const WeeksContainer = styled.div`
  background: #57a;
  width: 17rem;
  border-bottom: 1px solid #146;
  margin: 0 1rem;
  padding: 1rem 0;
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
  color: ${props => (props.belongsToThisMonth ? '#eee' : '#cbe')};
  &:hover {
    font-weight: bolder;
  }
`;
