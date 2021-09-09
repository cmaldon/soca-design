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
} from '../resources/table/table-config.jsx';
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
  RadioGroup,
  Icon
} = window['AWS-UI-Components-React'];
export default class TableView extends React.Component {
  render() {
    return (
      <AppLayout
        navigation={<ServiceNavigation />} // Navigation panel content imported from './ServiceNavigation.jsx'
        notifications={<FlashMessage />}
        breadcrumbs={<Breadcrumbs />}
        content={<DetailsTable />}
        contentType="table"
        toolsOpen={false}
        tools={Tools}
      />
    );
  }
}

class DetailsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProjects: [],
      projects: [],
      pageSize: 30,
      filteringText: ''
    };
  }

  componentDidMount() {
    new DataProvider().getData('projects', projects => this.setState({ projects: projects }));
  }

  // Keeps track of how many projects are selected
  headerCounter(selectedProjects, projects) {
    return selectedProjects.length ? `(${selectedProjects.length} of ${projects.length})` : `(${projects.length})`;
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
        items={this.state.projects}
        header={
          <Header
            selectedProjects={this.state.selectedProjects}
            counter={this.headerCounter(this.state.selectedProjects, this.state.projects)}
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
          filteringPlaceholder="Search projects"
          filteringText={this.state.filteringText}
          onFilteringChange={this.onFilteringChange.bind(this)}
        />
        <TablePagination onPaginationChange={this.onPaginationChange.bind(this)} pageSize={this.state.pageSize} />
        <TableSorting sortableColumns={SORTABLE_COLUMNS} />
        <TableSelection
          selectedItems={this.state.selectedProjects}
          onSelectionChange={evt => this.setState({ selectedProjects: evt.detail.selectedItems })}
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

// Table header content, shows how many projects are selected and contains the action stripe
const Header = ({ selectedProjects, counter }) => {
  const isOnlyOneSelected = selectedProjects.length === 1;

  return (
    <div className="awsui-util-action-stripe">
      <div className="awsui-util-action-stripe-title">
        <h2>
          Projects&nbsp;
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
        <Button text="Delete" disabled={selectedProjects.length === 0} />
        <Button href="#/create" variant="primary" text="Create project" />
      </div>
    </div>
  );
};

// Breadcrumb content
const Breadcrumbs = () => (
  <BreadcrumbGroup
    items={[
      {
        text: 'Scale Out Computing',
        href: '#/service-home'
      },
      {
        text: 'Projects',
        href: '#/table'
      }
    ]}
  />
);

// Flash message content
const FlashMessage = () => (
  <Flash
    type="success"
    content="Project created successfully"
    dismissible={true}
    action={<Button>View instance</Button>}
    dismissLabel="Dismiss message"
  />
);

// Help (right) panel content
const Tools = [
  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">Scale Out Computing</div>
    <div className="awsui-util-help-panel-header">
      <p>
        With Scale Out Computing on AWS, you can create a virtual machine instance, an isolated compute environment in
        the AWS Cloud. You can access your instance by using the same tools and applications you might use with a
        standalone computer. Connect to your machine instance by using NICE DCV in Windows or Linux Desktop, SSH Access
        or Command Line Interface.
      </p>
    </div>
    <a href="javascript:void(0)">
      Learn more <Icon name="external" />
    </a>
    <ul className="awsui-list-unstyled">
      <li>
        <a href="https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/" target="_blank">
          What is Scale Out Computing?
        </a>
      </li>
      <li>
        <a href="https://awslabs.github.io/scale-out-computing-on-aws/" target="_blank">
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
];
