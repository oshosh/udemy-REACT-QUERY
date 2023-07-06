// eslint-disable-next-line @typescript-eslint/no-var-requires
const { override, addWebpackAlias } = require('customize-cra');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
);
