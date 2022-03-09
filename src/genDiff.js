import path from 'path';
import parse from './parser.js';
import buildAst from './buildAst.js';
import format from './formatters/index.js';

const genDiff = (file1, file2, formatter) => {
  const objectForFile1 = parse(file1, path.extname(file1));
  const objectForFile2 = parse(file2, path.extname(file2));

  const ast = buildAst(objectForFile1, objectForFile2);
  return format(ast, formatter);
};

export default genDiff;
