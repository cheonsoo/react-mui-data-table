import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  rmdt: {
    width: '100%',
    height: '100%',
    boxShadow: 'none',
    '& .rmdt-conatiner': {
      border: '1px solid #e8e8e8',
      borderBottom: 0,
      maxHeight: '100%',
      '& .rmdt-table': {
        '& .rmdt-table-header': {
          '& .rmdt-table-header-row': {
            height: '55px',
            '& .rmdt-table-header-row-cell': {
              borderRight: '1px solid #e7e7e7',
              padding: 0,
              // lineHeight: 0,
              '& .rmdt-table-header-row-cell-no-subHeader': {
                display: 'flex',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              },
              '& .rmdt-table-header-row-cell-subHeader': {
                '& .rmdt-table-header-row-cell-subHeader-top': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                '& .rmdt-table-header-row-cell-subHeader-bottom': {
                  display: 'flex',
                  '& .rmdt-table-header-row-cell-subHeader-bottom-item': {
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                }
              }
            },
            '& .rmdt-table-header-row-cell:nth-last-child(1)': {
              borderRight: 0
            },
            '& .rmdt-table-header-row-cell.checkBox': {
              width: '50px'
            }
          }
        },
        '& .rmdt-table-body': {
          '& .rmdt-table-body-row': {
            '& .rmdt-table-body-row-cell': {
              borderRight: '1px solid #e7e7e7',
              padding: 0,
              // lineHeight: 0,
              '& .rmdt-table-body-row-cell-item': {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
              '& .rmdt-table-body-row-cell-subHeader': {
                display: 'flex',
                '& .rmdt-table-body-row-cell-subHeader-item': {
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                  // borderRight: '1px solid #e7e7e7'
                }
              }
            },
            '& .rmdt-table-body-row-cell:nth-last-child(1)': {
              borderRight: 0
            },
            '& .rmdt-table-body-row-cell.checkBox': {
              width: '50px'
            }
          }
        }
      },
      '& .rmdt-row-no-data': {
        height: '500px'
      }
    },
    // '& .MuiTable-root': {
    //   '& .MuiTableHead-root': {
    //     '& .MuiTableRow-root': {
    //       '& .MuiTableCell-head': {
    //         '& .rmdt-header-with-subHeader': {
    //           '& .rmdt-subHeader-top': {},
    //           '& .rmdt-subHeader-bottom': {
    //             display: 'flex',
    //             '& .tmdt-subHeader-item': {
    //               width: '100%'
    //             }
    //           }
    //         }
    //       }
    //     }
    //   },
    // '& .MuiTableBody-root .MuiTableRow-root .MuiTableCell-root': {
    //   textAlign: 'center',
    //   padding: '3px',
    //   '& .rmdt-row-with-subHeader': {
    //     display: 'flex',
    //     '& .rmdt-subHeader-top': {},
    //     '& .rmdt-subHeader-bottom': {
    //       display: 'fex'
    //     },
    //     '& .rmdt-row-col-item': {
    //       width: '100%',
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center'
    //     }
    //   }
    // }
    // },
    '& .rmdt-dataTable-tool-row': {
      display: 'flex',
      width: '100%',
      border: '1px solid #e7e7e7',
      borderTop: 0,
      '& .rmdt-dataTable-item-count': {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      '& .rmdt-dataTable-pagination': {
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '& .MuiTablePagination-root .MuiToolbar-root': {
          border: 0
        }
      }
    }
  }
});

export default useStyles;
