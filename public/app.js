(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _BobRossIntro = require('./BobRossIntro.jsx');

var _BobRossIntro2 = _interopRequireDefault(_BobRossIntro);

var _BasicLayout = require('./BasicLayout.jsx');

var _BasicLayout2 = _interopRequireDefault(_BasicLayout);

var _ServiceHomepage = require('./ServiceHomepage.jsx');

var _ServiceHomepage2 = _interopRequireDefault(_ServiceHomepage);

var _CreateForm = require('./CreateForm.jsx');

var _CreateForm2 = _interopRequireDefault(_CreateForm);

var _Table = require('./Table.jsx');

var _Table2 = _interopRequireDefault(_Table);

var _Instances = require('./Instances.jsx');

var _Instances2 = _interopRequireDefault(_Instances);

var _UserManagement = require('./User-management.jsx');

var _UserManagement2 = _interopRequireDefault(_UserManagement);

var _Budget = require('./Budget.jsx');

var _Budget2 = _interopRequireDefault(_Budget);

var _Dashboard = require('./Dashboard.jsx');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _LaunchInstance = require('./LaunchInstance.jsx');

var _LaunchInstance2 = _interopRequireDefault(_LaunchInstance);

var _InstanceWizard = require('./InstanceWizard.jsx');

var _InstanceWizard2 = _interopRequireDefault(_InstanceWizard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This is just a playground package. It does not comply with best practices
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of using AWS-UI components. For production code, follow the integration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               guidelines: 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://polaris.corp.amazon.com/getting_started/development/integration/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ************************************************************************/


// Class App is the "output" generated on every build,
// it is what you will see on the webpage.
var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return (
        // When you create a new file or template, add it below
        // as a new 'Route' so you can link to it with a url.

        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _BobRossIntro2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/basic', component: _BasicLayout2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/service-home', component: _ServiceHomepage2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/dashboard', component: _Dashboard2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/create', component: _CreateForm2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/table', component: _Table2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/instances', component: _Instances2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/user-management', component: _UserManagement2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/budget', component: _Budget2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/launch-instance', component: _LaunchInstance2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/instance-wizard', component: _InstanceWizard2.default })
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
});

;require.register("components/BasicLayout.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ServiceNavigation = require('./ServiceNavigation.jsx');

var _ServiceNavigation2 = _interopRequireDefault(_ServiceNavigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This is just a playground package. It does not comply with best practices
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of using AWS-UI components. For production code, follow the integration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               guidelines:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://polaris.corp.amazon.com/getting_started/development/integration/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ************************************************************************/


var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    BreadcrumbGroup = _window$AWSUICompon.BreadcrumbGroup;

// Class Basic is a skeleton of the basic App layout using AWS-UI React components.

var Basic = function (_React$Component) {
  _inherits(Basic, _React$Component);

  function Basic() {
    _classCallCheck(this, Basic);

    return _possibleConstructorReturn(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).apply(this, arguments));
  }

  _createClass(Basic, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(AppLayout, {
        navigation: _react2.default.createElement(_ServiceNavigation2.default, null) // Navigation panel content imported from './ServiceNavigation.jsx'
        , breadcrumbs: _react2.default.createElement(Breadcrumbs, null) // Breadcrumbs element defined below
        , content: _react2.default.createElement(Content, null) // Main content on the page, defined below
        , contentType: 'default' // Sets default app layout settings for widths
        , tools: Tools // Tools panel content defined below
      });
    }
  }]);

  return Basic;
}(_react2.default.Component);

// Breadcrumb content


exports.default = Basic;
var Breadcrumbs = function Breadcrumbs() {
  return _react2.default.createElement(BreadcrumbGroup, {
    items: [{
      text: 'Scale Out Computing',
      href: '#/service-home'
    }, {
      text: 'Dashboard',
      href: '#/dashboard'
    }]
  });
};

// Main content area (fill it in with components!)
var Content = function Content() {
  return _react2.default.createElement(
    'div',
    null,
    ' '
  );
};

// Help panel content
var Tools = _react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    _react2.default.createElement(
      'h2',
      null,
      'Scale Out Computing'
    )
  ),
  _react2.default.createElement(
    'ul',
    { className: 'awsui-list-unstyled' },
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://docs.aws.amazon.com/solutions/latest/scale-out-computing-on-aws/welcome.html' },
        'What is Scale Out Computing on AWS?'
      )
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/' },
        'Getting started'
      )
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc' },
        'Working with instances'
      )
    )
  )
);
});

require.register("components/BobRossIntro.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This is just a playground package. It does not comply with best practices
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of using AWS-UI components. For production code, follow the integration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               guidelines:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://polaris.corp.amazon.com/getting_started/development/integration/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ************************************************************************/


var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    SideNavigation = _window$AWSUICompon.SideNavigation;

// This is not meant to be a template, rather it is the
// introduction page that you see upon loading the webserver.

var BobRossIntro = function (_React$Component) {
  _inherits(BobRossIntro, _React$Component);

  function BobRossIntro() {
    _classCallCheck(this, BobRossIntro);

    return _possibleConstructorReturn(this, (BobRossIntro.__proto__ || Object.getPrototypeOf(BobRossIntro)).apply(this, arguments));
  }

  _createClass(BobRossIntro, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(AppLayout, {
          className: 'awsui-util-no-gutters',
          navigation: _react2.default.createElement(CustomNavigation, null),
          content: _react2.default.createElement(Content, null),
          navigationOpen: true,
          tools: _react2.default.createElement(Tools, null),
          toolsHide: true
        })
      );
    }
  }]);

  return BobRossIntro;
}(_react2.default.Component);

exports.default = BobRossIntro;


var Content = function Content() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'awsui-grid awsui-util-p-s' },
      _react2.default.createElement(
        'div',
        { className: 'custom-home__header custom-mlt-xxxl awsui-row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xxs-12 ' },
          _react2.default.createElement(
            'div',
            { className: 'awsui-row' },
            _react2.default.createElement(
              'div',
              { className: 'custom-home__category awsui-util-mb-xl' },
              _react2.default.createElement('img', { src: './images/bob_ross.jpg', className: 'intro-logo', alt: 'bob ross picture' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'awsui-row' },
            _react2.default.createElement(
              'div',
              { className: 'custom-home__header-title' },
              _react2.default.createElement(
                'div',
                { className: 'awsui-text-large' },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Bob Ross 2.0'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  'design using AWS-UI React components'
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                'Bob Ross sets up a React development environment, provides you with templates of common pages, and gives you access to AWS-UI components without the hassle of Brazil.'
              )
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'awsui-util-m-xxl awsui-util-pv-l awsui-util-ph-l' },
      _react2.default.createElement(
        'h1',
        null,
        'How it works'
      ),
      _react2.default.createElement(
        'div',
        { className: 'awsui-util-container' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'ol',
            null,
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'li',
                null,
                'Open this Bob Ross project in your favorite text editor, and take a look at the file structure.',
                _react2.default.createElement('br', null),
                _react2.default.createElement('img', { src: './images/project_open_code.png', className: 'intro-screenshot', alt: 'screenshot' })
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'li',
                null,
                'Currently, you are viewing this page on your localhost as ',
                _react2.default.createElement(
                  'a',
                  null,
                  'localhost:3333/#/'
                ),
                ' because it is routed as the \'default\' page. All of the included templates are already routed and included in the side navigation you see in the left panel of this page. The urls are defined in',
                ' ',
                _react2.default.createElement(
                  'code',
                  null,
                  'app/components/App.jsx'
                ),
                ' (below right). You can learn more about ',
                _react2.default.createElement(
                  'code',
                  null,
                  '<Routing>'
                ),
                ' ',
                _react2.default.createElement(
                  'a',
                  { href: 'https://reacttraining.com/react-router/web/api/HashRouter' },
                  'here'
                ),
                '.',
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement('img', {
                    src: './images/bob_ross_intro_web.png',
                    className: 'intro-screenshot intro-code-screenshot',
                    alt: 'screenshot'
                  }),
                  _react2.default.createElement('img', { src: './images/bob_ross_intro_code.png', className: 'intro-screenshot', alt: 'screenshot' })
                )
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'li',
                null,
                'Try viewing the service homepage template page (below) by adding "',
                _react2.default.createElement(
                  'strong',
                  null,
                  'service-home'
                ),
                '" to the end of the url in your browser: ',
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: 'service-home' },
                  'localhost:3333/#/service-home'
                ),
                '. When you hit enter you should be redirected to a new page showing the service homepage template.',
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement('img', {
                    src: './images/service_homepage_web.png',
                    className: 'intro-screenshot intro-code-screenshot',
                    alt: 'screenshot'
                  })
                )
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'li',
                null,
                'Edit the service homepage template in the ',
                _react2.default.createElement(
                  'code',
                  null,
                  'ServiceHomepage.jsx'
                ),
                ' file.',
                _react2.default.createElement('br', null),
                'Save your work to see the results on this page.',
                _react2.default.createElement('br', null),
                _react2.default.createElement('img', { src: './images/service_homepage_file.png', className: 'intro-screenshot', alt: 'screenshot' })
              )
            )
          )
        )
      ),
      _react2.default.createElement(
        'h1',
        null,
        'Benefits and features'
      ),
      _react2.default.createElement(
        'div',
        { className: 'awsui-util-container' },
        _react2.default.createElement(
          'div',
          { className: 'awsui-util-container-header' },
          _react2.default.createElement(
            'h2',
            null,
            'Included templates'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'There are 4 templates already provided for you in the ',
            _react2.default.createElement(
              'code',
              null,
              'app/components'
            ),
            ' folder:'
          ),
          _react2.default.createElement(
            'ol',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/basic' },
                'Basic app layout'
              )
            ),
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                'File name: ',
                _react2.default.createElement(
                  'code',
                  null,
                  'components/BasicLayout.jsx'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'Url route: ',
                _react2.default.createElement(
                  'code',
                  null,
                  '/basic'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'The simplest skeleton with just the',
                ' ',
                _react2.default.createElement(
                  'a',
                  { href: 'https://polaris.corp.amazon.com/system/structures/components/awsui-app-layout/' },
                  'app layout'
                ),
                ' ',
                'and breadcrumb components.'
              ),
              _react2.default.createElement('img', { src: './images/basic_app_layout.png', className: 'intro-screenshot', alt: 'screenshot' })
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/service-home' },
                'Service homepage'
              )
            ),
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                'File name: ',
                _react2.default.createElement(
                  'code',
                  null,
                  'components/ServiceHomepage.jsx'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'Url route: ',
                _react2.default.createElement(
                  'code',
                  null,
                  '/service-home'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'A working example of a',
                ' ',
                _react2.default.createElement(
                  'a',
                  { href: 'https://polaris.corp.amazon.com/system/flows/service_homepage/' },
                  'service homepage'
                ),
                ', containing components such as: Column layout, Expandable section, Form field, Icon, Select.'
              ),
              _react2.default.createElement('img', { src: './images/service_homepage_web.png', className: 'intro-screenshot', alt: 'screenshot' })
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/create' },
                'Single page create'
              )
            ),
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                'File name: ',
                _react2.default.createElement(
                  'code',
                  null,
                  'components/CreateForm.jsx'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'Url route: ',
                _react2.default.createElement(
                  'code',
                  null,
                  '/create'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'A full',
                ' ',
                _react2.default.createElement(
                  'a',
                  { href: 'https://polaris.corp.amazon.com/system/flows/create/single_page_create/' },
                  'single page create'
                ),
                ' ',
                'form, containing components such as: Button, Checkbox, Column layout, Expandable section, Form, Form field, Form section, Input, Multiselect, Radio group/button, Select, and Textarea.'
              ),
              _react2.default.createElement('img', { src: './images/create_form.png', className: 'intro-screenshot', alt: 'screenshot' })
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/table' },
                'Table view'
              )
            ),
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                'File name: ',
                _react2.default.createElement(
                  'code',
                  null,
                  'components/Table.jsx'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'Url route: ',
                _react2.default.createElement(
                  'code',
                  null,
                  '/table'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                'A working ',
                _react2.default.createElement(
                  'a',
                  { href: 'https://polaris.corp.amazon.com/system/flows/view/table_view/' },
                  'table view'
                ),
                ' ',
                'example, containing components such as: Button, Flash, Table, Table content selector, Table filtering, Table page size selector, Table pagination, Table preferences, Table selection, Table sorting, Table wrap lines, Form field, Radio group.'
              ),
              _react2.default.createElement('img', { src: './images/table.png', className: 'intro-screenshot', alt: 'screenshot' })
            )
          )
        )
      )
    )
  );
};

var CustomNavigation = function CustomNavigation() {
  return _react2.default.createElement(SideNavigation, {
    header: { text: 'Navigation panel', href: '#/' },
    items: [{
      type: 'section',
      text: 'My pages',
      expanded: true,
      items: [{ type: 'link', text: 'Bob Ross intro', href: '#/' }, { type: 'link', text: 'Basic layout', href: '#/basic' }, { type: 'link', text: 'Service homepage', href: '#/service-home' }, { type: 'link', text: 'Single page create', href: '#/create' }, { type: 'link', text: 'Table view', href: '#/table' }]
    }],
    activeHref: '#/'
  });
};

var Tools = function Tools() {
  return _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
      'div',
      { className: 'awsui-util-help-panel-header' },
      _react2.default.createElement(
        'h2',
        null,
        'Help panel'
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      'Help content goes here'
    )
  );
};
});

require.register("components/Budget.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ServiceNavigation = require('./ServiceNavigation.jsx');

var _ServiceNavigation2 = _interopRequireDefault(_ServiceNavigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This is just a playground package. It does not comply with best practices
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of using AWS-UI components. For production code, follow the integration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               guidelines:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://polaris.corp.amazon.com/getting_started/development/integration/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ************************************************************************/


var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    BreadcrumbGroup = _window$AWSUICompon.BreadcrumbGroup;

// Class Basic is a skeleton of the basic App layout using AWS-UI React components.

var Budget = function (_React$Component) {
    _inherits(Budget, _React$Component);

    function Budget() {
        _classCallCheck(this, Budget);

        return _possibleConstructorReturn(this, (Budget.__proto__ || Object.getPrototypeOf(Budget)).apply(this, arguments));
    }

    _createClass(Budget, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(AppLayout, {
                navigation: _react2.default.createElement(_ServiceNavigation2.default, null) // Navigation panel content imported from './ServiceNavigation.jsx'
                , breadcrumbs: _react2.default.createElement(Breadcrumbs, null) // Breadcrumbs element defined below
                , content: _react2.default.createElement(Content, null) // Main content on the page, defined below
                , contentType: 'default' // Sets default app layout settings for widths
                , tools: Tools // Tools panel content defined below
            });
        }
    }]);

    return Budget;
}(_react2.default.Component);

// Breadcrumb content


exports.default = Budget;
var Breadcrumbs = function Breadcrumbs() {
    return _react2.default.createElement(BreadcrumbGroup, {
        items: [{
            text: 'Scale Out Computing',
            href: '#/service-home'
        }, {
            text: 'Dashboard',
            href: '#/dashboard'
        }, {
            text: 'Budget',
            href: '#/budget'
        }]
    });
};

// Main content area (fill it in with components!)
var Content = function Content() {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'h2',
            null,
            'Budget'
        ),
        _react2.default.createElement(
            'p',
            null,
            'Hello from p in div'
        )
    );
};

// Help panel content
var Tools = _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
        'div',
        { className: 'awsui-util-help-panel-header' },
        _react2.default.createElement(
            'h2',
            null,
            'Scale Out Computing'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
            'p',
            null,
            'This is the help section for budget page.'
        ),
        _react2.default.createElement(
            'p',
            null,
            'Sample information for Budget section side bar help tools'
        )
    ),
    _react2.default.createElement(
        'ul',
        { className: 'awsui-list-unstyled' },
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://docs.aws.amazon.com/solutions/latest/scale-out-computing-on-aws/welcome.html' },
                'What is Scale Out Computing on AWS?'
            )
        ),
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/' },
                'Getting started'
            )
        ),
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc' },
                'Working with instances'
            )
        )
    )
);
});

require.register("components/CreateForm.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dataProvider = require('../resources/data-provider');

var _dataProvider2 = _interopRequireDefault(_dataProvider);

var _ServiceNavigation = require('./ServiceNavigation.jsx');

var _ServiceNavigation2 = _interopRequireDefault(_ServiceNavigation);

var _formConfig = require('../resources/form-config.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This is just a playground package. It does not comply with best practices
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of using AWS-UI components. For production code, follow the integration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               guidelines:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://polaris.corp.amazon.com/getting_started/development/integration/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ************************************************************************/


var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    AttributeEditor = _window$AWSUICompon.AttributeEditor,
    BreadcrumbGroup = _window$AWSUICompon.BreadcrumbGroup,
    Button = _window$AWSUICompon.Button,
    Checkbox = _window$AWSUICompon.Checkbox,
    ColumnLayout = _window$AWSUICompon.ColumnLayout,
    ExpandableSection = _window$AWSUICompon.ExpandableSection,
    Form = _window$AWSUICompon.Form,
    FormField = _window$AWSUICompon.FormField,
    FormSection = _window$AWSUICompon.FormSection,
    Input = _window$AWSUICompon.Input,
    Multiselect = _window$AWSUICompon.Multiselect,
    RadioGroup = _window$AWSUICompon.RadioGroup,
    Select = _window$AWSUICompon.Select,
    Textarea = _window$AWSUICompon.Textarea,
    Tiles = _window$AWSUICompon.Tiles;

// Class CreateForm is a skeleton of a Single page create form using AWS-UI React components.

var CreateForm = function (_React$Component) {
  _inherits(CreateForm, _React$Component);

  function CreateForm(props) {
    _classCallCheck(this, CreateForm);

    var _this = _possibleConstructorReturn(this, (CreateForm.__proto__ || Object.getPrototypeOf(CreateForm)).call(this, props));

    _this.state = { contentOrigins: [], toolsIndex: 0, toolsOpen: false };
    return _this;
  }

  _createClass(CreateForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var dataProvider = new _dataProvider2.default();
      dataProvider.getData('content-origins', function (contentOrigins) {
        return _this2.setState({ contentOrigins: contentOrigins });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(AppLayout, {
        navigation: _react2.default.createElement(_ServiceNavigation2.default, null) // Navigation panel content imported from './ServiceNavigation.jsx'
        , breadcrumbs: _react2.default.createElement(Breadcrumbs, null),
        content: _react2.default.createElement(Content
        // Changes the Help panel content when the user clicks an 'info' link
        , { replaceToolsContent: function replaceToolsContent(index) {
            return _this3.setState({ toolsIndex: index, toolsOpen: true });
          },
          contentOrigins: this.state.contentOrigins
        }),
        contentType: 'form',
        tools: Tools[this.state.toolsIndex],
        toolsOpen: this.state.toolsOpen
      });
    }
  }]);

  return CreateForm;
}(_react2.default.Component);

// The content in the main content area of the App layout


exports.default = CreateForm;
var Content = function Content(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      Form,
      {
        header: _react2.default.createElement(
          'h1',
          null,
          'Create project'
        ),
        actions:
        // located at the bottom of the form
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(Button, { variant: 'link', text: 'Cancel' }),
          _react2.default.createElement(Button, { href: '#/table', variant: 'primary', text: 'Create project' })
        )
      },
      _react2.default.createElement(ContentDeliveryPanel, { replaceToolsContent: props.replaceToolsContent }),
      _react2.default.createElement(
        FormSection,
        { header: _react2.default.createElement(
            'h2',
            null,
            'Distribution settings'
          ), footer: _react2.default.createElement(DistributionsFooter, null) },
        _react2.default.createElement(
          ColumnLayout,
          null,
          _react2.default.createElement(
            'div',
            { 'data-awsui-column-layout-root': true },
            _react2.default.createElement(
              FormField,
              {
                label: _react2.default.createElement(
                  'span',
                  null,
                  'Price class',
                  _react2.default.createElement(
                    'a',
                    {
                      className: 'awsui-util-help-info-link',
                      href: 'javascript:void(0);',
                      onClick: function onClick() {
                        return props.replaceToolsContent(2);
                      }
                    },
                    'Info'
                  )
                ),
                stretch: true
              },
              _react2.default.createElement(RadioGroup, { items: _formConfig.PRICE_CLASS_OPTIONS, value: '0' })
            ),
            _react2.default.createElement(
              FormField,
              {
                label: _react2.default.createElement(
                  'span',
                  null,
                  'Alternative domain names (CNAMEs)',
                  _react2.default.createElement(
                    'i',
                    null,
                    ' - optional'
                  ),
                  _react2.default.createElement(
                    'a',
                    {
                      className: 'awsui-util-help-info-link',
                      href: 'javascript:void(0);',
                      onClick: function onClick() {
                        return props.replaceToolsContent(3);
                      }
                    },
                    'Info'
                  )
                ),
                description: 'You must list any custom domain names that you use in addition to the CloudFront domain name for the URLs for your files.',
                hintText: 'Specify up to 100 CNAMEs separated with commas or put each on a new line.',
                stretch: true
              },
              _react2.default.createElement(Textarea, { placeholder: 'www.example1.com\nwww.example2.com' })
            ),
            _react2.default.createElement(
              FormField,
              {
                label: _react2.default.createElement(
                  'span',
                  null,
                  'SSL/TLS certificate',
                  _react2.default.createElement(
                    'a',
                    {
                      className: 'awsui-util-help-info-link',
                      href: 'javascript:void(0);',
                      onClick: function onClick() {
                        return props.replaceToolsContent(4);
                      }
                    },
                    'Info'
                  )
                ),
                stretch: true
              },
              _react2.default.createElement(RadioGroup, { items: _formConfig.SSL_CERTIFICATE_OPTIONS, value: 'default' })
            ),
            _react2.default.createElement(Button, { text: 'Request or import a certificate with AWS Certificate Manager (ACM)' })
          )
        )
      ),
      _react2.default.createElement(
        FormSection,
        { header: 'Origin settings' },
        _react2.default.createElement(
          ColumnLayout,
          null,
          _react2.default.createElement(
            'div',
            { 'data-awsui-column-layout-root': true },
            _react2.default.createElement(
              FormField,
              {
                label: _react2.default.createElement(
                  'div',
                  null,
                  'Content origin',
                  _react2.default.createElement(
                    'a',
                    {
                      className: 'awsui-util-help-info-link',
                      href: 'javascript:void(0);',
                      onClick: function onClick() {
                        return props.replaceToolsContent(5);
                      }
                    },
                    'Info'
                  )
                ),
                description: 'The Amazon S3 bucket or web server from which you want CloudFront to get your web content.'
              },
              _react2.default.createElement(Select, {
                options: props.contentOrigins,
                placeholder: 'Select an S3 bucket or web server from which you want CloudFront to get your web content.',
                filteringType: 'auto'
              })
            ),
            _react2.default.createElement(
              FormField,
              {
                label: 'Content origin (multiselect version)',
                description: 'The Amazon S3 bucket or web server from which you want CloudFront to get your web content.'
              },
              _react2.default.createElement(Multiselect, {
                options: props.contentOrigins,
                placeholder: 'Select an S3 bucket or web server from which you want CloudFront to get your web content.',
                filteringType: 'auto'
              })
            ),
            _react2.default.createElement(
              FormField,
              {
                label: 'Path to content',
                description: 'The directory in your Amazon S3 bucket or your custom origin.'
              },
              _react2.default.createElement(Input, { placeholder: '/images' })
            ),
            _react2.default.createElement(
              FormField,
              {
                label: 'Origin ID',
                description: 'This value lets you distinguish multiple origins in the same distribution from one another'
              },
              _react2.default.createElement(Input, null)
            ),
            _react2.default.createElement(AttributeEditor, {
              addButtonText: 'Add header',
              removeButtonText: 'Remove header',
              items: [{
                name: '',
                value: ''
              }],
              definition: [{
                label: _react2.default.createElement(
                  'span',
                  null,
                  'Custom header name',
                  _react2.default.createElement(
                    'a',
                    {
                      className: 'awsui-util-help-info-link',
                      href: 'javascript:void(0);',
                      onClick: function onClick() {
                        return props.replaceToolsContent(6);
                      }
                    },
                    'Info'
                  )
                ),
                control: function control(item) {
                  return _react2.default.createElement(Input, { value: item.name, placeholder: 'Location' });
                }
              }, {
                label: _react2.default.createElement(
                  'span',
                  null,
                  'Custom header value',
                  _react2.default.createElement(
                    'i',
                    null,
                    ' - optional'
                  )
                ),
                control: function control(item) {
                  return _react2.default.createElement(Input, { value: item.value, placeholder: 'Germany' });
                }
              }]
            })
          )
        )
      ),
      _react2.default.createElement(
        FormSection,
        { header: 'Cache behavior settings', footer: _react2.default.createElement(BehaviorsFooter, null) },
        _react2.default.createElement(
          ColumnLayout,
          null,
          _react2.default.createElement(
            'div',
            { 'data-awsui-column-layout-root': true },
            _react2.default.createElement(
              FormField,
              { label: 'Viewer protocol policy', stretch: true },
              _react2.default.createElement(RadioGroup, { items: _formConfig.VIEWER_PROTOCOL_POLICY_OPTIONS, value: '0' })
            ),
            _react2.default.createElement(
              FormField,
              { label: 'Allowed HTTP methods', stretch: true },
              _react2.default.createElement(RadioGroup, { items: _formConfig.ALLOWED_HTTP_METHOD_OPTIONS, value: '0' })
            ),
            _react2.default.createElement(
              FormField,
              { label: 'Forward headers', description: 'Cache your objects based on header values', stretch: true },
              _react2.default.createElement(RadioGroup, { items: _formConfig.FORWARD_HEADER_OPTIONS, value: 'none' })
            ),
            _react2.default.createElement(
              FormField,
              { label: 'Object caching', description: 'Cache your objects based on header values' },
              _react2.default.createElement(
                ColumnLayout,
                { columns: 4 },
                _react2.default.createElement(
                  'div',
                  { 'data-awsui-column-layout-root': true },
                  _react2.default.createElement(
                    FormField,
                    { label: 'Minimum TTL' },
                    _react2.default.createElement(Input, { type: 'number', value: '0' })
                  ),
                  _react2.default.createElement(
                    FormField,
                    { label: 'Maximum TTL' },
                    _react2.default.createElement(Input, { type: 'number', value: '31536000' })
                  ),
                  _react2.default.createElement(
                    FormField,
                    { label: 'Default TTL' },
                    _react2.default.createElement(Input, { type: 'number', value: '86400' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'custom-header' },
                    _react2.default.createElement(Button, { text: 'Set to default' })
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};

// First form section titled 'Distribution content delivery'

var ContentDeliveryPanel = function (_React$Component2) {
  _inherits(ContentDeliveryPanel, _React$Component2);

  function ContentDeliveryPanel(props) {
    _classCallCheck(this, ContentDeliveryPanel);

    var _this4 = _possibleConstructorReturn(this, (ContentDeliveryPanel.__proto__ || Object.getPrototypeOf(ContentDeliveryPanel)).call(this, props));

    _this4.state = { deliveryMethod: 'web' };
    return _this4;
  }

  _createClass(ContentDeliveryPanel, [{
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement(
        FormSection,
        { header: 'Distribution content delivery' },
        _react2.default.createElement(
          FormField,
          {
            label: _react2.default.createElement(
              'div',
              null,
              'Delivery method',
              _react2.default.createElement(
                'a',
                {
                  className: 'awsui-util-help-info-link',
                  href: 'javascript:void(0);',
                  onClick: function onClick() {
                    return _this5.props.replaceToolsContent(1);
                  }
                },
                'Info'
              )
            ),
            stretch: true
          },
          _react2.default.createElement(Tiles, {
            items: _formConfig.DELIVERY_METHOD,
            value: this.state.deliveryMethod,
            onChange: function onChange(e) {
              return _this5.setState({ deliveryMethod: e.detail.value });
            }
          })
        )
      );
    }
  }]);

  return ContentDeliveryPanel;
}(_react2.default.Component);

// Footer content (Additional configuration section) for 'Distribution settings' form section


var DistributionsFooter = function DistributionsFooter() {
  return _react2.default.createElement(
    ExpandableSection,
    { header: 'Additional configuration', variant: 'borderless' },
    _react2.default.createElement(
      ColumnLayout,
      null,
      _react2.default.createElement(
        'div',
        { 'data-awsui-column-layout-root': true },
        _react2.default.createElement(
          FormField,
          {
            label: 'Supported HTTP versions',
            description: 'Choose the version of the HTTP protocol that you want CloudFront to accept for viewer requests.',
            stretch: true
          },
          _react2.default.createElement(RadioGroup, { items: _formConfig.SUPPORTED_HTTP_VERSIONS_OPTIONS, value: 'http2' })
        ),
        _react2.default.createElement(
          FormField,
          {
            label: 'Root object',
            description: 'Type the name of the object that you want CloudFront to return when a viewer request points to your root URL.'
          },
          _react2.default.createElement(Input, null)
        ),
        _react2.default.createElement(
          FormField,
          { label: 'Logging' },
          _react2.default.createElement(Checkbox, { label: 'Enable logging' })
        ),
        _react2.default.createElement(
          FormField,
          { label: 'IPv6' },
          _react2.default.createElement(Checkbox, { label: 'Enabled' })
        ),
        _react2.default.createElement(
          FormField,
          { label: 'Comment' },
          _react2.default.createElement(Textarea, null)
        )
      )
    )
  );
};

// Footer content (Additional configuration section) for 'Cache behavior settings' form section
var BehaviorsFooter = function BehaviorsFooter() {
  return _react2.default.createElement(
    ExpandableSection,
    { header: 'Additional configuration', variant: 'borderless' },
    _react2.default.createElement(
      ColumnLayout,
      null,
      _react2.default.createElement(
        'div',
        { 'data-awsui-column-layout-root': true },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'awsui-util-label' },
            'Path pattern'
          ),
          _react2.default.createElement(
            'div',
            null,
            'Default (*)'
          )
        ),
        _react2.default.createElement(
          FormField,
          {
            label: 'Cookies',
            description: 'Include all user cookies in the request URLs that it forwards to your origin.',
            stretch: true
          },
          _react2.default.createElement(RadioGroup, { items: _formConfig.COOKIE_OPTIONS, value: 'none' })
        ),
        _react2.default.createElement(
          FormField,
          {
            label: 'Query string forwarding and caching',
            description: 'Query string parameters you want CloudFront to forward to the origin.',
            stretch: true
          },
          _react2.default.createElement(RadioGroup, { items: _formConfig.QUERY_STRING_OPTIONS, value: 'none' })
        ),
        _react2.default.createElement(
          FormField,
          { label: 'Smooth streaming' },
          _react2.default.createElement(Checkbox, { label: 'Enable Microsoft smooth streaming' })
        ),
        _react2.default.createElement(
          FormField,
          { label: 'Viewer access' },
          _react2.default.createElement(Checkbox, { label: 'Require signed URL or signed cookie' })
        ),
        _react2.default.createElement(
          FormField,
          { label: 'Content compression', stretch: true },
          _react2.default.createElement(RadioGroup, { items: _formConfig.CURRENT_COMPRESSION_OPTIONS, value: 'manual' })
        ),
        _react2.default.createElement(
          FormField,
          {
            label: 'Lambda function associations',
            description: 'A Lambda trigger causes a function to execute. For example, you can create a trigger that causes the function to execute when CloudFront receives a request from a viewer for a specific cache behavior you set up for your distribution.',
            stretch: true
          },
          _react2.default.createElement(
            ColumnLayout,
            { columns: 3 },
            _react2.default.createElement(
              'div',
              { 'data-awsui-column-layout-root': true },
              _react2.default.createElement(
                FormField,
                { label: 'Type' },
                _react2.default.createElement(Input, null)
              ),
              _react2.default.createElement(
                FormField,
                { label: 'ARN' },
                _react2.default.createElement(Input, null)
              ),
              _react2.default.createElement(
                'div',
                { className: 'custom-header' },
                _react2.default.createElement(Button, { text: 'Add lambda' })
              )
            )
          )
        )
      )
    )
  );
};

// Breadcrumb content
var Breadcrumbs = function Breadcrumbs() {
  return _react2.default.createElement(BreadcrumbGroup, {
    items: [{
      text: 'Scale Out Computing',
      href: '#/service-home'
    }, {
      text: 'Projects',
      href: '#/table'
    }, {
      text: 'Create project',
      href: '#/create'
    }]
  });
};

// List of Help (right) panel content, changes depending on which 'info' link the user clicks on.
var Tools = [_react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    _react2.default.createElement(
      'h2',
      null,
      'Scale Out Computing'
    ),
    _react2.default.createElement('br', null),
    _react2.default.createElement(
      'p',
      null,
      'Keep your project research in order by naming each project and adding limits.'
    )
  ),
  _react2.default.createElement(
    'ul',
    { className: 'awsui-list-unstyled' },
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://awslabs.github.io/scale-out-computing-on-aws/' },
        'What is Scale Out Computing?'
      )
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/' },
        'Getting started'
      )
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://docs.aws.amazon.com/solutions/latest/scale-out-computing-on-aws/welcome.html' },
        'View implementation guide'
      )
    )
  )
), _react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    'Testing'
  ),
  _react2.default.createElement(
    'h4',
    null,
    'Web'
  ),
  _react2.default.createElement(
    'p',
    null,
    'Create a web distribution if you want to:'
  ),
  _react2.default.createElement(
    'p',
    null,
    'Speed up distribution of static and dynamic content, for example .html, .css, .php and graphics files. Distribute media files using HTTP or HTTPS.'
  ),
  _react2.default.createElement(
    'p',
    null,
    'Add, update or delete objects and submit data from web forms.'
  ),
  _react2.default.createElement(
    'p',
    null,
    'Use live streaming to stream an event in real time.'
  ),
  _react2.default.createElement(
    'p',
    null,
    'You store your files in an origin - either an Amazon S3 bucket or a web server. After you create the distribution, you can add more origins to the distributions.'
  ),
  _react2.default.createElement(
    'h4',
    { className: 'awsui-util-mt-m' },
    'RTMP'
  ),
  _react2.default.createElement(
    'p',
    null,
    'Create an RTMP distribution to speed up distribution of your streaming media files using Adobe Flash Media Server\'s RTMP protocol. An RTMP distribution allows an end user to begin playing a media file before the file has finished downloading from a CloudFront edge location. Note the following:'
  ),
  _react2.default.createElement(
    'p',
    null,
    'To create an RTMP distribution, you must store the media files in an Amazon S3 bucket.'
  ),
  _react2.default.createElement(
    'p',
    null,
    'To use CloudFront live streaming, create a web distribution.'
  )
), _react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    _react2.default.createElement(
      'h2',
      null,
      'Price class'
    )
  ),
  _react2.default.createElement(
    'p',
    null,
    'Select the price class associated with the maximum price that you want to pay for CloudFront service. If you select a price class other than All, some of your users may experience higher latency.'
  )
), _react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    _react2.default.createElement(
      'h2',
      null,
      'Alternate domain names (CNAMEs)'
    )
  ),
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      'You must list any custom domain names (for example, www.example.com) that you use in addition to the CloudFront domain name (for example, d1234.cloudfront.net) for the URLs for your files.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Specify up to 100 CNAMEs separated with commas or put each on a new line. You also must create a CNAME record with your DNS service to route queries for www.example.com to d1234.cloudfront.net. For more information, see the ',
      _react2.default.createElement(
        'a',
        { href: '' },
        'Help'
      ),
      '.'
    )
  )
), _react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    _react2.default.createElement(
      'h2',
      null,
      'SSL certificate'
    )
  ),
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h4',
        null,
        'Default CloudFront SSL certificate'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Choose this option if you want your users to use HTTPS or HTTP to access your content with the CloudFront domain name (such as https://d111111abcdef8.cloudfront.net/logo.jpg).'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Important: If you choose this option, CloudFront requires that browsers or devices support TLSv1 or later to access your content.'
      ),
      _react2.default.createElement(
        'h4',
        { className: 'awsui-util-mt-m' },
        'Custom SSL certificate'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Choose this option if you want your users to access your content by using an alternate domain name, such as https://www.example.com/logo.jpg.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'You can use a certificate stored in AWS Certificate Manager (ACM) in the US East (N. Virginia) Region, or you can use a certificate stored in IAM.'
      )
    )
  )
), _react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    _react2.default.createElement(
      'h2',
      null,
      'Content origin'
    )
  ),
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      'Specify the domain name for your origin - the Amazon S3 bucket or web server from which you want CloudFront to get your web content. The dropdown list enumerates the AWS resources associated with the current AWS account.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'To use a resource from a different AWS account, type the domain name of the resource. For example, for an Amazon S3 bucket, type the name in the format bucketname.s3.amazonaws.com. The files in your origin must be publicly readable.'
    )
  )
), _react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    _react2.default.createElement(
      'h2',
      null,
      'Custom header name'
    )
  ),
  _react2.default.createElement(
    'p',
    null,
    'Headers let you distinguish multiple origins in the same distribution from another.'
  )
)];
});

require.register("components/Dashboard.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ServiceNavigation = require('./ServiceNavigation.jsx');

var _ServiceNavigation2 = _interopRequireDefault(_ServiceNavigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    BreadcrumbGroup = _window$AWSUICompon.BreadcrumbGroup,
    Button = _window$AWSUICompon.Button,
    Icon = _window$AWSUICompon.Icon,
    ColumnLayout = _window$AWSUICompon.ColumnLayout,
    Box = _window$AWSUICompon.Box,
    BarChart = _window$AWSUICompon.BarChart,
    LineChart = _window$AWSUICompon.LineChart,
    PieChart = _window$AWSUICompon.PieChart;

// Class Basic is a skeleton of the basic App layout using AWS-UI React components.

var Dashboard = function (_React$Component) {
    _inherits(Dashboard, _React$Component);

    function Dashboard() {
        _classCallCheck(this, Dashboard);

        return _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).apply(this, arguments));
    }

    _createClass(Dashboard, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(AppLayout, {
                navigation: _react2.default.createElement(_ServiceNavigation2.default, null) // Navigation panel content imported from './ServiceNavigation.jsx'
                , breadcrumbs: _react2.default.createElement(Breadcrumbs, null) // Breadcrumbs element defined below
                , content: _react2.default.createElement(Content, null) // Main content on the page, defined below
                , contentType: 'default' // Sets default app layout settings for widths
                , tools: Tools // Tools panel content defined below
            });
        }
    }]);

    return Dashboard;
}(_react2.default.Component);

// Breadcrumb content


exports.default = Dashboard;
var Breadcrumbs = function Breadcrumbs() {
    return _react2.default.createElement(BreadcrumbGroup, {
        items: [{
            text: 'Scale Out Computing',
            href: '#/service-home'
        }, {
            text: 'Dashboard',
            href: '#/dashboard'
        }]
    });
};

// Main content area (fill it in with components!)
var Content = function Content() {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: 'awsui-util-pt-xxl awsui-row' },
            _react2.default.createElement(
                'div',
                { className: 'col-xxs-10 offset-xxs-1 col-s-6 col-l-5 offset-l-2 col-xl-6' },
                _react2.default.createElement(
                    'div',
                    { className: 'awsui-util-action-stripe' },
                    _react2.default.createElement(
                        'div',
                        { className: 'awsui-util-action-stripe-title' },
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Dashboard'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'awsui-util-action-stripe-group' },
                        _react2.default.createElement(Button, { href: '#/table', variant: 'primary', text: 'Go to projects' })
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'awsui-util-container awsui-util-no-gutters' },
                _react2.default.createElement(
                    'div',
                    { className: 'awsui-util-container-header' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        'Project overview'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'Viewing all project data'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        ColumnLayout,
                        { columns: 4, borders: 'vertical', className: 'awsui-util-no-gutters' },
                        _react2.default.createElement(
                            'div',
                            { 'data-awsui-column-layout-root': true, className: 'awsui-util-mv-l' },
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'h3',
                                    null,
                                    'Projects'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dashboard-xlarge-link', href: '#/table' },
                                    '7'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'h3',
                                    null,
                                    'Instances (running)'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dashboard-xlarge-link', href: '#/instances' },
                                    '14'
                                ),
                                ' /26'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'h3',
                                    null,
                                    'Key pairs'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dashboard-xlarge-link', href: '#/instances' },
                                    '3'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'h3',
                                    null,
                                    'Backups'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dashboard-xlarge-link', href: '#/instance-wizard' },
                                    '520'
                                ),
                                ' GB'
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'awsui-util-container awsui-util-no-gutters' },
                _react2.default.createElement(
                    'div',
                    { className: 'awsui-util-container-header' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        'Budget'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        ColumnLayout,
                        { columns: 4, borders: 'vertical', className: 'awsui-util-no-gutters' },
                        _react2.default.createElement(
                            'div',
                            { 'data-awsui-column-layout-root': true, className: 'awsui-util-mv-l' },
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'h3',
                                    null,
                                    'Total spent'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dashboard-large-link red', href: '#/budget' },
                                    '$1352'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'h3',
                                    null,
                                    'Forecasted'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dashboard-large-link', href: '#/budget' },
                                    '$3420'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'h3',
                                    null,
                                    'Remaining'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dashboard-large-link green', href: '#/budget' },
                                    '$13648'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'h3',
                                    null,
                                    'Budget'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'dashboard-large-link black', href: '#/budget' },
                                    '$15000'
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'awsui-util-container awsui-util-no-gutters' },
                _react2.default.createElement(
                    'div',
                    { className: 'awsui-util-container-header' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        'Instance hours'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'Daily instance hours by instance type'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        ColumnLayout,
                        { columns: 1, borders: 'vertical', className: 'awsui-util-no-gutters' },
                        _react2.default.createElement(
                            'div',
                            { 'data-awsui-column-layout-root': true, className: 'awsui-util-mv-l' },
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'awsui-util-container' },
                                    _react2.default.createElement('img', { src: './images/instance-hours1.png', className: 'intro-screenshot', alt: 'screenshot' })
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'awsui-util-container awsui-util-no-gutters' },
                _react2.default.createElement(
                    'div',
                    { className: 'awsui-util-container-header' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        'Network traffic'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'Incoming and outgoing network traffic'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        ColumnLayout,
                        { columns: 1, borders: 'vertical', className: 'awsui-util-no-gutters' },
                        _react2.default.createElement(
                            'div',
                            { 'data-awsui-column-layout-root': true, className: 'awsui-util-mv-l' },
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'awsui-util-container' },
                                    _react2.default.createElement('img', { src: './images/network-traffic1.png', className: 'intro-screenshot', alt: 'screenshot' })
                                )
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'awsui-util-container awsui-util-no-gutters' },
                _react2.default.createElement(
                    'div',
                    { className: 'awsui-util-container-header' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        'Pie chart'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'Display instance data'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        ColumnLayout,
                        { columns: 1, borders: 'vertical', className: 'awsui-util-no-gutters' },
                        _react2.default.createElement(
                            'div',
                            { 'data-awsui-column-layout-root': true, className: 'awsui-util-mv-l' },
                            _react2.default.createElement(
                                'div',
                                { className: 'awsui-util-ph-l awsui-util-mb-m' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'awsui-util-container' },
                                    _react2.default.createElement('img', { src: './images/pie-chart.png', className: 'intro-screenshot', alt: 'screenshot' })
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

// Help panel content
var Tools = _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
        'div',
        { className: 'awsui-util-help-panel-header' },
        _react2.default.createElement(
            'h2',
            null,
            'Scale Out Computing'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
            'p',
            null,
            'With Scale Out Computing on AWS, you can create a virtual machine instance, an isolated compute environment in the AWS Cloud. You can access your instance by using the same tools and applications you might use with a standalone computer. Connect to your machine instance by using NICE DCV in Windows or Linux Desktop, SSH Access or Command Line Interface.'
        )
    ),
    _react2.default.createElement(
        'a',
        { href: 'javascript:void(0)' },
        'Learn more ',
        _react2.default.createElement(Icon, { name: 'external' })
    ),
    _react2.default.createElement(
        'ul',
        { className: 'awsui-list-unstyled' },
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://docs.aws.amazon.com/solutions/latest/scale-out-computing-on-aws/welcome.html' },
                'What is Scale Out Computing on AWS?'
            )
        ),
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/' },
                'Getting started'
            )
        ),
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc' },
                'Working with instances'
            )
        )
    )
);
});

require.register("components/InstanceWizard.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ServiceNavigation = require('./ServiceNavigation.jsx');

var _ServiceNavigation2 = _interopRequireDefault(_ServiceNavigation);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    BreadcrumbGroup = _window$AWSUICompon.BreadcrumbGroup,
    Button = _window$AWSUICompon.Button,
    FormField = _window$AWSUICompon.FormField,
    Input = _window$AWSUICompon.Input,
    ColumnLayout = _window$AWSUICompon.ColumnLayout,
    Form = _window$AWSUICompon.Form,
    Box = _window$AWSUICompon.Box,
    Icon = _window$AWSUICompon.Icon,
    Container = _window$AWSUICompon.Container,
    Header = _window$AWSUICompon.Header,
    SpaceBetween = _window$AWSUICompon.SpaceBetween,
    Wizard = _window$AWSUICompon.Wizard;

// Class Basic is a skeleton of the basic App layout using AWS-UI React components.
var InstanceWizard = function (_React$Component) {
    _inherits(InstanceWizard, _React$Component);

    function InstanceWizard() {
        _classCallCheck(this, InstanceWizard);

        return _possibleConstructorReturn(this, (InstanceWizard.__proto__ || Object.getPrototypeOf(InstanceWizard)).apply(this, arguments));
    }

    _createClass(InstanceWizard, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(AppLayout, {
                navigation: _react2.default.createElement(_ServiceNavigation2.default, null) // Navigation panel content imported from './ServiceNavigation.jsx'
                , breadcrumbs: _react2.default.createElement(Breadcrumbs, null) // Breadcrumbs element defined below
                , content: _react2.default.createElement(Content, null) // Main content on the page, defined below
                , contentType: 'default' // Sets default app layout settings for widths
                , tools: Tools // Tools panel content defined below
            });
        }
    }]);

    return InstanceWizard;
}(_react2.default.Component);

exports.default = InstanceWizard;


var Content = function Content() {
    return (
        // {
        //     const [activeStepIndex, setActiveStepIndex] = useState(0);
        // }

        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(Form, { header: _react2.default.createElement(
                    'h1',
                    null,
                    'Launch instance'
                ) }),
            _react2.default.createElement(Wizard, {
                i18nStrings: {
                    stepNumberLabel: function stepNumberLabel(stepNumber) {
                        return 'Step ' + stepNumber;
                    },
                    collapsedStepsLabel: function collapsedStepsLabel(stepNumber, stepsCount) {
                        return 'Step ' + stepNumber + ' of ' + stepsCount;
                    },
                    cancelButton: "Cancel",
                    previousButton: "Previous",
                    nextButton: "Next",
                    submitButton: "Launch instance",
                    optional: "optional"
                },
                steps: [{
                    title: "Choose engine type",
                    info: _react2.default.createElement(
                        'a',
                        { className: 'awsui-util-help-info-link',
                            href: 'javascript:void(0);' },
                        'Info'
                    ),
                    description: "Each instance type includes one or more instance sizes, allowing you to scale your resources to the requirements of your target workload.",
                    content: _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h2',
                            null,
                            'Engine options'
                        ),
                        _react2.default.createElement(
                            FormField,
                            { label: 'First field' },
                            _react2.default.createElement(Input, null)
                        ),
                        _react2.default.createElement(
                            FormField,
                            { label: 'Second field' },
                            _react2.default.createElement(Input, null)
                        )
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
                }, {
                    title: "Add storage",
                    content: _react2.default.createElement(
                        Container,
                        {
                            header: _react2.default.createElement(
                                Header,
                                { variant: 'h2' },
                                'Form container header'
                            )
                        },
                        _react2.default.createElement(
                            SpaceBetween,
                            { direction: 'vertical', size: 'l' },
                            _react2.default.createElement(
                                FormField,
                                { label: 'First field' },
                                _react2.default.createElement(Input, null)
                            ),
                            _react2.default.createElement(
                                FormField,
                                { label: 'Second field' },
                                _react2.default.createElement(Input, null)
                            )
                        )
                    )
                }, {
                    title: "Configure security group",
                    content: _react2.default.createElement(
                        Container,
                        {
                            header: _react2.default.createElement(
                                Header,
                                { variant: 'h2' },
                                'Form container header'
                            )
                        },
                        _react2.default.createElement(
                            SpaceBetween,
                            { direction: 'vertical', size: 'l' },
                            _react2.default.createElement(
                                FormField,
                                { label: 'First field' },
                                _react2.default.createElement(Input, null)
                            ),
                            _react2.default.createElement(
                                FormField,
                                { label: 'Second field' },
                                _react2.default.createElement(Input, null)
                            )
                        )
                    ),
                    isOptional: true
                }, {
                    title: "Review and launch",
                    content: _react2.default.createElement(
                        SpaceBetween,
                        { size: 'xs' },
                        _react2.default.createElement(
                            Header,
                            {
                                variant: 'h3',
                                actions: _react2.default.createElement(
                                    Button,
                                    {
                                        onClick: function onClick() {
                                            return setActiveStepIndex(0);
                                        }
                                    },
                                    'Edit'
                                )
                            },
                            'Step 1: Choose instance type'
                        ),
                        _react2.default.createElement(
                            Container,
                            {
                                header: _react2.default.createElement(
                                    Header,
                                    { variant: 'h2' },
                                    'Container title'
                                )
                            },
                            _react2.default.createElement(
                                ColumnLayout,
                                {
                                    columns: 2,
                                    variant: 'text-grid'
                                },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        Box,
                                        {
                                            margin: { bottom: "xxxs" },
                                            color: 'text-label'
                                        },
                                        'First field'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Value'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        Box,
                                        {
                                            margin: { bottom: "xxxs" },
                                            color: 'text-label'
                                        },
                                        'Second Field'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        'Value'
                                    )
                                )
                            )
                        )
                    )
                }]
            })
        )
    );
};

// Breadcrumb content
var Breadcrumbs = function Breadcrumbs() {
    return _react2.default.createElement(BreadcrumbGroup, {
        items: [{
            text: 'Scale Out Computing',
            href: '#/service-home'
        }, {
            text: 'Projects',
            href: '#/table'
        }, {
            text: 'Instances',
            href: '#/instances'
        }, {
            text: 'Launch instance',
            href: '#/instance-wizard'
        }]
    });
};

// Help (right) panel content
var Tools = [_react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
        'div',
        { className: 'awsui-util-help-panel-header' },
        _react2.default.createElement(
            'h2',
            null,
            'Scale Out Computing'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
            'p',
            null,
            'With Scale Out Computing on AWS, you can create a virtual machine instance, an isolated compute environment in the AWS Cloud. You can access your instance by using the same tools and applications you might use with a standalone computer. Connect to your machine instance by using NICE DCV in Windows or Linux Desktop, SSH Access or Command Line Interface.'
        )
    ),
    _react2.default.createElement(
        'a',
        { href: 'javascript:void(0)' },
        'Learn more ',
        _react2.default.createElement(Icon, { name: 'external' })
    ),
    _react2.default.createElement(
        'ul',
        { className: 'awsui-list-unstyled' },
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/' },
                'What is Scale Out Computing?'
            )
        ),
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://awslabs.github.io/scale-out-computing-on-aws/' },
                'Getting started'
            )
        ),
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc' },
                'Working with instances'
            )
        )
    )
)];
});

require.register("components/Instances.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dataProvider = require('../resources/data-provider');

var _dataProvider2 = _interopRequireDefault(_dataProvider);

var _ServiceNavigation = require('./ServiceNavigation.jsx');

var _ServiceNavigation2 = _interopRequireDefault(_ServiceNavigation);

var _tableConfig = require('../resources/table/table-config.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This is just a playground package. It does not comply with best practices
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of using AWS-UI components. For production code, follow the integration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               guidelines:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://polaris.corp.amazon.com/getting_started/development/integration/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ************************************************************************/


var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    BreadcrumbGroup = _window$AWSUICompon.BreadcrumbGroup,
    Button = _window$AWSUICompon.Button,
    Flash = _window$AWSUICompon.Flash,
    Table = _window$AWSUICompon.Table,
    TableContentSelector = _window$AWSUICompon.TableContentSelector,
    TableFiltering = _window$AWSUICompon.TableFiltering,
    TablePageSizeSelector = _window$AWSUICompon.TablePageSizeSelector,
    TablePagination = _window$AWSUICompon.TablePagination,
    TablePreferences = _window$AWSUICompon.TablePreferences,
    TableSelection = _window$AWSUICompon.TableSelection,
    TableSorting = _window$AWSUICompon.TableSorting,
    TableWrapLines = _window$AWSUICompon.TableWrapLines,
    FormField = _window$AWSUICompon.FormField,
    RadioGroup = _window$AWSUICompon.RadioGroup;

// Class TableView is a skeleton of a Table using AWS-UI React components.

var Instances = function (_React$Component) {
  _inherits(Instances, _React$Component);

  function Instances() {
    _classCallCheck(this, Instances);

    return _possibleConstructorReturn(this, (Instances.__proto__ || Object.getPrototypeOf(Instances)).apply(this, arguments));
  }

  _createClass(Instances, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(AppLayout, {
        navigation: _react2.default.createElement(_ServiceNavigation2.default, null) // Navigation panel content imported from './ServiceNavigation.jsx'
        , notifications: _react2.default.createElement(FlashMessage, null),
        breadcrumbs: _react2.default.createElement(Breadcrumbs, null),
        content: _react2.default.createElement(DetailsTable, null),
        contentType: 'table',
        toolsOpen: false,
        tools: Tools
      });
    }
  }]);

  return Instances;
}(_react2.default.Component);

exports.default = Instances;

var DetailsTable = function (_React$Component2) {
  _inherits(DetailsTable, _React$Component2);

  function DetailsTable(props) {
    _classCallCheck(this, DetailsTable);

    var _this2 = _possibleConstructorReturn(this, (DetailsTable.__proto__ || Object.getPrototypeOf(DetailsTable)).call(this, props));

    _this2.state = {
      selectedDistributions: [],
      distributions: [],
      pageSize: 30,
      filteringText: ''
    };
    return _this2;
  }

  _createClass(DetailsTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      new _dataProvider2.default().getData('distributions', function (distributions) {
        return _this3.setState({ distributions: distributions });
      });
    }

    // Keeps track of how many distributions are selected

  }, {
    key: 'headerCounter',
    value: function headerCounter(selectedDistributions, distributions) {
      return selectedDistributions.length ? '(' + selectedDistributions.length + ' of ' + distributions.length + ')' : '(' + distributions.length + ')';
    }

    // Updates the page size in preferences

  }, {
    key: 'onPaginationChange',
    value: function onPaginationChange(_ref) {
      var pageSize = _ref.detail.pageSize;

      this.setState({
        pageSize: pageSize
      });
    }

    // Updates the filtering text

  }, {
    key: 'onFilteringChange',
    value: function onFilteringChange(_ref2) {
      var filteringText = _ref2.detail.filteringText;

      this.setState({
        filteringText: filteringText
      });
    }

    // Resets the filtering text

  }, {
    key: 'clearFilter',
    value: function clearFilter() {
      this.setState({
        filteringText: ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        Table,
        {
          columnDefinitions: _tableConfig.COLUMN_DEFINITIONS,
          items: this.state.distributions,
          header: _react2.default.createElement(Header, {
            selectedDistributions: this.state.selectedDistributions,
            counter: this.headerCounter(this.state.selectedDistributions, this.state.distributions)
          }),
          noMatch: _react2.default.createElement(
            'div',
            { className: 'awsui-util-t-c' },
            _react2.default.createElement(
              'div',
              { className: 'awsui-util-pt-xs awsui-util-mb-xs' },
              _react2.default.createElement(
                'b',
                null,
                'No matches'
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'awsui-util-mb-s' },
              'No results match your query'
            ),
            _react2.default.createElement(
              'div',
              { className: 'awsui-util-mb-l' },
              _react2.default.createElement(Button, { onClick: this.clearFilter.bind(this), text: 'Clear filter' })
            )
          )
        },
        _react2.default.createElement(TableFiltering, {
          filteringPlaceholder: 'Search instances',
          filteringText: this.state.filteringText,
          onFilteringChange: this.onFilteringChange.bind(this)
        }),
        _react2.default.createElement(TablePagination, { onPaginationChange: this.onPaginationChange.bind(this), pageSize: this.state.pageSize }),
        _react2.default.createElement(TableSorting, { sortableColumns: _tableConfig.SORTABLE_COLUMNS }),
        _react2.default.createElement(TableSelection, {
          selectedItems: this.state.selectedDistributions,
          onSelectionChange: function onSelectionChange(evt) {
            return _this4.setState({ selectedDistributions: evt.detail.selectedItems });
          }
        }),
        _react2.default.createElement(
          TablePreferences,
          { title: 'Preferences', confirmLabel: 'Confirm', cancelLabel: 'Cancel' },
          _react2.default.createElement(TablePageSizeSelector, { title: 'Page size', options: _tableConfig.PAGE_SELECTOR_OPTIONS }),
          _react2.default.createElement(TableWrapLines, { label: 'Wrap lines', description: 'Check to see all the text and wrap the lines', value: false }),
          _react2.default.createElement(
            FormField,
            {
              stretch: true,
              className: 'awsui-util-mb-l awsui-util-d-b awsui-table-custom-preference',
              label: 'View as'
            },
            _react2.default.createElement(RadioGroup, { value: 'table', items: _tableConfig.CUSTOM_PREFERENCE_OPTIONS })
          ),
          _react2.default.createElement(TableContentSelector, { title: 'Select visible columns', options: _tableConfig.CONTENT_SELECTOR_OPTIONS })
        )
      );
    }
  }]);

  return DetailsTable;
}(_react2.default.Component);

// Table header content, shows how many distributions are selected and contains the action stripe


var Header = function Header(_ref3) {
  var selectedDistributions = _ref3.selectedDistributions,
      counter = _ref3.counter;

  var isOnlyOneSelected = selectedDistributions.length === 1;

  return _react2.default.createElement(
    'div',
    { className: 'awsui-util-action-stripe' },
    _react2.default.createElement(
      'div',
      { className: 'awsui-util-action-stripe-title' },
      _react2.default.createElement(
        'h2',
        null,
        'Instances\xA0',
        counter ? _react2.default.createElement(
          'span',
          { className: 'awsui-util-header-counter' },
          counter
        ) : ''
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'awsui-util-action-stripe-group' },
      _react2.default.createElement(Button, { text: 'View details', disabled: !isOnlyOneSelected }),
      _react2.default.createElement(Button, { text: 'Edit', disabled: !isOnlyOneSelected }),
      _react2.default.createElement(Button, { text: 'Delete', disabled: selectedDistributions.length === 0 }),
      _react2.default.createElement(Button, { href: '#/instance-wizard', variant: 'primary', text: 'Launch instance' })
    )
  );
};

// Breadcrumb content
var Breadcrumbs = function Breadcrumbs() {
  return _react2.default.createElement(BreadcrumbGroup, {
    items: [{
      text: 'Scale Out Computing',
      href: '#/service-home'
    }, {
      text: 'Projects',
      href: '#/table'
    }, {
      text: 'Instances',
      href: '#/instances'
    }]
  });
};

// Flash message content
var FlashMessage = function FlashMessage() {
  return _react2.default.createElement(Flash, { type: 'success', content: 'Resource created successfully', dismissible: true });
};

// Help (right) panel content
var Tools = [_react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    _react2.default.createElement(
      'h2',
      null,
      'Scale Out Computing'
    )
  ),
  _react2.default.createElement(
    'ul',
    { className: 'awsui-list-unstyled' },
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/' },
        'What is Scale Out Computing?'
      )
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://awslabs.github.io/scale-out-computing-on-aws/' },
        'Getting started'
      )
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc' },
        'Working with instances'
      )
    )
  )
)];
});

require.register("components/LaunchInstance.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dataProvider = require('../resources/data-provider');

var _dataProvider2 = _interopRequireDefault(_dataProvider);

var _ServiceNavigation = require('./ServiceNavigation.jsx');

var _ServiceNavigation2 = _interopRequireDefault(_ServiceNavigation);

var _formConfig = require('../resources/form-config.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This is just a playground package. It does not comply with best practices
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of using AWS-UI components. For production code, follow the integration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               guidelines:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://polaris.corp.amazon.com/getting_started/development/integration/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ************************************************************************/


var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    AttributeEditor = _window$AWSUICompon.AttributeEditor,
    BreadcrumbGroup = _window$AWSUICompon.BreadcrumbGroup,
    Button = _window$AWSUICompon.Button,
    Checkbox = _window$AWSUICompon.Checkbox,
    ColumnLayout = _window$AWSUICompon.ColumnLayout,
    ExpandableSection = _window$AWSUICompon.ExpandableSection,
    Form = _window$AWSUICompon.Form,
    FormField = _window$AWSUICompon.FormField,
    FormSection = _window$AWSUICompon.FormSection,
    Input = _window$AWSUICompon.Input,
    Multiselect = _window$AWSUICompon.Multiselect,
    RadioGroup = _window$AWSUICompon.RadioGroup,
    Select = _window$AWSUICompon.Select,
    Textarea = _window$AWSUICompon.Textarea,
    Tiles = _window$AWSUICompon.Tiles;

// Class CreateForm is a skeleton of a Single page create form using AWS-UI React components.

var LaunchInstance = function (_React$Component) {
    _inherits(LaunchInstance, _React$Component);

    function LaunchInstance(props) {
        _classCallCheck(this, LaunchInstance);

        var _this = _possibleConstructorReturn(this, (LaunchInstance.__proto__ || Object.getPrototypeOf(LaunchInstance)).call(this, props));

        _this.state = { contentOrigins: [], toolsIndex: 0, toolsOpen: false };
        return _this;
    }

    _createClass(LaunchInstance, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var dataProvider = new _dataProvider2.default();
            dataProvider.getData('content-origins', function (contentOrigins) {
                return _this2.setState({ contentOrigins: contentOrigins });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(AppLayout, {
                navigation: _react2.default.createElement(_ServiceNavigation2.default, null) // Navigation panel content imported from './ServiceNavigation.jsx'
                , breadcrumbs: _react2.default.createElement(Breadcrumbs, null),
                content: _react2.default.createElement(Content
                // Changes the Help panel content when the user clicks an 'info' link
                , { replaceToolsContent: function replaceToolsContent(index) {
                        return _this3.setState({ toolsIndex: index, toolsOpen: true });
                    },
                    contentOrigins: this.state.contentOrigins
                }),
                contentType: 'form',
                tools: Tools[this.state.toolsIndex],
                toolsOpen: this.state.toolsOpen
            });
        }
    }]);

    return LaunchInstance;
}(_react2.default.Component);

// The content in the main content area of the App layout


exports.default = LaunchInstance;
var Content = function Content(props) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            Form,
            {
                header: _react2.default.createElement(
                    'h1',
                    null,
                    'Launch instance'
                ),
                actions:
                // located at the bottom of the form
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(Button, { variant: 'link', text: 'Cancel' }),
                    _react2.default.createElement(Button, { href: '#/instances', variant: 'primary', text: 'Launch instance' })
                )
            },
            _react2.default.createElement(ContentDeliveryPanel, { replaceToolsContent: props.replaceToolsContent }),
            _react2.default.createElement(
                FormSection,
                { header: _react2.default.createElement(
                        'h2',
                        null,
                        'Instance details'
                    ), footer: _react2.default.createElement(DistributionsFooter, null) },
                _react2.default.createElement(
                    ColumnLayout,
                    null,
                    _react2.default.createElement(
                        'div',
                        { 'data-awsui-column-layout-root': true },
                        _react2.default.createElement(
                            FormField,
                            {
                                label: _react2.default.createElement(
                                    'span',
                                    null,
                                    'Price class',
                                    _react2.default.createElement(
                                        'a',
                                        {
                                            className: 'awsui-util-help-info-link',
                                            href: 'javascript:void(0);',
                                            onClick: function onClick() {
                                                return props.replaceToolsContent(2);
                                            }
                                        },
                                        'Info'
                                    )
                                ),
                                stretch: true
                            },
                            _react2.default.createElement(RadioGroup, { items: _formConfig.PRICE_CLASS_OPTIONS, value: '0' })
                        ),
                        _react2.default.createElement(
                            FormField,
                            {
                                label: _react2.default.createElement(
                                    'span',
                                    null,
                                    'Alternative domain names (CNAMEs)',
                                    _react2.default.createElement(
                                        'i',
                                        null,
                                        ' - optional'
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        {
                                            className: 'awsui-util-help-info-link',
                                            href: 'javascript:void(0);',
                                            onClick: function onClick() {
                                                return props.replaceToolsContent(3);
                                            }
                                        },
                                        'Info'
                                    )
                                ),
                                description: 'You must list any custom domain names that you use in addition to the CloudFront domain name for the URLs for your files.',
                                hintText: 'Specify up to 100 CNAMEs separated with commas or put each on a new line.',
                                stretch: true
                            },
                            _react2.default.createElement(Textarea, { placeholder: 'www.example1.com\nwww.example2.com' })
                        ),
                        _react2.default.createElement(
                            FormField,
                            {
                                label: _react2.default.createElement(
                                    'span',
                                    null,
                                    'SSL/TLS certificate',
                                    _react2.default.createElement(
                                        'a',
                                        {
                                            className: 'awsui-util-help-info-link',
                                            href: 'javascript:void(0);',
                                            onClick: function onClick() {
                                                return props.replaceToolsContent(4);
                                            }
                                        },
                                        'Info'
                                    )
                                ),
                                stretch: true
                            },
                            _react2.default.createElement(RadioGroup, { items: _formConfig.SSL_CERTIFICATE_OPTIONS, value: 'default' })
                        ),
                        _react2.default.createElement(Button, { text: 'Request or import a certificate with AWS Certificate Manager (ACM)' })
                    )
                )
            ),
            _react2.default.createElement(
                FormSection,
                { header: 'Storage settings' },
                _react2.default.createElement(
                    ColumnLayout,
                    null,
                    _react2.default.createElement(
                        'div',
                        { 'data-awsui-column-layout-root': true },
                        _react2.default.createElement(
                            FormField,
                            {
                                label: _react2.default.createElement(
                                    'div',
                                    null,
                                    'Content origin',
                                    _react2.default.createElement(
                                        'a',
                                        {
                                            className: 'awsui-util-help-info-link',
                                            href: 'javascript:void(0);',
                                            onClick: function onClick() {
                                                return props.replaceToolsContent(5);
                                            }
                                        },
                                        'Info'
                                    )
                                ),
                                description: 'The Amazon S3 bucket or web server from which you want CloudFront to get your web content.'
                            },
                            _react2.default.createElement(Select, {
                                options: props.contentOrigins,
                                placeholder: 'Select an S3 bucket or web server from which you want CloudFront to get your web content.',
                                filteringType: 'auto'
                            })
                        ),
                        _react2.default.createElement(
                            FormField,
                            {
                                label: 'Content origin (multiselect version)',
                                description: 'The Amazon S3 bucket or web server from which you want CloudFront to get your web content.'
                            },
                            _react2.default.createElement(Multiselect, {
                                options: props.contentOrigins,
                                placeholder: 'Select an S3 bucket or web server from which you want CloudFront to get your web content.',
                                filteringType: 'auto'
                            })
                        ),
                        _react2.default.createElement(
                            FormField,
                            {
                                label: 'Path to content',
                                description: 'The directory in your Amazon S3 bucket or your custom origin.'
                            },
                            _react2.default.createElement(Input, { placeholder: '/images' })
                        ),
                        _react2.default.createElement(
                            FormField,
                            {
                                label: 'Origin ID',
                                description: 'This value lets you distinguish multiple origins in the same distribution from one another'
                            },
                            _react2.default.createElement(Input, null)
                        ),
                        _react2.default.createElement(AttributeEditor, {
                            addButtonText: 'Add header',
                            removeButtonText: 'Remove header',
                            items: [{
                                name: '',
                                value: ''
                            }],
                            definition: [{
                                label: _react2.default.createElement(
                                    'span',
                                    null,
                                    'Custom header name',
                                    _react2.default.createElement(
                                        'a',
                                        {
                                            className: 'awsui-util-help-info-link',
                                            href: 'javascript:void(0);',
                                            onClick: function onClick() {
                                                return props.replaceToolsContent(6);
                                            }
                                        },
                                        'Info'
                                    )
                                ),
                                control: function control(item) {
                                    return _react2.default.createElement(Input, { value: item.name, placeholder: 'Location' });
                                }
                            }, {
                                label: _react2.default.createElement(
                                    'span',
                                    null,
                                    'Custom header value',
                                    _react2.default.createElement(
                                        'i',
                                        null,
                                        ' - optional'
                                    )
                                ),
                                control: function control(item) {
                                    return _react2.default.createElement(Input, { value: item.value, placeholder: 'Germany' });
                                }
                            }]
                        })
                    )
                )
            ),
            _react2.default.createElement(
                FormSection,
                { header: 'Network settings', footer: _react2.default.createElement(BehaviorsFooter, null) },
                _react2.default.createElement(
                    ColumnLayout,
                    null,
                    _react2.default.createElement(
                        'div',
                        { 'data-awsui-column-layout-root': true },
                        _react2.default.createElement(
                            FormField,
                            { label: 'Viewer protocol policy', stretch: true },
                            _react2.default.createElement(RadioGroup, { items: _formConfig.VIEWER_PROTOCOL_POLICY_OPTIONS, value: '0' })
                        ),
                        _react2.default.createElement(
                            FormField,
                            { label: 'Allowed HTTP methods', stretch: true },
                            _react2.default.createElement(RadioGroup, { items: _formConfig.ALLOWED_HTTP_METHOD_OPTIONS, value: '0' })
                        ),
                        _react2.default.createElement(
                            FormField,
                            { label: 'Forward headers', description: 'Cache your objects based on header values', stretch: true },
                            _react2.default.createElement(RadioGroup, { items: _formConfig.FORWARD_HEADER_OPTIONS, value: 'none' })
                        ),
                        _react2.default.createElement(
                            FormField,
                            { label: 'Object caching', description: 'Cache your objects based on header values' },
                            _react2.default.createElement(
                                ColumnLayout,
                                { columns: 4 },
                                _react2.default.createElement(
                                    'div',
                                    { 'data-awsui-column-layout-root': true },
                                    _react2.default.createElement(
                                        FormField,
                                        { label: 'Minimum TTL' },
                                        _react2.default.createElement(Input, { type: 'number', value: '0' })
                                    ),
                                    _react2.default.createElement(
                                        FormField,
                                        { label: 'Maximum TTL' },
                                        _react2.default.createElement(Input, { type: 'number', value: '31536000' })
                                    ),
                                    _react2.default.createElement(
                                        FormField,
                                        { label: 'Default TTL' },
                                        _react2.default.createElement(Input, { type: 'number', value: '86400' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'custom-header' },
                                        _react2.default.createElement(Button, { text: 'Set to default' })
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

// First form section titled 'Distribution content delivery'

var ContentDeliveryPanel = function (_React$Component2) {
    _inherits(ContentDeliveryPanel, _React$Component2);

    function ContentDeliveryPanel(props) {
        _classCallCheck(this, ContentDeliveryPanel);

        var _this4 = _possibleConstructorReturn(this, (ContentDeliveryPanel.__proto__ || Object.getPrototypeOf(ContentDeliveryPanel)).call(this, props));

        _this4.state = { deliveryMethod: 'web' };
        return _this4;
    }

    _createClass(ContentDeliveryPanel, [{
        key: 'render',
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(
                FormSection,
                { header: 'Select engine type' },
                _react2.default.createElement(
                    FormField,
                    {
                        label: _react2.default.createElement(
                            'div',
                            null,
                            'Engine options',
                            _react2.default.createElement(
                                'a',
                                {
                                    className: 'awsui-util-help-info-link',
                                    href: 'javascript:void(0);',
                                    onClick: function onClick() {
                                        return _this5.props.replaceToolsContent(1);
                                    }
                                },
                                'Info'
                            )
                        ),
                        stretch: true
                    },
                    _react2.default.createElement(Tiles, {
                        items: _formConfig.DELIVERY_METHOD,
                        value: this.state.deliveryMethod,
                        onChange: function onChange(e) {
                            return _this5.setState({ deliveryMethod: e.detail.value });
                        }
                    })
                )
            );
        }
    }]);

    return ContentDeliveryPanel;
}(_react2.default.Component);

// Footer content (Additional configuration section) for 'Distribution settings' form section


var DistributionsFooter = function DistributionsFooter() {
    return _react2.default.createElement(
        ExpandableSection,
        { header: 'Additional configuration', variant: 'borderless' },
        _react2.default.createElement(
            ColumnLayout,
            null,
            _react2.default.createElement(
                'div',
                { 'data-awsui-column-layout-root': true },
                _react2.default.createElement(
                    FormField,
                    {
                        label: 'Supported HTTP versions',
                        description: 'Choose the version of the HTTP protocol that you want CloudFront to accept for viewer requests.',
                        stretch: true
                    },
                    _react2.default.createElement(RadioGroup, { items: _formConfig.SUPPORTED_HTTP_VERSIONS_OPTIONS, value: 'http2' })
                ),
                _react2.default.createElement(
                    FormField,
                    {
                        label: 'Root object',
                        description: 'Type the name of the object that you want CloudFront to return when a viewer request points to your root URL.'
                    },
                    _react2.default.createElement(Input, null)
                ),
                _react2.default.createElement(
                    FormField,
                    { label: 'Logging' },
                    _react2.default.createElement(Checkbox, { label: 'Enable logging' })
                ),
                _react2.default.createElement(
                    FormField,
                    { label: 'IPv6' },
                    _react2.default.createElement(Checkbox, { label: 'Enabled' })
                ),
                _react2.default.createElement(
                    FormField,
                    { label: 'Comment' },
                    _react2.default.createElement(Textarea, null)
                )
            )
        )
    );
};

// Footer content (Additional configuration section) for 'Cache behavior settings' form section
var BehaviorsFooter = function BehaviorsFooter() {
    return _react2.default.createElement(
        ExpandableSection,
        { header: 'Additional configuration', variant: 'borderless' },
        _react2.default.createElement(
            ColumnLayout,
            null,
            _react2.default.createElement(
                'div',
                { 'data-awsui-column-layout-root': true },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'awsui-util-label' },
                        'Path pattern'
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        'Default (*)'
                    )
                ),
                _react2.default.createElement(
                    FormField,
                    {
                        label: 'Cookies',
                        description: 'Include all user cookies in the request URLs that it forwards to your origin.',
                        stretch: true
                    },
                    _react2.default.createElement(RadioGroup, { items: _formConfig.COOKIE_OPTIONS, value: 'none' })
                ),
                _react2.default.createElement(
                    FormField,
                    {
                        label: 'Query string forwarding and caching',
                        description: 'Query string parameters you want CloudFront to forward to the origin.',
                        stretch: true
                    },
                    _react2.default.createElement(RadioGroup, { items: _formConfig.QUERY_STRING_OPTIONS, value: 'none' })
                ),
                _react2.default.createElement(
                    FormField,
                    { label: 'Smooth streaming' },
                    _react2.default.createElement(Checkbox, { label: 'Enable Microsoft smooth streaming' })
                ),
                _react2.default.createElement(
                    FormField,
                    { label: 'Viewer access' },
                    _react2.default.createElement(Checkbox, { label: 'Require signed URL or signed cookie' })
                ),
                _react2.default.createElement(
                    FormField,
                    { label: 'Content compression', stretch: true },
                    _react2.default.createElement(RadioGroup, { items: _formConfig.CURRENT_COMPRESSION_OPTIONS, value: 'manual' })
                ),
                _react2.default.createElement(
                    FormField,
                    {
                        label: 'Lambda function associations',
                        description: 'A Lambda trigger causes a function to execute. For example, you can create a trigger that causes the function to execute when CloudFront receives a request from a viewer for a specific cache behavior you set up for your distribution.',
                        stretch: true
                    },
                    _react2.default.createElement(
                        ColumnLayout,
                        { columns: 3 },
                        _react2.default.createElement(
                            'div',
                            { 'data-awsui-column-layout-root': true },
                            _react2.default.createElement(
                                FormField,
                                { label: 'Type' },
                                _react2.default.createElement(Input, null)
                            ),
                            _react2.default.createElement(
                                FormField,
                                { label: 'ARN' },
                                _react2.default.createElement(Input, null)
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'custom-header' },
                                _react2.default.createElement(Button, { text: 'Add lambda' })
                            )
                        )
                    )
                )
            )
        )
    );
};

// Breadcrumb content
var Breadcrumbs = function Breadcrumbs() {
    return _react2.default.createElement(BreadcrumbGroup, {
        items: [{
            text: 'Scale Out Computing',
            href: '#/service-home'
        }, {
            text: 'Projects',
            href: '#/table'
        }, {
            text: 'Launch instance',
            href: '#/launch-instance'
        }]
    });
};

// List of Help (right) panel content, changes depending on which 'info' link the user clicks on.
var Tools = [_react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
        'div',
        { className: 'awsui-util-help-panel-header' },
        _react2.default.createElement(
            'h2',
            null,
            'Scale Out Computing'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
            'p',
            null,
            'With Scale Out Computing on AWS, you can create a virtual machine instance, an isolated compute environment in the AWS Cloud. You can access your instance by using the same tools and applications you might use with a standalone computer. Connect to your machine instance by using NICE DCV in Windows or Linux Desktop, SSH Access or Command Line Interface.'
        )
    ),
    _react2.default.createElement(
        'ul',
        { className: 'awsui-list-unstyled' },
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://awslabs.github.io/scale-out-computing-on-aws/' },
                'What is Scale Out Computing?'
            )
        ),
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/' },
                'Getting started'
            )
        ),
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                'a',
                { href: 'https://docs.aws.amazon.com/solutions/latest/scale-out-computing-on-aws/welcome.html' },
                'View implementation guide'
            )
        )
    )
), _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
        'div',
        { className: 'awsui-util-help-panel-header' },
        'Engine options'
    ),
    _react2.default.createElement(
        'h4',
        null,
        'Ubuntu Linux'
    ),
    _react2.default.createElement(
        'p',
        null,
        'Create a Ubuntu Linux engine if you want to:'
    ),
    _react2.default.createElement(
        'p',
        null,
        'Use a Linux machine image.'
    ),
    _react2.default.createElement(
        'p',
        null,
        'Add, update or delete objects and submit data from web forms.'
    ),
    _react2.default.createElement(
        'p',
        null,
        'Use live streaming to stream an event in real time.'
    ),
    _react2.default.createElement(
        'p',
        null,
        'You store your files in an origin - either an Amazon S3 bucket or a web server. After you create the distribution, you can add more origins to the distributions.'
    ),
    _react2.default.createElement(
        'h4',
        { className: 'awsui-util-mt-m' },
        'Windows 10'
    ),
    _react2.default.createElement(
        'p',
        null,
        'Create an RTMP distribution to speed up distribution of your streaming media files using Adobe Flash Media Server\'s RTMP protocol. An RTMP distribution allows an end user to begin playing a media file before the file has finished downloading from a CloudFront edge location. Note the following:'
    ),
    _react2.default.createElement(
        'p',
        null,
        'To create an RTMP distribution, you must store the media files in an Amazon S3 bucket.'
    ),
    _react2.default.createElement(
        'p',
        null,
        'To use CloudFront live streaming, create a web distribution.'
    )
), _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
        'div',
        { className: 'awsui-util-help-panel-header' },
        _react2.default.createElement(
            'h2',
            null,
            'Price class'
        )
    ),
    _react2.default.createElement(
        'p',
        null,
        'Select the price class associated with the maximum price that you want to pay for CloudFront service. If you select a price class other than All, some of your users may experience higher latency.'
    )
), _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
        'div',
        { className: 'awsui-util-help-panel-header' },
        _react2.default.createElement(
            'h2',
            null,
            'Alternate domain names (CNAMEs)'
        )
    ),
    _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'p',
            null,
            'You must list any custom domain names (for example, www.example.com) that you use in addition to the CloudFront domain name (for example, d1234.cloudfront.net) for the URLs for your files.'
        ),
        _react2.default.createElement(
            'p',
            null,
            'Specify up to 100 CNAMEs separated with commas or put each on a new line. You also must create a CNAME record with your DNS service to route queries for www.example.com to d1234.cloudfront.net. For more information, see the ',
            _react2.default.createElement(
                'a',
                { href: '' },
                'Help'
            ),
            '.'
        )
    )
), _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
        'div',
        { className: 'awsui-util-help-panel-header' },
        _react2.default.createElement(
            'h2',
            null,
            'SSL certificate'
        )
    ),
    _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h4',
                null,
                'Default CloudFront SSL certificate'
            ),
            _react2.default.createElement(
                'p',
                null,
                'Choose this option if you want your users to use HTTPS or HTTP to access your content with the CloudFront domain name (such as https://d111111abcdef8.cloudfront.net/logo.jpg).'
            ),
            _react2.default.createElement(
                'p',
                null,
                'Important: If you choose this option, CloudFront requires that browsers or devices support TLSv1 or later to access your content.'
            ),
            _react2.default.createElement(
                'h4',
                { className: 'awsui-util-mt-m' },
                'Custom SSL certificate'
            ),
            _react2.default.createElement(
                'p',
                null,
                'Choose this option if you want your users to access your content by using an alternate domain name, such as https://www.example.com/logo.jpg.'
            ),
            _react2.default.createElement(
                'p',
                null,
                'You can use a certificate stored in AWS Certificate Manager (ACM) in the US East (N. Virginia) Region, or you can use a certificate stored in IAM.'
            )
        )
    )
), _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
        'div',
        { className: 'awsui-util-help-panel-header' },
        _react2.default.createElement(
            'h2',
            null,
            'Content origin'
        )
    ),
    _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'p',
            null,
            'Specify the domain name for your origin - the Amazon S3 bucket or web server from which you want CloudFront to get your web content. The dropdown list enumerates the AWS resources associated with the current AWS account.'
        ),
        _react2.default.createElement(
            'p',
            null,
            'To use a resource from a different AWS account, type the domain name of the resource. For example, for an Amazon S3 bucket, type the name in the format bucketname.s3.amazonaws.com. The files in your origin must be publicly readable.'
        )
    )
), _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel' },
    _react2.default.createElement(
        'div',
        { className: 'awsui-util-help-panel-header' },
        _react2.default.createElement(
            'h2',
            null,
            'Custom header name'
        )
    ),
    _react2.default.createElement(
        'p',
        null,
        'Headers let you distinguish multiple origins in the same distribution from another.'
    )
)];
});

require.register("components/ServiceHomepage.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ServiceNavigation = require('./ServiceNavigation.jsx');

var _ServiceNavigation2 = _interopRequireDefault(_ServiceNavigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This is just a playground package. It does not comply with best practices
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of using AWS-UI components. For production code, follow the integration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               guidelines:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://polaris.corp.amazon.com/getting_started/development/integration/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ************************************************************************/


var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    Button = _window$AWSUICompon.Button,
    ColumnLayout = _window$AWSUICompon.ColumnLayout,
    FormField = _window$AWSUICompon.FormField,
    Icon = _window$AWSUICompon.Icon,
    Select = _window$AWSUICompon.Select;

// Class ServiceHomepage is a skeleton of a service's homepage using AWS-UI React components.

var ServiceHomepage = function (_React$Component) {
  _inherits(ServiceHomepage, _React$Component);

  function ServiceHomepage() {
    _classCallCheck(this, ServiceHomepage);

    return _possibleConstructorReturn(this, (ServiceHomepage.__proto__ || Object.getPrototypeOf(ServiceHomepage)).apply(this, arguments));
  }

  _createClass(ServiceHomepage, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(AppLayout, {
        className: 'awsui-util-no-gutters',
        navigation: _react2.default.createElement(_ServiceNavigation2.default, null) // Navigation panel content imported from './ServiceNavigation.jsx'
        , content: _react2.default.createElement(Content, null),
        contentType: 'default',
        navigationOpen: false,
        toolsHide: true
      });
    }
  }]);

  return ServiceHomepage;
}(_react2.default.Component);

// The content in the main content area of the App layout


exports.default = ServiceHomepage;
var Content = function Content() {
  return _react2.default.createElement(
    'div',
    { className: 'awsui-grid awsui-util-p-s' },
    _react2.default.createElement(
      'div',
      { className: 'custom-home__header custom-awsui-util-pt-xxxl awsui-row' },
      _react2.default.createElement(
        'div',
        { className: 'col-xxs-12' },
        _react2.default.createElement(
          'div',
          { className: 'awsui-row' },
          _react2.default.createElement(
            'div',
            { className: 'custom-home__category col-xxs-10 offset-xxs-1 col-l-8 offset-l-2' },
            'High Performance Computing'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'awsui-row' },
          _react2.default.createElement(
            'div',
            { className: 'custom-home__header-title col-xxs-10 offset-xxs-1 col-s-6 col-l-5 offset-l-2 col-xl-6' },
            _react2.default.createElement(
              'div',
              { className: 'awsui-text-large' },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Scale Out Computing on AWS'
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                'Deploy and operate your multiuser environment for compute intensive jobs'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              'Scale Out Computing features a large selection of compute resources, fast network backbone, unlimited storage, and cost management directly integrated within AWS.'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xxs-10 offset-xxs-1 col-s-4 offset-s-0 col-l-3 col-xl-2' },
            _react2.default.createElement(
              'div',
              { className: 'awsui-util-container awsui-util-mb-n' },
              _react2.default.createElement(
                'h2',
                null,
                'Create your cluster'
              ),
              _react2.default.createElement(
                'p',
                null,
                'Choose custom default settings or upload a custom machine image.  Go to your dashboard to get started.'
              ),
              _react2.default.createElement(Button, { href: '#/dashboard', variant: 'primary', text: 'Go to dashboard' })
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'awsui-util-pt-xxl awsui-row' },
      _react2.default.createElement(
        'div',
        { className: 'col-xxs-10 offset-xxs-1 col-s-6 col-l-5 offset-l-2 col-xl-6' },
        _react2.default.createElement(
          'h1',
          null,
          'How it works'
        ),
        _react2.default.createElement(
          'div',
          { className: 'awsui-util-container' },
          _react2.default.createElement('div', { className: 'custom-home-image__placeholder' })
        ),
        _react2.default.createElement(
          'h1',
          null,
          'Benefits and features'
        ),
        _react2.default.createElement(
          'div',
          { className: 'awsui-util-container awsui-util-no-gutters' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              ColumnLayout,
              { columns: 2, borders: 'vertical', className: 'awsui-util-no-gutters' },
              _react2.default.createElement(
                'div',
                { 'data-awsui-column-layout-root': true, className: 'awsui-util-mv-l' },
                _react2.default.createElement(
                  'div',
                  { className: 'awsui-util-ph-l awsui-util-mb-m' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    'Unlimited and On-Demand'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Access to unlimited computing resources when you need them.'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'awsui-util-ph-l awsui-util-mb-m' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    'Customizable'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Customize each different pipeline so you can process data faster.'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'awsui-util-ph-l awsui-util-mb-m' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    'Optimize costs'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'No server set up costs, deploy virtual machine instances and only pay for what you use.'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'awsui-util-ph-l awsui-util-mb-m' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    'Research faster'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Spread out your analysis over thousands of compute rsources at once, no more waiting in the queue.'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'awsui-util-ph-l awsui-util-mb-m' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    'Reporting and analytics'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Get detailed statistics reports, monitor your usage, track your spending, and set alarms on operational metrics.'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'awsui-util-ph-l awsui-util-mb-m' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    'Self service portal'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Log in, create a machine instance, upload your data, install your software, and start running your scripts.'
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'h1',
          null,
          'Use cases'
        ),
        _react2.default.createElement(
          'div',
          { className: 'awsui-util-container awsui-util-no-gutters' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              ColumnLayout,
              { columns: 2, borders: 'vertical', className: 'awsui-util-no-gutters' },
              _react2.default.createElement(
                'div',
                { 'data-awsui-column-layout-root': true, className: 'awsui-util-mv-l' },
                _react2.default.createElement(
                  'div',
                  { className: 'awsui-util-ph-l awsui-util-mb-m' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    'DNA sequencing'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Read about how a team of researchers use AWS to study genomics and learn more about saving endangered animal species around the world.'
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:void(0)' },
                    'Learn more ',
                    _react2.default.createElement(Icon, { name: 'external' })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'awsui-util-ph-l awsui-util-mb-m' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    'Cancer research'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Take a look at how a university used scale out computing on AWS to study cancer cells in children and now their data research is saving lives.'
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:void(0)' },
                    'Learn more ',
                    _react2.default.createElement(Icon, { name: 'external' })
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'awsui-util-container awsui-util-no-gutters' },
          _react2.default.createElement(
            'div',
            { className: 'awsui-util-container-header' },
            _react2.default.createElement(
              'h2',
              null,
              'Related services'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              ColumnLayout,
              { columns: 2, borders: 'vertical', className: 'awsui-util-no-gutters' },
              _react2.default.createElement(
                'div',
                { 'data-awsui-column-layout-root': true, className: 'awsui-util-mv-l' },
                _react2.default.createElement(
                  'div',
                  { className: 'awsui-util-ph-l awsui-util-mb-m' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    _react2.default.createElement(
                      'a',
                      null,
                      'Amazon S3'
                    )
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Use Amazon S3 to store the content that CloudFront delivers.'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'awsui-util-ph-l awsui-util-mb-m' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    _react2.default.createElement(
                      'a',
                      null,
                      'AWS Parallel Cluster'
                    )
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Use Amazon AWS Parallel Cluster schedule instance fleet distribution.'
                  )
                )
              )
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'custom-home__sidebar col-xxs-10 offset-xxs-1 col-s-4 offset-s-0 col-l-3 col-xl-2' },
        _react2.default.createElement(
          'div',
          { className: 'awsui-util-container' },
          _react2.default.createElement(
            'div',
            { className: 'awsui-util-container-header' },
            _react2.default.createElement(
              'h2',
              null,
              'Pricing (US)'
            )
          ),
          _react2.default.createElement(
            ColumnLayout,
            { borders: 'horizontal' },
            _react2.default.createElement(
              'div',
              { 'data-awsui-column-layout-root': 'true' },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '10 TB/month'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'awsui-text-secondary awsui-util-f-r' },
                  '$0.085 per GB'
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '100 TB/month'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'awsui-text-secondary awsui-util-f-r' },
                  '$0.065 per GB'
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '524 TB/month'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'awsui-text-secondary awsui-util-f-r' },
                  '$0.035 per GB'
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '4 PB/month'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'awsui-text-secondary awsui-util-f-r' },
                  '$0.025 per GB'
                )
              ),
              _react2.default.createElement(
                'a',
                { href: 'javascript:void(0)' },
                'Cost calculator ',
                _react2.default.createElement(Icon, { name: 'external' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'awsui-util-mt-xxl' },
          _react2.default.createElement(
            'div',
            { className: 'awsui-util-container' },
            _react2.default.createElement(
              'div',
              { className: 'awsui-util-container-header' },
              _react2.default.createElement(
                'h2',
                null,
                'Getting started'
              )
            ),
            _react2.default.createElement(
              ColumnLayout,
              { borders: 'horizontal' },
              _react2.default.createElement(
                'div',
                { 'data-awsui-column-layout-root': 'true' },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: 'https://awslabs.github.io/scale-out-computing-on-aws/' },
                    'What is Scale Out Computing?'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: 'https://github.com/awslabs/scale-out-computing-on-aws' },
                    'Documentation'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: 'https://awslabs.github.io/scale-out-computing-on-aws/FAQ/' },
                    'Help & Support'
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'awsui-util-mt-xxl' },
          _react2.default.createElement(
            'div',
            { className: 'awsui-util-container' },
            _react2.default.createElement(
              'div',
              { className: 'awsui-util-container-header' },
              _react2.default.createElement(
                'h2',
                null,
                'More resources'
              )
            ),
            _react2.default.createElement(
              ColumnLayout,
              { borders: 'horizontal' },
              _react2.default.createElement(
                'div',
                { 'data-awsui-column-layout-root': 'true' },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: 'https://awslabs.github.io/scale-out-computing-on-aws/' },
                    'Documentation'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:void(0)' },
                    'FAQ'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:void(0)' },
                    'Workshops'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:void(0)' },
                    'Videos'
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};
});

require.register("components/ServiceNavigation.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideNavigation = window['AWS-UI-Components-React'].SideNavigation;

// Class ServiceNavigation is the Side Navigation component that is used in BasicLayout, CreateForm, ServiceHomepage, and Table flows.
// Implement like this: <ServiceNavigation />

var ServiceNavigation = function (_React$Component) {
  _inherits(ServiceNavigation, _React$Component);

  function ServiceNavigation() {
    _classCallCheck(this, ServiceNavigation);

    return _possibleConstructorReturn(this, (ServiceNavigation.__proto__ || Object.getPrototypeOf(ServiceNavigation)).apply(this, arguments));
  }

  _createClass(ServiceNavigation, [{
    key: 'onFollowHandler',

    // If the provided link is empty, do not redirect pages
    value: function onFollowHandler(ev) {
      ev.preventDefault();
      if (ev.detail.href) {
        this.props.history.push(ev.detail.href.substring(1));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(SideNavigation, {
        header: { text: 'Scale Out Computing', href: '#/service-home' },
        items: items,
        activeHref: '#' + this.props.location.pathname,
        onFollow: this.onFollowHandler.bind(this)
      });
    }
  }]);

  return ServiceNavigation;
}(_react2.default.Component);

var items = [{ type: 'link', text: 'Dashboard', href: '#/dashboard' }, {
  type: 'section',
  text: 'Projects',
  items: [{ type: 'link', text: 'Projects', href: '#/table' }, { type: 'link', text: 'Instances', href: '#/instances' }]
}, {
  type: 'section',
  text: 'Admin',
  items: [{ type: 'link', text: 'User management', href: '#/user-management' }, { type: 'link', text: 'Budget', href: '#/budget' }]
}];

exports.default = (0, _reactRouterDom.withRouter)(ServiceNavigation);
});

require.register("components/Table.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dataProvider = require('../resources/data-provider');

var _dataProvider2 = _interopRequireDefault(_dataProvider);

var _ServiceNavigation = require('./ServiceNavigation.jsx');

var _ServiceNavigation2 = _interopRequireDefault(_ServiceNavigation);

var _tableConfig = require('../resources/table/table-config.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This is just a playground package. It does not comply with best practices
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of using AWS-UI components. For production code, follow the integration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               guidelines:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://polaris.corp.amazon.com/getting_started/development/integration/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ************************************************************************/


var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    BreadcrumbGroup = _window$AWSUICompon.BreadcrumbGroup,
    Button = _window$AWSUICompon.Button,
    Flash = _window$AWSUICompon.Flash,
    Table = _window$AWSUICompon.Table,
    TableContentSelector = _window$AWSUICompon.TableContentSelector,
    TableFiltering = _window$AWSUICompon.TableFiltering,
    TablePageSizeSelector = _window$AWSUICompon.TablePageSizeSelector,
    TablePagination = _window$AWSUICompon.TablePagination,
    TablePreferences = _window$AWSUICompon.TablePreferences,
    TableSelection = _window$AWSUICompon.TableSelection,
    TableSorting = _window$AWSUICompon.TableSorting,
    TableWrapLines = _window$AWSUICompon.TableWrapLines,
    FormField = _window$AWSUICompon.FormField,
    RadioGroup = _window$AWSUICompon.RadioGroup,
    Icon = _window$AWSUICompon.Icon;

// Class TableView is a skeleton of a Table using AWS-UI React components.

var TableView = function (_React$Component) {
  _inherits(TableView, _React$Component);

  function TableView() {
    _classCallCheck(this, TableView);

    return _possibleConstructorReturn(this, (TableView.__proto__ || Object.getPrototypeOf(TableView)).apply(this, arguments));
  }

  _createClass(TableView, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(AppLayout, {
        navigation: _react2.default.createElement(_ServiceNavigation2.default, null) // Navigation panel content imported from './ServiceNavigation.jsx'
        , notifications: _react2.default.createElement(FlashMessage, null),
        breadcrumbs: _react2.default.createElement(Breadcrumbs, null),
        content: _react2.default.createElement(DetailsTable, null),
        contentType: 'table',
        toolsOpen: false,
        tools: Tools
      });
    }
  }]);

  return TableView;
}(_react2.default.Component);

exports.default = TableView;

var DetailsTable = function (_React$Component2) {
  _inherits(DetailsTable, _React$Component2);

  function DetailsTable(props) {
    _classCallCheck(this, DetailsTable);

    var _this2 = _possibleConstructorReturn(this, (DetailsTable.__proto__ || Object.getPrototypeOf(DetailsTable)).call(this, props));

    _this2.state = {
      selectedDistributions: [],
      distributions: [],
      pageSize: 30,
      filteringText: ''
    };
    return _this2;
  }

  _createClass(DetailsTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      new _dataProvider2.default().getData('distributions', function (distributions) {
        return _this3.setState({ distributions: distributions });
      });
    }

    // Keeps track of how many distributions are selected

  }, {
    key: 'headerCounter',
    value: function headerCounter(selectedDistributions, distributions) {
      return selectedDistributions.length ? '(' + selectedDistributions.length + ' of ' + distributions.length + ')' : '(' + distributions.length + ')';
    }

    // Updates the page size in preferences

  }, {
    key: 'onPaginationChange',
    value: function onPaginationChange(_ref) {
      var pageSize = _ref.detail.pageSize;

      this.setState({
        pageSize: pageSize
      });
    }

    // Updates the filtering text

  }, {
    key: 'onFilteringChange',
    value: function onFilteringChange(_ref2) {
      var filteringText = _ref2.detail.filteringText;

      this.setState({
        filteringText: filteringText
      });
    }

    // Resets the filtering text

  }, {
    key: 'clearFilter',
    value: function clearFilter() {
      this.setState({
        filteringText: ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        Table,
        {
          columnDefinitions: _tableConfig.COLUMN_DEFINITIONS,
          items: this.state.distributions,
          header: _react2.default.createElement(Header, {
            selectedDistributions: this.state.selectedDistributions,
            counter: this.headerCounter(this.state.selectedDistributions, this.state.distributions)
          }),
          noMatch: _react2.default.createElement(
            'div',
            { className: 'awsui-util-t-c' },
            _react2.default.createElement(
              'div',
              { className: 'awsui-util-pt-xs awsui-util-mb-xs' },
              _react2.default.createElement(
                'b',
                null,
                'No matches'
              )
            ),
            _react2.default.createElement(
              'p',
              { className: 'awsui-util-mb-s' },
              'No results match your query'
            ),
            _react2.default.createElement(
              'div',
              { className: 'awsui-util-mb-l' },
              _react2.default.createElement(Button, { onClick: this.clearFilter.bind(this), text: 'Clear filter' })
            )
          )
        },
        _react2.default.createElement(TableFiltering, {
          filteringPlaceholder: 'Search projects',
          filteringText: this.state.filteringText,
          onFilteringChange: this.onFilteringChange.bind(this)
        }),
        _react2.default.createElement(TablePagination, { onPaginationChange: this.onPaginationChange.bind(this), pageSize: this.state.pageSize }),
        _react2.default.createElement(TableSorting, { sortableColumns: _tableConfig.SORTABLE_COLUMNS }),
        _react2.default.createElement(TableSelection, {
          selectedItems: this.state.selectedDistributions,
          onSelectionChange: function onSelectionChange(evt) {
            return _this4.setState({ selectedDistributions: evt.detail.selectedItems });
          }
        }),
        _react2.default.createElement(
          TablePreferences,
          { title: 'Preferences', confirmLabel: 'Confirm', cancelLabel: 'Cancel' },
          _react2.default.createElement(TablePageSizeSelector, { title: 'Page size', options: _tableConfig.PAGE_SELECTOR_OPTIONS }),
          _react2.default.createElement(TableWrapLines, { label: 'Wrap lines', description: 'Check to see all the text and wrap the lines', value: false }),
          _react2.default.createElement(
            FormField,
            {
              stretch: true,
              className: 'awsui-util-mb-l awsui-util-d-b awsui-table-custom-preference',
              label: 'View as'
            },
            _react2.default.createElement(RadioGroup, { value: 'table', items: _tableConfig.CUSTOM_PREFERENCE_OPTIONS })
          ),
          _react2.default.createElement(TableContentSelector, { title: 'Select visible columns', options: _tableConfig.CONTENT_SELECTOR_OPTIONS })
        )
      );
    }
  }]);

  return DetailsTable;
}(_react2.default.Component);

// Table header content, shows how many distributions are selected and contains the action stripe


var Header = function Header(_ref3) {
  var selectedDistributions = _ref3.selectedDistributions,
      counter = _ref3.counter;

  var isOnlyOneSelected = selectedDistributions.length === 1;

  return _react2.default.createElement(
    'div',
    { className: 'awsui-util-action-stripe' },
    _react2.default.createElement(
      'div',
      { className: 'awsui-util-action-stripe-title' },
      _react2.default.createElement(
        'h2',
        null,
        'Projects\xA0',
        counter ? _react2.default.createElement(
          'span',
          { className: 'awsui-util-header-counter' },
          counter
        ) : ''
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'awsui-util-action-stripe-group' },
      _react2.default.createElement(Button, { text: 'View details', disabled: !isOnlyOneSelected }),
      _react2.default.createElement(Button, { text: 'Edit', disabled: !isOnlyOneSelected }),
      _react2.default.createElement(Button, { text: 'Delete', disabled: selectedDistributions.length === 0 }),
      _react2.default.createElement(Button, { href: '#/create', variant: 'primary', text: 'Create project' })
    )
  );
};

// Breadcrumb content
var Breadcrumbs = function Breadcrumbs() {
  return _react2.default.createElement(BreadcrumbGroup, {
    items: [{
      text: 'Scale Out Computing',
      href: '#/service-home'
    }, {
      text: 'Projects',
      href: '#/table'
    }]
  });
};

// Flash message content
var FlashMessage = function FlashMessage() {
  return _react2.default.createElement(Flash, { type: 'success', content: 'Resource created successfully', dismissible: true });
};

// Help (right) panel content
var Tools = [_react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    _react2.default.createElement(
      'h2',
      null,
      'Scale Out Computing'
    ),
    _react2.default.createElement('br', null),
    _react2.default.createElement(
      'p',
      null,
      'With Scale Out Computing on AWS, you can create a virtual machine instance, an isolated compute environment in the AWS Cloud. You can access your instance by using the same tools and applications you might use with a standalone computer. Connect to your machine instance by using NICE DCV in Windows or Linux Desktop, SSH Access or Command Line Interface.'
    )
  ),
  _react2.default.createElement(
    'a',
    { href: 'javascript:void(0)' },
    'Learn more ',
    _react2.default.createElement(Icon, { name: 'external' })
  ),
  _react2.default.createElement(
    'ul',
    { className: 'awsui-list-unstyled' },
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/' },
        'What is Scale Out Computing?'
      )
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://awslabs.github.io/scale-out-computing-on-aws/' },
        'Getting started'
      )
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc' },
        'Working with instances'
      )
    )
  )
)];
});

require.register("components/User-management.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ServiceNavigation = require('./ServiceNavigation.jsx');

var _ServiceNavigation2 = _interopRequireDefault(_ServiceNavigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This is just a playground package. It does not comply with best practices
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of using AWS-UI components. For production code, follow the integration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               guidelines:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://polaris.corp.amazon.com/getting_started/development/integration/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ************************************************************************/


var _window$AWSUICompon = window['AWS-UI-Components-React'],
    AppLayout = _window$AWSUICompon.AppLayout,
    BreadcrumbGroup = _window$AWSUICompon.BreadcrumbGroup;

// Class Basic is a skeleton of the basic App layout using AWS-UI React components.

var UserManagement = function (_React$Component) {
  _inherits(UserManagement, _React$Component);

  function UserManagement() {
    _classCallCheck(this, UserManagement);

    return _possibleConstructorReturn(this, (UserManagement.__proto__ || Object.getPrototypeOf(UserManagement)).apply(this, arguments));
  }

  _createClass(UserManagement, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(AppLayout, {
        navigation: _react2.default.createElement(_ServiceNavigation2.default, null) // Navigation panel content imported from './ServiceNavigation.jsx'
        , breadcrumbs: _react2.default.createElement(Breadcrumbs, null) // Breadcrumbs element defined below
        , content: _react2.default.createElement(Content, null) // Main content on the page, defined below
        , contentType: 'default' // Sets default app layout settings for widths
        , tools: Tools // Tools panel content defined below
      });
    }
  }]);

  return UserManagement;
}(_react2.default.Component);

// Breadcrumb content


exports.default = UserManagement;
var Breadcrumbs = function Breadcrumbs() {
  return _react2.default.createElement(BreadcrumbGroup, {
    items: [{
      text: 'Scale Out Computing',
      href: '#/service-home'
    }, {
      text: 'Dashboard',
      href: '#/dashboard'
    }, {
      text: 'User management',
      href: '#/user-management'
    }]
  });
};

// Main content area (fill it in with components!)
var Content = function Content() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h2',
      null,
      'User management'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Hello from p in div'
    )
  );
};

// Help panel content
var Tools = _react2.default.createElement(
  'div',
  { className: 'awsui-util-help-panel' },
  _react2.default.createElement(
    'div',
    { className: 'awsui-util-help-panel-header' },
    _react2.default.createElement(
      'h2',
      null,
      'Scale Out Computing'
    )
  ),
  _react2.default.createElement(
    'ul',
    { className: 'awsui-list-unstyled' },
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://docs.aws.amazon.com/solutions/latest/scale-out-computing-on-aws/welcome.html' },
        'What is Scale Out Computing on AWS?'
      )
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://aws.amazon.com/solutions/implementations/scale-out-computing-on-aws/' },
        'Getting started'
      )
    ),
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc' },
        'Working with instances'
      )
    )
  )
);
});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _App = require('components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(
    _reactRouterDom.HashRouter,
    null,
    _react2.default.createElement(_App2.default, null)
  ), document.querySelector('#app'));
});
});

require.register("resources/data-provider.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataProvider = function () {
  function DataProvider() {
    _classCallCheck(this, DataProvider);
  }

  _createClass(DataProvider, [{
    key: 'getData',
    value: function getData(name, callback) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          callback(JSON.parse(this.responseText));
        }
      };
      xhttp.open('GET', './' + name + '.json', true);
      xhttp.send();
    }
  }]);

  return DataProvider;
}();

exports.default = DataProvider;
});

;require.register("resources/fakeServer.js", function(exports, require, module) {
'use strict';

(function () {
  var items = [];

  var fetchItems = function fetchItems(options, callback) {
    if (items.length === 0) {
      fetchActualItems(function (response) {
        items = response;
        setTimeout(function () {
          callback(prepareResponse(options));
        }, 500);
      });
    } else options = options || {};
    setTimeout(function () {
      callback(prepareResponse(options));
    }, 500);
  };

  var fetchActualItems = function fetchActualItems(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        callback(JSON.parse(this.responseText));
      }
    };
    xhttp.open('GET', '../resources/distributions.json', true);
    xhttp.send();
  };

  var createComparator = function createComparator(options) {
    var qualifier = options.sortingDescending ? -1 : 1;
    var field = options.sortingColumn;
    return function (a, b) {
      return a[field] > b[field] ? qualifier : -qualifier;
    };
  };

  var prepareResponse = function prepareResponse(options) {
    var output = {};
    if (options.filteringText) {
      output.items = items.filter(function (item) {
        for (var prop in item) {
          if (item.hasOwnProperty(prop) && item[prop].toLowerCase().indexOf(options.filteringText.toLowerCase()) !== -1) {
            return true;
          }
        }
        return false;
      });
    } else {
      output.items = items.slice();
    }
    if (options.sortingColumn) {
      output.items.sort(createComparator(options));
    }
    if (options.pageSize && options.currentPageIndex) {
      var pageSize = options.pageSize;
      var currentPageIndex = options.currentPageIndex;
      var currentItems = output.items;
      if ((currentPageIndex - 1) * pageSize > currentItems.length) {
        currentPageIndex = 1;
      }

      output.pagesCount = Math.ceil(currentItems.length / pageSize);
      output.currentPageIndex = currentPageIndex;
      output.items = currentItems.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);
    } else {
      output.pagesCount = 1;
      output.currentPageIndex = 1;
    }

    return output;
  };

  window.fetchItems = fetchItems;
})();
});

require.register("resources/form-config.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PRICE_CLASS_OPTIONS = exports.PRICE_CLASS_OPTIONS = [{ label: 'Use all edge locations (best performance)', value: '0' }, { label: 'Use only US, Canada, and Europe', value: '1' }, { label: 'Use only US, Canada, Europe, and Asia', value: '2' }];

var SSL_CERTIFICATE_OPTIONS = exports.SSL_CERTIFICATE_OPTIONS = [{
  label: 'Default CloudFront SSL/TLS certificate',
  value: 'default',
  description: 'Provides HTTPS or HTTP access to your content using a CloudFront domain name.'
}, {
  label: 'Custom SSL/TLS certificate (example.com)',
  value: 'custom',
  description: 'Grants access by using an alternate domain name, such as https://www.example.com/.'
}];

var SUPPORTED_HTTP_VERSIONS_OPTIONS = exports.SUPPORTED_HTTP_VERSIONS_OPTIONS = [{ label: 'HTTP 2', value: 'http2' }, { label: 'HTTP 1', value: 'http1' }];

var VIEWER_PROTOCOL_POLICY_OPTIONS = exports.VIEWER_PROTOCOL_POLICY_OPTIONS = [{ label: 'HTTP and HTTPS', value: '0' }, { label: 'Redirect HTTP to HTTPS', value: '1' }, { label: 'HTTPS Only', value: '2' }];

var ALLOWED_HTTP_METHOD_OPTIONS = exports.ALLOWED_HTTP_METHOD_OPTIONS = [{ label: 'GET, HEAD', value: '0' }, { label: 'GET, HEAD, OPTIONS', value: '1' }, { label: 'GET, HEAD, OPTIONS, PUT, POST, PATCH', value: '2' }];

var FORWARD_HEADER_OPTIONS = exports.FORWARD_HEADER_OPTIONS = [{ label: 'None', value: 'none' }, { label: 'Whitelist', value: 'whitelist' }, { label: 'All', value: 'all' }];

var COOKIE_OPTIONS = exports.COOKIE_OPTIONS = [{ label: 'None', value: 'none' }, { label: 'Whitelist', value: 'whitelist' }, { label: 'All', value: 'all' }];

var QUERY_STRING_OPTIONS = exports.QUERY_STRING_OPTIONS = [{ label: 'None', value: 'none' }, { label: 'Whitelist', value: 'whitelist' }, { label: 'All', value: 'all' }];

var CURRENT_COMPRESSION_OPTIONS = exports.CURRENT_COMPRESSION_OPTIONS = [{ label: 'Manual', value: 'manual' }, { label: 'Automatic', value: 'automatic' }];

var DELIVERY_METHOD = exports.DELIVERY_METHOD = [{
  label: 'Ubuntu Linux',
  value: 'ubuntu',
  description: 'Create engine instance using Linux machine image. This is the most common choice.'
}, {
  label: 'Windows 10',
  value: 'windows',
  description: 'Create engine instance using Windows machine image.'
}, {
  label: 'CentOS 7',
  value: 'centos',
  description: 'Create engine instance using CentOS machine image.'
}];
});

require.register("resources/table/table-config.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Icon = window['AWS-UI-Components-React'].Icon;
var COLUMN_DEFINITIONS = exports.COLUMN_DEFINITIONS = [{
  id: 'id',
  header: function header() {
    return 'Project ID';
  },
  cell: function cell(item) {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'a',
        { href: 'javascript:void(0)' },
        item.id
      )
    );
  },
  minWidth: '180px',
  allowLineWrap: true
}, {
  id: 'domainName',
  cell: function cell(item) {
    return item.domainName;
  },
  header: function header() {
    return 'Domain name';
  },
  minWidth: '160px',
  allowLineWrap: true
}, {
  id: 'deliveryMethod',
  header: function header() {
    return 'Delivery method';
  },
  cell: function cell(item) {
    return item.deliveryMethod;
  },
  minWidth: '100px',
  allowLineWrap: true
}, {
  id: 'priceClass',
  header: function header() {
    return 'Price class';
  },
  cell: function cell(item) {
    return item.priceClass;
  },
  minWidth: '100px',
  allowLineWrap: true
}, {
  id: 'sslCertificate',
  header: function header() {
    return 'SSL certificate';
  },
  cell: function cell(item) {
    return item.sslCertificate;
  },
  minWidth: '100px',
  allowLineWrap: true
}, {
  id: 'origin',
  header: function header() {
    return 'Origin';
  },
  cell: function cell(item) {
    return item.origin;
  },
  minWidth: '100px',
  allowLineWrap: true
}, {
  id: 'status',
  header: function header() {
    return 'Status';
  },
  cell: function cell(item) {
    return item.status;
  },
  minWidth: '100px',
  allowLineWrap: true
}, {
  id: 'state',
  header: function header() {
    return 'State';
  },
  cell: function cell(item) {
    return React.createElement(
      'div',
      { className: 'awsui-util-status-' + (item.state === 'Disabled' ? 'negative' : 'positive') },
      React.createElement(Icon, { name: item.state === 'Disabled' ? 'status-negative' : 'status-positive' }),
      React.createElement(
        'span',
        null,
        ' ' + item.state
      )
    );
  },
  minWidth: '100px',
  allowLineWrap: true
}, {
  id: 'logging',
  header: function header() {
    return 'Logging';
  },
  cell: function cell(item) {
    return item.logging;
  },
  minWidth: '100px',
  allowLineWrap: true
}];

var SORTABLE_COLUMNS = exports.SORTABLE_COLUMNS = [{ id: 'id', field: 'id' }, { id: 'domainName', field: 'domainName' }, { id: 'deliveryMethod', field: 'deliveryMethod' }, { id: 'priceClass', field: 'priceClass' }, { id: 'sslCertificate', field: 'sslCertificate' }, { id: 'origin', field: 'origin' }, { id: 'status', field: 'status' }, { id: 'state', field: 'state' }, { id: 'logging', field: 'logging' }];

var CONTENT_SELECTOR_OPTIONS = exports.CONTENT_SELECTOR_OPTIONS = [{
  label: 'Main distribution properties',
  options: [{ id: 'id', label: 'Distribution ID', editable: false, visible: true }, { id: 'domainName', label: 'Domain name', editable: true, visible: true }, {
    id: 'deliveryMethod',
    label: 'Delivery method',
    editable: true,
    visible: true
  }, {
    id: 'priceClass',
    label: 'Price class',
    editable: true,
    visible: false
  }, {
    id: 'sslCertificate',
    label: 'SSL certificate',
    editable: true,
    visible: true
  }, { id: 'origin', label: 'Origin', editable: true, visible: false }, { id: 'status', label: 'Status', editable: true, visible: true }, { id: 'state', label: 'State', editable: true, visible: true }, { id: 'logging', label: 'Logging', editable: true, visible: false }]
}];

var PAGE_SELECTOR_OPTIONS = exports.PAGE_SELECTOR_OPTIONS = [{ value: 10, label: '10 Distributions' }, { value: 30, label: '30 Distributions' }, { value: 50, label: '50 Distributions' }];

var CUSTOM_PREFERENCE_OPTIONS = exports.CUSTOM_PREFERENCE_OPTIONS = [{ value: 'table', label: 'Table' }, { value: 'cards', label: 'Cards' }];
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map