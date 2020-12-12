import React, { Component } from 'react';
import emptyData from './emptyData.png';
import './style.scss';

class EmptyData extends Component {
  render() {
    return (
      <div>
        <img src={emptyData} alt='empty data' />
      </div>
    );
  }
}

export default EmptyData;
