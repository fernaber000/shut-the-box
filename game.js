//global variables
const dice1 = document.querySelector("#first-dice");
const dice2 = document.querySelector("#second-dice");
const startBtn = document.querySelector("#start-btn");
const rollBtn = document.querySelector("#roll-btn");
const individualBtn = document.querySelector("#individual-btn");
const sumBtn = document.querySelector("#sum-btn");
const endTurnBtn = document.querySelector("#end-turn-btn");
const p1NameInput = document.querySelector("#p1-name-input");
const p2NameInput = document.querySelector("#p2-name-input");
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const startHidden = document.querySelector("#hide");
const start = document.querySelector("#start");
const winner = document.querySelector("#winner");
const scorecard = document.querySelector("#scorecard");
const againBtn = document.querySelector("#again");


let p1Name = '';
let p2Name = '';
let playerTurn = 1;
let round = 1;
let dice1Number = "";
let dice2Number = "";
let p1Total = 0;
let p2Total = 0;
let p1Points = 0;
let p2Points = 0;
let sum = '';

//should not be enabled until both players enter their names
startHidden.style.display = 'none';
winner.style.display = 'none';
scorecard.style.display = 'none';

//when game starts
startBtn.addEventListener("click", function(){
    p1Name = p1NameInput.value;
    p2Name = p2NameInput.value;
    if(p1Name && p2Name){
        start.style.display = 'none';
        startHidden.style.display = '';
        scorecard.style.display = '';
        document.querySelector('#player-turn').textContent = p1Name + `'s turn`;
        document.querySelector('#round').textContent = "Round " + round;
        document.querySelector('#p1-scorecard').textContent = p1Name;
        document.querySelector('#p2-scorecard').textContent = p2Name;
    }else{
        alert('Please input both names');
    }

});

rollBtn.addEventListener("click", function(){
    rollBtn.disabled = false;
    rollDice();
    individualCheck();
    sumCheck();
    endTurnCheck();
    rollBtn.disabled = true;
});

individualBtn.addEventListener("click", function(){
    shut(dice1Number);
    shut(dice2Number);
    boxes[dice1Number] = "X";
    boxes[dice2Number] = "X";
    boxes[0] = boxes[0] + sum;
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

sumBtn.addEventListener("click", function(){
    shut(sum);
    boxes[sum] = "X";
    boxes[0] = boxes[0] + sum;
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

endTurnBtn.addEventListener("click", function(){
    if(playerTurn === 1){
        p1Points = 45 - boxes[0];
        p1Total = p1Total + p1Points;
        const row = buildRow(round, p1Points);
        const tbody = document.querySelector("tbody");
        tbody.insertAdjacentElement('beforeend',row);
        playerTurn = 2;

        resetBoard();
        document.querySelector("#player-turn").textContent = p2Name + " 's turn";
        document.querySelector('#round').textContent = "Round " + round;
    } else {
        p2Points = 45 - boxes[0];
        p2Total = p2Total + p2Points;
        const player2Pts = document.querySelector("#round"+round+ " .p2Pts");
        player2Pts.textContent = p2Points;
        playerTurn = playerTurn - 1;
        round = round + 1;

        resetBoard();
        document.querySelector("#player-turn").textContent = p1Name + " 's turn";
        document.querySelector("#round").textContent = "Round " + round;
    }
    gameOver();
});

againBtn.addEventListener('click', function(){
    startHidden.style.display = 'none';
    winner.style.display = 'none';
    scorecard.style.display = 'none';
    start.style.display = '';
    resetBoard();
    p1Name = '';
    p2Name = '';
    round = 1;
    p1Total = 0;
    p2Total = 0;
    p1Points = 0;
    p2Points = 0;
    document.querySelector("#round1").outerHTML = "";
    document.querySelector("#round2").outerHTML = "";
    document.querySelector("#round3").outerHTML = "";
    document.querySelector("#round4").outerHTML = "";
    document.querySelector("#round5").outerHTML = "";
});

//when roll button is clicked
function rollDice(){
    dice1Number = Math.floor(Math.random() * 6) + 1;
    dice2Number = Math.floor(Math.random() * 6) + 1;
    dice1.className=`bi bi-dice-${dice1Number}`;
    dice2.className=`bi bi-dice-${dice2Number}`;
    sum = dice1Number + dice2Number;
    document.querySelector("#sum").textContent = "sum: " + sum;
    return sum
};

function individualCheck(){
    if(dice1Number === dice2Number){
        individualBtn.disabled = true;
    }else if(boxes[dice1Number] === 'X'){
        individualBtn.disabled = true;
    }else if(boxes[dice2Number] === "X"){
        individualBtn.disabled = true;
    }else{
        individualBtn.disabled = false;
    }
};

function sumCheck(){
    if(sum > 9){
        sumBtn.disabled = true;
    }else if(boxes[sum] === "X"){
        sumBtn.disabled = true;
    }else{
        sumBtn.disabled = false;
    }
};

function endTurnCheck(){
    endTurnBtn.disabled = true;
    rollBtn.disabled = false;
    if(individualBtn.disabled === true && sumBtn.disabled === true){
        endTurnBtn.disabled = false;
        rollBtn.disabled = true;
    }
}

function shut(boxNumber){
    document.querySelector("#box"+boxNumber).classList.add('shut');
    document.querySelector("#box"+boxNumber).textContent = "X";
}

function buildRow(round, points){
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Round " + round
    const p1td = document.createElement("td");
    const p2td = document.createElement("td");
    tr.id = "round" + round;
    p1td.classList.add('p1Pts');
    p1td.textContent = points
    p2td.classList.add('p2Pts');
    tr.insertAdjacentElement('beforeend', th);
    tr.insertAdjacentElement('beforeend', p1td);
    tr.insertAdjacentElement('beforeend', p2td);
    return tr
}

function resetBoard(){
    boxes.fill(0);
   const box = document.querySelectorAll('.boxes');
   for( let i = 0; i < box.length; i++){
    box[i].classList.remove('shut');
    box[i].textContent = i+1;
   }
   rollBtn.disabled = false;
}

function gameOver() {
    if(round > 5){
        console.log('GAME OVER!');
        rollBtn.disabled = true;
        endTurnBtn.disabled = true;
        startHidden.style.display = 'none';
        winner.style.display = '';
       }
       const h3 = document.querySelector('h3');
    if(p1Total < p2Total){
        h3.textContent = p1Name + " won the game with a score of " + p1Total + " vs " + p2Name + " with a score of " + p2Total;
    }else{
        h3.textContent = p2Name + " won the game with a score of " + p2Total + " vs " + p1Name + " with a score of " + p1Total;
    }
}
