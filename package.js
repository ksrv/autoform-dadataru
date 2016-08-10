Package.describe({
  name: 'ksrv:autoform-dadataru',
  version: '0.0.1',
  summary: 'Autoform fields for dadata.ru suggestions',
  git: 'git@github.com:ksrv/autoform-dadataru.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.0.1');
  api.use('ecmascript');
  api.use('jquery', 'client');
  api.use('templating', 'client');
  api.use('underscore', 'client');
  api.use('aldeed:autoform', 'client');
  api.addFiles('dadata-suggestions.js', 'client');
  api.addFiles('dadata-suggestions.css', 'client');
  api.addFiles('dadata.html', 'client');

  api.mainModule('dadata.js', 'client');
});

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('ksrv:dadata');
//   api.mainModule('dadata-tests.js');
// });
