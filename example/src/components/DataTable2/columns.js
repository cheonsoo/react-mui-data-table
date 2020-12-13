const COLUMNS = [
  {
    _id: '_id',
    label: 'ID',
    display: false
  },
  {
    _id: 'idx',
    label: '순번',
    width: 100
  },
  {
    _id: 'clsGbn',
    label: '선택',
    width: 100,
    editable: true,
    editType: 'combobox',
    items: [
      { key: 'y', value: 'Y' },
      { key: 'y', value: 'N' }
    ]
  },
  {
    _id: 'lrgClsCd',
    label: '상품분류(대)',
    width: 100,
    editable: true
  },
  {
    _id: 'midClsCd',
    label: '상품분류(중)',
    width: 100
  },
  {
    _id: 'smlClsCd',
    label: '상품분류(소)',
    width: 100
  },
  {
    _id: 'dtlClsCd',
    label: '상품분류(세)',
    width: 100
  },
  {
    _id: 'prdClsCd',
    label: '상품분류코드',
    width: 100
  },
  {
    _id: 'col7',
    label: '구분기준항목',
    width: 150,
    subHeader: [
      {
        _id: 'itmNm1',
        label: '항목1'
      },
      {
        _id: 'itmNm2',
        label: '항목2'
      },
      {
        _id: 'itmNm3',
        label: '항목3'
      },
      {
        _id: 'itmNm4',
        label: '항목4'
      },
      {
        _id: 'itmNm5',
        label: '항목5'
      }
    ]
  }
];

export default COLUMNS;
