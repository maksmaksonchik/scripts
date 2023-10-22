const traverseTree = (tree, path) => {
  if (tree.isLeaf()) {
    return { [tree.char]: path || '0' };
  }

  return {
    ...traverseTree(tree.left, `${path}0`),
    ...traverseTree(tree.right, `${path}1`),
  };
};

const getCodeMap = (codeTree) => traverseTree(codeTree, '');

module.exports = { getCodeMap };
