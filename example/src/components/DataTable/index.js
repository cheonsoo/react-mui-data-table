import React from 'react';
import { MUITable } from 'mui-data-table';
import COLUMNS from './columns';
import CustomStyle from './customStyle.js';

const DataTable = () => {
  const getItems = () => {
    const items = [];
    for (let i = 0; i < 10; i++) {
      let o = {
        _id: i,
        idx: i,
        clsGbn: i,
        lrgClsCd: i,
        midClsCd: i,
        smlClsCd: i,
        dtlClsCd: i,
        prdClsCd: i,
        itmNm1: i,
        itmNm2: i,
        itmNm3: i,
        itmNm4: i,
        itmNm5: i
      };
      items.push(o);
    }
    return items;
  };

  const handleData = (data) => {
    console.log(data);
  };

  return (
    <div
      className='mui-data-table-container'
      style={{ width: '1200px', height: '400px' }}
    >
      <MUITable
        className='custom-mui-data-table'
        customStyle={CustomStyle()}
        items={getItems()}
        columns={COLUMNS}
        handleData={handleData}
      />
    </div>
  );
};

export default DataTable;
