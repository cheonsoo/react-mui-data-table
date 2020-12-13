import React from 'react';
import { MUITable } from 'mui-data-table';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    boxShadow: 'none',
    '& .MuiTable-root': {
      '& .MuiTableHead-root': {
        '& .MuiTableRow-root': {
          '& .MuiTableCell-head': {
            '& .header-with-subHeader .subHeader': {
              display: 'flex',
              '& div': {
                width: '100%'
              }
            }
          }
        }
      },
      '& .MuiTableBody-root .MuiTableRow-root .MuiTableCell-root': {
        textAlign: 'center',
        padding: '3px',
        '& .row-with-subHeader': {
          display: 'flex',
          '& .row-col': {
            width: '100%'
          }
        }
      }
    },
    '& .MuiTablePagination-root': {
      '& > div': {
        border: '1px solid #e8e8e8',
        borderRadius: '0'
      }
    }
  },
  container: {
    border: '1px solid #e8e8e8',
    maxHeight: '100%',
    '& table': {
      borderRadius: 0,
      '& thead': {
        borderRadius: 0,
        '& th': {
          textAlign: 'center'
        }
      }
    }
  }
});

const COLUMNS = [
  {
    _id: '_id',
    label: 'ID',
    display: false
  },
  {
    _id: 'col1',
    label: 'COL1',
    width: 100
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
        label: 'COL4_1'
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
  }
];

const DataTable = () => {
  const classes = useStyles();

  const getItems = () => {
    const items = [];
    for (let i = 0; i < 10; i++) {
      let o = {
        _id: `ID ${i}`,
        col1: `COL1 ${i}`,
        col2: `COL2 ${i}`,
        col3: `COL3 ${i}`,
        col4: `COL4 ${i}`,
        col4_1: `COL4_1 ${i}`,
        col4_2: `COL4_2 ${i}`,
        col4_3: `COL4_3 ${i}`
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
        customStyle={classes}
        items={getItems()}
        columns={COLUMNS}
        handleData={handleData}
      />
    </div>
  );
};

export default DataTable;
