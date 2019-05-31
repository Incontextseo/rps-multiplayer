// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAUunAnbnurejN7cBTceGkWLOUERTHvkXo",
    authDomain: "rps-multiplayer-ba31c.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-ba31c.firebaseio.com",
    projectId: "rps-multiplayer-ba31c",
    storageBucket: "rps-multiplayer-ba31c.appspot.com",
    messagingSenderId: "1000157245847",
    appId: "1:1000157245847:web:b874af1f4f43b596"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


var oneWins = 0;
var oneLosses = 0;
var twoWins = 0;
var twoLosses = 0;
var ties = 0;
var oneGuess = null;
var twoGuess = null;
var winsText;
var beatsText;
var breakText = "<br>";
var timer;

// This function is run whenever the user presses a key.
$(document).ready(function() {

  function playAgain () {
    console.log("Play Again")
    oneGuess = null;
    twoGuess = null;
    console.log(oneGuess + " " + twoGuess)
    $('#announcement').empty();
    clearInterval(timer);
  }
  function compareHands () {
    if (oneGuess !== null && twoGuess !== null) {
      if (oneGuess === "Rock" && twoGuess === "Scissors" || oneGuess === "Paper" && twoGuess === "Rock" || oneGuess === "Scissors" && twoGuess === "Paper" || oneGuess === "Lizard" && twoGuess === "Spock" || oneGuess === "Scissors" && twoGuess === "Lizard" || oneGuess === "Spock" && twoGuess === "Scissors" || oneGuess === "Rock" && twoGuess === "Lizard" || oneGuess === "Lizard" && twoGuess === "Paper" || oneGuess === "Spock" && twoGuess === "Rock" || oneGuess === "Paper" && twoGuess === "Spock") {
          oneWins++;
          twoLosses++;
          beatsText = (oneGuess + " beats " + twoGuess)
          console.log("Player One Wins!" + breakText + beatsText)
          $('#announcement').html("Player One Wins!" + breakText + beatsText)
          $('#one-wins').text(oneWins)
          $('#two-loss').text(twoLosses)
          clearInterval(timer)
          timer = setInterval(function(){
              playAgain() 
            }, 3000);
      } else if (oneGuess === twoGuess) {
        beatsText = (oneGuess + " = " + twoGuess)
        console.log('It is a Tie!' + breakText + beatsText)
        console.log(ties)
        $('#announcement').html('It is a Tie!' + breakText + beatsText)
        clearInterval(timer)
        timer = setInterval(function(){
            playAgain() 
          }, 3000);
        ties++;
        $('#ties').text(ties)
      } else {
        beatsText = (twoGuess + " beats " + oneGuess)
        console.log("Player Two Wins!" + breakText + beatsText)
        $('#announcement').html("Player Two Wins!" + breakText + beatsText)
        clearInterval(timer)
        timer = setInterval(function(){
            playAgain() 
          }, 3000);
        oneLosses++;
        twoWins++;
        $('#two-wins').text(twoWins)
        $('#one-loss').text(oneLosses)
      }
    }
  }

  // Grabs user one's throw
  $('.one-rpsls-button').on('click', function(event) {
    oneGuess = $(this).attr("id");
      console.log("Player One: " + oneGuess);
      console.log("Player Two: " + twoGuess);
    compareHands();
  })
  
  // Grabs user two's throw
  $('.two-rpsls-button').on('click', function(event) {
    twoGuess = $(this).attr("id");
      console.log("Player Two: " + twoGuess);
      console.log(oneGuess + " " + twoGuess);
    compareHands();
  })

})

