import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    width: '100%',
    height: '30px',
    border: '1px solid #E9E9E9',
    borderRadius: '4px',
    '& .MuiInputBase-root': {
      height: '100%',
      '& .MuiInputBase-input .MuiOutlinedInput-input': {
        fontSize: '14px'
      }
    }
  }
}));

export default function InputMaterial(props) {
  const classes = useStyles();

  const handleChange = (evt) => {
    if (props.onChange) props.onChange(evt);
  };

  return (
    <TextField
      {...props}
      className={classes.inputRoot}
      type={props.type ? props.type : 'text'}
      id={props.id ? props.id : 'outlined-password-input'}
      label={props.label ? props.label : ''}
      autoComplete='current-password'
      variant='outlined'
      onChange={handleChange}
    />
  );
}

InputMaterial.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func
};
