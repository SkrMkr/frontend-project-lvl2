import { readFileSync } from 'fs';
import path from 'path';
import parse from './parser.js';
import buildAst from './buildAst.js';
import format from './formatters/index.js';

const genDiff = (file1, file2, formatter) => {
  const content1 = readFileSync(path.resolve(file1));
  const content2 = readFileSync(path.resolve(file2));
  const objectForFile1 = parse(content1, path.extname(file1).slice(1));
  const objectForFile2 = parse(content2, path.extname(file2).slice(1));

  const ast = buildAst(objectForFile1, objectForFile2);
  return format(ast, formatter);
};

export default genDiff;
