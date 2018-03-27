'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const concat = require('broccoli-concat');

const files = ['lib1.js', 'lib2.js'];

const lib = concat(
  new Funnel('vendor/lib', {
    destDir: 'assets',
    include: files
  }),
  {
    outputFile: 'assets/parent_lib.js',
    headerFiles: files.map(f => `assets/${f}`),
    inputFiles: ['**/*']
  }
);

const libFB = fastbootTransform(lib);

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return new MergeTrees([app.toTree(), libFB]);
};
