/************************************************************************
                            DISCLAIMER

This is just a playground package. It does not comply with best practices
of using AWS-UI components. For production code, follow the integration
guidelines:

https://polaris.corp.amazon.com/getting_started/development/integration/
************************************************************************/
import React from 'react';
import { Link } from 'react-router-dom';
const { AppLayout, SideNavigation } = window['AWS-UI-Components-React'];

// This is not meant to be a template, rather it is the
// introduction page that you see upon loading the webserver.
export default class BobRossIntro extends React.Component {
  render() {
    return (
      <div>
        <AppLayout
          className="awsui-util-no-gutters"
          navigation={<CustomNavigation />}
          content={<Content />}
          navigationOpen={true}
          tools={<Tools />}
          toolsHide={true}
        />
      </div>
    );
  }
}

const Content = () => (
  <div>
    <div className="awsui-grid awsui-util-p-s">
      <div className="custom-home__header custom-mlt-xxxl awsui-row">
        <div className="col-xxs-12 ">
          <div className="awsui-row">
            <div className="custom-home__category awsui-util-mb-xl">
              <img src="./images/bob_ross.jpg" className="intro-logo" alt="bob ross picture" />
            </div>
          </div>
          <div className="awsui-row">
            <div className="custom-home__header-title">
              <div className="awsui-text-large">
                <div>
                  <strong>Bob Ross 2.0</strong>
                </div>
                <div>design using AWS-UI React components</div>
              </div>
              <p>
                Bob Ross sets up a React development environment, provides you with templates of common pages, and gives
                you access to AWS-UI components without the hassle of Brazil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="awsui-util-m-xxl awsui-util-pv-l awsui-util-ph-l">
      <h1>How it works</h1>
      <div className="awsui-util-container">
        <div>
          <ol>
            <p>
              <li>
                Open this Bob Ross project in your favorite text editor, and take a look at the file structure.
                <br />
                <img src="./images/project_open_code.png" className="intro-screenshot" alt="screenshot" />
              </li>
            </p>
            <p>
              <li>
                Currently, you are viewing this page on your localhost as <a>localhost:3333/#/</a> because it is routed
                as the 'default' page. All of the included templates are already routed and included in the side
                navigation you see in the left panel of this page. The urls are defined in{' '}
                <code>app/components/App.jsx</code> (below right). You can learn more about <code>&lt;Routing&gt;</code>{' '}
                <a href="https://reacttraining.com/react-router/web/api/HashRouter">here</a>
                .
                <br />
                <div>
                  <img
                    src="./images/bob_ross_intro_web.png"
                    className="intro-screenshot intro-code-screenshot"
                    alt="screenshot"
                  />
                  <img src="./images/bob_ross_intro_code.png" className="intro-screenshot" alt="screenshot" />
                </div>
              </li>
            </p>
            <p>
              <li>
                Try viewing the service homepage template page (below) by adding "<strong>service-home</strong>" to the
                end of the url in your browser: <Link to="service-home">localhost:3333/#/service-home</Link>. When you
                hit enter you should be redirected to a new page showing the service homepage template.
                <br />
                <div>
                  <img
                    src="./images/service_homepage_web.png"
                    className="intro-screenshot intro-code-screenshot"
                    alt="screenshot"
                  />
                </div>
              </li>
            </p>
            <p>
              <li>
                Edit the service homepage template in the <code>ServiceHomepage.jsx</code> file.
                <br />
                Save your work to see the results on this page.
                <br />
                <img src="./images/service_homepage_file.png" className="intro-screenshot" alt="screenshot" />
              </li>
            </p>
          </ol>
        </div>
      </div>

      <h1>Benefits and features</h1>
      <div className="awsui-util-container">
        <div className="awsui-util-container-header">
          <h2>Included templates</h2>
        </div>
        <div>
          <h4>
            There are 4 templates already provided for you in the <code>app/components</code> folder:
          </h4>
          <ol>
            <li>
              <Link to="/basic">Basic app layout</Link>
            </li>
            <ul>
              <li>
                File name: <code>components/BasicLayout.jsx</code>
              </li>
              <li>
                Url route: <code>/basic</code>
              </li>
              <li>
                The simplest skeleton with just the{' '}
                <a href="https://polaris.corp.amazon.com/system/structures/components/awsui-app-layout/">app layout</a>{' '}
                and breadcrumb components.
              </li>
              <img src="./images/basic_app_layout.png" className="intro-screenshot" alt="screenshot" />
            </ul>
            <li>
              <Link to="/service-home">Service homepage</Link>
            </li>
            <ul>
              <li>
                File name: <code>components/ServiceHomepage.jsx</code>
              </li>
              <li>
                Url route: <code>/service-home</code>
              </li>
              <li>
                A working example of a{' '}
                <a href="https://polaris.corp.amazon.com/system/flows/service_homepage/">service homepage</a>,
                containing components such as: Column layout, Expandable section, Form field, Icon, Select.
              </li>
              <img src="./images/service_homepage_web.png" className="intro-screenshot" alt="screenshot" />
            </ul>
            <li>
              <Link to="/create">Single page create</Link>
            </li>
            <ul>
              <li>
                File name: <code>components/CreateForm.jsx</code>
              </li>
              <li>
                Url route: <code>/create</code>
              </li>
              <li>
                A full{' '}
                <a href="https://polaris.corp.amazon.com/system/flows/create/single_page_create/">single page create</a>{' '}
                form, containing components such as: Button, Checkbox, Column layout, Expandable section, Form, Form
                field, Form section, Input, Multiselect, Radio group/button, Select, and Textarea.
              </li>
              <img src="./images/create_form.png" className="intro-screenshot" alt="screenshot" />
            </ul>
            <li>
              <Link to="/table">Table view</Link>
            </li>
            <ul>
              <li>
                File name: <code>components/Table.jsx</code>
              </li>
              <li>
                Url route: <code>/table</code>
              </li>
              <li>
                A working <a href="https://polaris.corp.amazon.com/system/flows/view/table_view/">table view</a>{' '}
                example, containing components such as: Button, Flash, Table, Table content selector, Table filtering,
                Table page size selector, Table pagination, Table preferences, Table selection, Table sorting, Table
                wrap lines, Form field, Radio group.
              </li>
              <img src="./images/table.png" className="intro-screenshot" alt="screenshot" />
            </ul>
          </ol>
        </div>
      </div>
    </div>
  </div>
);

const CustomNavigation = () => (
  <SideNavigation
    header={{ text: 'Navigation panel', href: '#/' }}
    items={[
      {
        type: 'section',
        text: 'My pages',
        expanded: true,
        items: [
          { type: 'link', text: 'Bob Ross intro', href: '#/' },
          { type: 'link', text: 'Basic layout', href: '#/basic' },
          { type: 'link', text: 'Service homepage', href: '#/service-home' },
          { type: 'link', text: 'Single page create', href: '#/create' },
          { type: 'link', text: 'Table view', href: '#/table' }
        ]
      }
    ]}
    activeHref="#/"
  />
);

const Tools = () => (
  <div className="awsui-util-help-panel">
    <div className="awsui-util-help-panel-header">
      <h2>Help panel</h2>
    </div>
    <p>Help content goes here</p>
  </div>
);
