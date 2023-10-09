const { getCodeTree } = require('./get-code-tree');

const traverseTree = (tree, path) => {
  if (tree.isLeaf()) {
    return { [tree.char]: path || '0' };
  }

  return {
    ...traverseTree(tree.left, `${path}0`),
    ...traverseTree(tree.right, `${path}1`),
  };
};

const getCodeMap = (str) => {
  const codeTree = getCodeTree(str);

  return traverseTree(codeTree, '');
};

module.exports = { getCodeMap };
