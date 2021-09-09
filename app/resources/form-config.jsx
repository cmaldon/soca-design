export const INPUT_OPTIONS = [
  { label: 'Service-managed S3 bucket (best performance)', value: '0' },
  { label: 'Customer-specified S3 bucket', value: '1' }
];

export const SSL_CERTIFICATE_OPTIONS = [
  {
    label: 'Default CloudFront SSL/TLS certificate',
    value: 'default',
    description: 'Provides HTTPS or HTTP access to your content using a CloudFront domain name.'
  },
  {
    label: 'Custom SSL/TLS certificate (example.com)',
    value: 'custom',
    description: 'Grants access by using an alternate domain name, such as https://www.example.com/.'
  }
];

export const SUPPORTED_HTTP_VERSIONS_OPTIONS = [
  { label: 'HTTP 2', value: 'http2' },
  { label: 'HTTP 1', value: 'http1' }
];

export const VIEWER_PROTOCOL_POLICY_OPTIONS = [
  { label: 'HTTP and HTTPS', value: '0' },
  { label: 'Redirect HTTP to HTTPS', value: '1' },
  { label: 'HTTPS Only', value: '2' }
];

export const ALLOWED_HTTP_METHOD_OPTIONS = [
  { label: 'GET, HEAD', value: '0' },
  { label: 'GET, HEAD, OPTIONS', value: '1' },
  { label: 'GET, HEAD, OPTIONS, PUT, POST, PATCH', value: '2' }
];

export const FORWARD_HEADER_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Whitelist', value: 'whitelist' },
  { label: 'All', value: 'all' }
];

export const COOKIE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Whitelist', value: 'whitelist' },
  { label: 'All', value: 'all' }
];

export const QUERY_STRING_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Whitelist', value: 'whitelist' },
  { label: 'All', value: 'all' }
];

export const CURRENT_COMPRESSION_OPTIONS = [
  { label: 'Manual', value: 'manual' },
  { label: 'Automatic', value: 'automatic' }
];

export const DELIVERY_METHOD = [
  {
    label: 'Ubuntu Linux',
    value: 'ubuntu',
    description: 'Create engine instance using Linux machine image. This is the most common choice.'
  },
  {
    label: 'Windows 10',
    value: 'windows',
    description: 'Create engine instance using Windows machine image.'
  },
  {
    label: 'CentOS 7',
    value: 'centos',
    description: 'Create engine instance using CentOS machine image.'
  }
];
