import React from 'react';
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
      visibleOpts: this.props.options.slice(0, this.props.maxOptsToShow),
      selected: false,
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.select = this.select.bind(this);
    this.backToFilter = this.backToFilter.bind(this);
  }

  changeFilter(name) {
    return (e) => {
      const visibleOpts =
        fuzzysort.go(e.target.value, this.props.options, { key: 'name' })
          .map(x => x.obj);

      this.setState({
        [name]: e.target.value,
        visibleOpts,
      });

      if (visibleOpts.length === 1) {
        this.props.handleChange(this.props.name)(visibleOpts[0].id);
        this.setState({ selected: true });
      }
    };
  }

  select(item) {
    this.setState({ selected: true });
    return this.props.handleChange(this.props.name)(item.id);
  }
  backToFilter() {
    if (this.state.visibleOpts.length === 1) {
      this.changeFilter('filter')({ target: { value: 'aa' } });
    }
    return this.setState({ selected: false });
  }

  render() {
    const { visibleOpts, selected } = this.state;
    const {
      value, options, error, name, label,
    } = this.props;

    if (selected) {
      return (
        <div>
          <LocalLabel>{label}</LocalLabel>
          <Button type="button" onClick={this.backToFilter}>
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
          label={label}
          error={undefined}
          value={this.state.filter}
          onChange={this.changeFilter}
        />
        <Ul>
          {
            visibleOpts
              .map(x =>
                (<Li
                  key={x.id}
                  onClick={() => this.select(x)}
                >{x.name}
                </Li>))
          }
        </Ul>
      </div>
    );
  }
}

FilterableSelect.defaultProps = {
  maxOptsToShow: 5,
};

export default FilterableSelect;
