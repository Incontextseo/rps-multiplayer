# rps-multiplayer
Homework 7

HTML
- Gameplay with selections for player 1 and player 2
- Player 1 goes first and will be shown as "Locked In" once they've made their selection
- Player 2 goes second and the winner is decided after player 2 makes their selection.
- Text is shown declaring the winner and comparing which hands were thrown.

CSS
- Used these same template as the other projects

JavaScript
- Player 1 selects their hand and then player 2 selects their hand
    - Player 1 is shown as locked in upon the first click.
    - Player 2 is not allowed to go first and can only go after Player 1 is "Locked In"
- Hands are compared with the compareHands function
    - If player 1 wins, a point is added to their wins and a point is added to the total of their opponents losses
    - If the hands are the same, a point is added to the ties variable
    - If player 1 does not win, a point is added their losses variable and a point is added to their opponents wins
- After 3 seconds the players guesses are reset for another match, while the score is maintained in Firebase.

Firebase
- User guesses are stored so that the guesses can be compared among two players on different computers.
- User guesses and scores are recorded everytime there is a click on the site.
