import React from 'react';
import ImageIcon from '@material-ui/icons/Image';
import './style.scss';

const EmptyData = () => {
  return (
    <div className='rmdt-row-no-data-icon'>
      <div className='rmdt-row-no-data-icon-svg'>
        <ImageIcon style={{ fontSize: '200px' }} />
      </div>
      <div
        className='rmdt-row-no-data-icon-label'
        style={{ fontSize: '24px', fontWeight: 'bold' }}
      >
        NO DATA
      </div>
    </div>
  );
};

export default EmptyData;
