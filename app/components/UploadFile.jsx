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
import { INPUT_OPTIONS, SUPPORTED_HTTP_VERSIONS_OPTIONS } from '../resources/form-config.jsx';
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
export default class UploadFile extends React.Component {
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
          Upload File
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
          <Button href="#/storage" variant="primary" text="Upload file" />
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
                  File origin
                  <a
                    className="awsui-util-help-info-link"
                    href="javascript:void(0);"
                    onClick={() => props.replaceToolsContent(4)}
                  >
                    Info
                  </a>
                </span>
              }
              description="Select which roles you want this user to have."
            >
              <Multiselect
                options={props.contentOrigins}
                placeholder="Select an S3 bucket or web server from which you want to get your content."
                filteringType="auto"
              />
            </FormField>
            <Button iconName="upload" text="Additional file options" />
          </div>
        </ColumnLayout>
      </FormSection>
      <FormSection header="File location">
        <ColumnLayout>
          <div data-awsui-column-layout-root={true}>
            <FormField
              label={
                <div>
                  Select which files you want to upload
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
            <FormField
              label="Path to files"
              description="The directory in your Amazon S3 bucket or your custom origin."
            >
              <Input placeholder="/files" />
            </FormField>
          </div>
        </ColumnLayout>
      </FormSection>
    </Form>
  </div>
);

// First form section
class ContentDeliveryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deliveryMethod: 'web' };
  }

  render() {
    return (
      <FormSection header="File settings">
        <FormField label="File ID" description="This value lets you distinguish multiple files from one another">
          <Input />
        </FormField>
        <AttributeEditor
          addButtonText="Choose file"
          removeButtonText="Remove file"
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
              control: item => <Input value={item.name} placeholder="example-file-name" />
            },
            {
              label: (
                <span>
                  File description<i> - optional</i>
                </span>
              ),
              control: item => <Input value={item.value} placeholder="example-file-description" />
            }
          ]}
        />
        {/* <Button iconName="upload" iconAlign="right" text="Choose file" /> */}
      </FormSection>
    );
  }
}

// Footer content (Additional configuration section) for form section
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

// Breadcrumb content
const Breadcrumbs = () => (
  <BreadcrumbGroup
    items={[
      {
        text: 'Dashboard',
        href: '#/dashboard'
      },
      {
        text: 'Storage',
        href: '#/storage'
      },
      {
        text: 'Upload file',
        href: '#/upload-file'
      }
    ]}
    activeHref="#/storage"
  />
);

// List of Help (right) panel content, changes depending on which 'info' link the user clicks on.
const Tools = [
  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">Upload files</div>
    <div className="awsui-util-help-panel-header">
      <p>Keep your project file information and permissions in order.</p>
      <br />
      <p>You can upload project files in this section.</p>
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
    <div className="awsui-util-help-panel-header">Uploading files</div>
    <h4>SSH</h4>
    <p>Connect using SSH access to connect remotely to another computer and upload files directly if you want to:</p>
    <p>Use the command line interface to make administrative changes to file content.</p>
    <h4 className="awsui-util-mt-m">Web browser</h4>
    <p>Upload file resources using the NICE DCV web browser interface.</p>
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
      <h2>Upload files</h2>
    </div>
    <div>
      <div>
        <h4>Uploading files</h4>
        <p>Select which files you want to upload.</p>
        <h4 className="awsui-util-mt-m">File origin</h4>
        <p>
          Choose this option if you want your users to access your content by using an alternate domain name, such as
          https://www.example.com/logo.jpg.
        </p>
      </div>
    </div>
  </div>,

  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">
      <h2>File location</h2>
    </div>
    <div>
      <p>
        Specify the permissions for your users - from which you want to get your web content. The dropdown list
        enumerates the AWS resources associated with the current AWS account.
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
