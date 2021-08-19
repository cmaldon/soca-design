/************************************************************************
                            DISCLAIMER

This is just a playground package. It does not comply with best practices
of using AWS-UI components. For production code, follow the integration
guidelines: 

https://polaris.corp.amazon.com/getting_started/development/integration/
************************************************************************/
import React from 'react';
import { Route } from 'react-router-dom';
import BobRossIntro from './BobRossIntro.jsx';
import Basic from './BasicLayout.jsx';
import ServiceHomepage from './ServiceHomepage.jsx';
import CreateForm from './CreateForm.jsx';
import TableView from './Table.jsx';
import Instances from './Instances.jsx';
import UserManagement from './User-management.jsx';
import Budget from './Budget.jsx';
import Dashboard from './Dashboard.jsx';
import LaunchInstance from './LaunchInstance.jsx';
import InstanceWizard from './InstanceWizard.jsx';

// Class App is the "output" generated on every build,
// it is what you will see on the webpage.
export default class App extends React.Component {
  render() {
    return (
      // When you create a new file or template, add it below
      // as a new 'Route' so you can link to it with a url.

      <div>
        <Route exact path="/" component={BobRossIntro} />
        <Route path="/basic" component={Basic} />
        <Route path="/service-home" component={ServiceHomepage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/create" component={CreateForm} />
        <Route path="/table" component={TableView} />
        <Route path="/instances" component={Instances} />
        <Route path="/user-management" component={UserManagement} />
        <Route path="/budget" component={Budget} />
        <Route path="/launch-instance" component={LaunchInstance} />
        <Route path="/instance-wizard" component={InstanceWizard} />

      </div>
    );
  }
}
