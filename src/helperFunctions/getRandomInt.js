export default function getRandomInt (min, max) {  // max not included
  return Math.floor(Math.random() * max + min);
}

console.log(getRandomInt(0, 4));