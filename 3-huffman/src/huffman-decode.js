const { CodeTreeNode } = require('./classes/code-tree-node');

const huffmanDecode = (encodedString, codeTree) => {
  const encodedArray = encodedString.split('');

  let currentNode = codeTree;

  const decodedString = encodedArray
    .reduce((decodedArray, bit) => {
      currentNode = bit === '0' ? currentNode.left : currentNode.right;
      if (CodeTreeNode.isLeaf(currentNode)) {
        currentNode = codeTree;
        return [...decodedArray, currentNode.char];
      }
      return decodedArray;
    }, [])
    .join('');

  return { decodedString };
};

module.exports = { huffmanDecode };
