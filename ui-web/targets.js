module.exports = isEnvProduction =>
  isEnvProduction
    ? ['>0.2%', 'not dead', 'not op_mini all']
    : [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version',
      ];
