let score = 0;

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = -25;
            this.speed = 100 + Math.floor(Math.random() * 200);
        }
        // check for player collision 
        if (this.y === player.y && this.x >= player.x - 50 && this.x <= player.x + 50) {
            // player position coordinates are returned to start and counter is decreased
            gameStats.update();
            player.x = 202;
            player.y = 400;

        }
    }
    // "Draw" the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }
    update() {}
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keypress) {
        if (keypress === 'left' && this.x > 0) {
            console.log(this.x)
            this.x -= 101;
        }
        if (keypress === 'right' && this.x < 375) {
            console.log(this.y)
            this.x += 101;
        }
        if (keypress === 'up' && this.y > 0) {
            this.y -= 83;
            score += 10;
        }
        if (keypress === 'down' && this.y < 375) {
            this.y += 83;
        }
        if (this.y <= 0) {
            setTimeout(() => {
                player.x = 202;
                player.y = 400;
                score += 100;
            }, 400);
        }
    }

}

class Stats {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/Heart.png'
        this.hearts = 3;
    }
    update() {
        this.hearts -= 1;
    }
    // ctx.drawImage(image, dx, dy, dWidth, dHeight);
    render() {
        let heartTotal = this.hearts;
        let heartPosition = this.x;
        if (heartTotal === 0) {
            displayModal();

        }
        for (let i = 0; i < heartTotal; i++) {
            ctx.drawImage(Resources.get(this.sprite), heartPosition, this.y, 30, 50);
            heartPosition -= 30;
        }
    }
}

// enemies array
const allEnemies = [];
// enemy location array
const enemyLocation = [68, 151, 234];
// instantiate enemy object with location
enemyLocation.forEach((locationY) => {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// instantiate player object
const player = new Player(202, 400);
// instantiate stats object
const gameStats = new Stats(470, 05);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // call the handleInput method on the player object 
    player.handleInput(allowedKeys[e.keyCode]);
});

// modal display
function displayModal() {
    const modal = document.querySelector('.modal');
    const canvas = document.querySelector('canvas');
    const modalBody = document.querySelector('.modal-score');
    const button = document.querySelector('.button');
    canvas.parentNode.removeChild(canvas);
    modal.classList.toggle('is-active');
    modalBody.textContent = score;
    button.addEventListener('click', () => {
        location.reload();
    });
}