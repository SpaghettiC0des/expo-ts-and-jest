const path = require('path');

const sharedActions = require('./sharedActions');

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  const NAVIGATOR_SUFFIX = 'Navigator';

  plop.setGenerator('stack-navigator', {
    description: 'creates a new stack navigator',
    prompts: [
      {
        type: 'list',
        default: 0,
        choices: [
          {
            name: 'None',
            value: undefined,
          },
          {
            name: 'MainStack',
            value: 'MainStack',
          },
          {
            name: 'MainDrawer',
            value: 'MainDrawer',
          },
          {
            name: 'AuthStack',
            value: 'AuthStack',
          },
        ],
        message: 'Select a parent navigator',
        name: 'parentNavigator',
      },
      {
        type: 'input',
        name: 'navigatorName',
        message: 'Navigator name',
        validate(navigatorName) {
          if (navigatorName.length) {
            return new RegExp(NAVIGATOR_SUFFIX, 'i').test(
              navigatorName.toLowerCase(),
            )
              ? 'Remove the navigator suffix.'
              : true;
          }

          return !!navigatorName.length || 'Navigator name is required!';
        },
      },
    ],
    actions(answers) {
      const isMainDrawer = answers.parentNavigator === 'MainDrawer';
      const actions = [
        {
          type: 'add',
          templateFile: path.join(
            __dirname,
            answers.parentNavigator && !isMainDrawer
              ? 'StackNavigatorWithParent.hbs'
              : 'StackNavigator.hbs',
          ),
          path: 'src/navigation/{{pascalCase navigatorName}}Stack.tsx',
        },
        {
          type: 'add',
          templateFile: path.join(__dirname, 'Screen.hbs'),
          path: 'src/screens/{{pascalCase navigatorName}}Home.tsx',
        },
        {
          type: 'append',
          pattern: '__CODE_GENERATOR__',
          path: 'src/screens/index.ts',
          template: "export * from './{{pascalCase navigatorName}}Home';",
        },
        sharedActions.appendNewScreenNameConstant(
          isMainDrawer ? 'drawer' : 'stack',
        ),
        sharedActions.newNavigatorConstant('stack'),
        {
          type: 'append',
          path: 'src/navigation/types.ts',
          templateFile: path.join(__dirname, 'NewStackTypes.hbs'),
          pattern: '__PARAMS_LIST__',
        },
        {
          type: 'append',
          path: 'src/navigation/types.ts',
          templateFile: path.join(
            __dirname,
            answers.parentNavigator
              ? 'NestedNavigatorScreenProps.hbs'
              : 'StackScreenProps.hbs',
          ),
          pattern: '__STACK_SCREEN_PROPS__',
        },
      ];

      if (answers.parentNavigator) {
        const typingsComment = {
          MainStack: '__MAIN_STACK__',
          AuthStack: '__AUTH_STACK__',
          MainDrawer: '__MAIN_DRAWER__',
        };

        return [
          {
            type: 'append',
            path: 'src/navigation/types.ts',
            template: isMainDrawer
              ? '  [Screens.{{pascalCase navigatorName}}DrawerHome]?: NavigatorScreenParams<{{pascalCase navigatorName}}StackParamList>;'
              : '  [Navigators.{{pascalCase navigatorName}}Stack]: undefined;',
            pattern: typingsComment[answers.parentNavigator],
          },
          {
            type: 'append',
            path: `src/navigation/${answers.parentNavigator}.tsx`,
            template:
              "import {{preCurly (pascalCase navigatorName)}}StackNavigator{{append '' '}'}} from './{{pascalCase navigatorName}}Stack';",
            pattern: '__CODE_GENERATOR_IMPORTS__',
          },
          {
            type: 'append',
            path: `src/navigation/${answers.parentNavigator}.tsx`,
            template: isMainDrawer
              ? "    <Screen component={{preCurly (pascalCase navigatorName)}}StackNavigator{{append '' '}'}} name={Screens.{{pascalCase navigatorName}}DrawerHome} options={{append '' '{{drawerLabel:'}}'{{titleCase navigatorName}}'{{append '' '}}'}}/>"
              : "    <Screen component={{preCurly (pascalCase navigatorName)}}StackNavigator{{append '' '}'}} name={Navigators.{{pascalCase navigatorName}}Stack} />",
            pattern: '__CODE_GENERATOR__ */}',
          },
          ...actions,
        ];
      }

      return actions;
    },
  });
};
