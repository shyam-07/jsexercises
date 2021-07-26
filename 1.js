// challange1: your age in days

function ageInDays(){
var birthyear = prompt('what year were you born..?');
var age= (2021-birthyear) * 365;
var h1 = document.createElement('h1');
var textanswer = document.createTextNode('you are '+ age + ' days old');
h1.setAttribute('id','age');
h1.appendChild(textanswer);
document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById('age').remove();
}

//challenge 2
function genburger(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-burger-gen');
    image.src="https://media0.giphy.com/media/klx60VEIhDpofXM9MI/giphy.gif?cid=ecf05e47avdojvehrkbyea9tdgiynd5t8e5lmco088b81v2o&rid=giphy.gif&ct=g"
    div.appendChild(image);
}
//chllange 3rock, paper, scissors
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice,botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRspInt());
    console.log('computer choice:', botChoice);
    results = decideWinner(humanChoice, botChoice); // [0,1] human lost| botwon
    console.log(results);
    message = finalMessage (results); // {'message'}
    rpsFrontEnd(yourChoice.id, botChoice, message);
}



function randToRspInt(){
    return Math.floor(Math.random() * 3);

}
function numberToChoice(number){
    return ['rock', 'paper', 'scissors'] [number];

};

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'scissors':1, 'rock':0.5, 'paper':0},
        'paper': {'rock':1, 'paper':0.5, 'scissors':0},
        'scissors': {'paper':1, 'scissors':0.5, 'rock':0},
    };
    var yourScore = rpsDatabase[yourChoice] [computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}
 function finalMessage ([yourScore, computerScore]){
     if (yourScore === 0){
         return {'message': ' you lost!', 'color': 'red'};
     } else if (yourScore == 0.5){
         return {'message': 'you tied!', 'color': 'yellow'}
     }
     else{
        return {'message': 'you won!', 'color': 'green'}
     }
 }
   function rpsFrontEnd(humanImageChoice,botImageChoice, finalMessage){
       var imagesDatabase = {
           'rock':document.getElementById('rock').src,
           'paper': document.getElementById('paper').src,
           'scissors': document.getElementById('scissors').src,
       }


   //lets remove all the images
   document.getElementById('rock').remove();
   document.getElementById('paper').remove();
   document.getElementById('scissors').remove();

   var humanDiv = document.createElement('div');
   var botDiv = document.createElement('div');
   var messageDiv = document.createElement('div');

   humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] +"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
   messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
   botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice]   + "' height=150 width=150  style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"

   document.getElementById('flex-box-rps-div').appendChild(humanDiv);
   document.getElementById('flex-box-rps-div').appendChild(messageDiv);
   document.getElementById('flex-box-rps-div').appendChild(botDiv);

    }

//challenge 4: change the color of All Buttons
var all_buttons = document.getElementsByTagName('button');

var copyallbutton = [];
for(let i=0; i< all_buttons.length; i++){
    copyallbutton.push(all_buttons[i].classList[1]);
}
console.log(copyallbutton);

function buttoncolorchange(buttonthingy){
    if(buttonthingy.value ==='red') {
        buttonred();
    }else if (buttonthingy.value ==='green'){
        buttongreen();
    }else if (buttonthingy.value === 'reset'){
        buttoncolorreset();
    }else if (buttonthingy.value === 'random') {
        randomcolors();
    }
}

function buttonred(){
    for (let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');

    }
}
function buttongreen(){
    for (let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');

    }
}

function buttoncolorreset(){
    for (let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyallbutton[i]);

    }
}
function randomcolors(){
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i=0; i< all_buttons.length; i++){
        let randomnumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomnumber]);

    }
}



//challenge 5: blackjack
let blackjackgame ={
    'you': {'scorespan':'#your-blackjack-result', 'div': '#your-box','score':0},
    'dealer': {'scorespan':'#dealer-blackjack-result', 'div': '#dealer-box','score':0},
     'cards': ['2','3','4','5','6','7','8','9','10','k','j','q','a'],
     'cardsmap':{'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'k':10, 'j':10, 'q':11, 'a':[1, 11] } ,
     'wins' :0,
     'losses':0,
     'draws' :0,
     'isstand': false,
     'turnsover': false,

};


const you = blackjackgame['you']
const dealer = blackjackgame['dealer']

const hitsound = new Audio('black jack/sounds/swish.m4a');
const winsound = new Audio('black jack/sounds/cash.mp3');
const losssound = new Audio('black jack/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackhit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerlogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackdeal);

function blackjackhit(){
    if(blackjackgame['isstand'] === false){
     let card = randomcard();
     console.log(card);
     showcard(card, you);
     updatescore(card, you);
     showscore(you);
     console.log(you['score']);
    }
}

function randomcard(){
    let randomindex = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][randomindex];
}

function showcard(card, activeplayer) {
    if (activeplayer['score'] <=21) {
      let cardimage = document.createElement('img');
     cardimage.src = `black jack/images/${card}.png`;
     document.querySelector(activeplayer['div']).appendChild(cardimage);
      hitsound.play();
    }  
}

function blackjackdeal (){
    if (blackjackgame['turnsover'] === true){
         blackjackgame['isstand'] = false;   
        let yourimages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img');
    

        for (i=0; i< yourimages.length; i++){
            yourimages[i].remove();
        }
        for (i=0; i< dealerimages.length; i++){
            dealerimages[i].remove();
        }
    
        you['score']=0;
        dealer['score'] = 0;
        
        document.querySelector('#your-blackjack-result').textContent =0;
        document.querySelector('#dealer-blackjack-result').textContent =0;

        document.querySelector('#your-blackjack-result').style.color ='#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
        document.querySelector('#blackjack-result').textContent = "let's play";
        document.querySelector('#blackjack-result').style.color = 'white';
         blackjackgame['turnsover'] = true;
    }
}

function updatescore(card, activeplayer) {
    if (card==='a') {
        if (activeplayer['score'] + blackjackgame['cardsmap'][card][1] <=21) 
        {
           activeplayer['score'] += blackjackgame['cardsmap'][card][1];
        } 
             else  {
          activeplayer['score'] += blackjackgame['cardsmap'][card][0];
          } 
    } 
    else {
            activeplayer['score'] += blackjackgame['cardsmap'][card];   
         }
}


function showscore(activeplayer){
    if(activeplayer['score']> 21) {
        document.querySelector(activeplayer['scorespan']).textContent = 'BUST!';
        document.querySelector(activeplayer['scorespan']).style.color= 'red';
    }else{
        document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];
    }
}
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    
  async function dealerlogic() {
    blackjackgame['isstand'] = true;

    while (dealer['score'] < 16 && blackjackgame['isstand'] === true) {
        let card = randomcard();
        showcard(card, dealer);
        updatescore(card,dealer);
        showscore(dealer);
        await sleep(1000);
    }

  
       blackjackgame['turnsover']= true;
       let winner = computewinner();
       showresult(winner);
       console.log(blackjackgame['turnsover']);


}

function computewinner() {
    let winner;
    if (you['score'] <=21) {
      if(you['score']> dealer['score']  || (dealer['score'] > 21)){
          blackjackgame['wins']++;
        console.log('you won!');
        winner = you;
       } else if(you['score']< dealer['score']) {
        blackjackgame['losses']++;
           console.log('you lost!');
           winner = dealer;
       } else if (you['score'] === dealer['score']){
        blackjackgame['draws']++;
           console.log('you drew!');
       }

      //dealer 
    } else if (you['score']>21 && dealer['score'] <=21){
        blackjackgame['losses']++;
        console.log('you lost!');
        winner= dealer;
    }else if (you['score']>21 && dealer['score'] >21){
        blackjackgame['draws']++;
        console.log('you drew!');
    }
    console.log('winner is', winner);
    return winner;
}

function showresult(winner){
    let message, messagecolor;

    if (winner === you){
        document.querySelector('#wins').textContent = blackjackgame['wins'];
        message = 'you won!';
        messagecolor =' green';
        winsound.play();

    } else if (winner === dealer) {
        document.querySelector('#losses').textContent = blackjackgame['losses'];
        message ='youlost!';
        messagecolor = 'red';
        losssound.play();

    } else {
        document.querySelector('#draws').textContent = blackjackgame['draws'];
        message = 'you drew!';
        messagecolor = 'white';
    }
document.querySelector('#blackjack-result').textContent = message;
document.querySelector('#blackjack-result').style.color = messagecolor;
}