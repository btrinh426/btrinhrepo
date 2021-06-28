import React from 'react';
import Pagination from '..';
import '../assets/index.less';
import 'rc-select/assets/index.less';

export default class Pages extends React.Component {
  state = {
    current: 3,
  };

  onChange = page => {
    console.log(page);
    this.setState({
      current: page,
    });
  };

  render() {
    return (
      <Pagination
        onChange={this.onChange}
        current={this.state.current}
        total={25}
      />
    );
  }
}
