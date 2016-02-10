var env = process.env.NODE_ENV || 'local';

module.exports = {
  env: env,
  useBuildAssets: (env == 'production')
};
