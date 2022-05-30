var gameBoard = document.querySelector('.game-board')
var livesEl = document.querySelector('span')
var livesCount = 6

// clicked cards arry
var chosenCard= []



var cardsArray = [
    {name:'avacado', img: 'images/avacado.png'},

    {name:'avacado', img: 'images/avacado.png'},

    {name:'boy', img: 'images/boy.png'},

    {name:'boy', img: 'images/boy.png'},

    {name:'icecream', img: 'images/icecream.png'},

    {name:'icecream', img: 'images/icecream.png'},

    {name:'juice', img: 'images/juice.jpg'},

    {name:'juice', img: 'images/juice.jpg'},

    {name:'pizza', img: 'images/pizza.png'},

    {name:'pizza', img: 'images/pizza.png'},

    {name:'soda', img: 'images/soda.png'},

    {name:'soda', img: 'images/soda.png'},

    {name:'cookie', img: 'images/cookie.png'},

    {name:'cookie', img: 'images/cookie.png'},

    {name:'girl', img: 'images/girl.png'},

    {name:'girl', img: 'images/girl.png'},
];



// randomize array////////////////////////////////////////////////////






var createGameBoard = function(){
    
    for(var i = 0; i<cardsArray.length; i++){
   
        // generating the card
        var card = document.createElement('div');
        var face = document.createElement('img');
        var back = document.createElement('div');

        // attaching info to card
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        face.setAttribute('src', cardsArray[i].img);
        card.setAttribute('data-id' , i)

        // adding the game board to html
        gameBoard.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        
        // flipping card
        card.addEventListener('click', function(){
        this.classList.toggle('flip-card');     //aniamtion 
        var cardId = this.getAttribute('data-id')
        chosenCard.push( cardsArray[cardId].name )
        
        this.classList.add('flipped')
        if(chosenCard.length===2){
            checkMatch();
        }
       
       })
      
      
    }

}



function checkMatch(){
    var CardsClicked = document.querySelectorAll('.flipped')
    
    var flippedCardOneName = chosenCard[0]
    var flippedCardTwoName = chosenCard[1]
    
    if(flippedCardTwoName === flippedCardOneName){
        CardsClicked.forEach((card) =>{
            card.classList.add('unclickable')
            card.classList.remove('flipped')
        })
        chosenCard = []
        console.log(chosenCard)
        if(document.querySelectorAll('.flip-card').length===16){
            
            document.querySelector('h1').textContent = 'Congrats You found all the cards!'
            setTimeout(restartGame(),4000)
        }
    } else{
            chosenCard = []
            console.log(chosenCard)
            CardsClicked.forEach((card)=>{
                card.classList.remove('flipped')
                setTimeout(()=>card.classList.remove('flip-card'),1000 )
                
            })
            setTimeout(displayLives,1400)
            livesCount--
            if(livesCount<1){
              document.querySelector('h1').textContent = 'Oops you are out of lives'
              var allCards =  document.querySelectorAll('.card')
              allCards.forEach((cards)=>{
                  cards.classList.add('unclickable')
                  setTimeout(()=>cards.classList.add('flip-card'),2000)
                })
                setTimeout(restartGame(),4000)   
            }
        }
}

function displayLives(){
    // displaying lives
    livesEl.textContent = livesCount
}

function restartGame(){
    console.log('enterred to restart')
    var allCards =  document.querySelectorAll('.card')
    allCards.forEach((card)=>{
        card.classList.remove('unclickable')
        card.classList.add('flip-card')
    })
    console.log(allCards)
    livesCount = 6;
    displayLives();
    setTimeout(()=>{
        document.querySelector('h1').textContent = 'Refresh to start again!'
    },3000)
}

createGameBoard();

displayLives()