//Idk why i made this but it just is :)
export const getRandomBackground = () => {
  let randomBgs = [
    'https://images8.alphacoders.com/106/1066910.png',
    'https://images6.alphacoders.com/108/1080594.png',
    'https://images7.alphacoders.com/108/1080593.png',
    'https://images5.alphacoders.com/737/737385.jpg',
    'https://images3.alphacoders.com/764/764967.png',
    'https://images3.alphacoders.com/776/776494.png',
  ];
  return randomBgs[Math.floor((Date.now() / (1000 * 60)) % randomBgs.length)];
};
