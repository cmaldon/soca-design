import React from 'react';
import ServiceNavigation from './ServiceNavigation.jsx';

const {
  // import the components that you use in the file here
  AppLayout,
  BreadcrumbGroup,
  Button,
  Icon,
  ColumnLayout
} = window['AWS-UI-Components-React'];
export default class Dashboard extends React.Component {
  render() {
    return (
      <AppLayout
        navigation={<ServiceNavigation />} // Navigation panel content imported from './ServiceNavigation.jsx'
        breadcrumbs={<Breadcrumbs />} // Breadcrumbs element defined below
        content={<Content />} // Main content on the page, defined below
        contentType="default" // Sets default app layout settings for widths
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
      }
    ]}
  />
);

// Main content area
const Content = () => (
  <div>
    <div className="awsui-util-pt-xxl awsui-row">
      <div className="col-xxs-10 offset-xxs-1 col-s-6 col-l-5 offset-l-2 col-xl-6">
        <div className="awsui-util-action-stripe">
          <div className="awsui-util-action-stripe-title">
            <h1>
              Dashboard
              <a
                className="awsui-util-help-info-link"
                href="javascript:void(0);"
                onClick={() => props.replaceToolsContent(1)}
              >
                Info
              </a>
            </h1>
          </div>
          <div className="awsui-util-action-stripe-group">
            <Button href="#/table" variant="primary" text="Go to projects" />
          </div>
        </div>
      </div>

      <div className="awsui-util-container awsui-util-no-gutters">
        <div className="awsui-util-container-header">
          <h2>Project overview</h2>
          <p>Viewing all project data</p>
        </div>
        <div>
          <ColumnLayout columns={4} borders="vertical" className="awsui-util-no-gutters">
            <div data-awsui-column-layout-root={true} className="awsui-util-mv-l">
              <div className="awsui-util-ph-l awsui-util-mb-m">
                <h3>Projects</h3>
                <a className="dashboard-xlarge-link" href="#/table">
                  7
                </a>
              </div>
              <div className="awsui-util-ph-l awsui-util-mb-m">
                <h3>Instances (running)</h3>
                <a className="dashboard-xlarge-link" href="#/project-details">
                  34
                </a>{' '}
                /102
              </div>
              <div className="awsui-util-ph-l awsui-util-mb-m">
                <h3>Storage used</h3>
                <a className="dashboard-xlarge-link" href="#/storage">
                  50
                </a>{' '}
                /150 GB
              </div>
              <div className="awsui-util-ph-l awsui-util-mb-m">
                <h3>Backups</h3>
                <a className="dashboard-xlarge-link" href="#/storage">
                  520
                </a>{' '}
                GB
              </div>
            </div>
          </ColumnLayout>
        </div>
      </div>

      <div className="awsui-util-container awsui-util-no-gutters">
        <div className="awsui-util-container-header">
          <h2>Budget</h2>
          <p>Viewing budget data for all projects</p>
        </div>
        <div>
          <ColumnLayout columns={4} borders="vertical" className="awsui-util-no-gutters">
            <div data-awsui-column-layout-root={true} className="awsui-util-mv-l">
              <div className="awsui-util-ph-l awsui-util-mb-m">
                <h3>Total spent</h3>
                <a className="dashboard-large-link red" href="#/budget">
                  $1352
                </a>
              </div>
              <div className="awsui-util-ph-l awsui-util-mb-m">
                <h3>Forecasted</h3>
                <a className="dashboard-large-link" href="#/budget">
                  $3420
                </a>
              </div>
              <div className="awsui-util-ph-l awsui-util-mb-m">
                <h3>Remaining</h3>
                <a className="dashboard-large-link green" href="#/budget">
                  $13648
                </a>
              </div>
              <div className="awsui-util-ph-l awsui-util-mb-m">
                <h3>Budget</h3>
                <a className="dashboard-large-link black" href="#/budget">
                  $15000
                </a>
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
                <div className="awsui-util-container">
                  <img src="./images/instance-hours1.png" className="intro-screenshot" alt="screenshot" />
                  {/* <div className="custom-home-image__placeholder" /> */}
                </div>

                {/* <div>
                                <BarChart
                                        series={[
                                            {
                                                title: "Severe",
                                                type: "bar",
                                                data: [
                                                    { x: new Date(1601103600000), y: 12 },
                                                    { x: new Date(1601110800000), y: 18 },
                                                    { x: new Date(1601118000000), y: 15 },
                                                    { x: new Date(1601125200000), y: 9 },
                                                    { x: new Date(1601132400000), y: 18 }
                                                ]
                                            },
                                            {
                                                title: "Moderate",
                                                type: "bar",
                                                data: [
                                                    { x: new Date(1601103600000), y: 8 },
                                                    { x: new Date(1601110800000), y: 11 },
                                                    { x: new Date(1601118000000), y: 12 },
                                                    { x: new Date(1601125200000), y: 11 },
                                                    { x: new Date(1601132400000), y: 13 }
                                                ]
                                            },
                                            {
                                                title: "Low",
                                                type: "bar",
                                                data: [
                                                    { x: new Date(1601103600000), y: 7 },
                                                    { x: new Date(1601110800000), y: 9 },
                                                    { x: new Date(1601118000000), y: 8 },
                                                    { x: new Date(1601125200000), y: 7 },
                                                    { x: new Date(1601132400000), y: 5 }
                                                ]
                                            },
                                            {
                                                title: "Unclassified",
                                                type: "bar",
                                                data: [
                                                    { x: new Date(1601103600000), y: 14 },
                                                    { x: new Date(1601110800000), y: 8 },
                                                    { x: new Date(1601118000000), y: 6 },
                                                    { x: new Date(1601125200000), y: 4 },
                                                    { x: new Date(1601132400000), y: 6 }
                                                ]
                                            }
                                        ]}
                                        xDomain={[
                                            new Date(1601103600000),
                                            new Date(1601110800000),
                                            new Date(1601118000000),
                                            new Date(1601125200000),
                                            new Date(1601132400000)
                                        ]}
                                        yDomain={[-0, 50]}
                                        i18nStrings={{
                                            filterLabel: "Filter displayed data",
                                            filterPlaceholder: "Filter data",
                                            filterSelectedAriaLabel: "selected",
                                            legendAriaLabel: "Legend",
                                            chartAriaRoleDescription: "line chart",
                                            xTickFormatter: t =>
                                                t
                                                    .toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: !1
                                                    })
                                                    .split(",")
                                                    .join("\n")
                                        }}
                                        ariaLabel="Stacked bar chart"
                                        errorText="Error loading data."
                                        height={300}
                                        loadingText="Loading chart"
                                        recoveryText="Retry"
                                        stackedBars
                                        statusType="finished"
                                        xScaleType="categorical"
                                        xTitle="Time (UTC)"
                                        yTitle="Error count"
                                        empty={
                                            <Box textAlign="center" color="inherit">
                                                <b>No data available</b>
                                                <Box variant="p" color="inherit">
                                                    There is no data available
                                                </Box>
                                            </Box>
                                        }
                                        noMatch={
                                            <Box textAlign="center" color="inherit">
                                                <b>No matching data</b>
                                                <Box variant="p" color="inherit">
                                                    There is no matching data to display
                                                </Box>
                                                <Button>Clear filter</Button>
                                            </Box>
                                        }
                                    />
                                </div> */}
              </div>
            </div>
          </ColumnLayout>
        </div>
      </div>

      <div className="awsui-util-container awsui-util-no-gutters">
        <div className="awsui-util-container-header">
          <h2>Network traffic</h2>
          <p>Incoming and outgoing network traffic</p>
        </div>
        <div>
          <ColumnLayout columns={1} borders="vertical" className="awsui-util-no-gutters">
            <div data-awsui-column-layout-root={true} className="awsui-util-mv-l">
              <div className="awsui-util-ph-l awsui-util-mb-m">
                <div className="awsui-util-container">
                  <img src="./images/network-traffic1.png" className="intro-screenshot" alt="screenshot" />
                </div>

                {/* <div>
                                    <LineChart
                                        series={[
                                            {
                                                title: "Site 1",
                                                type: "line",
                                                data: [
                                                    { x: new Date(1601017200000), y: 58020 },
                                                    { x: new Date(1601018100000), y: 102402 },
                                                    { x: new Date(1601019000000), y: 104920 },
                                                    { x: new Date(1601019900000), y: 94031 },
                                                    { x: new Date(1601020800000), y: 125021 },
                                                    { x: new Date(1601021700000), y: 159219 },
                                                    { x: new Date(1601022600000), y: 193082 },
                                                    { x: new Date(1601023500000), y: 162592 },
                                                    { x: new Date(1601024400000), y: 274021 },
                                                    { x: new Date(1601025300000), y: 264286 },
                                                    { x: new Date(1601026200000), y: 289210 },
                                                    { x: new Date(1601027100000), y: 256362 },
                                                    { x: new Date(1601028000000), y: 257306 },
                                                    { x: new Date(1601028900000), y: 186776 },
                                                    { x: new Date(1601029800000), y: 294020 },
                                                    { x: new Date(1601030700000), y: 385975 },
                                                    { x: new Date(1601031600000), y: 486039 },
                                                    { x: new Date(1601032500000), y: 490447 },
                                                    { x: new Date(1601033400000), y: 361845 },
                                                    { x: new Date(1601034300000), y: 339058 },
                                                    { x: new Date(1601035200000), y: 298028 },
                                                    { x: new Date(1601036100000), y: 231902 },
                                                    { x: new Date(1601037000000), y: 224558 },
                                                    { x: new Date(1601037900000), y: 253901 },
                                                    { x: new Date(1601038800000), y: 102839 },
                                                    { x: new Date(1601039700000), y: 234943 },
                                                    { x: new Date(1601040600000), y: 204405 },
                                                    { x: new Date(1601041500000), y: 190391 },
                                                    { x: new Date(1601042400000), y: 183570 },
                                                    { x: new Date(1601043300000), y: 162592 },
                                                    { x: new Date(1601044200000), y: 148910 },
                                                    { x: new Date(1601045100000), y: 229492 },
                                                    { x: new Date(1601046000000), y: 293910 }
                                                ],
                                                valueFormatter: t => t.toLocaleString("en-US")
                                            },
                                            {
                                                title: "Site 2",
                                                type: "line",
                                                data: [
                                                    { x: new Date(1601017200000), y: 151023 },
                                                    { x: new Date(1601018100000), y: 169975 },
                                                    { x: new Date(1601019000000), y: 176980 },
                                                    { x: new Date(1601019900000), y: 168852 },
                                                    { x: new Date(1601020800000), y: 149130 },
                                                    { x: new Date(1601021700000), y: 147299 },
                                                    { x: new Date(1601022600000), y: 169552 },
                                                    { x: new Date(1601023500000), y: 163401 },
                                                    { x: new Date(1601024400000), y: 154091 },
                                                    { x: new Date(1601025300000), y: 199516 },
                                                    { x: new Date(1601026200000), y: 195503 },
                                                    { x: new Date(1601027100000), y: 189953 },
                                                    { x: new Date(1601028000000), y: 181635 },
                                                    { x: new Date(1601028900000), y: 192975 },
                                                    { x: new Date(1601029800000), y: 205951 },
                                                    { x: new Date(1601030700000), y: 218958 },
                                                    { x: new Date(1601031600000), y: 220516 },
                                                    { x: new Date(1601032500000), y: 213557 },
                                                    { x: new Date(1601033400000), y: 165899 },
                                                    { x: new Date(1601034300000), y: 173557 },
                                                    { x: new Date(1601035200000), y: 172331 },
                                                    { x: new Date(1601036100000), y: 186492 },
                                                    { x: new Date(1601037000000), y: 131541 },
                                                    { x: new Date(1601037900000), y: 142262 },
                                                    { x: new Date(1601038800000), y: 194091 },
                                                    { x: new Date(1601039700000), y: 185899 },
                                                    { x: new Date(1601040600000), y: 173401 },
                                                    { x: new Date(1601041500000), y: 171635 },
                                                    { x: new Date(1601042400000), y: 179130 },
                                                    { x: new Date(1601043300000), y: 185951 },
                                                    { x: new Date(1601044200000), y: 144091 },
                                                    { x: new Date(1601045100000), y: 152975 },
                                                    { x: new Date(1601046000000), y: 157299 }
                                                ],
                                                valueFormatter: t => t.toLocaleString("en-US")
                                            },
                                            {
                                                title: "Performance goal",
                                                type: "threshold",
                                                y: 250000,
                                                valueFormatter: t => t.toLocaleString("en-US")
                                            }
                                        ]}
                                        xDomain={[
                                            new Date(1601017200000),
                                            new Date(1601046000000)
                                        ]}
                                        yDomain={[-0, 500000]}
                                        i18nStrings={{
                                            filterLabel: "Filter displayed data",
                                            filterPlaceholder: "Filter data",
                                            filterSelectedAriaLabel: "selected",
                                            legendAriaLabel: "Legend",
                                            chartAriaRoleDescription: "line chart",
                                            xTickFormatter: t =>
                                                t
                                                    .toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: !1
                                                    })
                                                    .split(",")
                                                    .join("\n"),
                                            yTickFormatter: t =>
                                                Math.abs(t) < 1e3
                                                    ? t
                                                    : (t / 1e3).toFixed() + "k"
                                        }}
                                        ariaLabel="Multiple data series line chart"
                                        errorText="Error loading data."
                                        height={300}
                                        hideFilter
                                        hideLegend
                                        horizontalBars
                                        loadingText="Loading chart"
                                        recoveryText="Retry"
                                        stackedBars
                                        statusType="finished"
                                        xScaleType="time"
                                        xTitle="Time (UTC)"
                                        yTitle="Bytes transferred"
                                        empty={
                                            <Box textAlign="center" color="inherit">
                                                <b>No data available</b>
                                                <Box variant="p" color="inherit">
                                                    There is no data available
                                                </Box>
                                            </Box>
                                        }
                                        noMatch={
                                            <Box textAlign="center" color="inherit">
                                                <b>No matching data</b>
                                                <Box variant="p" color="inherit">
                                                    There is no matching data to display
                                                </Box>
                                                <Button>Clear filter</Button>
                                            </Box>
                                        }
                                    />
                                </div> */}
              </div>
            </div>
          </ColumnLayout>
        </div>
      </div>

      <div className="awsui-util-container awsui-util-no-gutters">
        <div className="awsui-util-container-header">
          <h2>Usage data</h2>
          <p>Display instance data</p>
        </div>
        <div>
          <ColumnLayout columns={1} borders="vertical" className="awsui-util-no-gutters">
            <div data-awsui-column-layout-root={true} className="awsui-util-mv-l">
              <div className="awsui-util-ph-l awsui-util-mb-m">
                <div className="awsui-util-container">
                  <img src="./images/pie-chart.png" className="intro-screenshot" alt="screenshot" />
                  {/* <div className="custom-home-image__placeholder" /> */}
                </div>

                {/* <div>
                                    <PieChart
                                        data={[
                                            {
                                                title: "Running",
                                                value: 60,
                                                lastUpdate: "Dec 7, 2020"
                                            },
                                            {
                                                title: "Failed",
                                                value: 30,
                                                lastUpdate: "Dec 6, 2020"
                                            },
                                            {
                                                title: "In-progress",
                                                value: 10,
                                                lastUpdate: "Dec 6, 2020"
                                            },
                                            {
                                                title: "Pending",
                                                value: -0,
                                                lastUpdate: "Dec 7, 2020"
                                            }
                                        ]}
                                        detailPopoverContent={(datum, sum) => [
                                            { key: "Resource count", value: datum.value },
                                            {
                                                key: "Percentage",
                                                value: `${((datum.value / sum) * 100).toFixed(
                                                    0
                                                )}%`
                                            },
                                            { key: "Last update on", value: datum.lastUpdate }
                                        ]}
                                        segmentDescription={(datum, sum) =>
                                            `${datum.value} units, ${(
                                                (datum.value / sum) *
                                                100
                                            ).toFixed(0)}%`
                                        }
                                        i18nStrings={{
                                            detailsValue: "Value",
                                            detailsPercentage: "Percentage",
                                            filterLabel: "Filter displayed data",
                                            filterPlaceholder: "Filter data",
                                            filterSelectedAriaLabel: "selected",
                                            detailPopoverDismissAriaLabel: "Dismiss",
                                            legendAriaLabel: "Legend",
                                            chartAriaRoleDescription: "pie chart",
                                            segmentAriaRoleDescription: "segment"
                                        }}
                                        ariaDescription="Pie chart showing how many resources are currently in which state."
                                        ariaLabel="Pie chart"
                                        errorText="Error loading data."
                                        loadingText="Loading chart"
                                        recoveryText="Retry"
                                        size="medium"
                                        empty={
                                            <Box textAlign="center" color="inherit">
                                                <b>No data available</b>
                                                <Box variant="p" color="inherit">
                                                    There is no data available
                                                </Box>
                                            </Box>
                                        }
                                        noMatch={
                                            <Box textAlign="center" color="inherit">
                                                <b>No matching data</b>
                                                <Box variant="p" color="inherit">
                                                    There is no matching data to display
                                                </Box>
                                                <Button>Clear filter</Button>
                                            </Box>
                                        }
                                    />
                                </div> */}
              </div>
            </div>
          </ColumnLayout>
        </div>
      </div>
    </div>
  </div>
);

// Help panel content
const Tools = (
  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">Scale Out Computing</div>
    <div className="awsui-util-help-panel-header">
      <p>Welcome to the Scale Out Computing Dashboard.</p>
      <br />

      <p>
        With Scale Out Computing on AWS, you can create a virtual machine instance, an isolated compute environment in
        the AWS Cloud. You can access your instance by using the same tools and applications you might use with a
        standalone computer.
      </p>
      <br />

      <h4>Connect to your instance</h4>
      <p>
        Connect to your machine instance by using NICE DCV in Windows or Linux Desktop, SSH Access or Command Line
        Interface.
      </p>
    </div>
    <a href="javascript:void(0)">
      Learn more <Icon name="external" />
    </a>
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
