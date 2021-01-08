const penguin = document.querySelector('.penguin');

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

document.addEventListener('keyup', handleKeyUp)