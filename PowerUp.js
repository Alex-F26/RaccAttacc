function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Base PowerUp
export class PowerUp {
    constructor(game) {
        this.game    = game;
        this.x       = game.width;
        this.speedX  = 150;
        this.speedY  = 150;
        this.markedForDeletion = false;
        this.frameTime = 0;
        this.frameX    = 0;
        this.frameY    = 0;
        this.y = getRandomInt(200, 350);
    }

    update(deltaTime) {
        this.x -= this.speedX * this.game.speed * (deltaTime / 1000);
        if (this.x < -this.game.width + 50) this.markedForDeletion = true;
    }

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    }

    // Shared animated-sprite advance for animated power-ups
    _animateSprite(frameDelay, increment) {
        if (this.frameX < this.maxFrame) {
            if (this.frameTime < frameDelay) this.frameTime += increment;
            else { this.frameTime = 0; this.frameX++; }
        } else {
            this.frameX = 0;
        }
    }

    _drawSprite(context) {
        context.drawImage(
            this.image,
            this.frameX * this.width, this.frameY * this.height,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
    }
}

// Bomb
export class Bomb extends PowerUp {
    constructor(game, y) {
        super(game);
        this.width    = 60;
        this.height   = 60;
        this.y        = y;
        this.image    = document.getElementById('Bomb');
        this.maxFrame = 4;
        this.type     = 'Bomb';
    }

    update(deltaTime) {
        super.update(deltaTime);
        this._animateSprite(100, 5);
    }

    draw(context) { this._drawSprite(context); }
}

// JetPack
export class JetPack extends PowerUp {
    constructor(game, y) {
        super(game);
        this.width    = 60;
        this.height   = 60;
        this.y        = y;
        this.image    = document.getElementById('JetPack');
        this.maxFrame = 3;
        this.type     = 'JetPack';
    }

    update(deltaTime) {
        super.update(deltaTime);
        this._animateSprite(100, 5);
    }

    draw(context) { this._drawSprite(context); }
}

// Heart
export class Heart extends PowerUp {
    constructor(game, y) {
        super(game);
        this.width    = 40;
        this.height   = 40;
        this.y        = y;
        this.image    = document.getElementById('Heart');
        this.maxFrame = 5;
        this.type     = 'Heart';
    }

    update(deltaTime) {
        super.update(deltaTime);
        this._animateSprite(100, 6);
    }

    draw(context) { this._drawSprite(context); }
}

// Raygun
export class Raygun extends PowerUp {
    constructor(game, y) {
        super(game);
        this.y        = y;
        this.width    = 60;
        this.height   = 60;
        this.image    = document.getElementById('Raygun');
        this.maxFrame = 2;
        this.type     = 'Raygun';
    }

    update(deltaTime) {
        super.update(deltaTime);
        this._animateSprite(100, 3);
    }

    draw(context) { this._drawSprite(context); }
}

// HealthRing (visual effect that orbits the player during Heart power-up)
export class HealthRing extends PowerUp {
    constructor(game) {
        super(game);
        this.width    = 150;
        this.height   = 100;
        this.x        = game.player.x + 50;
        this.y        = game.player.y + 40;
        this.maxFrame = 6;
        this.image    = document.getElementById('HealthRing');
    }

    update(deltaTime) {
        // Follow the player
        this.x = this.game.player.x + 50;
        this.y = this.game.player.y + 40;

        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 100) this.frameTime += 4;
            else { this.frameTime = 0; this.frameX++; }
        } else {
            this.frameX = 0;
        }
    }

    draw(context) { this._drawSprite(context); }
}

// AirSupport (bomb power-up projectile)
export class AirSupport {
    constructor(game) {
        this.game    = game;
        this.width   = 60;
        this.height  = 60;
        this.speedX  = 100;
        this.speedY  = 140;
        this.x       = getRandomInt(0, 600);
        this.y       = -this.height;
        this.markedForDeletion = false;
        this.frameTime = 0;
        this.frameX    = 0;
        this.frameY    = 0;
        this.maxFrame  = 3;
        this.image     = document.getElementById('AirSupport');
    }

    update(deltaTime) {
        this.x += this.speedX * this.game.speed * (deltaTime / 1000);
        this.y += this.speedY * this.game.speed * (deltaTime / 1000);

        if (this.x > this.game.width + 50) this.markedForDeletion = true;
        if (this.y > this.game.height + 50) this.markedForDeletion = true;

        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 100) this.frameTime += 4;
            else { this.frameTime = 0; this.frameX++; }
        } else {
            this.frameX = 0;
        }
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.width, this.frameY * this.height,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
    }
}
