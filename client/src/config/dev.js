

import baseConfig from './base';

const config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here,
  apiHost: 'localhost',
  apiPort: 8080
};

export default Object.freeze(Object.assign({}, baseConfig, config));
