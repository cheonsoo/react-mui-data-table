import React from 'react';
import { MUITable } from 'mui-data-table';

const customStyle = {
  width: '98%',
  '& .rmdt-table': {
    width: '100%',
    height: '100%',
    boxShadow: 'none',
    '& .MuiTable-root': {}
  }
};

const COLUMNS = [
  {
    _id: '_id',
    label: 'ID',
    display: false
  },
  {
    _id: 'col1',
    label: 'COL1',
    width: 100,
    format: function (val) {
      return (
        <div
          className='rmdt-cell-inner'
          style={{ fontWeight: 'bold', color: '#2478FF' }}
        >
          {val}
        </div>
      );
    }
  },
  {
    _id: 'col2',
    label: 'COL2',
    width: 100,
    editable: true,
    editType: 'combobox',
    items: [
      { key: 'y', value: 'Y' },
      { key: 'y', value: 'N' }
    ]
  },
  {
    _id: 'col3',
    label: 'COL3',
    width: 100,
    editable: true
  },
  {
    _id: 'col4',
    label: 'COL4',
    width: 150,
    subHeader: [
      {
        _id: 'col4_1',
        label: 'COL4_1',
        format: (val) => `${numberFormat(val)}$`
      },
      {
        _id: 'col4_2',
        label: 'COL4_2'
      },
      {
        _id: 'col4_3',
        label: 'COL4_3'
      }
    ]
  },
  {
    _id: 'col5',
    label: 'COL5',
    width: 100,
    format: (val) => numberFormat(val)
  }
];

const numberFormat = (val) => {
  if (this === 0) return 0;
  const reg = /(^[+-]?\d+)(\d{3})/;
  val = val.toString();
  while (reg.test(val)) val = val.replace(reg, `$1,$2`);
  return val;
};

const DataTable = () => {
  const getItems = () => {
    const items = [];
    for (let i = 0; i < 25; i++) {
      let o = {
        _id: `ID ${i}`,
        col1: `COL1 ${i}`,
        col2: `COL2 ${i}`,
        col3: `COL3 ${i}`,
        col4: `COL4 ${i}`,
        col4_1: parseInt(Math.random() * 10000),
        col4_2: `COL4_2 ${i}`,
        col4_3: `COL4_3 ${i}`,
        col5: parseInt(Math.random() * 10000000)
      };
      items.push(o);
    }
    return items;
  };

  return (
    <div
      className='react-mui-data-table-container'
      style={{ width: '1200px', height: '1000px', padding: '20px' }}
    >
      <MUITable
        className='custom-style-rmdt' // You can import css file and force it to be applied to the css
        customStyle={customStyle} // This will be added under the rmdt class
        items={getItems()}
        columns={COLUMNS}
        checkBox={true} // {true || false}
        count={true} // {true || false}
        pagination={true} // {true || false}
        border={true} // {true || false}
        labelRowsPerPage={({ rowsPerPage }) =>
          `Rows in one page (${rowsPerPage})`
        }
        labelItemCount={(items, rowsPerPage, page) =>
          `Total: ${items.length}, ${rowsPerPage * page + 1} ~ ${
            rowsPerPage * page + rowsPerPage
          }`
        }
        labelDisplayedRows={({ page, rowsPerPage }) =>
          `${page}, ${rowsPerPage}`
        }
        onCheck={(selected) => console.log(selected)}
        onCheckAll={(selected) => console.log(selected)}
        handleData={(row) => console.log(row)}
      />
    </div>
  );
};

export default DataTable;
