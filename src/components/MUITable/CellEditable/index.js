import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Pencil from '@material-ui/icons/Create';
import Check from '@material-ui/icons/Check';
import Input from '../../common/input/InputSimple';
import { testNumberRegex, testFloatRegex } from '../../../utils';
import './style.scss';

export default function CellEditable({
  value = '',
  column,
  row,
  type = 'text',
  style = {},
  displayCheck = false,
  handleData = () => {},
  format = (val) => {
    return val;
  },
  ...others
}) {
  const [edit, setEdit] = useState(false);
  const [editing, setEditing] = useState('');

  useEffect(() => {
    setEditing(row[column._id]);
  }, []);

  useEffect(() => {
    setEditing(value);
  }, [value]);

  const handleChange = (evt) => {
    const val = evt.target.value;

    if (type === 'number') {
      if (others.maxLength && val.length > others.maxLength) return;
      if (!testNumberRegex(val)) {
        return;
      }
    } else if (type === 'float') {
      if (others.maxLength && val.length > others.maxLength) return;
      if (!testFloatRegex(val)) {
        return;
      }
    }

    setEditing(val);
  };

  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      setEdited();
    }

    if (evt.keyCode === 27) {
      // ESC
      setEdit(false);
      setEditing(value);
    }
  };

  const handleClick = () => {
    setEdited();
  };

  const setEdited = () => {
    // if (!nullCheck()) return;

    if (edit) {
      if (handleData) handleData(editing);
    }
    setEdit(!edit);
  };

  const viewMode = (
    <div className='editable-cell-viewMode'>
      <Tooltip title={value || ''}>
        <div onClick={handleClick}>
          <p>{format(value)}</p>
        </div>
      </Tooltip>
      {displayCheck && (
        <div className='editable-cell-icon' onClick={handleClick}>
          <Pencil />
        </div>
      )}
    </div>
  );

  const editMode = (
    <div className='editable-cell-editMode'>
      <Input
        {...others}
        type='text'
        id='editable-cell-input'
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleClick}
        value={editing}
        style={{ width: '100%' }}
      />
      {displayCheck && (
        <div className='editable-cell-icon' onClick={handleClick}>
          <Check />
        </div>
      )}
    </div>
  );

  return (
    <div
      className='editable-cell'
      key={column._id}
      align={column.align}
      style={style}
    >
      {!edit ? viewMode : editMode}
    </div>
  );
}

CellEditable.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  column: PropTypes.object,
  row: PropTypes.object,
  type: PropTypes.string,
  style: PropTypes.object,
  displayCheck: PropTypes.bool,
  format: PropTypes.func,
  handleData: PropTypes.func
};
