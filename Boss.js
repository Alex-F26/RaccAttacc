// Base Boss
export class Boss {
    constructor(game) {
        this.game       = game;
        this.x          = this.game.width;
        this.speedX     = Math.random() * -200 - 200;
        this.markedForDeletion = false;
        this.frameTime  = 0;
        this.frameX     = 0;
        this.frameY     = 0;
        this.referenceY = 0;
    }

    update(/* deltaTime */) {}

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        if (this.game.debug) {
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y);
        }
    }
}

// OWL
export class OWL extends Boss {
    constructor(game) {
        super(game);
        this.width    = 300;
        this.height   = 500;
        this.y        = 0;
        this.image    = document.getElementById('OWL');
        this.maxFrame = 10;

        this.explosion1 = 0;
        this.explosion2 = 0;

        this.lives    = 125;
        this.livesOG  = this.lives;
        this.score    = this.lives;
    }

    update(deltaTime) {
        const WHO    = document.getElementById('WHO');
        const WHOWHO = document.getElementById('WHOWHO');

        // Damage states
        if (this.lives < this.livesOG - this.livesOG * 0.7) {
            this.image = document.getElementById('OWL90');
            if (this.explosion1 === 0) {
                this.game.addDamageExplosion(900, 230);
                this.game.addDamageExplosion(850, 200);
                this.explosion1++;
            }
            this.height = 171;
            this.y = this.game.height - this.height;
        } else if (this.lives < this.livesOG - this.livesOG * 0.4) {
            this.image = document.getElementById('OWL60');
            if (this.explosion2 === 0) {
                this.game.addDamageExplosion(900, 50);
                this.game.addDamageExplosion(850, 75);
                this.explosion2++;
            }
            this.height = 358;
            this.y = this.game.height - this.height;
        }

        if (this.x > this.game.width - 290) this.x += this.speedX * this.game.speed * (deltaTime / 1000);

        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 100) this.frameTime += 10;
            else {
                this.frameTime = 0;
                this.frameX++;
                WHO.play();
                WHOWHO.play();
            }
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

// UFO
export class UFO extends Boss {
    constructor(game) {
        super(game);
        this.width    = 400;
        this.height   = 200;
        this.y        = 0;
        this.image    = document.getElementById('UFO');
        this.maxFrame = 3;

        this.explosion1 = 0;
        this.explosion2 = 0;

        this.lives   = 111;
        this.livesOG = this.lives;
        this.score   = this.lives;
    }

    update(deltaTime) {
        const ALIENVOICE = document.getElementById('ALIENVOICE');
        const GNOMEBREAK = document.getElementById('GNOMEBREAK');
        const UFOSOUND   = document.getElementById('UFOSOUND');

        if (this.lives < this.livesOG - this.livesOG * 0.7) {
            this.image = document.getElementById('UFO90');
            if (this.explosion1 === 0) {
                this.game.addDamageExplosion(750, 100);
                this.explosion1++;
                ALIENVOICE.play();
            }
        } else if (this.lives < this.livesOG - this.livesOG * 0.4) {
            this.image = document.getElementById('UFO60');
            if (this.explosion2 === 0) {
                this.game.addDamageExplosion(750, 100);
                ALIENVOICE.currentTime = 0;
                GNOMEBREAK.play();
                ALIENVOICE.play();
                this.explosion2++;
            }
        }

        if (this.x > this.game.width - 500) this.x += this.speedX * this.game.speed * (deltaTime / 1000);

        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 200) this.frameTime += 10;
            else {
                this.frameTime = 0;
                this.frameX++;
                UFOSOUND.play();
            }
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

// SQUIRREL
export class SQUIRREL extends Boss {
    constructor(game) {
        super(game);
        this.width    = 300;
        this.height   = 500;
        this.y        = 0;
        this.image    = document.getElementById('SQUIRREL');
        this.maxFrame = 12;
        this.frameX   = 0;

        this.explosion1 = 0;
        this.explosion2 = 0;

        this.lives   = 150;
        this.livesOG = this.lives;
        this.score   = this.lives;
    }

    update(deltaTime) {
        const METALHIT      = document.getElementById('METALHIT');
        const MINIALIENVOICE = document.getElementById('MINIALIENVOICE');
        const SQUIRRELSOUND  = document.getElementById('SQUIRRELSOUND');

        if (this.lives < this.livesOG - this.livesOG * 0.7) {
            this.image = document.getElementById('SQUIRREL90');
            METALHIT.play();
            if (this.explosion1 === 0) {
                this.game.addDamageExplosion(900, 100);
                this.explosion1++;
                MINIALIENVOICE.play();
            }
        } else if (this.lives < this.livesOG - this.livesOG * 0.4) {
            this.image = document.getElementById('SQUIRREL60');
            METALHIT.play();
            if (this.explosion2 === 0) {
                this.game.addDamageExplosion(800, 250);
                MINIALIENVOICE.play();
                this.explosion2++;
            }
        }

        METALHIT.currentTime = 0;

        if (this.x > this.game.width - 290) this.x += this.speedX * this.game.speed * (deltaTime / 1000);

        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 100) this.frameTime += 10;
            else {
                this.frameTime = 0;
                this.frameX++;
                SQUIRRELSOUND.play();
            }
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
