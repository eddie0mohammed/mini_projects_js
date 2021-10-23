
const cells = document.querySelectorAll('.col');
const result = document.querySelector('.results');
const winningPlayer = document.querySelector('.player');
const resetButton = document.querySelector('.button');

let gameOver = false;
let playerTurn = 1;

let results = new Array(9).fill(null);
// console.log(results);

function changePlayer(){
    playerTurn = playerTurn === 1 ? 2 : 1;
}

function assignValue(element){
    if (element.textContent == ''){

        if (playerTurn === 1){
            element.textContent = 'O';
            results[element.id] = 'O';
        } else {
            element.textContent = 'X';
            results[element.id] = 'X';

        }
    }

}

function checkGameOverCondition(){
    if (results.every((content) => content !== null)) {
        gameOver = true;

        resetButton.classList.remove('hide');

        
    }   
}

function showWinningPlayer(){
    winningPlayer.textContent = 
        playerTurn === 1 ? '1' : '2';
    result.classList.remove('hide');
    resetButton.classList.remove('hide');

}

function checkBoard(){
    // console.log(results[0], results[1], results[2]);
    // console.log(results[0] === results[1] === results[2]);
    const [c_0, c_1, c_2, c_3, c_4, c_5, c_6, c_7, c_8] = results;
    // console.log(c_0 === c_1 === c_2)
    // console.log(c_0, c_1, c_2);

    if ((c_0 && c_0 === c_1 && c_0 === c_2) 
        || (c_3 && c_3 === c_4 && c_3 === c_5)
        || (c_6 && c_6 === c_7 && c_6 === c_8)
        || (c_0 && c_0 === c_3 && c_0 === c_6)
        || (c_1 && c_1 === c_4 && c_1 === c_7)
        || (c_2 && c_2 === c_5 && c_2 === c_8)
        || (c_0 && c_0 === c_4 && c_0 === c_8)
        || (c_2 && c_2 === c_4 && c_2 === c_6)
        ){
            // console.log('gameover');
            
            gameOver = true;
            showWinningPlayer();
    }


}

function handleCellClick(e) {
    if (gameOver) return ;
    // console.log(e.target.id);
    
    // assign either 'x' or 'o' to the clicked cell
    assignValue(e.target);

    // check if winning condition
    checkBoard();

    // check if game is over
    checkGameOverCondition();

    changePlayer();
    

}

function resetGrid(){
    cells.forEach((cell) => {
        cell.textContent = ''
    })
}

function resetGame(){
    result.classList.add('hide');
    resetButton.classList.add('hide');

    results = new Array(9).fill(null);
    resetGrid();

    gameOver = false;
    playerTurn = 1;

}


// event listeners

cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);


// 0-1-2
// 3-4-5
// 6-7-8
// 0-3-6
// 1-4-7
// 2-5-8
// 0-4-8
// 2-4-6
