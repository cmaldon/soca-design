/************************************************************************
                            DISCLAIMER

This is just a playground package. It does not comply with best practices
of using AWS-UI components. For production code, follow the integration
guidelines:

https://polaris.corp.amazon.com/getting_started/development/integration/
************************************************************************/
import React from 'react';
import ServiceNavigation from './ServiceNavigation.jsx';
const { AppLayout, Button, ColumnLayout, FormField, Icon, Select } = window['AWS-UI-Components-React'];

// Class ServiceHomepage is a skeleton of a service's homepage using AWS-UI React components.
export default class ServiceHomepage extends React.Component {
  render() {
    return (
      <AppLayout
        className="awsui-util-no-gutters"
        navigation={<ServiceNavigation />} // Navigation panel content imported from './ServiceNavigation.jsx'
        content={<Content />}
        contentType="default"
        navigationOpen={false}
        toolsHide={true}
      />
    );
  }
}

// The content in the main content area of the App layout
const Content = () => (
  <div className="awsui-grid awsui-util-p-s">
    <div className="custom-home__header custom-awsui-util-pt-xxxl awsui-row">
      <div className="col-xxs-12">
        <div className="awsui-row">
          <div className="custom-home__category col-xxs-10 offset-xxs-1 col-l-8 offset-l-2">
            High Performance Computing
          </div>
        </div>
        <div className="awsui-row">
          <div className="custom-home__header-title col-xxs-10 offset-xxs-1 col-s-6 col-l-5 offset-l-2 col-xl-6">
            <div className="awsui-text-large">
              <div>
                <strong>Scale Out Computing on AWS</strong>
              </div>
              <div>Deploy and operate your multiuser environment for compute intensive jobs</div>
            </div>
            <p>
              Scale Out Computing features a large selection of compute resources, fast network backbone, unlimited
              storage, and cost management directly integrated within AWS.
            </p>
          </div>

          <div className="col-xxs-10 offset-xxs-1 col-s-4 offset-s-0 col-l-3 col-xl-2">
            <div className="awsui-util-container awsui-util-mb-n">
              <h2>Create your cluster</h2>
              <p>Choose custom default settings or upload a custom machine image.  Go to your dashboard to get started.</p>
              <Button href="#/dashboard" variant="primary" text="Go to dashboard" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="awsui-util-pt-xxl awsui-row">
      <div className="col-xxs-10 offset-xxs-1 col-s-6 col-l-5 offset-l-2 col-xl-6">
        <h1>How it works</h1>
        <div className="awsui-util-container">
          <div className="custom-home-image__placeholder" />
        </div>

        <h1>Benefits and features</h1>
        <div className="awsui-util-container awsui-util-no-gutters">
          <div>
            <ColumnLayout columns={2} borders="vertical" className="awsui-util-no-gutters">
              <div data-awsui-column-layout-root={true} className="awsui-util-mv-l">
                <div className="awsui-util-ph-l awsui-util-mb-m">
                  <h3>Unlimited and On-Demand</h3>
                  <p>
                    Access to unlimited computing resources when you need them.
                  </p>
                </div>

                <div className="awsui-util-ph-l awsui-util-mb-m">
                  <h3>Customizable</h3>
                  <p>
                    Customize each different pipeline so you can process data faster.
                  </p>
                </div>
                <div className="awsui-util-ph-l awsui-util-mb-m">
                  <h3>Optimize costs</h3>
                  <p>
                    No server set up costs, deploy virtual machine instances and only pay for what you use.
                  </p>
                </div>
                <div className="awsui-util-ph-l awsui-util-mb-m">
                  <h3>Research faster</h3>
                  <p>
                    Spread out your analysis over thousands of compute rsources at once, no more waiting in the queue.
                  </p>
                </div>
                <div className="awsui-util-ph-l awsui-util-mb-m">
                  <h3>Reporting and analytics</h3>
                  <p>
                    Get detailed statistics reports, monitor your usage, track your
                    spending, and set alarms on operational metrics.
                  </p>
                </div>
                <div className="awsui-util-ph-l awsui-util-mb-m">
                  <h3>Self service portal</h3>
                  <p>
                    Log in, create a machine instance, upload your data, install your software, and start running your scripts.
                  </p>
                </div>
              </div>
            </ColumnLayout>
          </div>
        </div>

        <h1>Use cases</h1>
        <div className="awsui-util-container awsui-util-no-gutters">
          <div>
            <ColumnLayout columns={2} borders="vertical" className="awsui-util-no-gutters">
              <div data-awsui-column-layout-root={true} className="awsui-util-mv-l">
                <div className="awsui-util-ph-l awsui-util-mb-m">
                  <h3>DNA sequencing</h3>
                  <p>
                    Read about how a team of researchers use AWS to study genomics and learn
                    more about saving endangered animal species around the world.
                  </p>
                  <a href="javascript:void(0)">
                    Learn more <Icon name="external" />
                  </a>
                </div>
                <div className="awsui-util-ph-l awsui-util-mb-m">
                  <h3>Cancer research</h3>
                  <p>
                    Take a look at how a university used scale out computing on AWS to
                    study cancer cells in children and now their data research is saving lives.
                  </p>
                  <a href="javascript:void(0)">
                    Learn more <Icon name="external" />
                  </a>
                </div>


              </div>
            </ColumnLayout>
          </div>
        </div>


        <div className="awsui-util-container awsui-util-no-gutters">
          <div className="awsui-util-container-header">
            <h2>Related services</h2>
          </div>
          <div>
            <ColumnLayout columns={2} borders="vertical" className="awsui-util-no-gutters">
              <div data-awsui-column-layout-root={true} className="awsui-util-mv-l">
                <div className="awsui-util-ph-l awsui-util-mb-m">
                  <h3>
                    <a>Amazon S3</a>
                  </h3>
                  <p>Use Amazon S3 to store the content that CloudFront delivers.</p>
                </div>
                <div className="awsui-util-ph-l awsui-util-mb-m">
                  <h3>
                    <a>AWS Parallel Cluster</a>
                  </h3>
                  <p>Use Amazon AWS Parallel Cluster schedule instance fleet distribution.</p>
                </div>
              </div>
            </ColumnLayout>
          </div>
        </div>
      </div>

      <div className="custom-home__sidebar col-xxs-10 offset-xxs-1 col-s-4 offset-s-0 col-l-3 col-xl-2">
        <div className="awsui-util-container">
          <div className="awsui-util-container-header">
            <h2>Pricing (US)</h2>
          </div>
          <ColumnLayout borders="horizontal">
            <div data-awsui-column-layout-root="true">
              <div>
                <span>10 TB/month</span>
                <span className="awsui-text-secondary awsui-util-f-r">$0.085 per GB</span>
              </div>
              <div>
                <span>100 TB/month</span>
                <span className="awsui-text-secondary awsui-util-f-r">$0.065 per GB</span>
              </div>
              <div>
                <span>524 TB/month</span>
                <span className="awsui-text-secondary awsui-util-f-r">$0.035 per GB</span>
              </div>
              <div>
                <span>4 PB/month</span>
                <span className="awsui-text-secondary awsui-util-f-r">$0.025 per GB</span>
              </div>
              <a href="javascript:void(0)">
                Cost calculator <Icon name="external" />
              </a>
            </div>
          </ColumnLayout>
        </div>

        <div className="awsui-util-mt-xxl">
          <div className="awsui-util-container">
            <div className="awsui-util-container-header">
              <h2>Getting started</h2>
            </div>
            <ColumnLayout borders="horizontal">
              <div data-awsui-column-layout-root="true">
                <div>
                  <a href="https://awslabs.github.io/scale-out-computing-on-aws/">
                    What is Scale Out Computing?
                  </a>
                </div>
                <div>
                  <a href="https://github.com/awslabs/scale-out-computing-on-aws">
                    Documentation
                  </a>
                </div>
                <div>
                  <a href="https://awslabs.github.io/scale-out-computing-on-aws/FAQ/">
                    Help &amp; Support
                  </a>
                </div>
              </div>
            </ColumnLayout>
          </div>
        </div>

        <div className="awsui-util-mt-xxl">
          <div className="awsui-util-container">
            <div className="awsui-util-container-header">
              <h2>More resources</h2>
            </div>
            <ColumnLayout borders="horizontal">
              <div data-awsui-column-layout-root="true">
                <div>
                  <a href="https://awslabs.github.io/scale-out-computing-on-aws/">Documentation</a>
                </div>
                <div>
                  <a href="javascript:void(0)">FAQ</a>
                </div>
                <div>
                  <a href="javascript:void(0)">Workshops</a>
                </div>
                <div>
                  <a href="javascript:void(0)">Videos</a>
                </div>
              </div>
            </ColumnLayout>
          </div>
        </div>
      </div>
    </div>
  </div>
);
