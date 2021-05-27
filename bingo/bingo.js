/*
  This is a great way to quickly test things out!

  Add all your JavaScript here.
  Open the `index.html` file in Chrome, save changes here,
  and simply refresh Chrome to see those changes.
*/

let players = "";
let playersArr = [];
function startGame() {
  $("#savePlayers").prop("disabled", true);
  $("#players").prop("disabled", true);
  players = $("#players").val().toLowerCase().replace(/ /g, "")
  players = players.replace(/[^a-zA-Z 0-9]+/g, "")
  for (var x = 0; x < players.length; x++) {
    if (playersArr.indexOf(players[x]) === -1) {
      playersArr.push(players[x]);
    }
  }
  $("#remainingLettersCount").text(playersArr.length)
  $("#remainingLetters").tooltip("dispose").attr("title", remainingLetters()).tooltip()
  runEffect();
}
function remainingLetters() {
  return playersArr.join(", ")
}
function popLetter() {
  let magicNr = Math.floor(Math.random() * playersArr.length)
  $("#letter").text(playersArr[magicNr])
  playersArr.splice(magicNr, 1)
  $("#remainingLettersCount").text(playersArr.length)
  $("#remainingLetters").tooltip("dispose").attr("title", remainingLetters()).tooltip()
  if (playersArr.length === 0) {
    $("#letterButton").prop("disabled", true);
    $("#endGameText").show();
    playersArr = [];
  }
}
function resetGame() {
  playersArr = [];
  players = "";
  $("#players").val("");
  $("#letter").text("");
  $(".game").hide();
  $("#endGameText").hide();
  $("#savePlayers").prop("disabled", false);
  $("#letterButton").prop("disabled", false);
  $("#players").prop("disabled", false);
}

function runEffect() {
  var options = {};
  $(".game").effect("slide", options, 500, callbackSlide);
}

// Callback function to bring a hidden box back
function callbackSlide() {
  setTimeout(function () {
    $(".game").removeAttr("style").hide().fadeIn();
  }, 1000);
}

// Set effect from select menu value
$("#savePlayers").on("click", function () {
  runEffect();
  return false;
});

