import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontSize: '10px',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  comboBoxRoot: {
    margin: theme.spacing(1),
    width: '150px'
    // '& .MuiSelect-root .MuiSelect-select .MuiSelect-selectMenu': {
    //   backgroundColor: 'red'
    // }
    // '& .MuiList-root .MuiMenu-list': {
    //   backgroundColor: 'red'
    // },
    // '& .MuiMenu-paper': {
    //   '& .MuiButtonBase-root .MuiListItem-root .MuiMenuItem-root': {
    //     fontSize: '10px'
    //   }
    // },
    // '& .MuiListItem-root': {
    //   fontSize: '10px'
    // }
  }
}));

export default function CustomizedSelects({
  items = [],
  label = '',
  showLabel = false,
  selectedKey = '',
  customStyle = null,
  onChange = () => {},
  ...others
}) {
  const classes = useStyles();
  // const classes = customStyle || useStyles();
  const [age, setAge] = React.useState('');

  useEffect(() => {
    if (selectedKey === '' || selectedKey) setAge(selectedKey);
  }, [selectedKey]);

  const handleChange = (evt) => {
    const selected = evt.currentTarget.dataset;
    const o = {
      key: selected.value,
      value: selected.label
    };
    setAge(o.key);
    onChange(o);
  };

  return (
    <FormControl {...others} className={classes.comboBoxRoot}>
      {showLabel && (
        <InputLabel id='demo-customized-select-label'>{age}</InputLabel>
      )}
      <Select
        labelId='demo-customized-select-label'
        id='demo-customized-select'
        value={age}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        <MenuItem data-label='' value=''>
          <em>선택하세요</em>
        </MenuItem>
        {items.map((item, idx) => (
          <MenuItem key={idx} data-label={item.value} value={item.key}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CustomizedSelects.propTypes = {
  items: PropTypes.array,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  selectedKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  customStyle: PropTypes.object,
  onChange: PropTypes.func
};
