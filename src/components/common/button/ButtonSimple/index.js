import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

export default function ContainedButtons({ label = '', onClick = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant='contained' color='primary' onClick={onClick}>
        {label}
      </Button>
    </div>
  );
}

ContainedButtons.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};
