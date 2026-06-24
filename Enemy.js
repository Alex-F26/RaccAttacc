// Shared helpers
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Base Enemy
export class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.frameY = 0;
        this.frameTime = 0;
    }

    update(deltaTime) {
        this.x += this.speedX - this.game.speed * (deltaTime / 1000);
        if (this.x + this.width < 0) this.markedForDeletion = true;
        this._animateSprite(10, 1);
    }

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(
            this.image,
            this.frameX * this.width, this.frameY * this.height,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
        if (this.game.debug) {
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y);
        }
    }

    // Advance sprite frame; frameDelay in ticks, increment per tick
    _animateSprite(frameDelay, tickIncrement) {
        if (this.frameX < this.maxFrame) {
            if (this.frameTime < frameDelay) this.frameTime += tickIncrement;
            else {
                this.frameTime = 0;
                this.frameX += 1;
            }
        } else {
            this.frameX = 0;
        }
    }
}

// RAT
export class RAT extends Enemy {
    constructor(game) {
        super(game);
        this.width    = 150;
        this.height   = 150;
        this.y        = this.game.height - this.height;
        this.image    = document.getElementById('RAT');
        this.frameY   = 0;
        this.lives    = 5;
        this.score    = this.lives;
        this.type     = 'RAT';
        this.maxFrame = 5;
        this.speedX   = Math.random() * -170 - 170;

        const RATsound  = document.getElementById('RATsound');
        const RATsound2 = document.getElementById('RATsound2');
        this.sound = Math.random() <= 0.45 ? RATsound.cloneNode() : RATsound2.cloneNode();
        this.sound.volume = Math.random() <= 0.45 ? 0.18 : 0.15;
    }

    update(deltaTime) {
        this.x += this.speedX * this.game.speed * (deltaTime / 1000);
        if (this.x + this.width < 0) this.markedForDeletion = true;

        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 10) this.frameTime += 1;
            else {
                this.frameTime = 0;
                this.sound.play();
                this.frameX += 1;
            }
        } else {
            this.frameX = 0;
        }
    }
}

// WASP
export class WASP extends Enemy {
    constructor(game) {
        super(game);
        this.width    = 100;
        this.height   = 100;
        this.y        = Math.random() * (this.game.height * 0.95 - this.height);
        this.image    = document.getElementById('WASP');
        this.frameY   = 0;
        this.lives    = 3;
        this.score    = this.lives;
        this.type     = 'WASP';
        this.speedX   = Math.random() * -325 - 275;
        this.maxFrame = 5;

        this.sound = document.getElementById('BUZZ').cloneNode();
        this.sound.volume = 1;
    }

    update(deltaTime) {
        this.x += this.speedX * this.game.speed * (deltaTime / 1000);
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
            this.sound.pause();
            this.sound.currentTime = 0;
        }
        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 10) this.frameTime += 1;
            else {
                this.frameTime = 0;
                this.sound.play();
                this.frameX += 1;
            }
        } else {
            this.frameX = 0;
        }
    }
}

// OPOSSUM
export class OPOSSUM extends Enemy {
    constructor(game) {
        super(game);
        this.width      = 230;
        this.height     = 200;
        this.y          = Math.random() * (this.game.height * 0.95 - this.height);
        this.image      = document.getElementById('OPOSSUM');
        this.frameY     = 0;
        this.lives      = 8;
        this.score      = this.lives;
        this.type       = 'OPOSSUM';
        this.speedX     = Math.random() * -100 - 100;
        this.maxFrame   = 3;
        this.SoundCount = 0;

        this.sound = document.getElementById('GROWL').cloneNode();
        this.sound.volume = 0.25;
    }

    update(deltaTime) {
        this.x += this.speedX * this.game.speed * (deltaTime / 1000);
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
            this.sound.pause();
            this.sound.currentTime = 0;
        }
        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 10) this.frameTime += 1;
            else {
                this.frameTime = 0;
                this.frameX += 1;
                if (this.SoundCount === 0) { this.sound.play(); this.SoundCount = 1; }
            }
        } else {
            this.frameX = 0;
            this.SoundCount = 0;
        }
    }
}

// miniOPOSSUM
export class miniOPOSSUM extends Enemy {
    constructor(game, x, y) {
        super(game);
        this.width    = 70;
        this.height   = 40;
        this.x        = x;
        this.y        = y;
        this.image    = document.getElementById('miniOPOSSUM');
        this.frameY   = 0;
        this.lives    = 1;
        this.score    = this.lives;
        this.type     = 'miniOPOSSUM';
        this.speedX   = Math.random() * -550 - 450;
        this.maxFrame = 2;
        this.hasBittenPlayer = false;

        const rand = Math.random();
        if (rand <= 0.6) {
            this.sound = document.getElementById('miniGROWL').cloneNode();
            this.sound.volume = 0.35;
        } else {
            this.sound = document.getElementById('miniGROWL2').cloneNode();
            this.sound.volume = 0.3;
        }
        this.sound.play();
        this.sound.currentTime = 0;
    }

    update(deltaTime) {
        this.x += this.speedX * this.game.speed * (deltaTime / 1000);
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
            this.sound.pause();
            this.sound.currentTime = 0;
        }
        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 10) this.frameTime += 1;
            else {
                this.frameTime = 0;
                this.sound.play();
                this.frameX += 1;
            }
        } else {
            this.frameX = 0;
        }
    }
}

// miniCOWenemy
export class miniCOWenemy extends Enemy {
    constructor(game) {
        super(game);
        this.width    = 75;
        this.height   = 75;
        this.y        = -100;
        this.x        = getRandomInt(50, 800);
        this.image    = Math.random() <= 0.5
            ? document.getElementById('miniCowBrown')
            : document.getElementById('miniCOW');
        this.frameY   = 0;
        this.lives    = 1;
        this.score    = this.lives;
        this.type     = 'miniCOWenemy';
        this.maxFrame = 6;
        this.speedY   = Math.random() * 150 + 100;

        const MRR = document.getElementById('MRR');
        const MOO = document.getElementById('MOO');
        this.sound = Math.random() < 0.5 ? MRR.cloneNode() : MOO.cloneNode();
        this.sound.volume = 0.6;
        this.sound.play();
        this.sound.currentTime = 0;
    }

    update(deltaTime) {
        this.y += this.speedY * this.game.speed * (deltaTime / 1000);
        if (this.y > 510) this.markedForDeletion = true;

        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 100) this.frameTime += 4;
            else { this.frameTime = 0; this.frameX += 1; }
        } else {
            this.frameX = 0;
        }
    }
}
