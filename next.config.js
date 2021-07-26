const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.join(__dirname, 'src/'),
    };
    return config;
  },
  env: {
    API_URL: process.env.API_URL,
    LOGIN_EMAIL: process.env.LOGIN_EMAIL,
    LOGIN_PASSWORD: process.env.LOGIN_PASSWORD,
  },
};
