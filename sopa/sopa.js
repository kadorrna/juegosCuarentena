var correctCards = 0
var numbers = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "&Ntilde;", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var words = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "&ntilde;", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

$( init );

function init() {

  // // Hide the success message
  $('#successMessage').hide()

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' )
  $('#cardSlots').html( '' )

  // Create the pile of shuffled cards
  
  numbers.sort( function() { return Math.random() - .5 } )

  for ( var i=0; i<numbers.length; i++ ) {
    $('<div class="m-1 text-center">' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } )
  }

  // Create the card slots
  for ( var i=1; i<=words.length; i++ ) {
    $('<div class="m-1 d-flex align-items-center justify-content-md-center">' + words[i-1] + '</div>').data( 'number', words[i-1].toUpperCase() ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } )
  }

}

function handleCardDrop(event, ui) {
  
  //Grab the slot number and card number
  var slotNumber = $(this).data('number')
  var cardNumber = ui.draggable.data('number')

  //If the cards was dropped to the correct slot,
  //change the card colour, position it directly
  //on top of the slot and prevent it being dragged again
  if ((slotNumber === cardNumber) || ((slotNumber === "&NTILDE;") && (cardNumber == "&Ntilde;")) ){
    ui.draggable.addClass('correctCard')
    ui.draggable.draggable('disable')
    $(this).droppable('disable')
    ui.draggable.position({
      of: $(this), my: 'left top', at: 'left top'
    })
    //This prevents the card from being
    //pulled back to its initial position
    //once it has been dropped
    ui.draggable.draggable('option', 'revert', false)
    correctCards++ //increment keep track correct cards
  }
  
  //If all the cards have been placed correctly then
  //display a message and reset the cards for
  //another go
  // debugger
  if (correctCards === words.length) {
    $('#successMessage').show();
    $('#successMessage').animate({
      left: '380px',
      top: '200px',
      width: '400px',
      height: '140px',
      opacity: 1
    });
  }
  
  
  
}
 