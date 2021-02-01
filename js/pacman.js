'use strict'
const PACMAN = '<img class="pacman" src="img/pacman.jpg">'
var gPacman;
// TODO
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function changeColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = "white"
    }
}

function movePacman(ev) {
    if (!gGame.isOn) return
        // TODO: use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
        // TODO: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === CHERY) updateScore(10)
    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        changeColor()
        setTimeout(function() {
            gPacman.isSuper = false
            for (var i = 0; i < gGhosts.length; i++) {
                gGhosts[i].color = getRandomColor()
            }
        }, 5000);
    }


    function killGhost() {
        for (var i = 0; i < gGhosts.length; i++) {
            for (var j = 0; j < gGhosts.length; j++) {
                if (gGhosts[i].location.i === nextLocation.i &&
                    gGhosts[i].location.j === nextLocation.j) {
                    gGhosts.splice(i, 1)
                }
            }
        }
    }







    // TODO: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost()
        } else {
            gameOver()
            return
        }
    }
    // TODO: update the model

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)
        // TODO: Move the pacman
    gPacman.location = { i: nextLocation.i, j: nextLocation.j }
        // TODO: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
        // TODO: update the DOM
    renderCell(nextLocation, PACMAN)
}


// figure out nextLocation
function getNextLocation(eventKeyboard) {
    var nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
                break
        case 'ArrowDown':
            nextLocation.i++
                break
        case 'ArrowLeft':
            nextLocation.j--
                break
        case 'ArrowRight':
            nextLocation.j++
                break
    }
    return nextLocation;
}