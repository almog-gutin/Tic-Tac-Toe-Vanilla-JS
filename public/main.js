const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');

let isGameOver = false;
let isXTurn = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningMessage = () => `Player ${isXTurn ? 'X' : 'O'} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurnMeesage = () => `It's player ${isXTurn ? 'X' : 'O'} turn!`;

gameStatus.innerText = currentPlayerTurnMeesage();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const changePlayer = () => {
    isXTurn = !isXTurn;
    gameStatus.innerText = currentPlayerTurnMeesage();
};

const handleRoundResult = () => {
    let isRoundOver = false;

    for (let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i];

        const optionA = gameState[winningCondition[0]];
        const optionB = gameState[winningCondition[1]];
        const optionC = gameState[winningCondition[2]];

        if (optionA === '' || optionB === '' || optionC === '') continue;

        if (optionA === optionB && optionB === optionC) {
            isRoundOver = true;
            break;
        }
    }

    if (isRoundOver) {
        gameStatus.innerText = winningMessage();
        isGameOver = true;
        return;
    }

    const isRoundDraw = !gameState.includes('');
    if (isRoundDraw) {
        gameStatus.innerHTML = drawMessage();
        return;
    }

    changePlayer();
};

const updateBoard = (clickedCell, clickedCellIndex) => {
    gameState[clickedCellIndex] = isXTurn ? 'X' : 'O';
    clickedCell.innerText = isXTurn ? 'X' : 'O';

    console.log(gameState);
};

const makeMove = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = +clickedCell.id;

    if (gameState[clickedCellIndex] !== '' || isGameOver) return;

    updateBoard(clickedCell, clickedCellIndex);
    handleRoundResult();
};

const resetGame = () => {
    isGameOver = false;
    isXTurn = true;
    gameState = ['', '', '', '', '', '', '', '', ''];

    gameStatus.innerText = currentPlayerTurnMeesage();

    cells.forEach((cell) => (cell.innerText = ''));
};

cells.forEach((cell) => cell.addEventListener('click', makeMove));
resetBtn.addEventListener('click', resetGame);
