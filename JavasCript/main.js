const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const timer = document.querySelector('#counter');
const record = document.querySelector('#record');

window.addEventListener('load', setCanvaSize);
window.addEventListener('resize', setCanvaSize);

var nivel = 0;
var lives = 3;
var canvaSize;
var elementSize;
var playerPosition = { X: undefined, Y: undefined };
var columns;
var timeStart;
var timeInterval;
var timePlayed;
var recordTime;

function renderPlayer() {
    //console.log(playerPosition)
    game.fillText(
        emojis['PLAYER'],
        // To draw the player we need to calculate the position on pixels
        Math.floor(elementSize * playerPosition.X + 1),
        Math.floor(elementSize * playerPosition.Y + 1)
    );
}

function renderGame(lvl) {
    // get the element size based on the size of the screen
    elementSize = canvaSize / 10;
    game.font = elementSize + 'px Quicksand'
    game.textAlign = 'end';

    // Render the map on the canvas
    var emoji;
    var posX;
    var posY;

    var rows = maps[lvl].trim().split('\n');
    columns = rows.map(r => r.trim().split(''));

    game.clearRect(0, 0, canvaSize, canvaSize);
    rows.forEach((row, j) => {
        columns[j].forEach((key, i) => {
            emoji = emojis[key];

            posX = Math.floor(elementSize * (i + 1));
            posY = Math.floor(elementSize * (j + 1));

            game.fillText(emoji, posX, posY);

            // Set origin position to render the player in the very first position
            // works in firts level because the object is not defined. 
            // in the other levels the position depends on the object playerPosition
            if (!playerPosition.X && key == 'O') {
                playerPosition.X = i + 1;
                playerPosition.Y = j + 1;
            }

        });
    });
    // draw the player on the screen
    renderPlayer();

    // draw the current lives
    spanLives.innerHTML = emojis['HEARTH'].repeat(lives);

    // draw the time played only if the player has moved from it's starting position
    if (!timeInterval) {
        // start the time interval for time played
        timeInterval = setInterval(timingControl, 100);
    }
}

function lostLive() {
    if (lives - 1 == 0) {
        nivel = 0;
        lives = 3;
    } else lives -= 1;

    playerPosition.X = 0;
    playerPosition.Y = 0;
}

function levelPassed() {
    //console.log('Finished level');
    if (nivel + 1 == maps.length) {
        nivel = nivel; // no more levels available
        clearInterval(timeInterval); // stop counting time
        // get the record
        if (!recordTime) {
            recordTime = timePlayed;
        } else if (timePlayed < recordTime) {
            recordTime = timePlayed;
        }
        record.innerHTML = recordTime;
    } else {
        nivel += 1;
    }
}

function timingControl() {
    if (!timeStart) {
        timeStart = Date.now()
    } else {
        timePlayed = timeFormat(Date.now() - timeStart);
        timer.innerHTML = timePlayed;
    }

}

function setCanvaSize() {
    // get the windows size and set the canva size to a percentage of the tiniest dimension of the window
    canvaSize = (window.innerHeight > window.innerWidth) ? window.innerWidth * .8 : window.innerHeight * .8;
    // set the canvas size    
    canvas.setAttribute('width', canvaSize);
    canvas.setAttribute('height', canvaSize);
    // call the rendergame function
    renderGame(nivel);
}

// format the milliseconds to show as minutes and seconds
function timeFormat(time_msec) {
    const time = ~~(time_msec / 1000);
    const min = (time / 60) | 0;
    const sec = time - (min * 60);
    const msec = ((time_msec / 10) | 0) - (time * 100);
    return min + ':' + ((sec < 10 ? '0' : 0) + sec) + ':' + ((msec < 10 ? '0' : 0) + msec);
}