const path = require('path');

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator('hook', {
    description: 'create a new react hook',
    prompts: [
      {
        type: 'input',
        name: 'hookName',
        message: 'enter hook name',
        validate(hookName) {
          return !!hookName || 'Hook name is required!';
        },
      },
    ],
    actions: [
      {
        type: 'add',
        templateFile: path.resolve(__dirname, 'templates', 'hook.hbs'),
        path: 'src/hooks/use{{pascalCase hookName}}.ts',
      },
      {
        type: 'add',
        skipIfExists: true,
        path: 'src/hooks/index.ts',
        template: '// __CODE_GENERATOR__',
      },
      {
        type: 'append',
        path: 'src/hooks/index.ts',
        pattern: '__CODE_GENERATOR__',
        template: "export * from './use{{pascalCase hookName}}';\n",
      },
    ],
  });
};
