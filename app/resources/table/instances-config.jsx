const { Icon } = window['AWS-UI-Components-React'];

export const COLUMN_DEFINITIONS = [
  {
    id: 'id',
    header: () => 'Instance name',
    cell: item => (
      <div>
        <a href={`#/projects`}>{item.id}</a>
      </div>
    ),
    minWidth: '60px',
    allowLineWrap: true
  },
  {
    id: 'engineType',
    cell: item => item.engineType,
    header: () => 'Engine Type',
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'instanceClass',
    header: () => 'Instance class',
    cell: item => item.instanceClass,
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'storage',
    header: () => 'Storage',
    cell: item => item.storage,
    minWidth: '50px',
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
    id: 'state',
    header: () => 'State',
    cell: item => (
      <div className={`awsui-util-status-${item.state === 'Stopped' ? 'negative' : 'positive'}`}>
        <Icon name={item.state === 'Stopped' ? 'status-negative' : 'status-positive'} />
        <span>{` ${item.state}`}</span>
      </div>
    ),
    minWidth: '50px',
    allowLineWrap: true
  }
];

export const SORTABLE_COLUMNS = [
  { id: 'id', field: 'id' },
  { id: 'engineType', field: 'engineType' },
  { id: 'instanceClass', field: 'instanceClass' },
  { id: 'storage', field: 'storage' },
  { id: 'dateModified', field: 'dateModified' },
  { id: 'state', field: 'state' }
];

export const CONTENT_SELECTOR_OPTIONS = [
  {
    label: 'Main instance properties',
    options: [
      { id: 'id', label: 'Instance name', editable: false, visible: true },
      { id: 'engineType', label: 'Engine type', editable: false, visible: true },
      { id: 'instanceClass', label: 'Instance class', editable: true, visible: true },
      { id: 'storage', label: 'Storage', editable: true, visible: true },
      { id: 'dateModified', label: 'Date modified', editable: true, visible: true },
      { id: 'state', label: 'State', editable: true, visible: true }
    ]
  }
];

export const PAGE_SELECTOR_OPTIONS = [
  { value: 10, label: '10 Instances' },
  { value: 30, label: '30 Instances' },
  { value: 50, label: '50 Instances' }
];

export const CUSTOM_PREFERENCE_OPTIONS = [{ value: 'table', label: 'Table' }, { value: 'cards', label: 'Cards' }];
