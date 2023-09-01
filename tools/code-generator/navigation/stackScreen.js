const path = require('path');

const SCREEN_SUFFIX = 'SCREEN';

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  const typingsComment = {
    MainStack: '__MAIN_STACK__',
    AuthStack: '__AUTH_STACK__',
  };
  plop.setGenerator('stack-screen', {
    description: 'creates a new screen for a stack navigator',
    prompts: [
      {
        type: 'list',
        default: 0,
        choices: [
          {
            name: 'Main',
            value: 'MainStack',
          },
          {
            name: 'Drawer',
            value: 'Drawer',
          },
          {
            name: 'Auth',
            value: 'AuthStack',
          },
        ],
        message: 'Select a navigator',
        name: 'parentNavigator',
      },
      {
        type: 'input',
        name: 'screenName',
        message: 'Screen name',
        validate(screenName) {
          if (screenName.length) {
            return new RegExp(SCREEN_SUFFIX, 'i').test(screenName.toLowerCase())
              ? 'Remove the `screen` suffix.'
              : true;
          }

          return !!screenName.length || 'Screen name is required!';
        },
      },
    ],
    actions(answers) {
      return [
        {
          type: 'add',
          path: 'src/screens/{{pascalCase screenName}}.tsx',
          templateFile: path.join(__dirname, 'NewStackScreen.hbs'),
        },
        {
          type: 'append',
          pattern: '__CODE_GENERATOR__',
          path: 'src/constants/screens.ts',
          template:
            "  {{pascalCase screenName}} = '{{pascalCase screenName}}Screen',",
        },
        {
          type: 'append',
          path: 'src/navigation/types.ts',
          template: '  [Screens.{{pascalCase screenName}}]: undefined;',
          pattern: typingsComment[answers.parentNavigator],
        },
        {
          type: 'append',
          pattern: '__CODE_GENERATOR__',
          path: 'src/screens/index.ts',
          template: "export * from './{{pascalCase screenName}}';",
        },
        {
          type: 'append',
          path: `src/navigation/${answers.parentNavigator}.tsx`,
          template:
            "import {{preCurly (pascalCase screenName)}}Screen{{append '' '}'}} from '@src/screens';",
          pattern: '__CODE_GENERATOR_IMPORTS__',
        },
        {
          type: 'append',
          path: `src/navigation/${answers.parentNavigator}.tsx`,
          template:
            "    <Screen component={{preCurly (pascalCase screenName)}}Screen{{append '' '}'}} name={Screens.{{pascalCase screenName}}{{append '' '}'}} />",
          pattern: '__CODE_GENERATOR__ */}',
        },
      ];
    },
  });
};
