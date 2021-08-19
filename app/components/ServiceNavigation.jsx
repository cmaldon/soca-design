import React from 'react';
import { withRouter } from 'react-router-dom';
const { SideNavigation } = window['AWS-UI-Components-React'];

// Class ServiceNavigation is the Side Navigation component that is used in BasicLayout, CreateForm, ServiceHomepage, and Table flows.
// Implement like this: <ServiceNavigation />
class ServiceNavigation extends React.Component {
  // If the provided link is empty, do not redirect pages
  onFollowHandler(ev) {
    ev.preventDefault();
    if (ev.detail.href) {
      this.props.history.push(ev.detail.href.substring(1));
    }
  }

  render() {
    return (
      <SideNavigation
        header={{ text: 'Scale Out Computing', href: '#/service-home' }}
        items={items}
        activeHref={`#${this.props.location.pathname}`}
        onFollow={this.onFollowHandler.bind(this)}
      />
    );
  }
}

const items = [
  { type: 'link', text: 'Dashboard', href: '#/dashboard' },
  {
    type: 'section',
    text: 'Projects',
    items: [
      { type: 'link', text: 'Projects', href: '#/table' },
      { type: 'link', text: 'Instances', href: '#/instances' },

    ]
  },
  {
    type: 'section',
    text: 'Admin',
    items: [
      { type: 'link', text: 'User management', href: '#/user-management' },
      { type: 'link', text: 'Budget', href: '#/budget' }
    ]
  }
];

export default withRouter(ServiceNavigation);
