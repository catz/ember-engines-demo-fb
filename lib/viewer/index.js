/* eslint-env node */
'use strict';

const EngineAddon = require('ember-engines/lib/engine-addon');

module.exports = EngineAddon.extend({
  name: 'viewer',

  lazyLoading: {
    enabled: true
  },

  isDevelopingAddon() {
    return true;
  },

  included(app) {
    this._super.included(app);
    this._customTransformsMap = app._customTransformsMap;

    this.import('vendor/lib/engine1.js', {
      using: [
        {
          transformation: 'fastbootShim'
        }
      ]
    });

    this.import('vendor/lib/engine2.js', {
      using: [
        {
          transformation: 'fastbootShim'
        }
      ]
    });
  }
});
