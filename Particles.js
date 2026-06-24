// Shared base for physics particles
class Particle {
    constructor(game, x, y) {
        this.game    = game;
        this.x       = x;
        this.y       = y;
        this.frameX  = Math.floor(Math.random() * 3);
        this.frameY  = 0;
        this.spriteSize = 100;
        this.size    = this.spriteSize;
        this.markedForDeletion = false;
        this.angle   = 0;
    }

    _draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle || 0);
        context.drawImage(
            this.image,
            this.frameX * this.spriteSize,
            this.frameY * this.spriteSize,
            this.spriteSize, this.spriteSize,
            this.size * -0.5, this.size * -0.5,
            this.size, this.size
        );
        context.restore();
    }
}

// Alien
export class Alien extends Particle {
    constructor(game, x, y) {
        super(game, x, y);
        this.image  = document.getElementById('Alien');
        this.speedX = Math.random() * 150 - 150;
        this.speedY = Math.random() * 300 - 300;
        this.gravity = 350;
        this.va     = Math.random() * 0.15 - 0.1;
    }

    update(deltaTime) {
        this.angle  += this.va;
        this.speedY += this.gravity * this.game.speed * (deltaTime / 1000);
        this.x      -= this.speedX * this.game.speed * (deltaTime / 1000);
        this.y      += this.speedY * this.game.speed * (deltaTime / 1000);
        if (this.y > this.game.height + this.size || this.x < -this.size) {
            this.markedForDeletion = true;
        }
    }

    draw(context) { this._draw(context); }
}

// Feather
export class Feather extends Particle {
    constructor(game, x, y) {
        super(game, x, y);
        this.image  = document.getElementById('Feather');
        this.speedX = Math.random() * 50 - 50;
        this.speedY = Math.random() * 250 - 250;
        this.gravity = 200;
    }

    update(deltaTime) {
        this.speedY += this.gravity * this.game.speed * (deltaTime / 1000);
        this.x      -= this.speedX * this.game.speed * (deltaTime / 1000);
        this.y      += this.speedY * this.game.speed * (deltaTime / 1000);
        if (this.y > this.game.height + this.size || this.x < -this.size) {
            this.markedForDeletion = true;
        }
    }

    draw(context) { this._draw(context); }
}

// AcornSingle
export class AcornSingle extends Particle {
    constructor(game, x, y) {
        super(game, x, y);
        this.image   = document.getElementById('AcornParticle');
        this.spriteSize = 80;
        this.size    = this.spriteSize;
        this.speedX  = Math.random() * 500 - 500;
        this.speedY  = Math.random() * 400 - 400;
        this.gravity = 500;
    }

    update(deltaTime) {
        this.speedY += this.gravity * this.game.speed * (deltaTime / 1000);
        this.x      -= this.speedX * this.game.speed * (deltaTime / 1000);
        this.y      += this.speedY * this.game.speed * (deltaTime / 1000);
        if (this.y > this.game.height + this.size || this.x < -this.size) {
            this.markedForDeletion = true;
        }
    }

    draw(context) { this._draw(context); }
}

// Spark
export class Spark extends Particle {
    constructor(game, x, y) {
        super(game, x, y);
        this.image   = document.getElementById('Spark');
        this.spriteSize = 60;
        this.size    = this.spriteSize;
        this.speedX  = Math.random() * 200 - 100;
        this.speedY  = Math.random() * 450 - 450;
        this.gravity = 700;
    }

    update(deltaTime) {
        this.speedY += this.gravity * this.game.speed * (deltaTime / 1000);
        this.x      -= this.speedX * this.game.speed * (deltaTime / 1000);
        this.y      += this.speedY * this.game.speed * (deltaTime / 1000);
        if (this.y > this.game.height + this.size || this.x < -this.size) {
            this.markedForDeletion = true;
        }
    }

    draw(context) { this._draw(context); }
}

// Screw
export class Screw extends Particle {
    constructor(game, x, y) {
        super(game, x, y);
        this.image   = document.getElementById('Screw');
        this.frameY  = Math.floor(Math.random() * 3);
        this.spriteSize = 20;
        this.size    = this.spriteSize;
        this.speedX  = Math.random() * 200 - 100;
        this.speedY  = Math.random() * 450 - 450;
        this.gravity = 700;
        this.bounced = 0;
        this.bottomBounceBoundary = Math.random() * 80 + 60;
    }

    update(deltaTime) {
        this.speedY += this.gravity * this.game.speed * (deltaTime / 1000);
        this.x      -= this.speedX * this.game.speed * (deltaTime / 1000);
        this.y      += this.speedY * this.game.speed * (deltaTime / 1000);

        if (this.y > this.game.height + this.size || this.x < -this.size) {
            this.markedForDeletion = true;
        }

        if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 5) {
            this.bounced++;
            this.speedY *= -0.5;
        }
    }

    draw(context) { this._draw(context); }
}
