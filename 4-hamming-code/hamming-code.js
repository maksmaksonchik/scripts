const input = document.getElementById('inputBits');
const encodeBtn = document.getElementById('encodeBtn');
const inputError = document.getElementById('inputError');

const encoded = document.getElementById('encodedBits');
const decodeBtn = document.getElementById('decodeBtn');
const encodedError = document.getElementById('encodedError');

const decoded = document.getElementById('decodedBits');
const checkBtn = document.getElementById('checkBtn');
const checkResult = document.getElementById('checkResult');

/**
 * Массив, в котором на k-м месте находятся индексы информационных битов,
 * расположенных на схеме в одном круге с k-м контрольным битом:
 */
const CIRCLES_INDEXES = [
  [0, 1, 2],
  [0, 1, 3],
  [0, 2, 3],
];

/** Находит сумму элементов массива, находящихся по заданным индексами */
const sumByIndexes = (array, indexes) => indexes.reduce((sum, index) => sum + array[index], 0);

const validateInput = (inputNode, expectedLength) => {
  const inputString = inputNode.value.trim();
  const inputArray = inputString.split('');
  const isBitsString = inputArray.reduce((acc, char) => acc && (char === '0' || char === '1'), true);

  if (!isBitsString) {
    return { errorMessage: 'Ожидается последовательность нулей и единиц' };
  }

  if (inputString.length !== expectedLength) {
    return { errorMessage: `Ожидается последовательность длины ${expectedLength}` };
  }

  return { inputBits: inputArray.map((char) => Number(char)) };
};

const clearErrors = () => {
  inputError.textContent = '';
  encodedError.textContent = '';
  checkResult.textContent = '';
};

const encode = (e) => {
  e.preventDefault();
  clearErrors();
  decoded.value = '';

  const { errorMessage, inputBits } = validateInput(input, 4);

  if (errorMessage) {
    inputError.textContent = errorMessage;
    encoded.value = '';
    return;
  }

  const controlBits = [0, 1, 2].map((index) => sumByIndexes(inputBits, CIRCLES_INDEXES[index]) % 2);

  const encodedBits = [...inputBits, ...controlBits];

  encoded.value = encodedBits.join('');
};

const decode = (e) => {
  e.preventDefault();
  clearErrors();

  const { errorMessage, inputBits } = validateInput(encoded, 7);

  if (errorMessage) {
    encodedError.textContent = errorMessage;
    decoded.value = '';
    return;
  }

  const encodedBits = inputBits;

  const circlesWithError = [];

  // Считаем суммы для каждого круга и находим ошибки
  for (let i = 0; i < 3; i++) {
    const controlBitIndex = i + 4;

    const iCircleSum = sumByIndexes(encodedBits, [...CIRCLES_INDEXES[i], controlBitIndex]);

    if (iCircleSum % 2 === 1) {
      circlesWithError.push(i);
    }
  }

  const decodedBits = encodedBits.slice(0, 4);

  if (circlesWithError.length === 2) {
    // круги подобраны так, что индекс бита с ошибкой равен сумме индексов кругов с ошибками
    const errorBitIndex = circlesWithError[0] + circlesWithError[1];

    decodedBits[errorBitIndex] = (decodedBits[errorBitIndex] + 1) % 2;
  }

  if (circlesWithError.length === 3) {
    decodedBits[0] = (decodedBits[0] + 1) % 2;
  }

  decoded.value = decodedBits.join('');
};

const check = (e) => {
  e.preventDefault();
  clearErrors();

  if (decoded.value === '') {
    return;
  }

  const isEqual = input.value === decoded.value;

  if (isEqual) {
    checkResult.textContent = 'Расшифровано верно';
    checkResult.classList.remove('error');
    checkResult.classList.add('success');
    return;
  }

  checkResult.textContent = 'Расшифровано неверно';
  checkResult.classList.remove('success');
  checkResult.classList.add('error');
};

encodeBtn.addEventListener('click', encode);
decodeBtn.addEventListener('click', decode);
checkBtn.addEventListener('click', check);
