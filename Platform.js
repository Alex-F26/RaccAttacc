function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Platform
export class Platform {
    constructor(game) {
        this.game   = game;
        this.width  = 100;
        this.height = 25;
        this.x      = game.width;
        this.speedX = 150;
        this.y      = getRandomInt(290, 350);
        this.markedForDeletion = false;

        const images = ['plat1', 'plat2', 'plat3'];
        this.image = document.getElementById(
            images[Math.floor(Math.random() * images.length)]
        );
    }

    update(deltaTime) {
        this.x -= this.speedX * this.game.speed * (deltaTime / 1000);
        if (this.x < -this.game.width + 50) this.markedForDeletion = true;
    }

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y);
    }
}

// Obstacle (gnomes)
export class Obstacle {
    constructor(game) {
        this.game   = game;
        this.width  = 40;
        this.height = 75;
        this.x      = game.width;
        this.speedX = 100;
        this.y      = game.height - this.height - 10;
        this.markedForDeletion = false;

        const images = ['gnomes1', 'gnomes2', 'gnomes3'];
        this.image = document.getElementById(
            images[Math.floor(Math.random() * images.length)]
        );
    }

    update(deltaTime) {
        this.x -= this.speedX * this.game.speed * (deltaTime / 1000);
        if (this.x < -this.game.width + 50) this.markedForDeletion = true;
    }

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y);
    }
}
