const input = document.getElementById('input');
const code = document.getElementById('code');

code.addEventListener('click', () => {
  console.log(input.value);
});

// TODO: валидацию формы

const sum = (...args) => args.reduce((acc, el) => acc + el, 0);

/**
 * @param {string} inputCode - Входная последовательность бит
 */
const hamming = (inputCode) => {
  const codeBits = inputCode.split('').map((el) => Number(el));

  const controlBits = [];
  controlBits[0] = sum(codeBits[0] + codeBits[2] + codeBits[3]) % 2;
  controlBits[0] = sum(codeBits[0] + codeBits[2] + codeBits[3]) % 2;
};
