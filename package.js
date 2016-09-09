Package.describe({
  name: 'ksrv:autoform-dadataru',
  version: '0.0.2',
  summary: 'Autoform fields for dadata.ru suggestions',
  git: 'htpps://github.com/ksrv/autoform-dadataru.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.0.1');
  api.use('ecmascript');
  api.use('templating');
  api.use('underscore');

  api.use('jquery', ['client']);

  api.use('aldeed:autoform@5.8.1', ['client']);

  api.addFiles('dadata-suggestions.js',   ['client']);
  api.addFiles('dadata-suggestions.css',  ['client']);
  api.addFiles('dadata.html',             ['client']);

  api.mainModule('dadata.js', ['client']);
});
