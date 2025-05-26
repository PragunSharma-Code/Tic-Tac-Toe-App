const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGame = document.querySelector('.new-game-btn');

const winPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let firstPlayer = 'X';
let SecondPlayer = 'O';
let currentPlayer;
let gameGrid = ['', '', '', '', '', '', '', '', ''];

//Creates a blank template for each new game when the page is loaded....
window.onload = gameInitializer;

function gameInitializer() {
    currentPlayer = firstPlayer;
    gameInfo.textContent = `Current Player- ${currentPlayer}`;

}

//Clicking on boxes and making them X/O depending on the current player....
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', () => {
        displayContent(i);
    });
};


function displayContent(value) {
    //So that overwriting can be prevented.....
    if (boxes[value].textContent != '') {
        return;
    }

    if (currentPlayer == firstPlayer) {
        boxes[value].textContent = currentPlayer;
        if (logic(value)) {
            return;
        };

        currentPlayer = SecondPlayer;
        gameInfo.textContent = `Current Player- ${currentPlayer}`;
    } else {
        boxes[value].textContent = currentPlayer;
        if (logic(value)) {
            return;
        };

        currentPlayer = firstPlayer;
        gameInfo.textContent = `Current Player- ${currentPlayer}`;
    }


}

function logic(input) {
    let bool = false;
    gameGrid[input] = currentPlayer;
    for (let i = 0; i < winPos.length; i++) {
        let [a, b, c] = winPos[i];
        if (gameGrid[a] != '' && gameGrid[a] == gameGrid[b] && gameGrid[b] == gameGrid[c]) {
            gameInfo.textContent = `Player ${currentPlayer} Wins!`;
            bool = true;
            boxes[a].classList.add('win');
            boxes[b].classList.add('win');
            boxes[c].classList.add('win');
            newGame.classList.add('active');
            return bool;
        };
    };

    if (!gameGrid.includes('')) {
        bool = true;
        gameInfo.textContent='It\'s a draw';
        newGame.classList.add('active');
        return bool;
    }
}

newGame.addEventListener('click', () => { location.reload() });