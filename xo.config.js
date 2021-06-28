const config = require('@logto/essentials/.xo-config.json');

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
  },
};
