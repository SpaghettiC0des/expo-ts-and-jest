const fs = require('fs');
const path = require('path');

const componentsPath = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'src',
  'components',
);

const parentFolders = fs
  .readdirSync(componentsPath)
  .filter(p => fs.statSync(path.join(componentsPath, p)).isDirectory());

function shouldSkipIfNoParent(parentFolderName) {
  return arg => (parentFolderName ? arg : 'No parent folder, skipping...');
}

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  /**@type {import('plop').PlopGeneratorConfig['prompts']} */
  const prompts = [
    {
      type: 'input',
      name: 'componentName',
      message: 'enter component name',
      validate(componentName) {
        return !!componentName || 'Component name is required!';
      },
    },
    {
      type: 'confirm',
      message: 'With styles?',
      default: false,
      name: 'withStyles',
    },
  ];

  if (!parentFolders.length) {
    prompts.unshift({
      type: 'input',
      name: 'folderName',
      message: 'enter folder name <press enter to skip>',
      default: undefined,
    });
  } else {
    prompts.unshift({
      type: 'list',
      name: 'folderName',
      message: 'select a folder name <press enter to skip>',
      choices: [
        {
          name: 'no parent folder',
          value: undefined,
        },
        ...parentFolders.map(folder => ({
          name: folder,
          value: folder,
        })),
      ],
    });
  }

  plop.setGenerator('component', {
    description: 'create a new component to src/components',
    prompts,
    actions(answers) {
      const parentFolder = answers.folderName
        ? `{{dashCase '${answers.folderName}'}}`
        : '';

      return [
        {
          type: 'add',
          templateFile: path.resolve(__dirname, 'templates', 'component.hbs'),
          path: `src/components/${parentFolder}/{{pascalCase componentName}}.tsx`,
        },
        {
          type: 'add',
          skipIfExists: true,
          path: 'src/components/index.ts',
          template: '// __CODE_GENERATOR__',
        },
        {
          type: 'add',
          skip: shouldSkipIfNoParent(parentFolder),
          skipIfExists: true,
          path: `src/components/${parentFolder}/index.ts`,
          template: '// __CODE_GENERATOR__',
        },
        {
          type: 'append',
          skip: shouldSkipIfNoParent(parentFolder),
          pattern: '__CODE_GENERATOR__',
          path: `src/components/${parentFolder}/index.ts`,
          template: "export * from './{{pascalCase componentName}}';",
        },
        {
          type: 'append',
          path: 'src/components/index.ts',
          pattern: '__CODE_GENERATOR__',
          template: `export * from './${
            parentFolder ? parentFolder : '{{pascalCase componentName}}'
          }';`,
        },
      ];
    },
  });
};
