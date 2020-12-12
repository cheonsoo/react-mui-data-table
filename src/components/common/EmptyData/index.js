import React, { Component } from 'react';
import emptyData from './emptyData.png';
import './style.scss';

class EmptyData extends Component {
  render() {
    return (
      <>
        <img src={emptyData} alt='empty data' className='empty-data' />
      </>
    );
  }
}

export default EmptyData;
