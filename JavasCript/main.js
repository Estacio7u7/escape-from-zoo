const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvaSize);
window.addEventListener('resize', setCanvaSize);

var nivel = 0;
var canvaSize;
var elementSize;
let playerPosition = {X:undefined, Y:undefined};
var columns;

function renderPlayer() {
    console.log(playerPosition)
    game.fillText(
        emojis['PLAYER'] ,
        Math.floor(elementSize * playerPosition.X+1),
        Math.floor(elementSize * playerPosition.Y+1)
    );
}

function renderGame(lvl) {
    
    elementSize = canvaSize / 10;
    game.font = elementSize +'px Quicksand'
    game.textAlign = 'end';

    var emoji;
    var posX;
    var posY;

    var rows = maps[lvl].trim().split('\n');
    columns = rows.map(r => r.trim().split(''));

    game.clearRect(0,0,canvaSize,canvaSize);
    rows.forEach((row, j) => {
        columns[j].forEach((key, i) => {
            emoji = emojis[key];
            
            posX = Math.floor(elementSize * (i+1));
            posY = Math.floor(elementSize * (j+1));

            game.fillText(emoji, posX, posY);

            if(!playerPosition.X && key == 'O'){
                playerPosition.X = i+1;
                playerPosition.Y = j+1;
            }
            
        });
    });
    renderPlayer();
}

function setCanvaSize() {
    canvaSize = (window.innerHeight > window.innerWidth) ? window.innerWidth * .8 : window.innerHeight * .8;
    canvas.setAttribute('width', canvaSize);
    canvas.setAttribute('height', canvaSize);

    renderGame(nivel);
}