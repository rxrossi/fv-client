import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import fuzzysort from 'fuzzysort';
import styled from 'styled-components';
import Input from '../renderField';

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow: none;
  li + li {
    border-top: 1px solid #eee;
  }
`;

const LocalLabel = styled(Label)`
  display: block;
`;

const SelectedOpt = styled.p`
  display: inline-block;
  font-size: 1.6em;
  width: 85%;
  background: #80bdff;
  border: none;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;

const Button = styled.button`
  display: inline-block;
  font-size: 1.6em;
  border-radius: 5% 0 0 5%;
  width: 15%;
  background: #90cdff;
  border: none;
  margin: 0;
  padding: 0;
  color: #eee;
`;

const Li = styled.li`
  border-radius: 5px;
  margin: 0;
  padding: 0.5em 1em;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: #80bdff;
    color: #fff;
  }
`;

class FilterableSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleOpts: [],
      selected: false,
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.select = this.select.bind(this);
    this.unselect = this.unselect.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      filter: '',
      visibleOpts: [],
    });
  }

  componentDidUpdate() {
    const { value, options } = this.props;
    const { selected } = this.state;

    if (value && !selected && options.length) {
      this.changeFilter('filter')({ target: { value: options.find(x => x.id === value).name } });
    }
  }

  changeFilter(name) {
    return (e) => {
      const visibleOpts = e.target.value ?
        fuzzysort.go(e.target.value, this.props.options, { key: 'name' }).map(x => x.obj) : [];

      this.setState({
        [name]: e.target.value,
        visibleOpts: visibleOpts.slice(0, this.props.maxOptsToShow),
      });

      if (visibleOpts.length === 1) {
        this.select(visibleOpts[0]);
      }
    };
  }

  select(item) {
    const { name, path } = this.props;
    this.setState({ selected: true });
    return this.props.handleChange(name, path)({ target: { value: item.id } });
  }

  unselect() {
    const { name, path } = this.props;
    this.changeFilter('filter')({ target: { value: '' } });
    this.props.handleChange(name, path)({ target: { value: '' } });
    return this.setState({ selected: false });
  }


  render() {
    const { visibleOpts, selected } = this.state;
    const {
      value, options, error, label,
    } = this.props;

    if (selected && value) {
      return (
        <div>
          <LocalLabel>{label}</LocalLabel>
          <Button type="button" onClick={this.unselect}>
            <i className="fa fa-chevron-left" aria-hidden="true" />
          </Button>
          <SelectedOpt>
            {options.find(x => x.id === value).name}
          </SelectedOpt>
        </div>
      );
    }

    return (
      <div>
        <Input
          type="text"
          name="filter"
          error={error}
          label={label}
          value={this.state.filter}
          onChange={this.changeFilter}
        />
        <Ul>
          {
            visibleOpts
              .map(x => (
                <Li
                  key={x.id}
                  onClick={() => this.select(x)}
                >
                  {x.name}
                </Li>))
          }
        </Ul>
      </div>
    );
  }
}

FilterableSelect.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  maxOptsToShow: PropTypes.number,
};

FilterableSelect.defaultProps = {
  maxOptsToShow: 5,
  path: [],
  value: undefined,
  error: undefined,
};

export default FilterableSelect;
