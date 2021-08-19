/************************************************************************
                            DISCLAIMER

This is just a playground package. It does not comply with best practices
of using AWS-UI components. For production code, follow the integration
guidelines:

https://polaris.corp.amazon.com/getting_started/development/integration/
************************************************************************/
import React from 'react';
import ServiceNavigation from './ServiceNavigation.jsx';
const {
    // import the components that you use in the file here
    AppLayout,
    BreadcrumbGroup
} = window['AWS-UI-Components-React'];

// Class Basic is a skeleton of the basic App layout using AWS-UI React components.
export default class Budget extends React.Component {
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
        <h2>Budget</h2>
        <p>Hello from p in div</p>

    </div>;

// Help panel content
const Tools = (
    <div className="awsui-util-help-panel">
        <div className="awsui-util-help-panel-header">
            <h2>Scale Out Computing</h2>
            <br/>
            <p>This is the help section for budget page.</p>
            <p>Sample information for Budget section side bar help tools</p>
        </div>
        <ul className="awsui-list-unstyled">
            <li>
                <a href="https://docs.aws.amazon.com/solutions/latest/scale-out-computing-on-aws/welcome.html">
                    What is Scale Out Computing on AWS?
                </a>
            </li>
            <li>
                <a href="https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/">
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
);