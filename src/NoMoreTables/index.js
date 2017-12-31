import styled from 'styled-components';

export default styled.table`
  width: 100%;
  td, th {
    padding: 5px;
  }
  td + td, th + th {
    border-left: 5px solid white;
  }
  tbody > tr:nth-child(odd) {
    background: #f8f8f8;
  }
  @media (max-width: ${props => (props.mutateAt || '800px')}) {
    & > thead > tr > th ,
    & > tbody > tr > td {
      display: block;
    }
    & > thead > tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    & > tbody > tr {
      border: 2px solid #f5f5f5;
    }
    & > tbody > tr > td {
      border: none;
      border-bottom: 1px solid #ddd;
      position: relative;
      padding-left: 50%;
      white-space: normal;
      text-align: left;
    }
    & > tbody > tr > td:before {
      position: absolute;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      text-align: left;
      font-weight: bolder;
      content: attr(data-title);
    }
  }
`;
