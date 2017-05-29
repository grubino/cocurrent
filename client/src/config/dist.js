'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  apiHost: 'localhost',
  apiPort: 8080
};

export default Object.freeze(Object.assign({}, baseConfig, config));
