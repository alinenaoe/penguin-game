const penguin = document.querySelector('.penguin');
const background = document.querySelector('.background');


// PENGUIN ACTIONS

let isJumping = false;

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    let position = 0;
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
    iceBlock.style.left = iceBlockPosition + 'px';
    background.appendChild(iceBlock);

    let leftInterval = setInterval(() => {
        if(iceBlockPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(iceBlock);
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