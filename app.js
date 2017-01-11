const cards = [
  'hog-rider',
  'valkyrie',
  'wizard',
  'golem',
  'witch',
  'dragon'
]

window.addEventListener('load', onLoad);

// - click event on 'new game' button
// - click event on 'play' button
function onLoad() {
  const $newGameButton = document.querySelector('#new-game');
  const $playButton = document.querySelector('#play');

  // deal a game on 'new game'
  $newGameButton.addEventListener('click', dealGame);

  // play game on 'play'
  $playButton.addEventListener('click', playGame);
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

  // render game
  renderGame(tiles);

  // convert game positions to JSON and save to local storage
  let board = JSON.stringify(tiles);
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

// render game
function renderGame(tiles) {
  let boardElement = document.querySelector('#board');
  boardElement.innerHTML = "";

  // order tiles based on random position
  let orderedTiles = tiles.sort((a, b) => a.position - b.position);

  // create dom elements for each tile
  orderedTiles.forEach((tile) => {

    // create containing tile element
    let tileElement = document.createElement('div');
    tileElement.classList.add('board__tile');

    // add card and invisible as classnames
    tileElement.classList.add(`board__tile--${tile.card}`);

    // create flipper element and append to tile
    let flipperElement = document.createElement('div');
    flipperElement.classList.add('board__tile__flipper');
    tileElement.appendChild(flipperElement);

    // create and append front to flipper
    let frontElement = document.createElement('div');
    frontElement.classList.add('board__tile__front');
    frontElement.style.backgroundImage = `url(images/${tile.card}.png)`;
    // todo: remove later (add content text for clarity)
    frontElement.textContent = tile.card;
    flipperElement.appendChild(frontElement);

    // create and append back to flipper
    let backElement = document.createElement('div');
    backElement.classList.add('board__tile__back');
    flipperElement.appendChild(backElement);

    console.log(tileElement);

    // add to dom
    boardElement.appendChild(tileElement);
  })
}

function playGame() {
  //   - timer starts
  //   - turn count 1++
}


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

