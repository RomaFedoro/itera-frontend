const cases = [2, 0, 1, 1, 1, 2];

const plural = (count: number, words: [string, string, string]) => {
  return words[
    count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
  ];
};

export default plural;
