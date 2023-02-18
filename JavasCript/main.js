const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');


window.addEventListener('load', setCanvaSize);
window.addEventListener('resize', setCanvaSize);

var nivel = 0;

function startGame(canvasSize, lvl) {
    
    const elementSize = canvasSize / 10;
    game.font = elementSize +'px Quicksand'
    game.textAlign = 'end';

    
    var emoji;
    var posX;
    var posY;

    var rows = maps[lvl].trim().split('\n');
    var columns = rows.map(r => r.trim().split(''));

    rows.forEach((row, j) => {
        columns[j].forEach((key, i) => {
            emoji = emojis[key];
            posX = elementSize * (i+1);
            posY = elementSize * (j+1);
            
            game.fillText(emoji, posX, posY);
        });
    });
}

function setCanvaSize() {
    let size = (window.innerHeight > window.innerWidth) ? window.innerWidth * .8 : window.innerHeight * .8;
    canvas.setAttribute('width', size);
    canvas.setAttribute('height', size);

    startGame(size, nivel);
}