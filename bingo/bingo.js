$(function() {
  $("#players").focus()
});

let players = "";
let playersArr = []
function startGame() {
  $("#savePlayers").prop("disabled", true)
  $("#startPanel").toggle('slide')
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
  $("#letter").text(" ")
  $("#gameCard").toggle('slide')
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
    finish()
    playersArr = []
  }
}
function resetGame() {
  $("#gameCard").toggle('slide')
  $("#startPanel").toggle('slide')
  playersArr = [];
  players = "";
  $("#players").val("");
  $("#savePlayers").prop("disabled", false)
  $("#letterButton").prop("disabled", false)
  $("#players").prop("disabled", false)
  $('#successMessage').hide()
}

// Set effect from select menu value
$("#savePlayers").on("click", function () {
  $("#gameCard").toggle('slide')
  return false
});

function finish() {
  $('#successMessage').show()
  $('#successMessage').animate({
    left: '380px',
    top: '200px',
    width: '400px',
    height: '140px',
    opacity: 1
  })
}
