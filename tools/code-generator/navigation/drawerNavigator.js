const path = require('path');

const sharedActions = require('./sharedActions');

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator('drawer-navigator', {
    description: 'creates a new drawer navigator',
    prompts: [
      {
        type: 'input',
        name: 'navigatorName',
        default: 'Drawer',
        message: 'Drawer navigator name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/navigation/{{pascalCase navigatorName}}.tsx',
        templateFile: path.join(__dirname, 'DrawerNavigator.hbs'),
      },
      sharedActions.newNavigatorConstant('drawer'),
    ],
  });
};
