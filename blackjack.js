let cashBalance = null;
let bet = 10;
let yourScoreTotal = null;
let casinoScoreTotal = null;


//Deck Creation & Shuffle
function deck(){
const suits = ['♠', '♣', '♦', '♥'];
const ranks = [ 'A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const deck = [];

  for(let s = 0; s < suits.length; s++)
  {
      
  for(let r = 0; r < ranks.length; r++)
  {
    var cards = { rank: ranks[r], suit: suits[s], value: values[r]};
     
    deck.push(cards);
    
  } 
     }
  return deck;
  };

function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

//Card Creation
function renderCard(){
   var list = deck();
   shuffle(list) 
  
  list.forEach(function(card,index) {
      let cardDiv =          
      (`<div class="card card_${index} ${card.suit === '♦' || card.suit === '♥' ? "red" : "black"}">
 <div class="top">${card.rank}${card.suit}</div>
      <div class="mid">${card.suit}</div>
      <div class="bottom">${card.suit}${card.rank}</div>
      <div class='back'><img id="back-img" src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJHYHw7bShl-XhIQqIkSz8m12c-aQhsf424g&usqp=CAU"/></div>
      </div>` );
     
    $('.deck').append(cardDiv);
    $(`.card_${index}`).data("card", card);

   
    
  })
    
} 

renderCard();  


let currentNumberofCards = 52;

function dealCards(){
 let cardIndex = Math.floor(Math.random() * currentNumberofCards);
 let newCard = $(".card")[cardIndex]
  currentNumberofCards--
  return newCard;
};


// Buttons Off Intially
$('#hitMe').css('pointer-events', 'none');
$('#stand').css('pointer-events', 'none');
$('#deal').css('pointer-events', 'none');
$('#clear').css('pointer-events', 'none');



//Game Play Buttons

$('#bet').click(function() {
  event.preventDefault();
  $('h2').text('');
  updateBalance();
  $('#bet').css('pointer-events', 'none');
  $('#deal').css('pointer-events', 'auto');
  
    });

$('#deal').click(function(){
    yourTotalScore = null;
   casinoTotalScore = null;

  
  let casinoCardz = dealCards(); 
  let casinoCardz2 = dealCards(); 
  let playerCardz = dealCards() ;    
  let playerCardz2 = dealCards(); 
  
  
  $(casinoCardz2).addClass('turn');
  $('.casino-hand').append(casinoCardz)
  $('.casino-hand').append(casinoCardz2)
   $('.player-hand').append(playerCardz)
   $('.player-hand').append(playerCardz2)
   $('.casino-hand h3').text('');
   $('.player-hand h3').text('');
  
  $('.casino-hand h3').append('Casino Score:' + ' ');
  $('#deal').css('pointer-events', 'none');
  $('#hitMe').css('pointer-events', 'auto');
  $('#stand').css('pointer-events', 'auto');
  yourPoints();
  

    
   
// TweenMax.staggerTo('.deck .card[0]', 1.5, { opacity:0, x:500, delay: 1}, {opacity:1, x:0},0.5); 
 });

$('#hitMe').click(function(yourScore){
 
   $('#clear').css('pointer-events', 'auto');
   var playerCard = dealCards();
  $('.player-hand').append(playerCard)
$('.player-hand h3').text('');
  
  const yourCards = $('.player-hand .card').toArray();
  const yourData = yourCards.map(function (card){
    return $(card).data().card
  })
  let yournewScore = yourData.reduce(function (previousScore, currentScore, nextScore) {
    return previousScore + currentScore.value;
  }, 0);
  
  if(yourScoreTotal != null || yourScoreTotal === null){
  yourScoreTotal = yournewScore;
  } 
  
  $('.player-hand h3').append('Your Score:' + ' ' + yournewScore);
 
  
  youBust(yournewScore);
  youWin(yourScoreTotal);
 
}); 
  
$('#stand').click(function(casinoScore) {
  $('#clear').css('pointer-events', 'auto');
   casinoPoints();
  
 $('.casino-hand h3').text('');
  var turnedCards = $('.casino-hand .card');
  turnedCards.removeClass('turn');

   const casinoCards = $('.casino-hand .card').toArray();
  const casinoData = casinoCards.map(function (card){
  return $(card).data().card
  })
  let casinonewScore = casinoData.reduce(function (previousScore, currentScore, nextScore) {
    return previousScore + currentScore.value;
  }, 0);     
  
    if(casinoScoreTotal != null){
    casinoScoreTotal = casinonewScore;
    // console.log(casinonewScore)
    // console.log(casinoScoreTotal)
  }
  
  $('.casino-hand h3').append('Casino Score:' + ' ' + casinonewScore);
  

$('#stand').css('pointer-events', 'auto');
  standTwice(casinonewScore);
  casinoBust(casinonewScore);
  casinoWin();
  youWin();
  draw();
  
});


function standTwice(casinonewScore){
  if(casinonewScore < 17){
     var casinoCard = dealCards(); 
     $('.casino-hand').append(casinoCard); 
     }
  }


 // Cash Balance Functions 
function updateBalance() {
  
  if(cashBalance == null){
    cashBalance = 100;
  }
  let newBalance = cashBalance - bet;       
cashBalance = newBalance; 
  
 $('h2').append('Cash Balance' + ':' + ' '+ '$' + cashBalance).css('color', '#85bb65');

return cashBalance;

  
};

function addCash(){
  $('h2').text(' ');
  let win = cashBalance + 20;
  $('h2').append('Cash Balance' + ':' + ' '+ '$' + win).css('color', '#85bb65');
   cashBalance = win;
 
};

function addCash2(){
  $('h2').text(' ');
  let win = cashBalance + 10;
  $('h2').append('Cash Balance' + ':' + ' '+ '$' + win).css('color', '#85bb65');
   cashBalance = win;
 
};

function takeCash() {
  $('h2').text(' ');
  let lose = cashBalance;
  $('h2').append('Cash Balance' + ':' + ' '+ '$' + lose).css('color', '#85bb65');
}

//Casino Score & Win/Lose Functions

function casinoPoints(){
  const casinoCards = $('.casino-hand .card').toArray();
  const casinoData = casinoCards.map(function (card){
    return $(card).data().card
  })
  
  let casinoScore = casinoData.reduce(function (previousScore, currentScore) {
    return previousScore + currentScore.value;
  }, 0);
  
      if(casinoScoreTotal === null || casinoScoreTotal != null){
    casinoScoreTotal = casinoScore;
     
  }
  
  $('.casino-hand h3').append('Casino Score:' + ' ' + casinoScore);
  
     if( casinoScore < 18 ) {
      var casinoCard = $('.card')[32]; 
     $('.casino-hand').append(casinoCard); 
       
     }

  
};

function casinoBust(casinonewScore){
  $('.note').text('');
  if(casinonewScore > 21){
    let message = 'Casino Bust! You win $10! 🤑';
     $('.note').append(message);
     $('.gamePlay').addClass('active');
     addCash();
    
  }  
 
};

function casinoWin(){
  $('.note').text('');
  if(casinoScoreTotal == 21 || casinoScoreTotal > yourScoreTotal && casinoScoreTotal < 21){
    // console.log('casinoWinFunction', casinoScoreTotal, yourScoreTotal)
       let message = "Maybe Next Time Kid....Casino Wins 🙃 "; 
        $('.note').append(message);
     $('.gamePlay').addClass('active');
   
  }
  takeCash()
}


//Player Score & Win/Lose Functions

function yourPoints(){
  
  const yourCards = $('.player-hand .card').toArray();
  const yourData = yourCards.map(function (card){
    return $(card).data().card
  })
 
  let yourScore = yourData.reduce(function (previousScore, currentScore, nextScore) {
    return previousScore + currentScore.value;
  }, 0);
  
    if(yourScoreTotal === null || yourScoreTotal != null){
    yourScoreTotal = yourScore;
  }

  $('.player-hand h3').append('Your Score:' + ' ' + yourScore);
};

function youBust(yournewScore){
  $('.note').text('');
    if(yournewScore > 21){
    let message = "You Bust...Sorry 😦 ";
   $('.note').append(message);
   $('.gamePlay').addClass('active');
    takeCash();  
  }  
  
};

function youWin(){
  $('.note').text('');
  if(yourScoreTotal == 21 || yourScoreTotal > casinoScoreTotal && yourScoreTotal < 21 && casinoScoreTotal != null){
    let message = "21! You win! 🤑 ";
      $('.note').append(message);
     $('.gamePlay').addClass('active');
    addCash();
    
  }
  
}

// Draw or Stay

function draw(){
  $(".gamePlay .note").text(' ');
  if(casinoScoreTotal === yourScoreTotal){
    // console.log('drawFunction', casinoScoreTotal, yourScoreTotal)
    let message5 ="It's a Draw! 😅"
      $('.gamePlay .note').append(message5);
     $('.gamePlay').addClass('active');
     addCash2();
  }
 
}



//Popup Messages Buttons

$('#ok').click(function() {
  $('.gamePlay').removeClass('active');
  $('#bet').css('pointer-events', 'auto');
  $('#deal').css('pointer-events', 'auto');
  $('#hitMe').css('pointer-events', 'none');
  $('#stand').css('pointer-events', 'none');
  $('#clear').css('pointer-events', 'none');
  $('.casino-hand .card').remove();
  $('.player-hand .card').remove();
  $('.player-hand h3').text('Your Score:' + ' ' );
  $('.casino-hand h3').text('Casino Score:' + ' ' );
})

$('.play').click(function() {
  $('.game-rules').addClass('inactive');  
});
$('.playagain').click(function playAgain(){
  event.preventDefault();
  $('.message').removeClass('active')
  
  $('.cash').css('display', 'none');
   gameOver(); 
});

function gameOver() {

   
 if(cashBalance == 0){
   $('h2').text('');
   let message = "Game Over! Casino Wins!";
   $('h2').append(message).css('color', 'red');
   $('.newGame').addClass('active');
    
 }

};

function restartGame() {
   $('.newGame').removeClass('active');
  $('h2').text('');  
  
};

