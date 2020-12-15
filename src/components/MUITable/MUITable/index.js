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
import EmptyData from '../../common/EmptyData';

import useStyles from './muTableCommon.js';

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
  handleData = () => {},
  ...others
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const _items = items.slice();
    const _page = 0;
    const _rowsPerPage = event.target.value;

    setRowsPerPage(_rowsPerPage);
    setPage(_page);
    setRows(_items);

    // if (pagination) setRows(_items.slice(_page * _rowsPerPage, _page * _rowsPerPage + _rowsPerPage));
    // else setRows(_items);
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
            return (
              <div className='rmdt-table-body-row-cell-item'>{_value}</div>
            );
          }
        } else {
          return <div className='rmdt-table-body-row-cell-item'>{_value}</div>;
        }
      } catch (e) {
        console.log(e);
        return <div className='rmdt-table-body-row-cell-item'>{_value}</div>;
      }
    };

    const renderTableCellTextInput = (_value, _column, _row) => {
      try {
        return (
          <div className='rmdt-table-body-row-cell-item'>
            <CellEditable
              value={_value}
              column={_column}
              row={_row}
              handleData={(data) => {
                _row[_column._id] = data;
                handleData(_row);
              }}
            />
          </div>
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
          <div className='rmdt-table-body-row-cell-item'>
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
          </div>
        );
      } catch (e) {
        console.log(e);
        return _value;
      }
    };

    let value = row[column._id];
    value = column.format ? column.format(value) : value;
    let customWidth = {};
    if (column.width) {
      customWidth = {
        width: column.width
      };
    }
    return (
      <TableCell
        className='rmdt-table-body-row-cell'
        key={column._id}
        align={column.align}
        style={customWidth}
      >
        {column.subHeader ? (
          <div className='rmdt-table-body-row-cell-subHeader'>
            {column.subHeader.map((sub, idx) => (
              <div
                className='rmdt-table-body-row-cell-subHeader-item'
                key={idx}
              >
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

  const renderNoData = () => {
    return (
      <TableRow hover role='checkbox' tabIndex={-1}>
        <TableCell
          className='rmdt-row-no-data'
          align='center'
          colSpan={Object.keys(columns).length}
        >
          <EmptyData />
        </TableCell>
      </TableRow>
    );
  };

  const renderItemCount = (items, rowsPerPage, page) => {
    return (
      <div>
        전체 {items.length} 건 중 {rowsPerPage * page + 1} ~{' '}
        {rowsPerPage * page + rowsPerPage}
      </div>
    );
  };

  // ({ page }) =>
  //                 `${Math.ceil(items.length / rowsPerPage)} 페이지 중 ${
  //                   page + 1
  //                 }`
  const renderPaginationInfo = ({ page, rowsPerPage }) => {
    return `${Math.ceil(items.length / rowsPerPage)} 페이지 중 ${page + 1}`;
  };

  const renderLabelRowsPerPage = ({ rowsPerPage }) => {
    console.log(`### rowsPerPage: ${rowsPerPage}`);
    // return <div>{rowsPerPage} 개씩 보기</div>;
    return 'fjdksljfkljdksfljkl';
  };

  return (
    <Paper className={`${classes.rmdt} rmdt ${className || ''}`} style={style}>
      <TableContainer className='rmdt-conatiner'>
        <Table className='rmdt-table' stickyHeader aria-label='sticky table'>
          <TableHead className='rmdt-table-header'>
            <TableRow className='rmdt-table-header-row'>
              {checkBox && (
                <TableCell
                  className='rmdt-table-header-row-cell checkBox'
                  padding='checkbox'
                >
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
                      className='rmdt-table-header-row-cell'
                      key={column._id}
                      align={column.align}
                    >
                      {column.subHeader ? (
                        <div className='rmdt-table-header-row-cell-subHeader'>
                          <div className='rmdt-table-header-row-cell-subHeader-top'>
                            {column.label}
                          </div>
                          <div className='rmdt-table-header-row-cell-subHeader-bottom'>
                            {column.subHeader.map((subCol, idx) => (
                              <div
                                className='rmdt-table-header-row-cell-subHeader-bottom-item'
                                key={idx}
                              >
                                {subCol.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className='rmdt-table-header-row-cell-no-subHeader'>
                          {column.label}
                        </div>
                      )}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>

          <TableBody className='rmdt-table-body'>
            {rows.length > 0
              ? getRows().map((row, idx) => {
                  return (
                    <TableRow
                      className={`rmdt-table-body-row ${
                        selected === idx ? 'selected' : ''
                      }`}
                      key={`${row._id}_${idx}`}
                      hover
                      tabIndex={-1}
                      onClick={() => onClickRow(idx)}
                    >
                      {checkBox && (
                        <TableCell
                          className='rmdt-table-body-row-cell checkBox'
                          padding='checkbox'
                        >
                          <Checkbox
                            onClick={() => handleSelect(row._id)}
                            checked={checked.indexOf(row._id) > -1 || false}
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
              : renderNoData()}
          </TableBody>
        </Table>
      </TableContainer>

      {(count || pagination) && (
        <div className='rmdt-dataTable-tool-row'>
          {count && (
            <div className='rmdt-dataTable-item-count'>
              {others.labelItemCount
                ? others.labelItemCount(items, rowsPerPage, page)
                : renderItemCount(items, rowsPerPage, page)}
            </div>
          )}

          {pagination && (
            <div className='rmdt-dataTable-pagination'>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelDisplayedRows={() => {
                  if (others.labelDisplayedRows) {
                    return others.labelDisplayedRows({ page, rowsPerPage });
                  } else {
                    return renderPaginationInfo({ page, rowsPerPage });
                  }
                }}
                labelRowsPerPage={
                  others.labelRowsPerPage
                    ? others.labelRowsPerPage({ rowsPerPage })
                    : `${rowsPerPage} 개씩 보기`
                }
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          )}
        </div>
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
