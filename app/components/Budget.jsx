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
} from '../resources/table/table-config.jsx';
const {
    // import the components that you use in the file here
    AppLayout,
    BreadcrumbGroup,
    Button,
    ColumnLayout,
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

// Class Basic is a skeleton of the basic App layout using AWS-UI React components.
export default class Budget extends React.Component {
    render() {
        return (
            <AppLayout
                navigation={<ServiceNavigation />} // Navigation panel content imported from './ServiceNavigation.jsx'
                breadcrumbs={<Breadcrumbs />} // Breadcrumbs element defined below
                notification={<FlashMessage />}
                content={<Content />} // Main content on the page, defined below
                toolsOpen={false}
                contentType="default" // Sets default app layout settings for widths
                tools={Tools} // Tools panel content defined below

            //      content={<DetailsTable />}

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
                text: 'Budget',
                href: '#/budget'
            }
        ]}
    />
);

// Main content area (fill it in with components!)
const Content = () =>
    <div>
        <div className="awsui-util-container awsui-util-no-gutters">
            <div className="awsui-util-container-header">
                <h2>Budget overview<a
                    className="awsui-util-help-info-link"
                    href="javascript:void(0);"
                    onClick={() => props.replaceToolsContent(1)}>
                    Info</a></h2>
                <p>Viewing all budget data</p>
            </div>
            <div>
                <ColumnLayout columns={2} borders="vertical" className="awsui-util-no-gutters">
                    <div data-awsui-column-layout-root={true} className="awsui-util-mv-l">
                        <div className="awsui-util-ph-l awsui-util-mb-m">
                            <h3>Current month costs</h3>
                            <a className="dashboard-large-link gray" href="#/budget">$386.36</a>
                            <div className="container">
                                <span className="right">&uarr; &gt;100&#37;<br />over last month</span>
                            </div>

                        </div>
                        <div className="awsui-util-ph-l awsui-util-mb-m">
                            <h3>Forecasted month end costs</h3>
                            <a className="dashboard-large-link gray" href="#/budget">$450.80</a>
                        </div>

                    </div>
                </ColumnLayout>
            </div>
        </div>

        <div className="awsui-util-container awsui-util-no-gutters">
            <div className="awsui-util-container-header">
                <h2>Instance hours</h2>
                <p>Daily instance hours by instance type</p>
            </div>
            <div>
                <ColumnLayout columns={1} borders="vertical" className="awsui-util-no-gutters">
                    <div data-awsui-column-layout-root={true} className="awsui-util-mv-l">
                        <div className="awsui-util-ph-l awsui-util-mb-m">
                            <img src="./images/costs.png" className="intro-screenshot" alt="screenshot" />
                        </div>
                    </div>
                </ColumnLayout>
            </div>
        </div>
    </div>

class DetailsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDistributions: [],
            distributions: [],
            pageSize: 30,
            filteringText: ''
        };
    }

    componentDidMount() {
        new DataProvider().getData('distributions', distributions => this.setState({ distributions: distributions }));
    }

    // Keeps track of how many distributions are selected
    headerCounter(selectedDistributions, distributions) {
        return selectedDistributions.length
            ? `(${selectedDistributions.length} of ${distributions.length})`
            : `(${distributions.length})`;
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
            //     <Container
            //     header={
            //       <Header
            //         variant="h2"
            //         description="Container description"
            //       >
            //         Container title
            //       </Header>
            //     }
            //   >
            //     Container content
            //   </Container>

            <Table
                columnDefinitions={COLUMN_DEFINITIONS}
                items={this.state.distributions}
                header={
                    <Header
                        selectedDistributions={this.state.selectedDistributions}
                        counter={this.headerCounter(this.state.selectedDistributions, this.state.distributions)}
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
                    filteringPlaceholder="Search project budgets"
                    filteringText={this.state.filteringText}
                    onFilteringChange={this.onFilteringChange.bind(this)}
                />
                <TablePagination onPaginationChange={this.onPaginationChange.bind(this)} pageSize={this.state.pageSize} />
                <TableSorting sortableColumns={SORTABLE_COLUMNS} />
                <TableSelection
                    selectedItems={this.state.selectedDistributions}
                    onSelectionChange={evt => this.setState({ selectedDistributions: evt.detail.selectedItems })}
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

// Table header content, shows how many distributions are selected and contains the action stripe
const Header = ({ selectedDistributions, counter }) => {
    const isOnlyOneSelected = selectedDistributions.length === 1;

    return (
        <div className="awsui-util-action-stripe">
            <div className="awsui-util-action-stripe-title">
                <h2>
                    Project budget&nbsp;
                    {counter ? <span className="awsui-util-header-counter">{counter}</span> : ''}
                    <a
                        className="awsui-util-help-info-link"
                        href="javascript:void(0);"
                        onClick={() => props.replaceToolsContent(1)}>
                        Info</a>
                </h2>
            </div>
            <div className="awsui-util-action-stripe-group">
                <Button text="View details" disabled={!isOnlyOneSelected} />
                <Button text="Edit" disabled={!isOnlyOneSelected} />
                <Button text="Delete" disabled={selectedDistributions.length === 0} />
                <Button href="#/create" variant="primary" text="Create project budget" />
            </div>
        </div>
    );
};




// Flash message content
const FlashMessage = () => <Flash type="success" content="Project budget created successfully" dismissible={true} />;



// Help panel content
const Tools = (
    <div className="awsui-util-help-panel">
        <div className="awsui-util-help-panel-header">
            Project Budget
        </div>
        <div className="awsui-util-help-panel-header">
            <p>This is the help section for budget page.</p>
            <br />

            <p>Sample information for Budget section side bar help tools</p>
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
                <a href="https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc" target="_blank">
                    Working with instances
                </a>
            </li>
        </ul>
    </div>
);
