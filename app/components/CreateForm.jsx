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
  COOKIE_OPTIONS,
  CURRENT_COMPRESSION_OPTIONS,
  INPUT_OPTIONS,
  QUERY_STRING_OPTIONS,
  SUPPORTED_HTTP_VERSIONS_OPTIONS
} from '../resources/form-config.jsx';
const {
  AppLayout,
  AttributeEditor,
  BreadcrumbGroup,
  Button,
  Checkbox,
  ColumnLayout,
  ExpandableSection,
  Form,
  FormField,
  FormSection,
  Input,
  Multiselect,
  RadioGroup,
  Textarea
} = window['AWS-UI-Components-React'];
export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contentOrigins: [], toolsIndex: 0, toolsOpen: false };
  }
  componentDidMount() {
    let dataProvider = new DataProvider();
    dataProvider.getData('content-origins', contentOrigins => this.setState({ contentOrigins: contentOrigins }));
  }

  render() {
    return (
      <AppLayout
        navigation={<ServiceNavigation />} // Navigation panel content imported from './ServiceNavigation.jsx'
        breadcrumbs={<Breadcrumbs />}
        content={
          <Content
            // Changes the Help panel content when the user clicks an 'info' link
            replaceToolsContent={index => this.setState({ toolsIndex: index, toolsOpen: true })}
            contentOrigins={this.state.contentOrigins}
          />
        }
        contentType="form"
        tools={Tools[this.state.toolsIndex]}
        toolsOpen={this.state.toolsOpen}
      />
    );
  }
}

// The content in the main content area of the App layout
const Content = props => (
  <div>
    <Form
      header={
        <h1>
          Create project
          <a
            className="awsui-util-help-info-link"
            href="javascript:void(0);"
            onClick={() => props.replaceToolsContent(1)}
          >
            Info
          </a>
        </h1>
      }
      actions={
        // located at the bottom of the form
        <div>
          <Button variant="link" text="Cancel" />
          <Button href="#/table" variant="primary" text="Create project" />
        </div>
      }
    >
      <ContentDeliveryPanel replaceToolsContent={props.replaceToolsContent} />

      <FormSection header={<h2>Input data</h2>} footer={<DistributionsFooter />}>
        <ColumnLayout>
          <div data-awsui-column-layout-root={true}>
            <FormField
              label={
                <span>
                  Content origin
                  <a
                    className="awsui-util-help-info-link"
                    href="javascript:void(0);"
                    onClick={() => props.replaceToolsContent(4)}
                  >
                    Info
                  </a>
                </span>
              }
              description="The Amazon S3 bucket or web server from which you want to get your content."
            >
              <Multiselect
                options={props.contentOrigins}
                placeholder="Select an S3 bucket or web server from which you want to get your content."
                filteringType="auto"
              />
            </FormField>
            {/* <FormField
              label={
                <span>
                  Alternative domain names (CNAMEs)<i> - optional</i>
                  <a
                    className="awsui-util-help-info-link"
                    href="javascript:void(0);"
                    onClick={() => props.replaceToolsContent(3)}
                  >
                    Info
                  </a>
                </span>
              }
              description="You must list any custom domain names that you use in addition to the CloudFront domain name for the URLs for your files."
              hintText="Specify up to 100 CNAMEs separated with commas or put each on a new line."
              stretch={true}
            >
              <Textarea placeholder={'www.example1.com\nwww.example2.com'} />
            </FormField> */}
            {/* <FormField
              label={
                <span>
                  SSL/TLS certificate
                  <a
                    className="awsui-util-help-info-link"
                    href="javascript:void(0);"
                    onClick={() => props.replaceToolsContent(4)}
                  >
                    Info
                  </a>
                </span>
              }
              stretch={true}
            >
              <RadioGroup items={SSL_CERTIFICATE_OPTIONS} value="default" />
            </FormField> */}
            <Button text="Additional input option" />
          </div>
        </ColumnLayout>
      </FormSection>
      <FormSection header="Output data">
        <ColumnLayout>
          <div data-awsui-column-layout-root={true}>
            <FormField
              label={
                <div>
                  Choose output storage location
                  <a
                    className="awsui-util-help-info-link"
                    href="javascript:void(0);"
                    onClick={() => props.replaceToolsContent(5)}
                  >
                    Info
                  </a>
                </div>
              }
              description="The Amazon S3 bucket or web server from which you want to get your content."
            >
              <RadioGroup items={INPUT_OPTIONS} value="0" />
            </FormField>

            {/* <FormField
              label="Content origin (multiselect version)"
              description="The Amazon S3 bucket or web server from which you want to get your content."
            >
              <Multiselect
                options={props.contentOrigins}
                placeholder="Select an S3 bucket or web server from which you want to get your content."
                filteringType="auto"
              />
            </FormField> */}
            <FormField
              label="Path to files"
              description="The directory in your Amazon S3 bucket or your custom origin."
            >
              <Input placeholder="/files" />
            </FormField>
          </div>
        </ColumnLayout>
      </FormSection>

      {/* <FormSection header="Cache behavior settings" footer={<BehaviorsFooter />}>
        <ColumnLayout>
          <div data-awsui-column-layout-root={true}>
            <FormField label="Viewer protocol policy" stretch={true}>
              <RadioGroup items={VIEWER_PROTOCOL_POLICY_OPTIONS} value="0" />
            </FormField>
            <FormField label="Allowed HTTP methods" stretch={true}>
              <RadioGroup items={ALLOWED_HTTP_METHOD_OPTIONS} value="0" />
            </FormField>
            <FormField label="Forward headers" description="Cache your objects based on header values" stretch={true}>
              <RadioGroup items={FORWARD_HEADER_OPTIONS} value="none" />
            </FormField>
            <FormField label="Object caching" description="Cache your objects based on header values">
              <ColumnLayout columns={4}>
                <div data-awsui-column-layout-root={true}>
                  <FormField label="Minimum TTL">
                    <Input type="number" value="0" />
                  </FormField>
                  <FormField label="Maximum TTL">
                    <Input type="number" value="31536000" />
                  </FormField>
                  <FormField label="Default TTL">
                    <Input type="number" value="86400" />
                  </FormField>
                  <div className="custom-header">
                    <Button text="Set to default" />
                  </div>
                </div>
              </ColumnLayout>
            </FormField>
          </div>
        </ColumnLayout>
      </FormSection> */}
    </Form>
  </div>
);

// First form section titled 'Distribution content delivery'
class ContentDeliveryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deliveryMethod: 'web' };
  }

  render() {
    return (
      <FormSection header="Project settings">
        {/* <FormField
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
            value={this.state.deliveryMethod}
            onChange={e => this.setState({ deliveryMethod: e.detail.value })}
          />
        </FormField> */}

        <FormField label="Project ID" description="This value lets you distinguish multiple projects from one another">
          <Input />
        </FormField>
        <AttributeEditor
          addButtonText="Add header"
          removeButtonText="Remove header"
          items={[
            {
              name: '',
              value: ''
            }
          ]}
          definition={[
            {
              label: (
                <span>
                  Name
                  <a
                    className="awsui-util-help-info-link"
                    href="javascript:void(0);"
                    onClick={() => props.replaceToolsContent(6)}
                  >
                    Info
                  </a>
                </span>
              ),
              control: item => <Input value={item.name} placeholder="example-project-name" />
            },
            {
              label: (
                <span>
                  Project description<i> - optional</i>
                </span>
              ),
              control: item => <Input value={item.value} placeholder="example-project-description" />
            }
          ]}
        />
      </FormSection>
    );
  }
}

// Footer content (Additional configuration section) for 'Distribution settings' form section
const DistributionsFooter = () => (
  <ExpandableSection header="Additional configuration" variant="borderless">
    <ColumnLayout>
      <div data-awsui-column-layout-root={true}>
        <FormField
          label="Supported HTTP versions"
          description="Choose the version of the HTTP protocol that you want to accept for viewer requests."
          stretch={true}
        >
          <RadioGroup items={SUPPORTED_HTTP_VERSIONS_OPTIONS} value="http2" />
        </FormField>
        <FormField
          label="Root object"
          description="Type the name of the object that you want to return when a viewer request points to your root URL."
        >
          <Input />
        </FormField>
        <FormField label="Logging">
          <Checkbox label="Enable logging" />
        </FormField>
        <FormField label="IPv6">
          <Checkbox label="Enabled" />
        </FormField>
        <FormField label="Comment">
          <Textarea />
        </FormField>
      </div>
    </ColumnLayout>
  </ExpandableSection>
);

// Footer content (Additional configuration section) form section
const BehaviorsFooter = () => (
  <ExpandableSection header="Additional configuration" variant="borderless">
    <ColumnLayout>
      <div data-awsui-column-layout-root={true}>
        <div>
          <div className="awsui-util-label">Path pattern</div>
          <div>Default (*)</div>
        </div>
        <FormField
          label="Cookies"
          description="Include all user cookies in the request URLs that it forwards to your origin."
          stretch={true}
        >
          <RadioGroup items={COOKIE_OPTIONS} value="none" />
        </FormField>
        <FormField
          label="Query string forwarding and caching"
          description="Query string parameters you want CloudFront to forward to the origin."
          stretch={true}
        >
          <RadioGroup items={QUERY_STRING_OPTIONS} value="none" />
        </FormField>
        <FormField label="Smooth streaming">
          <Checkbox label="Enable Microsoft smooth streaming" />
        </FormField>
        <FormField label="Viewer access">
          <Checkbox label="Require signed URL or signed cookie" />
        </FormField>
        <FormField label="Content compression" stretch={true}>
          <RadioGroup items={CURRENT_COMPRESSION_OPTIONS} value="manual" />
        </FormField>
        <FormField
          label="Lambda function associations"
          description="A Lambda trigger causes a function to execute. For example, you can create a trigger that causes the function to execute when CloudFront receives a request from a viewer for a specific cache behavior you set up for your distribution."
          stretch={true}
        >
          <ColumnLayout columns={3}>
            <div data-awsui-column-layout-root={true}>
              <FormField label="Type">
                <Input />
              </FormField>
              <FormField label="ARN">
                <Input />
              </FormField>
              <div className="custom-header">
                <Button text="Add lambda" />
              </div>
            </div>
          </ColumnLayout>
        </FormField>
      </div>
    </ColumnLayout>
  </ExpandableSection>
);

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
        text: 'Projects',
        href: '#/table'
      },
      {
        text: 'Create project',
        href: '#/create'
      }
    ]}
    activeHref="#/table"
  />
);

// List of Help (right) panel content, changes depending on which 'info' link the user clicks on.
const Tools = [
  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">Create project</div>
    <div className="awsui-util-help-panel-header">
      <p>Keep your project research in order by naming each project and adding limits.</p>
      <br />
      <p>You can create projects in this section by naming it, adding usage and budget details.</p>
    </div>
    <ul className="awsui-list-unstyled">
      <li>
        <a href="https://awslabs.github.io/scale-out-computing-on-aws/" target="_blank">
          What is Scale Out Computing?
        </a>
      </li>
      <li>
        <a href="https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/" target="_blank">
          Getting started
        </a>
      </li>
      <li>
        <a href="https://docs.aws.amazon.com/solutions/latest/scale-out-computing-on-aws/welcome.html" target="_blank">
          View implementation guide
        </a>
      </li>
    </ul>
  </div>,

  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">Create a project</div>
    <h4>Web</h4>
    <p>Create a web distribution if you want to:</p>
    <p>
      Speed up distribution of static and dynamic content, for example .html, .css, .php and graphics files. Distribute
      media files using HTTP or HTTPS.
    </p>
    <p>Add, update or delete objects and submit data from web forms.</p>
    <p>Use live streaming to stream an event in real time.</p>
    <p>
      You store your files in an origin - either an Amazon S3 bucket or a web server. After you create the distribution,
      you can add more origins to the distributions.
    </p>
    <h4 className="awsui-util-mt-m">RTMP</h4>
    <p>
      Create an RTMP distribution to speed up distribution of your streaming media files using Adobe Flash Media
      Server's RTMP protocol. An RTMP distribution allows an end user to begin playing a media file before the file has
      finished downloading from a CloudFront edge location. Note the following:
    </p>
    <p>To create an RTMP distribution, you must store the media files in an Amazon S3 bucket.</p>
    <p>To use CloudFront live streaming, create a web distribution.</p>
  </div>,
  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">
      <h2>Price class</h2>
    </div>
    <p>
      Select the price class associated with the maximum price that you want to pay for CloudFront service. If you
      select a price class other than All, some of your users may experience higher latency.
    </p>
  </div>,

  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">
      <h2>Alternate domain names (CNAMEs)</h2>
    </div>
    <div>
      <p>
        You must list any custom domain names (for example, www.example.com) that you use in addition to the CloudFront
        domain name (for example, d1234.cloudfront.net) for the URLs for your files.
      </p>
      <p>
        Specify up to 100 CNAMEs separated with commas or put each on a new line. You also must create a CNAME record
        with your DNS service to route queries for www.example.com to d1234.cloudfront.net. For more information, see
        the <a href="">Help</a>.
      </p>
    </div>
  </div>,

  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">
      <h2>SSL certificate</h2>
    </div>
    <div>
      <div>
        <h4>Default CloudFront SSL certificate</h4>
        <p>
          Choose this option if you want your users to use HTTPS or HTTP to access your content with the CloudFront
          domain name (such as https://d111111abcdef8.cloudfront.net/logo.jpg).
        </p>
        <p>
          Important: If you choose this option, CloudFront requires that browsers or devices support TLSv1 or later to
          access your content.
        </p>
        <h4 className="awsui-util-mt-m">Custom SSL certificate</h4>
        <p>
          Choose this option if you want your users to access your content by using an alternate domain name, such as
          https://www.example.com/logo.jpg.
        </p>
        <p>
          You can use a certificate stored in AWS Certificate Manager (ACM) in the US East (N. Virginia) Region, or you
          can use a certificate stored in IAM.
        </p>
      </div>
    </div>
  </div>,

  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">
      <h2>Content origin</h2>
    </div>
    <div>
      <p>
        Specify the domain name for your origin - the Amazon S3 bucket or web server from which you want CloudFront to
        get your web content. The dropdown list enumerates the AWS resources associated with the current AWS account.
      </p>
      <p>
        To use a resource from a different AWS account, type the domain name of the resource. For example, for an Amazon
        S3 bucket, type the name in the format bucketname.s3.amazonaws.com. The files in your origin must be publicly
        readable.
      </p>
    </div>
  </div>,
  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">
      <h2>Custom header name</h2>
    </div>
    <p>Headers let you distinguish multiple origins in the same distribution from another.</p>
  </div>
];
