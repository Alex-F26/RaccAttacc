// Base Explosion
export class Explosion {
    constructor(game, x, y) {
        this.game         = game;
        this.frameX       = 0;
        this.spriteHeight = 200;
        this.spriteWidth  = 200;
        this.width        = this.spriteWidth;
        this.height       = this.spriteHeight;
        this.x            = x - this.width / 2;
        this.y            = y - this.height / 2;
        this.timer        = 0;
        this.fps          = 60;
        this.interval     = 1000 / this.fps;
        this.markedForDeletion = false;
        this.maxFrame     = 7;
    }

    update(deltaTime) {
        this.x -= this.game.speed * (deltaTime / 1000);
        if (this.timer > this.interval) {
            this.frameX++;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth, 0,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.width, this.height
        );
    }
}

// Explosion subclasses
export class SmokeExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.image = document.getElementById('smokeExplosion');
    }
}

export class FireExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.image = document.getElementById('fireExplosion');
    }
}

export class FeatherExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.image = document.getElementById('featherExplosion');
    }
}

export class AcornExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.image = document.getElementById('acornExplosion');
    }
}

export class ProjectileExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.spriteHeight = 30;
        this.spriteWidth  = 30;
        this.width        = this.spriteWidth;
        this.height       = this.spriteHeight;
        this.x            = x - this.width / 2;
        this.y            = y - this.height / 2;
        this.maxFrame     = 6;
        this.image        = document.getElementById('ProjectileExplosion');
    }
}

export class GnomeExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.spriteHeight = 75;
        this.spriteWidth  = 40;
        this.width        = this.spriteWidth;
        this.height       = this.spriteHeight;
        this.x            = x - this.width / 2;
        this.y            = y - this.height / 2;
        this.maxFrame     = 5;
        this.image        = document.getElementById('GnomeExplosion');
    }
}

// Damage (player hit flash)
export class Damage {
    constructor(game, x, y) {
        this.game         = game;
        this.frameX       = 0;
        this.spriteHeight = 200;
        this.spriteWidth  = 200;
        this.width        = this.spriteWidth;
        this.height       = this.spriteHeight;
        this.image        = document.getElementById('DamageFly');
        this.x            = x;
        this.y            = y;
        this.fps          = 60;
        this.timer        = 0;
        this.interval     = 1000 / this.fps;
        this.markedForDeletion = false;
        this.maxFrame     = 2;
    }

    update(deltaTime) {
        this.x = this.game.player.x;
        this.y = this.game.player.y;

        const useFlying = this.game.player.JetPackPowerUp;
        this.image = document.getElementById(useFlying ? 'DamageFly' : 'DamageGro');

        if (this.timer > this.interval) {
            this.frameX++;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth, 0,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.width, this.height
        );
    }
}
