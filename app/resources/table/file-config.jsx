const { Icon } = window['AWS-UI-Components-React'];

export const COLUMN_DEFINITIONS = [
  {
    id: 'id',
    header: () => 'File name',
    cell: item => (
      <div>
        <a href={`#/projects`}>{item.id}</a>
      </div>
    ),
    minWidth: '90px',
    allowLineWrap: true
  },
  {
    id: 'dateModified',
    cell: item => item.dateModified,
    header: () => 'Date modified',
    minWidth: '80px',
    allowLineWrap: true
  },
  {
    id: 'deliveryMethod',
    header: () => 'Type',
    cell: item => item.deliveryMethod,
    minWidth: '80px',
    allowLineWrap: true
  },
  {
    id: 'status',
    header: () => 'Size',
    cell: item => item.status,
    minWidth: '80px',
    allowLineWrap: true
  },
  {
    id: 'state',
    header: () => 'State',
    cell: item => (
      <div className={`awsui-util-status-${item.state === 'Deleted' ? 'negative' : 'positive'}`}>
        <Icon name={item.state === 'Deleted' ? 'status-negative' : 'status-positive'} />
        <span>{` ${item.state}`}</span>
      </div>
    ),
    minWidth: '80px',
    allowLineWrap: true
  }
];

export const SORTABLE_COLUMNS = [
  { id: 'id', field: 'id' },
  { id: 'dateModified', field: 'dateModified' },
  { id: 'deliveryMethod', field: 'deliveryMethod' },
  { id: 'status', field: 'status' },
  { id: 'state', field: 'state' }
];

export const CONTENT_SELECTOR_OPTIONS = [
  {
    label: 'Main file properties',
    options: [
      { id: 'id', label: 'File name', editable: false, visible: true },
      { id: 'dateModified', label: 'Date modified', editable: true, visible: true },
      {
        id: 'deliveryMethod',
        label: 'Type',
        editable: true,
        visible: true
      },
      { id: 'status', label: 'Size', editable: true, visible: true },
      { id: 'state', label: 'State', editable: true, visible: false }
    ]
  }
];

export const PAGE_SELECTOR_OPTIONS = [
  { value: 10, label: '10 Files' },
  { value: 30, label: '30 Files' },
  { value: 50, label: '50 Files' }
];

export const CUSTOM_PREFERENCE_OPTIONS = [{ value: 'table', label: 'Table' }, { value: 'cards', label: 'Cards' }];
