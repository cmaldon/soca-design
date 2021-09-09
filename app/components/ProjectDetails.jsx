/************************************************************************
                            DISCLAIMER

This is just a playground package. It does not comply with best practices
of using AWS-UI components. For production code, follow the integration
guidelines:

https://polaris.corp.amazon.com/getting_started/development/integration/
************************************************************************/
import React from 'react';
import DataProvider from '../resources/data-provider';
import ServiceNavigation from './ServiceNavigation.jsx';
import {
  COLUMN_DEFINITIONS,
  CONTENT_SELECTOR_OPTIONS,
  PAGE_SELECTOR_OPTIONS,
  SORTABLE_COLUMNS,
  CUSTOM_PREFERENCE_OPTIONS
} from '../resources/table/instances-config.jsx';
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

export default class ProjectDetails extends React.Component {
  render() {
    return (
      <AppLayout
        navigation={<ServiceNavigation />} // Navigation panel content imported from './ServiceNavigation.jsx'
        navigationOpen={false}
        breadcrumbs={<Breadcrumbs />} // Breadcrumbs element defined below
        notifications={<FlashMessage />}
        content={<DetailsTable />} // Main content on the page, defined below
        contentType="table"
        tools={Tools} // Tools panel content defined below
        toolsOpen={false}
      />
    );
  }
}

// Breadcrumb content
const Breadcrumbs = () => (
  <BreadcrumbGroup
    items={[
      {
        text: 'Dashboard',
        href: '#/dashboard'
      },
      {
        text: 'Projects',
        href: '#/table'
      },
      {
        text: 'Genomics',
        href: '#/project-details'
      }
    ]}
    activeHref="#/table"
  />
);
class DetailsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInstances: [],
      instances: [],
      pageSize: 30,
      filteringText: ''
    };
  }

  componentDidMount() {
    new DataProvider().getData('instances', instances => this.setState({ instances: instances }));
  }

  // Keeps track of how many instances are selected
  headerCounter(selectedInstances, instances) {
    return selectedInstances.length ? `(${selectedInstances.length} of ${instances.length})` : `(${instances.length})`;
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
        items={this.state.instances}
        header={
          <Header
            selectedInstances={this.state.selectedInstances}
            counter={this.headerCounter(this.state.selectedInstances, this.state.instances)}
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
          filteringPlaceholder="Search instances"
          filteringText={this.state.filteringText}
          onFilteringChange={this.onFilteringChange.bind(this)}
        />
        <TablePagination onPaginationChange={this.onPaginationChange.bind(this)} pageSize={this.state.pageSize} />
        <TableSorting sortableColumns={SORTABLE_COLUMNS} />
        <TableSelection
          selectedItems={this.state.selectedInstances}
          onSelectionChange={evt => this.setState({ selectedInstances: evt.detail.selectedItems })}
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

// Table header content, shows how many instances are selected and contains the action stripe
const Header = ({ selectedInstances, counter }) => {
  const isOnlyOneSelected = selectedInstances.length === 1;

  return (
    <div className="awsui-util-action-stripe">
      <div className="awsui-util-action-stripe-title">
        <h2>
          Instances&nbsp;
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
        <Button text="Delete" disabled={selectedInstances.length === 0} />
        <Button href="#/instance-wizard" variant="primary" text="Launch instance" />
      </div>
    </div>
  );
};

// Flash message content
const FlashMessage = () => (
  <Flash type="info" content="Viewing all instance resources in this project." dismissible={true} />
);

// Help panel content
const Tools = (
  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">Project instances</div>
    <div className="awsui-util-help-panel-header">
      <p>This is the help section for project details page.</p>
      <br />
      <p>Sample information for Project details section side bar help tools</p>
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
