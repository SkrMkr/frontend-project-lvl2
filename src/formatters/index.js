import plain from './plain.js';
import stylish from './stylish.js';

const formattedAst = (ast, formatter) => {
  switch (formatter) {
    case 'plain':
      return plain(ast);
    default:
      return stylish(ast);
  }
};

export default formattedAst;
