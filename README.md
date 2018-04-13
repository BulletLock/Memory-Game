# Memory Game
### _by Arvind Rathee_

## Project Overview

The objective is to demonstrate mastery of HTML, CSS, and JavaScript by building a browser-based card matching game (also known as Concentration).

### Technologies Used
- HTML
- CSS
- JavaScript
- jQuery

### Project Content

- \css\app.css - custom css for the project.
- \js\app.js - custom js for the project.
- \js\jquery-3.3.1.min.js - jQuery file stored locally.
- index.html - Homepage of the project.

### How The Game Works

The game starts with an empty board and three options for the user to select
- Easy : 8 cards
- Medium : 12 cards
- Hard : 16 cards


The game board consists of "cards" as per the level selected arranged in a grid. The deck is made up of four/six/eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match.

At each turn:
-   The player flips one card over to reveal its underlying symbol.
-   The player then turns over a second card, trying to find the corresponding card with the same symbol.
-   If the cards match, both cards stay flipped over.
-   If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.


_To view the demo [click here](https://bulletlock.github.io/Memory-Game/)_