// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBKRpgfOXUX5_jfoXfY02xZ6_ImTs0u-iA",
  authDomain: "my-first-project-7460d.firebaseapp.com",
  databaseURL: "https://my-first-project-7460d.firebaseio.com",
  projectId: "my-first-project-7460d",
  storageBucket: "my-first-project-7460d.appspot.com",
  messagingSenderId: "244730099594",
  appId: "1:244730099594:web:e050040ce6357ea5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
var database = firebase.database();

var oneWins = 0;
var oneLosses = 0;
var twoWins = 0;
var twoLosses = 0;
var ties = 0;
var oneGuess = 0;
var twoGuess = 0;
var beatsText;
var breakText = "<br>";
var timer;

// This function is run whenever the user presses a key.
$(document).ready(function() {

  function playAgain () {
    console.log("Play Again")
    oneGuess = 0;
    twoGuess = 0;
    console.log(oneGuess + " " + twoGuess)
    $('#winner-is').empty();
    clearInterval(timer);
    $('.player-hand').addClass('one-rpsls-button');
    $('.player-hand').removeClass('two-rpsls-button');
    $('#locked').text("Your Turn!")
    $('#you-are-up').text("")
  }

  function compareHands () {
    if (oneGuess !== 0 && twoGuess !== 0) {
      if (oneGuess === "Rock" && twoGuess === "Scissors" || oneGuess === "Paper" && twoGuess === "Rock" || oneGuess === "Scissors" && twoGuess === "Paper" || oneGuess === "Lizard" && twoGuess === "Spock" || oneGuess === "Scissors" && twoGuess === "Lizard" || oneGuess === "Spock" && twoGuess === "Scissors" || oneGuess === "Rock" && twoGuess === "Lizard" || oneGuess === "Lizard" && twoGuess === "Paper" || oneGuess === "Spock" && twoGuess === "Rock" || oneGuess === "Paper" && twoGuess === "Spock") {
          oneWins++;
          twoLosses++;
          beatsText = (oneGuess + " beats " + twoGuess)
          console.log("Player One Wins!" + breakText + beatsText)
          $('#winner-is').html("Player One Wins!" + breakText + beatsText)
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
        $('#winner-is').html('It is a Tie!' + breakText + beatsText)
        clearInterval(timer)
        timer = setInterval(function(){
            playAgain() 
          }, 3000);
        ties++;
        $('#ties').text(ties)
      } else {
        beatsText = (twoGuess + " beats " + oneGuess)
        console.log("Player Two Wins!" + breakText + beatsText)
        $('#winner-is').html("Player Two Wins!" + breakText + beatsText)
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
  $('body').on('click', ".one-rpsls-button", function(event) {
    oneGuess = $(this).attr("id");
      console.log("Player One: " + oneGuess);
      console.log("Player Two: " + twoGuess);
    $('.player-hand').removeClass('one-rpsls-button');
    $('.player-hand').addClass('two-rpsls-button');
    $('#locked').text(" Locked In!")
    $('#you-are-up').text(" Your Turn!")
  })

      // Grabs user two's throw
  $('body').on('click', ".two-rpsls-button", function(event) {
    twoGuess = $(this).attr("id");
      console.log("Player Two: " + twoGuess);
      console.log(oneGuess + " " + twoGuess);
    compareHands();
  })



  $('body').on('click', function(event) {
      database.ref().set({
        oneGuess: oneGuess,
        twoGuess: twoGuess,
        oneWins: oneWins,
        twoLosses: twoLosses,
        twoWins: twoWins,
        oneLosses: oneLosses,
        ties: ties,
      });
  })
});



// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

    // If Firebase has a oneGuess or twoGuess stored, update our client-side variables
    if (snapshot.child("oneGuess").exists()) {
      // Set the variables for highBidder/highPrice equal to the stored values.
      oneGuess = snapshot.val().oneGuess;
    } else if (snapshot.child("twoGuess").exists()) {
      twoGuess = snapshot.val().twoGuess;
    } 

    oneWins = snapshot.val().oneWins;
    twoWins = snapshot.val().twoWins;
    oneLosses = snapshot.val().oneLosses;
    twoLosses = snapshot.val().twoLosses;
    ties = snapshot.val().ties;

  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  console.log(snapshot.val().oneGuess);
  console.log(snapshot.val().twoGuess);
  console.log(snapshot.val().oneWins);
  console.log(snapshot.val().oneLosses);
  console.log(snapshot.val().twoWins);
  console.log(snapshot.val().twoLosses);
  console.log(snapshot.val().ties);

  // Change the HTML to reflect
  $("#one-wins").text(snapshot.val().oneWins);
  $("#two-wins").text(snapshot.val().twoWins);
  $("#one-loss").text(snapshot.val().oneLosses);
  $("#two-loss").text(snapshot.val().twoLosses);
  $("#ties").text(snapshot.val().ties);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});