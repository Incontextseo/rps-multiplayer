var userWins = document.getElementById("user-wins");
var userLosses = document.getElementById("user-losses");
var userTies = document.getElementById("user-ties");

console.log(userWins, userLosses, userTies)

var wins = 0;
var losses = 0;
var ties = 0;

// Creates an array that lists out all of the options (Rock, Paper, or Scissors).
var computerChoices = ["r", "p", "s"];

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

  // Determines which key was pressed.
  var userGuess = event.key;

  // Randomly chooses a choice from the options array. This is the Computer's guess.
  var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

  if (userGuess === "r" || userGuess === "p" || userGuess === "s") {
      if (userGuess === "r" && computerGuess === "s" || userGuess === "p" && computerGuess === "r" || userGuess === "s" && computerGuess === "p") {
        console.log('Human Wins!')
        wins++;
        userWins.textContent = wins;
    } else if (userGuess === computerGuess) {
      console.log('It is a Tie!')
      ties++;
      userTies.textContent = ties;
    } else {
      console.log('Computer Wins!')
      losses++;
      userLosses.textContent = losses;
    }
  }

}

  userWins.textContent = [usersWins + 1];
  userLosses.textContent = [usersLosses + 1];
  userTies.textContent = [usersTies + 1]