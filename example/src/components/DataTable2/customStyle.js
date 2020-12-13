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

export default useStyles;
