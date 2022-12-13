/**
 *
 * @param {'stack' | 'drawer' | 'bottom-tab' | 'top-tab' | undefined} navigatorTypeSuffix
 * @returns
 */
const newNavigatorConstant = navigatorTypeSuffix => {
  return {
    type: 'append',
    pattern: '__CODE_GENERATOR__',
    path: 'src/constants/navigators.ts',
    template: `  {{pascalCase navigatorName}}${
      navigatorTypeSuffix ? `{{pascalCase '${navigatorTypeSuffix}'}}` : ''
    } = '{{pascalCase navigatorName}}Navigator',`,
  };
};

/**
 *
 * @param {'stack' | 'drawer' | 'bottom-tab' | 'top-tab' | undefined} navigatorType
 * @returns
 */
const appendNewScreenNameConstant = navigatorType => {
  const template = [
    "  {{pascalCase navigatorName}}Home = '{{pascalCase navigatorName}}HomeScreen',",
  ];

  if (navigatorType === 'drawer') {
    template.unshift(
      "  {{pascalCase navigatorName}}DrawerHome = '{{pascalCase navigatorName}}DrawerHome',",
    );
  }
  return {
    type: 'append',
    pattern: '__CODE_GENERATOR__',
    path: 'src/constants/screens.ts',
    template: template.join('\n'),
  };
};

module.exports = {
  newNavigatorConstant,
  appendNewScreenNameConstant,
};
