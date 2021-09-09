/************************************************************************
                            DISCLAIMER

This is just a playground package. It does not comply with best practices
of using AWS-UI components. For production code, follow the integration
guidelines:

https://polaris.corp.amazon.com/getting_started/development/integration/
************************************************************************/
import React from 'react';
import ServiceNavigation from './ServiceNavigation.jsx';
import DataProvider from '../resources/data-provider';
import {
  COLUMN_DEFINITIONS,
  CONTENT_SELECTOR_OPTIONS,
  PAGE_SELECTOR_OPTIONS,
  SORTABLE_COLUMNS,
  CUSTOM_PREFERENCE_OPTIONS
} from '../resources/table/user-config.jsx';
const {
  AppLayout,
  BreadcrumbGroup,
  Button,
  Flash,
  Table,
  TableContentSelector,
  TableFiltering,
  TablePageSizeSelector,
  TablePagination,
  TablePreferences,
  TableSelection,
  TableSorting,
  TableWrapLines,
  FormField,
  RadioGroup
} = window['AWS-UI-Components-React'];
export default class UserManagement extends React.Component {
  render() {
    return (
      <AppLayout
        navigation={<ServiceNavigation />} // Navigation panel content imported from './ServiceNavigation.jsx'
        navigationOpen={false}
        breadcrumbs={<Breadcrumbs />} // Breadcrumbs element defined below
        notifications={<FlashMessage />}
        content={<DetailsTable />} // Main content on the page, defined below
        toolsOpen={false}
        contentType="table" // Sets default app layout settings for widths
        tools={Tools} // Tools panel content defined below
      />
    );
  }
}

// Breadcrumb content
const Breadcrumbs = () => (
  <BreadcrumbGroup
    items={[
      {
        text: 'Scale Out Computing',
        href: '#/service-home'
      },
      {
        text: 'Dashboard',
        href: '#/dashboard'
      },
      {
        text: 'User management',
        href: '#/user-management'
      }
    ]}
  />
);

const Content = () => (
  <div>
    <h2>
      User management
      <a className="awsui-util-help-info-link" href="javascript:void(0);" onClick={() => props.replaceToolsContent(1)}>
        Info
      </a>
    </h2>
    <p>This is the future home of user management page.</p>
  </div>
);

class DetailsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: [],
      users: [],
      pageSize: 30,
      filteringText: ''
    };
  }

  componentDidMount() {
    new DataProvider().getData('users', users => this.setState({ users: users }));
  }

  // Keeps track of how many users are selected
  headerCounter(selectedUsers, users) {
    return selectedUsers.length ? `(${selectedUsers.length} of ${users.length})` : `(${users.length})`;
  }

  // Updates the page size in preferences
  onPaginationChange({ detail: { pageSize } }) {
    this.setState({
      pageSize
    });
  }

  // Updates the filtering text
  onFilteringChange({ detail: { filteringText } }) {
    this.setState({
      filteringText
    });
  }

  // Resets the filtering text
  clearFilter() {
    this.setState({
      filteringText: ''
    });
  }

  render() {
    return (
      <Table
        columnDefinitions={COLUMN_DEFINITIONS}
        items={this.state.users}
        header={
          <Header
            selectedUsers={this.state.selectedUsers}
            counter={this.headerCounter(this.state.selectedUsers, this.state.users)}
          />
        }
        noMatch={
          <div className="awsui-util-t-c">
            <div className="awsui-util-pt-xs awsui-util-mb-xs">
              <b>No matches</b>
            </div>
            <p className="awsui-util-mb-s">No results match your query</p>
            <div className="awsui-util-mb-l">
              <Button onClick={this.clearFilter.bind(this)} text="Clear filter" />
            </div>
          </div>
        }
      >
        <TableFiltering
          filteringPlaceholder="Search users"
          filteringText={this.state.filteringText}
          onFilteringChange={this.onFilteringChange.bind(this)}
        />
        <TablePagination onPaginationChange={this.onPaginationChange.bind(this)} pageSize={this.state.pageSize} />
        <TableSorting sortableColumns={SORTABLE_COLUMNS} />
        <TableSelection
          selectedItems={this.state.selectedUsers}
          onSelectionChange={evt => this.setState({ selectedUsers: evt.detail.selectedItems })}
        />
        <TablePreferences title="Preferences" confirmLabel="Confirm" cancelLabel="Cancel">
          <TablePageSizeSelector title="Page size" options={PAGE_SELECTOR_OPTIONS} />
          <TableWrapLines label="Wrap lines" description="Check to see all the text and wrap the lines" value={false} />
          <FormField
            stretch={true}
            className="awsui-util-mb-l awsui-util-d-b awsui-table-custom-preference"
            label="View as"
          >
            <RadioGroup value="table" items={CUSTOM_PREFERENCE_OPTIONS} />
          </FormField>
          <TableContentSelector title="Select visible columns" options={CONTENT_SELECTOR_OPTIONS} />
        </TablePreferences>
      </Table>
    );
  }
}

// Table header content, shows how many users are selected and contains the action stripe
const Header = ({ selectedUsers, counter }) => {
  const isOnlyOneSelected = selectedUsers.length === 1;

  return (
    <div className="awsui-util-action-stripe">
      <div className="awsui-util-action-stripe-title">
        <h2>
          Users&nbsp;
          {counter ? <span className="awsui-util-header-counter">{counter}</span> : ''}
          <a
            className="awsui-util-help-info-link"
            href="javascript:void(0);"
            onClick={() => props.replaceToolsContent(1)}
          >
            Info
          </a>
        </h2>
      </div>
      <div className="awsui-util-action-stripe-group">
        <Button text="View details" disabled={!isOnlyOneSelected} />
        <Button text="Edit" disabled={!isOnlyOneSelected} />
        <Button text="Delete" disabled={selectedUsers.length === 0} />
        <Button href="#/create-user" variant="primary" text="Create user" />
      </div>
    </div>
  );
};

// Flash message content
const FlashMessage = () => <Flash type="success" content="User created successfully" dismissible={true} />;

// Help panel content
const Tools = (
  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">User management</div>
    <div className="awsui-util-help-panel-header">
      <p>This is the help section for user management page.</p>
      <br />

      <p>Sample information for User management section side bar help tools</p>
    </div>
    <ul className="awsui-list-unstyled">
      <li>
        <a href="https://docs.aws.amazon.com/solutions/latest/scale-out-computing-on-aws/welcome.html" target="_blank">
          What is Scale Out Computing on AWS?
        </a>
      </li>
      <li>
        <a href="https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/" target="_blank">
          Getting started
        </a>
      </li>
      <li>
        <a
          href="https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc"
          target="_blank"
        >
          Working with instances
        </a>
      </li>
    </ul>
  </div>
);
