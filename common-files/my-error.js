class MyError extends Error {
  constructor(code) {
    super();
    this.code = code;
  }
}

const ERROR_MESSAGES = {
  NO_ARGS: 'Неправильное количество аргументов. Ожидается 3 аргумента: node rle <encode | decode> <input-path> <output-path>',
  INVALID_FN: 'Несуществующий режим работы программы. Ожидается: encode | decode',
  ENOENT: 'Входной файл с таким именем не существует',
};

module.exports = {
  MyError,
  ERROR_MESSAGES,
};
