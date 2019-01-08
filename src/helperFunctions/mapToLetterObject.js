import getRandomInt from './getRandomInt';

export default function mapToLetterObject (word) {
  let randomLettersReqd = Math.floor(word.length / 3);  // for every 4th letter in a word, we get an 'open' letter
  let arr = new Array(randomLettersReqd).fill(1);
  arr = arr.map(() => getRandomInt(0, word.length)).sort((a, b) => b - a);  
  return word.split('').map((letter, i) => {
    if (i === arr[arr.length - 1]) {
      arr.pop();
      return { letter, isShowing: true };
    }
    return {
      letter,
      isShowing: false,
    };
  })
}