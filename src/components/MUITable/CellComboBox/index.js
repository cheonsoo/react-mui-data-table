import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import ComboBox from '../../common/comboBox/ComboBoxSimple';
import './style.scss';

export default function CellComboBox({
  value = '',
  items = [],
  column,
  row,
  style = {},
  handleData = () => {},
  format = (val) => {
    return val;
  }
}) {
  const [edit, setEdit] = useState(false);
  const [editing, setEditing] = useState('');

  useEffect(() => {
    try {
      setEditing(row[column._id]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    setEditing(value);
  }, [value]);

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

  const handleChange = (selected) => {
    handleData(selected);
    setEdit(!edit);
  };

  const viewMode = (
    <div className='editable-cell-viewMode'>
      <Tooltip title={value ? value : ''}>
        <div onClick={handleClick}>
          <p>{format(value)}</p>
        </div>
      </Tooltip>
    </div>
  );

  const editMode = (
    <div className='editable-cell-editMode'>
      <ComboBox items={items} onChange={handleChange} />
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

CellComboBox.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  items: PropTypes.array,
  column: PropTypes.object,
  row: PropTypes.object,
  style: PropTypes.object,
  displayCheck: PropTypes.bool,
  format: PropTypes.func,
  handleData: PropTypes.func
};
