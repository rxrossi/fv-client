import React from 'react';
import PropTypes from 'prop-types';

export const NO_PROFESSIONALS_P_CLASS = 'no-professionals-msg';

const Professionals = ({ professionals }) => (
  !professionals.length ?
    <p className={NO_PROFESSIONALS_P_CLASS}>No professionals registered yet</p>
    :
    <ul>
      {
        professionals.map(professional => <li key={professional.id}>{professional.name}</li>)
      }
    </ul>
);
Professionals.propTypes = {
  professionals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
};
Professionals.defaultProps = {
  professionals: [],
};
export default Professionals;

