const targets = require('./targets');

module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);
  const isEnvProduction = process.env.NODE_ENV === 'production';

  return {
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-transform-destructuring',
    ],
    presets: [
      ['@babel/preset-env', { targets: targets(isEnvProduction) }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
  };
};
