const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '..', '..', 'src', 'assets', 'images');

fs.readdir(dirPath, (err, files) => {
  if (err) {
    return console.error(err);
  }
  const filtered = files.filter(f => !/@|.js|.ts/.test(f));

  const body = filtered.reduce((acc, f) => {
    return `${acc ? `${acc},\n    ` : ''}${f.replace(
      /.png|.jpg/,
      '',
    )}: () => require('./${f}')`;
  }, '');

  fs.writeFileSync(
    path.join(dirPath, 'index.ts'),
    `export const Images = {
      ${body}
    }`,
  );
});
