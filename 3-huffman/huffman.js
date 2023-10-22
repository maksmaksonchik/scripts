const fs = require('fs');
const { MyError, ERROR_MESSAGES } = require('../common-files/my-error');
const { huffmanEncode } = require('./src/huffman-encode');
const { huffmanDecode } = require('./src/huffman-decode');

const argv = process.argv.slice(2);

const CODE_TREE_PATH = 'code-tree.json';

const encode = (inputString) => {
  const { codeTree, encodedString } = huffmanEncode(inputString);

  fs.writeFileSync(CODE_TREE_PATH, JSON.stringify(codeTree), { encoding: 'utf-8' });

  return {
    output: encodedString,
    message: 'Сообщение закодировано',
  };
};

const decode = (inputString) => {
  const codeTreeString = fs.readFileSync(CODE_TREE_PATH, { encoding: 'utf-8' }).toString();

  const codeTree = JSON.parse(codeTreeString);

  const { decodedString } = huffmanDecode(inputString, codeTree);

  return {
    output: decodedString,
    message: 'Сообщение декодировано',
  };
};

const FunctionsEnum = {
  encode,
  decode,
};

const huffman = (args) => {
  if (args.length < 3) {
    throw new MyError('NO_ARGS');
  }

  const [fn, inputPath, outputPath] = args;

  if (!(fn in FunctionsEnum)) {
    throw new MyError('INVALID_FN');
  }

  const input = fs.readFileSync(inputPath, { encoding: 'utf-8' }).toString();

  const { output, message } = FunctionsEnum[fn](input);

  fs.writeFileSync(outputPath, output, { encoding: 'utf-8' });

  return message;
};

try {
  console.log(huffman(argv));
} catch (e) {
  if (e.code in ERROR_MESSAGES) {
    console.error(ERROR_MESSAGES[e.code]);
  } else {
    console.error(e);
  }
}
