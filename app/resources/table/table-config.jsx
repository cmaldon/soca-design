const { Icon } = window['AWS-UI-Components-React'];

export const COLUMN_DEFINITIONS = [
  {
    id: 'id',
    header: () => 'Project name',
    cell: item => (
      <div>
        <a href={`#/project-details`}>{item.id}</a>
      </div>
    ),
    minWidth: '90px',
    allowLineWrap: true
  },
  {
    id: 'instanceLimit',
    cell: item => item.instanceLimit,
    header: () => 'Instances (usage/limit)',
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'storageLimit',
    header: () => 'Storage (usage/limit)',
    cell: item => item.storageLimit,
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'priceClass',
    header: () => 'Cost /hr',
    cell: item => item.priceClass,
    minWidth: '80px',
    allowLineWrap: true
  },
  {
    id: 'status',
    header: () => 'Status',
    cell: item => item.status,
    minWidth: '80px',
    allowLineWrap: true
  },
  {
    id: 'state',
    header: () => 'State',
    cell: item => (
      <div className={`awsui-util-status-${item.state === 'Stopped' ? 'negative' : 'positive'}`}>
        <Icon name={item.state === 'Stopped' ? 'status-negative' : 'status-positive'} />
        <span>{` ${item.state}`}</span>
      </div>
    ),
    minWidth: '80px',
    allowLineWrap: true
  }
];

export const SORTABLE_COLUMNS = [
  { id: 'id', field: 'id' },
  { id: 'instanceLimit', field: 'instanceLimit' },
  { id: 'storageLimit', field: 'storageLimit' },
  { id: 'priceClass', field: 'priceClass' },
  { id: 'status', field: 'status' },
  { id: 'state', field: 'state' }
];

export const CONTENT_SELECTOR_OPTIONS = [
  {
    label: 'Main project properties',
    options: [
      { id: 'id', label: 'Project name', editable: false, visible: true },
      { id: 'instanceLimit', label: 'Instances', editable: true, visible: true },
      {
        id: 'storageLimit',
        label: 'Storage',
        editable: true,
        visible: true
      },
      {
        id: 'priceClass',
        label: 'Cost /hr',
        editable: true,
        visible: true
      },
      { id: 'status', label: 'Status', editable: true, visible: true },
      { id: 'state', label: 'State', editable: true, visible: true }
    ]
  }
];

export const PAGE_SELECTOR_OPTIONS = [
  { value: 10, label: '10 Projects' },
  { value: 30, label: '30 Projects' },
  { value: 50, label: '50 Projects' }
];

export const CUSTOM_PREFERENCE_OPTIONS = [{ value: 'table', label: 'Table' }, { value: 'cards', label: 'Cards' }];
