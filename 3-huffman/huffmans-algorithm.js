class User {
  constructor(char, freq, isUsed, parent) {
    this.char = char;
    this.freq = freq;
    this.isUsed = isUsed;
    this.parent = parent;
  }
}

const getDict = (str) => {
  const dict = [];

  for (let i; i < str.length; i++) {
    if (str[i] in dict) {
      dict[str[i]] += 1;
    } else {
      dict[str[i]] = 1;
    }
  }

  return dict;
};

const tree = [];

// раннее связывание и позднее связывание
