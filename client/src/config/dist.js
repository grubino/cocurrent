

import baseConfig from './base';

const config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  apiHost: 'ec2-54-236-62-211.compute-1.amazonaws.com',
  apiPort: 8080
};

export default Object.freeze(Object.assign({}, baseConfig, config));
