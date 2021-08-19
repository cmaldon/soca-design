const { Icon } = window['AWS-UI-Components-React'];

export const COLUMN_DEFINITIONS = [
  {
    id: 'id',
    header: () => 'Project ID',
    cell: item => (
      <div>
        <a href={`javascript:void(0)`}>{item.id}</a>
      </div>
    ),
    minWidth: '180px',
    allowLineWrap: true
  },
  {
    id: 'domainName',
    cell: item => item.domainName,
    header: () => 'Domain name',
    minWidth: '160px',
    allowLineWrap: true
  },
  {
    id: 'deliveryMethod',
    header: () => 'Delivery method',
    cell: item => item.deliveryMethod,
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'priceClass',
    header: () => 'Price class',
    cell: item => item.priceClass,
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'sslCertificate',
    header: () => 'SSL certificate',
    cell: item => item.sslCertificate,
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'origin',
    header: () => 'Origin',
    cell: item => item.origin,
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'status',
    header: () => 'Status',
    cell: item => item.status,
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'state',
    header: () => 'State',
    cell: item => (
      <div className={`awsui-util-status-${item.state === 'Disabled' ? 'negative' : 'positive'}`}>
        <Icon name={item.state === 'Disabled' ? 'status-negative' : 'status-positive'} />
        <span>{` ${item.state}`}</span>
      </div>
    ),
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'logging',
    header: () => 'Logging',
    cell: item => item.logging,
    minWidth: '100px',
    allowLineWrap: true
  }
];

export const SORTABLE_COLUMNS = [
  { id: 'id', field: 'id' },
  { id: 'domainName', field: 'domainName' },
  { id: 'deliveryMethod', field: 'deliveryMethod' },
  { id: 'priceClass', field: 'priceClass' },
  { id: 'sslCertificate', field: 'sslCertificate' },
  { id: 'origin', field: 'origin' },
  { id: 'status', field: 'status' },
  { id: 'state', field: 'state' },
  { id: 'logging', field: 'logging' }
];

export const CONTENT_SELECTOR_OPTIONS = [
  {
    label: 'Main distribution properties',
    options: [
      { id: 'id', label: 'Distribution ID', editable: false, visible: true },
      { id: 'domainName', label: 'Domain name', editable: true, visible: true },
      {
        id: 'deliveryMethod',
        label: 'Delivery method',
        editable: true,
        visible: true
      },
      {
        id: 'priceClass',
        label: 'Price class',
        editable: true,
        visible: false
      },
      {
        id: 'sslCertificate',
        label: 'SSL certificate',
        editable: true,
        visible: true
      },
      { id: 'origin', label: 'Origin', editable: true, visible: false },
      { id: 'status', label: 'Status', editable: true, visible: true },
      { id: 'state', label: 'State', editable: true, visible: true },
      { id: 'logging', label: 'Logging', editable: true, visible: false }
    ]
  }
];

export const PAGE_SELECTOR_OPTIONS = [
  { value: 10, label: '10 Distributions' },
  { value: 30, label: '30 Distributions' },
  { value: 50, label: '50 Distributions' }
];

export const CUSTOM_PREFERENCE_OPTIONS = [{ value: 'table', label: 'Table' }, { value: 'cards', label: 'Cards' }];
