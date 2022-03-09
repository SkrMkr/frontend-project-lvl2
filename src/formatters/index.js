import plain from './plain.js';
import stylish from './stylish.js';

const format = (ast, formatter) => {
  switch (formatter) {
    case 'json':
      return JSON.stringify(ast);
    case 'plain':
      return plain(ast);
    default:
      return stylish(ast);
  }
};

export default format;
