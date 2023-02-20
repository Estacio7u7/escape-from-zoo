const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives')

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
    console.log("Move up")
    const newRow = playerPosition.Y - 1;

    if (newRow > 0) {
        const column = playerPosition.X;
        if (!isColliding(newRow, column)) 
            playerPosition.Y = newRow;
    }

    renderGame(nivel);
}

function moveDown() {
    const newRow = playerPosition.Y + 1;

    if (newRow <= 10) {
        const column = playerPosition.X;
        if(!isColliding(newRow, column))
            playerPosition.Y = newRow;
    }

    renderGame(nivel);
}

function moveLeft() {
    const newColumn = playerPosition.X - 1;
    if (newColumn > 0) {
        const row = playerPosition.Y;
        if (!isColliding(row, newColumn))
            playerPosition.X = newColumn;
    }
    renderGame(nivel);
}

function moveRight() {
    const newColumn = playerPosition.X + 1;
    if (newColumn <= 10) {
        const row = playerPosition.Y;
        if (!isColliding(row, newColumn))
        playerPosition.X = newColumn;
    }
    renderGame(nivel);
}

function isColliding(newRow, newColumn) {

    switch (columns[newRow-1][newColumn-1]) {
        case 'O':
            console.log('Returned to the start');
            (nivel-1 < 0) ? nivel=nivel : nivel-=1;
            break;

        case 'X':
            console.log('Collided');
            
            if(lives-1==0){
                nivel = 0;
                lives = 3;   
            } else  lives-=1;

            playerPosition.X = 0;
            playerPosition.Y = 0;
            return true;

        case 'I':
            console.log('Finished level');
            (nivel+1 == maps.length) ? nivel=nivel : nivel+=1;
            break;
    }

    return false
}