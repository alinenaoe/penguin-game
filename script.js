const penguin = document.querySelector('.penguin');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

// PENGUIN ACTIONS

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval);
            
            let downInterval = setInterval(() => {
                if(position <= 0) {
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
    let randomTime = Math.random() * 6000;
    
    iceBlock.classList.add('ice-block');
    background.appendChild(iceBlock);
    iceBlock.style.left = iceBlockPosition + 'px';

    let leftInterval = setInterval(() => {
        if(iceBlockPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(iceBlock);
        } else if (iceBlockPosition > 0 && iceBlockPosition < 60 && position < 60 ) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Game over</h1>';
        } else {
            iceBlockPosition -= 10;
            iceBlock.style.left = iceBlockPosition + 'px'; 
        }
    }, 20);

    setTimeout(createIceBlock, randomTime);
}

// START GAME

document.addEventListener('keyup', handleKeyUp)
createIceBlock();