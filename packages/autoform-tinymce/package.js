Package.describe({
  name: 'dhl:autoform-tinymce',
  version: '1.0.3',
  // Brief, one-line summary of the package.
  summary: 'A small Meteor package to add the TinyMCE WYSIWYG editor as an Autoform input type',
  // URL to the Git repository containing the source code for this package.
  git:'https://github.com/dhl/autoform-tinymce',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('blaze-html-templates');
  api.use('teamon:tinymce@4.3.3_3');
  api.use('aldeed:autoform@5.7.1');
  api.addFiles('autoform-tinymce.html', 'client');
  api.addFiles('autoform-tinymce.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('skehoe1989:autoform-tinymce');
  api.addFiles('autoform-tinymce-tests.js');
});
