const cells =
document.querySelectorAll(".cell");

const statusText =
document.getElementById("status");

let board =
["","","","","","","","",""];

let gameOver = false;

let playerScore = 0;
let aiScore = 0;

const wins = [

[0,1,2],
[3,4,5],
[6,7,8],

[0,3,6],
[1,4,7],
[2,5,8],

[0,4,8],
[2,4,6]

];

cells.forEach(cell=>{

cell.addEventListener("click",playerMove);

});

function playerMove(){

if(gameOver) return;

const index =
this.dataset.index;

if(board[index] !== "")
return;

board[index] = "X";

this.innerText = "X";

checkGame();

if(gameOver) return;

statusText.innerText =
"AI Thinking...";

setTimeout(aiMove,500);

}

function aiMove(){

    let move = findBestMove("O");

    if(move === -1){

        move = findBestMove("X");

    }

    if(move === -1 && board[4] === ""){

        move = 4;

    }

    if(move === -1){

        const corners = [0,2,6,8]
        .filter(i => board[i] === "");

        if(corners.length){

            move =
            corners[
            Math.floor(
            Math.random() *
            corners.length
            )];

        }

    }

    if(move === -1){

        const empty = [];

        board.forEach((cell,index)=>{

            if(cell === "")
            empty.push(index);

        });

        move =
        empty[
        Math.floor(
        Math.random() *
        empty.length
        )];

    }

    board[move] = "O";

    cells[move].innerText = "O";

    checkGame();

    if(!gameOver){

        statusText.innerText =
        "Your Turn";

    }

}

function findBestMove(player){

    for(let combo of wins){

        const [a,b,c] = combo;

        const line = [
            board[a],
            board[b],
            board[c]
        ];

        const countPlayer =
        line.filter(x => x === player).length;

        const countEmpty =
        line.filter(x => x === "").length;

        if(
            countPlayer === 2 &&
            countEmpty === 1
        ){

            if(board[a] === "") return a;
            if(board[b] === "") return b;
            if(board[c] === "") return c;

        }

    }

    return -1;

}
function checkGame(){

for(let combo of wins){

let a = combo[0];
let b = combo[1];
let c = combo[2];

if(

board[a] &&
board[a] === board[b] &&
board[a] === board[c]

){

cells[a].classList.add("winner");
cells[b].classList.add("winner");
cells[c].classList.add("winner");

gameOver = true;

if(board[a] === "X"){

playerScore++;

document
.getElementById("playerScore")
.innerText = playerScore;

statusText.innerText =
"🎉 You Win!";

}

else{

aiScore++;

document
.getElementById("aiScore")
.innerText = aiScore;

statusText.innerText =
"🤖 AI Wins!";

}

return;

}

}

if(!board.includes("")){

gameOver = true;

statusText.innerText =
"🤝 Draw!";

}

}

function resetGame(){

board =
["","","","","","","","",""];

gameOver = false;

cells.forEach(cell=>{

cell.innerText = "";

cell.classList.remove("winner");

});

statusText.innerText =
"Your Turn";

}