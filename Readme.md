# Memory Clash Readme

## data structure

must haves
- positions 0-19
- cards 1-10 (props: name, position A (0-19), position B (0-19), captured (true/false) )
- game init: card positions
- game progress: card status (active or captured)
- game progress: turn count


nice to haves
- player name
- multiplayer
- score count
- player turn
- highscore list
- game timer
- turn timer
- chess timer
- player adjustable timer settings


## visuals

must haves
- start button
- visible game
- score

nice to haves
- coc images
- animations
- nice buttons


## Game flow

- click event on 'new game' button

- deal a game on 'new game'
  - create game-ID
  - loop through cards and add random unique position 0-19
  - convert game positions to JSON
  - save game (ID and positions) in local storage

- click event on 'start game' button
  - render game
  - timer starts
  - turn count 1++

- click event on active tile
  - 1st: open card
  - 2nd:
    - open card
    - compare cards
    - if equal: capture
      - remove card from position
      - set card statusses to 'captured'
      - score count 1++
      - check if no uncaptured cards are left: game over
    - else: close both cards
    - turn count 1++

- game over:
  - timer stops
  - display time & turn count
  - close game button

