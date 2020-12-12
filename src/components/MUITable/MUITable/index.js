import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';

import CellEditable from '../CellEditable';
import CellComboBox from '../CellComboBox';

import useStyles from './muTableCommon.js';

import EmptyData from '../../common/EmptyData/EmptyDataDiv';

function MUITable({
  className = '',
  items = [],
  columns = [],
  selected = -1,
  count = true,
  pagination = true,
  style = {},
  customStyle = null,
  checkBox = false,
  onClickRow = () => {},
  onCheck = () => {},
  onCheckAll = () => {},
  handleData = () => {}
}) {
  const classes = customStyle || useStyles();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [checked, setChecked] = useState([]);
  const [isChkAll, setIsChkAll] = useState(false);

  useEffect(() => {
    setRows(items);
  }, [items]);

  const setRowsByPagination = () => {
    if (pagination)
      setRows(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    else setRows(rows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // setRowsByPagination();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setRowsByPagination();
  };

  const handleSelect = (rowId) => {
    let _checked;
    console.log(rowId);
    if (checked.indexOf(rowId) > -1) {
      _checked = checked.filter((id) => id !== rowId);
    } else {
      _checked = checked.concat([rowId]);
    }

    setChecked(_checked);
    onCheck(_checked);
  };

  const onSelectAllClick = (isChecked) => {
    if (isChecked) {
      const all = rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => row._id);
      setChecked(all);
      onCheckAll(all);
    } else {
      setChecked([]);
      onCheckAll([]);
    }

    setIsChkAll(isChecked);
  };

  const getRows = () => {
    let _rows = [];
    if (pagination) {
      _rows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    } else {
      _rows = rows;
    }
    return _rows;
  };

  const isShowColumn = (column) => {
    let show = true;
    if (column.display === undefined || column.display) show = true;
    else show = false;
    return show;
  };

  const renderTableCell = (column, row) => {
    const checkTypeAndRender = (_value, _column, _row) => {
      try {
        if (!_column.editType) _column.editType = 'text'; // Set Default

        if (_column.editable) {
          if (_column.editType.toLowerCase() === 'text') {
            return renderTableCellTextInput(_value, _column, _row);
          } else if (_column.editType.toLowerCase() === 'combobox') {
            return renderTableCellComboBox(_value, _column, _row);
          } else {
            return _value;
          }
        } else {
          return _value;
        }
      } catch (e) {
        console.log(e);
        return _value;
      }
    };

    const renderTableCellTextInput = (_value, _column, _row) => {
      try {
        return (
          <CellEditable
            value={_value}
            column={_column}
            row={_row}
            handleData={(data) => {
              _row[_column._id] = data;
              handleData(_row);
            }}
          />
        );
      } catch (e) {
        console.log(e);
        return _value;
      }
    };

    const renderTableCellComboBox = (_value, _column, _row) => {
      try {
        const COMBOBOX_ITEMS = _column.items;
        return (
          <CellComboBox
            value={_value}
            column={_column}
            items={COMBOBOX_ITEMS}
            row={_row}
            handleData={(data) => {
              _row[_column._id] = data.key;
              handleData(row);
            }}
          />
        );
      } catch (e) {
        console.log(e);
        return _value;
      }
    };

    let value = row[column._id];
    value = column.format ? column.format(value) : value;
    return (
      <TableCell
        key={column._id}
        align={column.align}
        style={{
          width: column.width,
          minWidth: column.width,
          maxWidth: column.width
        }}
      >
        {column.subHeader ? (
          <div className='row-with-subHeader'>
            {column.subHeader.map((sub, idx) => (
              <div className='row-col' key={idx}>
                {row[sub._id]}
              </div>
            ))}
          </div>
        ) : (
          checkTypeAndRender(value, column, row)
        )}
      </TableCell>
    );
  };

  return (
    // <Paper className={[classes.root, className]}>
    <Paper className={classes.root}>
      <TableContainer
        className={classes.container}
        // className={`${className} ${classes.container} muTableCommon`}
        style={style}
      >
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {checkBox && (
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={isChkAll}
                    onClick={() => onSelectAllClick(!isChkAll)}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
              )}
              {columns.map(
                (column) =>
                  isShowColumn(column) && (
                    <TableCell
                      key={column._id}
                      align={column.align}
                      style={{
                        width: column.width,
                        minWidth: column.width,
                        maxWidth: column.width
                      }}
                    >
                      {column.subHeader ? (
                        <div className='header-with-subHeader'>
                          <div>{column.label}</div>
                          <div className='subHeader'>
                            {column.subHeader.map((subCol, idx) => (
                              <div className='subHeader-item' key={idx}>
                                {subCol.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length > 0 ? (
              getRows().map((row, idx) => {
                return (
                  <TableRow
                    className={selected === idx ? 'selected' : ''}
                    key={`${row._id}_${idx}`}
                    hover
                    tabIndex={-1}
                    onClick={() => onClickRow(idx)}
                  >
                    {checkBox && (
                      <TableCell padding='checkbox'>
                        <Checkbox
                          onClick={() => handleSelect(row._id)}
                          checked={checked.indexOf(row._id) > -1 && true}
                        />
                      </TableCell>
                    )}
                    {columns.map(
                      (column) =>
                        isShowColumn(column) && renderTableCell(column, row)
                    )}
                  </TableRow>
                );
              })
            ) : (
              <TableRow hover role='checkbox' tabIndex={-1}>
                <TableCell align='center' colSpan={10}>
                  <EmptyData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && rows.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}

      {count && (
        <div className='dataTable-item-count'>(총 {items.length} 건)</div>
      )}
    </Paper>
  );
}

MUITable.propTypes = {
  className: PropTypes.string,
  checkBox: PropTypes.bool,
  items: PropTypes.array,
  headerColumns: PropTypes.array,
  columns: PropTypes.array,
  count: PropTypes.bool,
  selected: PropTypes.number,
  pagination: PropTypes.bool,
  style: PropTypes.object,
  customStyle: PropTypes.func,
  onClickRow: PropTypes.func,
  onCheck: PropTypes.func,
  onCheckAll: PropTypes.func,
  handleData: PropTypes.func
};

export default MUITable;