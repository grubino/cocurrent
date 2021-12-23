

import baseConfig from './base';

const config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here,
  apiHost: '207.246.81.133',
  apiPort: 8080
};

export default Object.freeze(Object.assign({}, baseConfig, config));
