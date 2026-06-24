function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Base MiniBoss
export class MiniBoss {
    constructor(game) {
        this.game       = game;
        this.speedX     = Math.random() * -200 - 200;
        this.speedY     = Math.random() * -150 - 150;
        this.markedForDeletion = false;
        this.frameTime  = 0;
        this.frameX     = 0;
        this.frameY     = 0;
    }

    update(/* deltaTime */) {}

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        if (this.game.debug) {
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y);
        }
    }

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

// miniOWL
export class miniOWL extends MiniBoss {
    constructor(game) {
        super(game);
        this.width    = 75;
        this.x        = game.width;
        this.height   = 30;
        this.y        = getRandomInt(0, 500);
        this.yOG      = this.y;
        this.image    = document.getElementById('miniOWL');
        this.maxFrame = 5;
        this.lives    = 1;
        this.score    = this.lives;

        this.sound = document.getElementById('FeatherPoof').cloneNode();
        this.sound.volume = 0.3;
    }

    update(deltaTime) {
        this.x += this.speedX * this.game.speed * (deltaTime / 1000);
        if (this.x + this.width < 0 || this.y + this.height < 0 || this.y > 500) {
            this.markedForDeletion = true;
        }

        const rand = Math.random();
        if (rand < 0.3 && this.yOG >= 250) this.y += this.speedY * this.game.speed * (deltaTime / 1000);
        if (rand < 0.6 && this.yOG <= 200) this.y -= this.speedY * this.game.speed * (deltaTime / 1000);

        this._animateSprite(100, 4);
    }

    draw(context) { this._drawSprite(context); }
}

// miniCOW
export class miniCOW extends MiniBoss {
    constructor(game, x) {
        super(game);
        this.width    = 75;
        this.height   = 75;
        this.x        = x;
        this.y        = 100;
        this.image    = document.getElementById('miniCOW');
        this.maxFrame = 6;
        this.OGx      = x;
        this.lives    = 3;
        this.score    = this.lives;

        const MRR = document.getElementById('MRR');
        const MOO = document.getElementById('MOO');
        this.sound = Math.random() < 0.5 ? MRR.cloneNode() : MOO.cloneNode();
        this.sound.volume = 0.3;
    }

    update(deltaTime) {
        if (this.x + this.width < 0 || this.y + this.height < 0 || this.y > 500) {
            this.markedForDeletion = true;
        }

        // Fan-out attack pattern based on original X spawn
        const dt = this.game.speed * (deltaTime / 1000);
        const patterns = {
            500: () => { this.x -= 100 * dt; this.y = 100; this.image = document.getElementById('miniCOW'); this.sound.play(); this.sound.currentTime = 0; },
            550: () => { this.x -= 110 * dt; this.y += 30 * dt; this.image = document.getElementById('miniCowBrown'); },
            600: () => { this.x -= 105 * dt; this.y += 50 * dt; this.image = document.getElementById('miniCOW'); this.sound.play(); this.sound.currentTime = 0; },
            650: () => { this.x -= 90  * dt; this.y += 70 * dt; this.image = document.getElementById('miniCowBrown'); },
            700: () => { this.x -= 80  * dt; this.y += 80 * dt; this.image = document.getElementById('miniCOW'); },
            750: () => { this.x -= 50  * dt; this.y += 70 * dt; this.image = document.getElementById('miniCowBrown'); this.sound.play(); this.sound.currentTime = 0; },
        };
        if (patterns[this.OGx]) patterns[this.OGx]();

        this._animateSprite(100, 4);
    }

    draw(context) { this._drawSprite(context); }
}

// ACORN
export class ACORN extends MiniBoss {
    constructor(game) {
        super(game);
        this.width    = 60;
        this.x        = game.width - 300;
        this.height   = 60;
        this.y        = 207;
        this.image    = document.getElementById('ACORN');
        this.maxFrame = 4;
        this.referenceY = 0;
        this.lives    = 1;
        this.score    = this.lives;
    }

    update(deltaTime) {
        this.referenceY = this.game.player.y;
        this.x -= 300 * this.game.speed * (deltaTime / 1000);

        if (this.x + this.width < 0 || this.y + this.height < 0 || this.y > 500) {
            this.markedForDeletion = true;
        }

        if (this.referenceY > 300) this.y += 200 * this.game.speed * (deltaTime / 1000);
        if (this.referenceY < 200) this.y -= 200 * this.game.speed * (deltaTime / 1000);

        this._animateSprite(100, 1.6);
    }

    draw(context) { this._drawSprite(context); }
}

// miniSQUIRREL
export class miniSQUIRREL extends MiniBoss {
    constructor(game) {
        super(game);
        this.width    = 45;
        this.x        = getRandomInt(750, 800);
        this.height   = 45;
        this.y        = getRandomInt(0, 500);
        this.yOG      = this.y;
        this.image    = document.getElementById('miniSQUIRREL');
        this.maxFrame = 14;
        this.lives    = 1;
        this.score    = this.lives;
    }

    update(deltaTime) {
        this.x += this.speedX * this.game.speed * (deltaTime / 1000);
        if (this.x + this.width < 0 || this.y + this.height < 0 || this.y > 500) {
            this.markedForDeletion = true;
        }

        const rand = Math.random();
        if (rand < 0.3 && this.yOG >= 250) this.y += this.speedY * this.game.speed * (deltaTime / 1000);
        if (rand < 0.6 && this.yOG <= 250) this.y -= this.speedY * this.game.speed * (deltaTime / 1000);

        this._animateSprite(100, 4);
    }

    draw(context) { this._drawSprite(context); }
}

// SquirrelLaser (unused in final game, kept for reference) 
export class SquirrelLaser extends MiniBoss {
    constructor(game) {
        super(game);
        this.width    = 60;
        this.height   = 30;
        this.x        = game.width - 200;
        this.y        = 100;
        this.image    = document.getElementById('SquirrelLaser');
        this.maxFrame = 0;
        this.lives    = 1;
        this.score    = this.lives;
    }

    update(deltaTime) {
        this.x -= 2;
        this.y += this.game.speed;
        if (this.x + this.width < 0 || this.y + this.height < 0 || this.y > 500) {
            this.markedForDeletion = true;
        }
    }

    draw(context) { this._drawSprite(context); }
}
