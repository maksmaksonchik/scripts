const getFrequencyMap = (str) => {
  const map = new Map();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    map.set(char, map.has(char) ? map.get(char) + 1 : 1);
  }

  return map;
};

module.exports = { getFrequencyMap };
