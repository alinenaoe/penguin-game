const game = document.getElementById('game');
const gameOver = document.getElementById('game-over');
const penguin = document.querySelector('.penguin');
const penguinSound = document.getElementById('penguin-sound');
const background = document.querySelector('.background');
const restartButton = document.getElementById('restart');
const pointsContainer = document.getElementById('points');
const pointsResult = document.getElementById('result');

let points = 0;

let isJumping = false;
let position = 80;

// PENGUIN ACTIONS

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            jump();
        }
    }

    if(event.keyCode === 13) {
        restartGame();
    }
}

function jump() {
    penguinSound.play();
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 250) {
            clearInterval(upInterval);
            
            let downInterval = setInterval(() => {
                if(position <= 80) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    penguin.style.bottom = position + 'px';
                }
            }, 20)
        } else {
            position += 20;
            penguin.style.bottom = position + 'px';
        }
        
    }, 20)
}

// ICE 

function createIceBlock() {
    const iceBlock = document.createElement('div');
    let iceBlockPosition = 1000;
    // let randomTime = Math.random() * 6000;

    let randomTime = Math.floor(Math.random() * 2000) + 500;
    
    iceBlock.classList.add('ice-block');
    background.appendChild(iceBlock);
    iceBlock.style.left = iceBlockPosition + 'px';

    let leftInterval = setInterval(() => {
        if(iceBlockPosition < -120) {
            clearInterval(leftInterval);
            background.removeChild(iceBlock);
        } else if (iceBlockPosition > 0 && iceBlockPosition < 120 && position < 120 ) {
            // game over
            clearInterval(countingPoints);
            clearInterval(leftInterval);
            penguin.style.transform = "rotate(-40deg)";
            setTimeout(() => { 
                game.remove();
                gameOver.style.display = "block";
                pointsResult.innerHTML = points - 1 + " points";
            }, 500);
            
        } else {
            iceBlockPosition -= 10;
            iceBlock.style.left = iceBlockPosition + 'px'; 
        }
    }, 20);

    setTimeout(createIceBlock, randomTime);
}

// POINTS

let countingPoints = setInterval(() => {
    pointsContainer.innerHTML = points;
    points += 1;
}, 100);


// START GAME

document.addEventListener('keyup', handleKeyUp);
createIceBlock();


// RESTART GAME

function restartGame() {
    location.reload();
}

restartButton.onclick = restartGame;

