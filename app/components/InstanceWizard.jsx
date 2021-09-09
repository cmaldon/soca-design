import React from 'react';
import ServiceNavigation from './ServiceNavigation.jsx';
import { DELIVERY_METHOD } from '../resources/form-config.jsx';
const {
  AppLayout,
  BreadcrumbGroup,
  Button,
  FormField,
  Input,
  ColumnLayout,
  Form,
  Box,
  Icon,
  Container,
  Header,
  SpaceBetween,
  Tiles,
  Wizard
} = window['AWS-UI-Components-React'];
export default class InstanceWizard extends React.Component {
  render() {
    return (
      <AppLayout
        navigation={<ServiceNavigation />} // Navigation panel content imported from './ServiceNavigation.jsx'
        breadcrumbs={<Breadcrumbs />} // Breadcrumbs element defined below
        content={<Content />} // Main content on the page, defined below
        contentType="wizard" //
        tools={Tools} // Tools panel content defined below
      />
    );
  }
}

const Content = () => (
  // {
  //     const [activeStepIndex, setActiveStepIndex] = useState(0);
  // }
  <div>
    <Form header={<h1>Launch instance</h1>} />
    <Wizard
      i18nStrings={{
        stepNumberLabel: stepNumber => `Step ${stepNumber}`,
        collapsedStepsLabel: (stepNumber, stepsCount) => `Step ${stepNumber} of ${stepsCount}`,
        cancelButton: 'Cancel',
        previousButton: 'Previous',
        nextButton: 'Next',
        submitButton: 'Launch instance',
        optional: 'optional'
      }}
      steps={[
        {
          title: 'Choose engine type',
          info: (
            <a
              className="awsui-util-help-info-link"
              href="javascript:void(0)"
              onClick={() => props.replaceToolsContent(1)}
            >
              Info
            </a>
          ),
          description:
            'Each instance type includes one or more instance sizes, allowing you to scale your resources to the requirements of your target workload.',
          content: (
            <div className="awsui-util-container awsui-util-no-gutters">
              <div className="awsui-util-container-header">
                <h4>Engine options</h4>
                <p>Choose instance details</p>
              </div>
              <ColumnLayout columns={1} borders="vertical" className="awsui-util-no-gutters">
                <div data-awsui-column-layout-root={true} className="awsui-util-mv-l">
                  <div className="awsui-util-ph-l awsui-util-mb-m">
                    <FormField
                      label={
                        <div>
                          Engine options
                          <a
                            className="awsui-util-help-info-link"
                            href="javascript:void(0);"
                            onClick={() => this.props.replaceToolsContent(1)}
                          >
                            Info
                          </a>
                        </div>
                      }
                      stretch={true}
                    >
                      <Tiles
                        items={DELIVERY_METHOD}
                        //   value={this.state.deliveryMethod}
                        // onChange={e => this.setState({ deliveryMethod: e.detail.value })}
                      />
                    </FormField>
                  </div>
                  <div className="awsui-util-ph-l awsui-util-mb-m">
                    <h3>Ubuntu Linux</h3>
                    <p>
                      Ubuntu Linux sample user information and benefits.
                      <ul>
                        <li>Benefit 1</li>
                        <li>Benefit 2</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </ColumnLayout>
            </div>
          )
        },
        {
          title: 'Add storage',
          content: (
            <Container header={<Header variant="h2">Form container header</Header>}>
              <SpaceBetween direction="vertical" size="l">
                <FormField label="First field">
                  <Input />
                </FormField>
                <FormField label="Second field">
                  <Input />
                </FormField>
              </SpaceBetween>
            </Container>
          )
        },
        {
          title: 'Configure security group',
          content: (
            <Container header={<Header variant="h2">Form container header</Header>}>
              <SpaceBetween direction="vertical" size="l">
                <FormField label="First field">
                  <Input />
                </FormField>
                <FormField label="Second field">
                  <Input />
                </FormField>
              </SpaceBetween>
            </Container>
          ),
          isOptional: true
        },
        {
          title: 'Review and launch',
          content: (
            <SpaceBetween size="xs">
              <Header variant="h3" actions={<Button onClick={() => setActiveStepIndex(0)}>Edit</Button>}>
                Step 1: Choose instance type
              </Header>
              <Container header={<Header variant="h2">Container title</Header>}>
                <ColumnLayout columns={2} variant="text-grid">
                  <div>
                    <Box margin={{ bottom: 'xxxs' }} color="text-label">
                      First field
                    </Box>
                    <div>Value</div>
                  </div>
                  <div>
                    <Box margin={{ bottom: 'xxxs' }} color="text-label">
                      Second Field
                    </Box>
                    <div>Value</div>
                  </div>
                </ColumnLayout>
              </Container>
            </SpaceBetween>
          )
        }
      ]}
    />
  </div>
);

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
        text: 'Instances',
        href: '#/instances'
      },
      {
        text: 'Launch instance',
        href: '#/instance-wizard'
      }
    ]}
    activeHref="#/instances"
  />
);

// Help (right) panel content
const Tools = [
  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">Launch instance</div>
    <div className="awsui-util-help-panel-header">
      <p>Configure your instance settings here. Follow the step by step guide to set up your instance.</p>
      <br />

      <h4>Instance ID</h4>
      <p>The ID of your instance.</p>
      <br />

      <h4>Instance state</h4>
      <p>
        Your instance can be in one of the following states: pending, running, stopping, stopped, shutting-down, or
        terminated. If your instance is hibernated, it is in the stopped state. You can choose the refresh button to
        update the page in case the instance state has changed.
      </p>
      <br />

      <h4>Instance type</h4>
      <p>
        The instance type determines your instance’s CPU capacity, memory, and storage. For specifications and pricing,
        see the Amazon EC2 product page
      </p>

      <br />

      <h4>Public IP address</h4>
      <p>
        A public IP address is assigned to the instance from Amazon's pool of public IP addresses; it's not associated
        with your account. When you stop your instance, the public IP address is disassociated from your instance and
        released back into the pool, and is no longer available for you to use. You cannot manually associate or
        disassociate a public IP address. If you require a persistent public IP address allocated to your account that
        can be assigned to and removed from instances as you require, use an Elastic IP address instead.
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
        <a
          href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html?icmpid=docs_ec2_console"
          target="_blank"
        >
          Amazon EC2 instance
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
