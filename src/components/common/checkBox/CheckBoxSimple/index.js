import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';

const CustomCheckbox = withStyles({
  root: {
    color: 'rgba(0, 0, 0, 0.45)',
    '&$checked': {
      color: '#1890ff'
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    '& .MuiTypography-body1': {
      fontSize: '14px'
    }
  }
}));

function CheckboxSimple(props) {
  const classes = useStyles();
  const { label, onChange, checked, value } = props;

  const [_checked, setChecked] = useState(checked || false);

  useEffect(() => {
    if (_.isBoolean(props.checked)) setChecked(props.checked);
  }, [props.checked]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (onChange) onChange(event);
  };

  return (
    <FormControlLabel
      className={classes.root}
      control={
        <CustomCheckbox
          {...props}
          checked={_checked}
          onChange={handleChange}
          name={label}
        />
      }
      label={label}
      value={value}
    />
  );
}

CheckboxSimple.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  forwardRef: PropTypes.object
};

export default CheckboxSimple;
