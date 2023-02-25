const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const spanLives = document.querySelector('#lives')
const timer = document.querySelector('#counter');
const record = document.querySelector('#record');

const gameConsole = document.querySelector('.game-console');
const message = document.querySelector('.console-message');
const actionButton = document.querySelector('.action-button');



window.addEventListener('load', setCanvaSize);
window.addEventListener('resize', setCanvaSize);

var level = 0;
var lives = 3;
var canvaSize;
var elementSize;
var playerPosition = { X: undefined, Y: undefined };
var columns;

// control of time
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

    // clear the canvas
    game.clearRect(0, 0, canvaSize, canvaSize);

    // draw the map
    rows.forEach((row, j) => {
        columns[j].forEach((key, i) => {
            emoji = emojis[key];

            posX = Math.floor(elementSize * (i + 1));
            posY = Math.floor(elementSize * (j + 1));

            game.fillText(emoji, posX, posY);

            // Set origin position to render the player in the very first position
            if (!playerPosition.X && key == 'O') {
                playerPosition.X = i + 1;
                playerPosition.Y = j + 1;
            }

        });
    });
    
    // start counting time & draw the time played
    if (!timeInterval) {
        // start the time interval for time played
        timeInterval = setInterval(timingControl, 100);
    }
    // draw the player on the screen
    renderPlayer();

    // if exists get the record from local storage
    recordTime = localStorage.getItem('recordTimeForEscapeFromZoo');
    if(recordTime){
        // show record on the HTML
        record.innerHTML = recordTime;
    }

    // draw the current lives
    spanLives.innerHTML = emojis['HEARTH'].repeat(lives);
}

// control for the number of lives of the player
function lostLive() {
    // player has no more lives
    if (lives - 1 == 0) {
        lives-=1;
        // stop time
        clearInterval(timeInterval);
        // show console
        showConsole('Perdiste todas las vidas, pero puedes volverlo a intentar', 'Reiniciar')
        actionButton.addEventListener('click', restartStats);
        
    } else lives -= 1;

    playerPosition.X = undefined;
}

// restar the stats so the game can be player again
function restartStats(){
    // restart game lives and level
    level = 0;
    lives = 3;

    // restart time counter
    timer.innerHTML = "0:00:00";
    
    // restart the position for the player
    playerPosition.X = undefined;
    playerPosition.Y = undefined;
    timeInterval = undefined;
    timeStart = undefined;

    // hide the console 
    gameConsole.classList.add('no-visible');

    // add the event listener to the keys
    window.addEventListener('keydown', keyPressed);

    // draw the game
    renderGame(level)
}

// control what happens when a level is passed
function levelPassed() {
    //console.log('Finished level');
    if (level + 1 == maps.length) {
        level = level; // no more levels available
        clearInterval(timeInterval); // stop counting time
         // the message that we will send to the console
        var msg = '¡Bien! Terminaste el juego, ¿Quieres intentarlo y superar el récord?';
        
        // if doesn't exists, current record is recordTime
        if (!recordTime) {
            recordTime = timePlayed;
            msg = '¡Felicidades! Terminaste el juego en tiempo récord - ¿Podrás hacerlo nuevamente?'
        } else if (timePlayed < recordTime) {
            // if it does exists, and the current time is less than the record, store it.
            recordTime = timePlayed;
            msg = '¡Increíble! Terminaste y superaste el récord anterior - ¿Quieres intentarlo otra vez?'
        }
        // show record on the HTML
        record.innerHTML = recordTime;
        // Store the record in the local machine
        localStorage.setItem('recordTimeForEscapeFromZoo', recordTime)

        showConsole(msg, 'Adelante!');
        actionButton.addEventListener('click', restartStats);
    } else {
        level += 1;
    }
}

function timingControl() {
    if (!timeStart) {
        timeStart = Date.now();
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
    renderGame(level);
}

function showConsole(msg, btn) {
    // stop listening the keys
    window.removeEventListener('keydown', keyPressed);
    // show the console
    gameConsole.classList.remove('no-visible');
    // show message 
    message.innerHTML = msg;
    // add the restart action to the action button
    actionButton.innerHTML = btn;
}

// format the milliseconds to show as minutes and seconds
function timeFormat(time_msec) {
    const time = ~~(time_msec / 1000);
    const min = (time / 60) | 0;
    const sec = time - (min * 60);
    const msec = ((time_msec / 10) | 0) - (time * 100);
    return min + ':' + ((sec < 10 ? '0' : 0) + sec) + ':' + ((msec < 10 ? '0' : 0) + msec);
}