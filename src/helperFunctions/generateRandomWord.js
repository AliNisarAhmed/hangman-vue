export default function generateRandomWord(arr, word) {
  let random = Math.floor(Math.random() * arr.length);
  while (word && arr[random] === word) {
    random = Math.floor(Math.random() * arr.length);
  }
  return arr[random];
}

// takes a random word out of the array of words, and splits that word to an array
