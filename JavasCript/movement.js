const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

window.addEventListener('keydown', keyPressed);

function keyPressed(event) {
    switch (event.key) {
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    }
}

function moveUp() {
    //console.log("Move up")
    const newRow = playerPosition.Y - 1;

    if (newRow > 0) {
        const column = playerPosition.X;
        if (!isColliding(newRow, column)) 
            playerPosition.Y = newRow;
    }

    renderGame(level);
}

function moveDown() {
    const newRow = playerPosition.Y + 1;

    if (newRow <= 10) {
        const column = playerPosition.X;
        if(!isColliding(newRow, column))
            playerPosition.Y = newRow;
    }

    renderGame(level);
}

function moveLeft() {
    const newColumn = playerPosition.X - 1;
    if (newColumn > 0) {
        const row = playerPosition.Y;
        if (!isColliding(row, newColumn))
            playerPosition.X = newColumn;
    }
    renderGame(level);
}

function moveRight() {
    const newColumn = playerPosition.X + 1;
    if (newColumn <= 10) {
        const row = playerPosition.Y;
        if (!isColliding(row, newColumn))
        playerPosition.X = newColumn;
    }
    renderGame(level);
}

function isColliding(newRow, newColumn) {

    switch (columns[newRow-1][newColumn-1]) {
        case 'O':
            //console.log('Returned to the start');
            (level-1 < 0) ? level=level : level-=1;
            break;

        case 'X':
            //console.log('Collided');
            lostLive(); // reduce lives
            return true;

        case 'I':
            levelPassed();
            break;
    }

    return false
}