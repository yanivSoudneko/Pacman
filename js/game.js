'use strict'
const WALL = '🍕'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '🍓'
const CHERY = '🍒'
var gInterval

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    getModal()

    gInterval = setInterval(getCherry, 15000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (j === 1 && i === 1 || i === 8 && j === 1 || i === 1 && j === 8 || i === 8 && j === 8) {
                board[i][j] = POWER_FOOD

            }
        }


    }
    return board;
}

function findEmptyCells() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[0].length; j++) {

            if (gBoard[i][j] !== WALL && gBoard[i][j] !== PACMAN && gBoard[i][j] !== GHOST && gBoard[i][j] !== FOOD && gBoard[i][j] !== POWER_FOOD) {
                var emptyPos = { i, j };
                emptyCells.push(emptyPos);

            }
        }
    }
    return emptyCells
}

function getCherry() {
    var cells = findEmptyCells()
    var targetCellIndex = getRandomIntInclusive(0, cells.length)
    var targetCheeryCell = cells[targetCellIndex]
    console.log(targetCheeryCell);
    gBoard[targetCheeryCell.i][targetCheeryCell.j] = CHERY
    renderCell(targetCheeryCell, CHERY)
}

// update model and dom
function updateScore(diff) {
    gGame.score += diff
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
}

// TODO

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null

}


function getModal() {
    var elModal = document.querySelector('.modal ')
    var elButton = elModal.querySelector('.restartbtn')
    elButton.style.display = gGame.isOn ? 'hidden' : 'block'


}

// function getWinModal() {
//     var elModal = document.querySelector('.winModal')
//     elModal.style.display = 'block'

// }