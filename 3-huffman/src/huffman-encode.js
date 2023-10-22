const { getCodeMap } = require('./get-code-map');
const { getCodeTree } = require('./get-code-tree');

const huffmanEncode = (inputString) => {
  const codeTree = getCodeTree(inputString);
  const codeMap = getCodeMap(codeTree);

  const encodedString = inputString
    .split('')
    .map((char) => codeMap[char])
    .join('');

  return {
    codeTree,
    encodedString,
  };
};

module.exports = { huffmanEncode };
