const { Icon } = window['AWS-UI-Components-React'];

export const COLUMN_DEFINITIONS = [
  {
    id: 'id',
    header: () => 'User name',
    cell: item => (
      <div>
        <a href={`#/user-management`}>{item.id}</a>
      </div>
    ),
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'userRole',
    cell: item => item.userRole,
    header: () => 'User role',
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'userPermission',
    header: () => 'User permission',
    cell: item => item.userPermission,
    minWidth: '120px',
    allowLineWrap: true
  },
  {
    id: 'startDate',
    header: () => 'Start date',
    cell: item => item.startDate,
    minWidth: '90px',
    allowLineWrap: true
  },
  {
    id: 'department',
    header: () => 'Department',
    cell: item => item.department,
    minWidth: '100px',
    allowLineWrap: true
  },
  {
    id: 'workStatus',
    header: () => 'Work status',
    cell: item => (
      <div className={`awsui-util-status-${item.workStatus === 'Stopped' ? 'negative' : 'positive'}`}>
        <Icon name={item.workStatus === 'Stopped' ? 'status-negative' : 'status-positive'} />
        <span>{` ${item.workStatus}`}</span>
      </div>
    ),
    minWidth: '80px',
    allowLineWrap: true
  }
];

export const SORTABLE_COLUMNS = [
  { id: 'id', field: 'id' },
  { id: 'userRole', field: 'userRole' },
  { id: 'userPermission', field: 'userPermission' },
  { id: 'startDate', field: 'startDate' },
  { id: 'department', field: 'department' },
  { id: 'workStatus', field: 'workStatus' }
];

export const CONTENT_SELECTOR_OPTIONS = [
  {
    label: 'Main user properties',
    options: [
      { id: 'id', label: 'User name', editable: false, visible: true },
      { id: 'userRole', label: 'User role', editable: true, visible: true },
      {
        id: 'userPermission',
        label: 'User permission',
        editable: true,
        visible: true
      },
      {
        id: 'startDate',
        label: 'Start date',
        editable: true,
        visible: true
      },
      { id: 'department', label: 'Department', editable: true, visible: true },
      { id: 'workStatus', label: 'Work status', editable: true, visible: true }
    ]
  }
];

export const PAGE_SELECTOR_OPTIONS = [
  { value: 10, label: '10 Users' },
  { value: 20, label: '20 Users' },
  { value: 40, label: '40 Users' }
];

export const CUSTOM_PREFERENCE_OPTIONS = [{ value: 'table', label: 'Table' }, { value: 'cards', label: 'Cards' }];
