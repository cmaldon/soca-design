import React from 'react';
import { useState } from 'react';
import ServiceNavigation from './ServiceNavigation.jsx';
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
    Wizard
} = window['AWS-UI-Components-React'];
import { Link } from 'react-router-dom';


// Class Basic is a skeleton of the basic App layout using AWS-UI React components.
export default class InstanceWizard extends React.Component {

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

const Content = () =>
    // {
    //     const [activeStepIndex, setActiveStepIndex] = useState(0);
    // }

    <div>
        <Form header={<h1>Launch instance</h1>} />
        <Wizard
            i18nStrings={{
                stepNumberLabel: stepNumber =>
                    `Step ${stepNumber}`,
                collapsedStepsLabel: (stepNumber, stepsCount) =>
                    `Step ${stepNumber} of ${stepsCount}`,
                cancelButton: "Cancel",
                previousButton: "Previous",
                nextButton: "Next",
                submitButton: "Launch instance",
                optional: "optional"
            }}
            steps={[
                {
                    title: "Choose engine type",
                    info: <a className="awsui-util-help-info-link"
                        href="javascript:void(0);">Info</a>,
                    description:
                        "Each instance type includes one or more instance sizes, allowing you to scale your resources to the requirements of your target workload.",
                    content: (
                        <div>
                            <h2>Engine options</h2>
                             <FormField label="First field">
                                 <Input />
                             </FormField>
                             <FormField label="Second field">
                                 <Input />
                             </FormField>
                        </div>
                    )
                    //   content: (
                    // <Container
                    //     header={
                    //         <Header variant="h2">
                    //             Form container header
                    //         </Header>
                    //     }
                    // >
                    //     <SpaceBetween direction="vertical" size="l">
                    //         <FormField label="First field">
                    //             <Input />
                    //         </FormField>
                    //         <FormField label="Second field">
                    //             <Input />
                    //         </FormField>
                    //     </SpaceBetween>
                    // </Container>
                    //   )
                },
                {
                    title: "Add storage",
                    content: (
                        <Container
                            header={
                                <Header variant="h2">
                                    Form container header
                                </Header>
                            }
                        >
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
                    title: "Configure security group",
                    content: (
                        <Container
                            header={
                                <Header variant="h2">
                                    Form container header
                                </Header>
                            }
                        >
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
                    title: "Review and launch",
                    content: (
                        <SpaceBetween size="xs">
                            <Header
                                variant="h3"
                                actions={
                                    <Button
                                        onClick={() => setActiveStepIndex(0)}
                                    >
                                        Edit
                                    </Button>
                                }
                            >
                                Step 1: Choose instance type
                            </Header>
                            <Container
                                header={
                                    <Header variant="h2">
                                        Container title
                                    </Header>
                                }
                            >
                                <ColumnLayout
                                    columns={2}
                                    variant="text-grid"
                                >
                                    <div>
                                        <Box
                                            margin={{ bottom: "xxxs" }}
                                            color="text-label"
                                        >
                                            First field
                                        </Box>
                                        <div>Value</div>
                                    </div>
                                    <div>
                                        <Box
                                            margin={{ bottom: "xxxs" }}
                                            color="text-label"
                                        >
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
    />
);


// Help (right) panel content
const Tools = [
    <div className="awsui-util-help-panel">
        <div className="awsui-util-help-panel-header">
            <h2>Scale Out Computing</h2>
            <br />
            <p>With Scale Out Computing on AWS, you can create a virtual
                machine instance, an isolated compute environment in the AWS
                Cloud. You can access your instance by using the same tools and applications
                you might use with a standalone computer. Connect to your machine instance by using
                NICE DCV in Windows or Linux Desktop, SSH Access or Command Line Interface.
            </p>
        </div>
        <a href="javascript:void(0)">
            Learn more <Icon name="external" />
        </a>
        <ul className="awsui-list-unstyled">
            <li>
                <a href="https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/">
                    What is Scale Out Computing?
                </a>
            </li>
            <li>
                <a href="https://awslabs.github.io/scale-out-computing-on-aws/">
                    Getting started
                </a>
            </li>
            <li>
                <a href="https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc">
                    Working with instances
                </a>
            </li>
        </ul>
    </div>
];