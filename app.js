const cards = [
  'hog',
  'valk',
  'wizard',
  'golem',
  'witch'
]

// - click event on 'new game' button
window.addEventListener('load', onLoad);

function onLoad() {
  const $newGameButton = document.querySelector('#new-game');

  // deal a game on 'new game'
  $newGameButton.addEventListener('click', dealGame);

  // console.log($newGameButton);
}

function dealGame() {
  // create game-ID
  let gameID = 1;
  let numberOfPositions = cards.length * 2;

  // loop through cards and add random unique position 0-9
  let positions = generatePositions(numberOfPositions);
  let randomPositions = randomizeArray(positions);

  // create tiles and assign cards to positions
  let tiles = createTiles(cards, randomPositions);

  // convert game positions to JSON
  let board = JSON.stringify(tiles);

  console.log(board);

  // save game (ID and positions) in local storage
  localStorage.board = board;
}

function generatePositions(numberOfPositions) {
  let positions = [];
  for (i = 0; i < numberOfPositions; i++) {
    positions.push(i);
  }
  return positions;
}

function randomizeArray(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function createTiles(cards, positions) {
  // deal each card twice to respective index in positions
  let tiles = [];
  cards.forEach((card) => {
    [0,1].forEach(() => {
      tiles.push({
        card: card,
        position: positions.shift()
      })
    })
  })
  return tiles;
}

// - click event on 'start game' button
//   - render game
//   - timer starts
//   - turn count 1++

// - click event on active tile
//   - 1st: open card
//   - 2nd:
//     - open card
//     - compare cards
//     - if equal: capture
//       - remove card from position
//       - set card statusses to 'captured'
//       - score count 1++
//       - check if no uncaptured cards are left: game over
//     - else: close both cards
//     - turn count 1++

// - game over:
//   - timer stops
//   - display time & turn count
//   - close game button

