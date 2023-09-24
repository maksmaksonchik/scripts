const fs = require('fs');

const argv = process.argv.slice(2);

class MyError extends Error {
  constructor(code) {
    super();
    this.code = code;
  }
}

const ERROR_MESSAGES = {
  NO_ARGS: 'Неправильное количество аргументов. Ожидается 3 аргумента: node rle <encode | decode> <inputPath> <output-path>',
  INVALID_FN: 'Несуществующий режим работы программы. Ожидается: encode | decode',
  ENOENT: 'Входной файл с таким именем не существует',
};

const encode = (input) => {
  const res = [];
  let i = 0;
  let n = 1;

  while (i < input.length) {
    while (input[i] === input[i + n] && n < 255) {
      n += 1;
    }

    const encodedSequence = (n > 3 || input[i] === '#')
      ? ['#', String.fromCharCode(n % 256), input[i]]
      : Array(n).fill(input[i]);
    res.push(...encodedSequence);

    i += n;
    n = 1;
  }

  const output = res.join('');
  const ratio = (output.length / input.length);
  const message = `Файл закодирован.\nКоэффициент сжатия: ${ratio}`;

  return { output, ratio, message };
};

const decode = (input) => {
  let i = 0;
  const res = [];
  while (i < input.length) {
    if (input[i] === '#') {
      const decodedSequence = Array(input.charCodeAt(i + 1)).fill(input[i + 2]);
      res.push(...decodedSequence);
      i += 3;
    } else {
      res.push(input[i]);
      i += 1;
    }
  }
  const output = res.join('');
  const ratio = input.length / output.length;
  const message = `Файл декодирован.\nКоэффициент сжатия: ${ratio}`;

  return { output, ratio, message };
};

const FunctionsEnum = {
  encode,
  decode,
};

const rle = (args) => {
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
  console.log(rle(argv));
} catch (e) {
  if (e.code in ERROR_MESSAGES) {
    console.error(ERROR_MESSAGES[e.code]);
  }

  console.error(e);
}
