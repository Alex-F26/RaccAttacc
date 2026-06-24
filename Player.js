import {
    Projectile, Soda, Bottle, Apple, Frog,
    LaserShot1, LaserShot2, LaserShot3
} from './Projectile.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('raccoon1');

        this.markedForDeletion = false;
        this.width  = 200;
        this.height = 150;
        this.x = 20;
        this.y = 0;

        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 2;

        this.vy = 0;
        this.gravity = 7000;
        this.jumpStrength = -1800;
        this.grounded = true;

        this.projectiles = [];

        // Power-up flags
        this.BombPowerUp   = false;
        this.JetPackPowerUp = false;
        this.HeartPowerUp  = false;
        this.RaygunPowerUp = false;

        // Power-up timers
        this.BombPowerUpTimer   = 0;
        this.BombPowerUpLimit   = 7000;
        this.AirSupportTimer    = 0;
        this.AirSupportLimit    = 350;

        this.JetPackPowerUpTimer = 0;
        this.JetPackPowerUpLimit = 10000;

        this.HeartPowerUpTimer       = 0;
        this.HeartPowerUpLimit       = 10000;
        this.HeartPowerUpAdderTimer  = 0;
        this.HeartPowerUpAdderLimit  = 1000;

        this.RaygunPowerUpTimer = 0;
        this.RaygunPowerUpLimit = 10000;

        this.gameTime = 0;

        this.frameX    = 0;
        this.frameY    = 0;
        this.maxFrame  = 11;
        this.frameTime = 0;

        this.canJump = true;

        this.knockbackX     = 0;
        this.knockbackY     = 0;
        this.isKnockedBack  = false;
        this.knockbackTimer = 0;
    }

    // update
    update(deltaTime) {
        this._applyKnockback(deltaTime);
        this._handleHorizontalMovement(deltaTime);
        this._applyGravityAndVertical(deltaTime);
        this._enforceGrounded();
        this._handleJump(deltaTime);
        this._enforceVerticalBounds();
        this._enforceHorizontalBounds();
        this._updateProjectiles(deltaTime);
        this._advanceAnimation();
        this._tickPowerUps(deltaTime);
    }

    // draw
    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach(p => p.draw(context));
        context.drawImage(
            this.image,
            this.frameX * this.width, this.frameY * this.height,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
    }

    // shooting
    shootTop() {
        if (this.RaygunPowerUp) {
            this.shootLaser();
            return;
        }
        if (this.game.ammo <= 0) return;

        const laserShotSound1 = document.getElementById('laserShotSound1');
        const rand = Math.random();
        const origin = { x: this.x + 140, y: this.y + 35 };

        let projectile;
        if      (rand < 0.1)  projectile = new Projectile(this.game, origin.x, origin.y);
        else if (rand < 0.3)  projectile = new Soda(this.game, origin.x, origin.y);
        else if (rand < 0.6)  projectile = new Bottle(this.game, origin.x, origin.y);
        else if (rand < 0.9)  projectile = new Apple(this.game, origin.x, origin.y);
        else                  projectile = new Frog(this.game, origin.x, origin.y);

        this.projectiles.push(projectile);
        laserShotSound1.currentTime = 0;
        laserShotSound1.play();
        this.game.ammo--;
    }

    shootLaser() {
        if (this.game.ammo <= 0) return;
        const laserShotSound1 = document.getElementById('laserShotSound1');
        const ox = this.x + 165;
        const oy = this.y + 40;
        this.projectiles.push(new LaserShot1(this.game, ox, oy));
        this.projectiles.push(new LaserShot2(this.game, ox, oy));
        this.projectiles.push(new LaserShot3(this.game, ox, oy));
        laserShotSound1.currentTime = 0;
        laserShotSound1.play();
        this.game.ammo--;
    }

    // power-up entry points
    enterBombPowerUp() {
        this.game.ammo += 3;
        this.BombPowerUpTimer = 0;
        this.BombPowerUp = true;
        this._playPowerUpSound();
    }

    enterJetPackPowerUp() {
        this.game.ammo += 3;
        this.JetPackPowerUpTimer = 0;
        this.JetPackPowerUp = true;
        this._playPowerUpSound();
        const JETPACKSOUND = document.getElementById('JETPACKSOUND');
        JETPACKSOUND.currentTime = 0;
        JETPACKSOUND.play();
    }

    enterHeartPowerUp() {
        this.game.ammo += 3;
        this.HeartPowerUpTimer = 0;
        this.HeartPowerUp = true;
        this._playPowerUpSound();
    }

    enterRaygunPowerUp() {
        this.game.ammo += 5;
        this.RaygunPowerUpTimer = 0;
        this.RaygunPowerUp = true;
        this._playPowerUpSound();
    }

    // private helpers
    _playPowerUpSound() {
        const snd = document.getElementById('powerUpSound');
        snd.currentTime = 0;
        snd.play();
    }

    _applyKnockback(deltaTime) {
        if (!this.isKnockedBack) return;
        this.x += this.knockbackX * (deltaTime / 1000);
        this.y += this.knockbackY * (deltaTime / 1000);
        this.knockbackX *= (0.70 ** (deltaTime / 16));
        this.knockbackY *= (0.70 ** (deltaTime / 16));
        this.knockbackTimer--;
        if (this.knockbackTimer <= 0) {
            this.isKnockedBack = false;
            this.knockbackX = 0;
            this.knockbackY = 0;
        }
    }

    _handleHorizontalMovement(deltaTime) {
        const baseSpeed = this.JetPackPowerUp ? 600 : 400;
        if (this.game.keys.includes('ArrowRight'))      this.speedX =  baseSpeed * this.game.speed * (deltaTime / 1000);
        else if (this.game.keys.includes('ArrowLeft'))  this.speedX = -baseSpeed * this.game.speed * (deltaTime / 1000);
        else                                             this.speedX = 0;
        this.x += this.speedX;
    }

    _applyGravityAndVertical(deltaTime) {
        this.vy += this.gravity * (deltaTime / 1000);
        this.y  += this.vy * this.game.speed * (deltaTime / 1000);
    }

    _enforceGrounded() {
        if (this.y >= this.game.height - this.height) {
            this.y = this.game.height - this.height;
            this.vy = 0;
            this.grounded = true;
        } else if (this.y < this.game.height - this.height && !this.game.checkPlatformCollision) {
            this.grounded = false;
        }
    }

    _handleJump(deltaTime) {
        const up   = this.game.keys.includes('ArrowUp');
        const down = this.game.keys.includes('ArrowDown');

        if (up && this.grounded && this.canJump && !this.JetPackPowerUp) {
            this.vy = this.jumpStrength;
            this.grounded = false;
            this.canJump  = false;
        } else if (down && this.grounded && !this.JetPackPowerUp) {
            this.grounded = false;
            this.y += 45;
        }

        if (this.JetPackPowerUp) {
            this.vy = 0;
            if (down) { this.grounded = false; this.y += 700 * this.game.speed * (deltaTime / 1000); }
            if (up)   { this.grounded = false; this.y -= 700 * this.game.speed * (deltaTime / 1000); }
        }
    }

    _enforceVerticalBounds() {
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
        else if (this.y < -100) this.y = -100;
    }

    _enforceHorizontalBounds() {
        if (this.x > this.game.width - this.width / 2)  this.x = this.game.width - this.width / 2;
        else if (this.x < -this.width / 2)               this.x = -this.width / 2;
    }

    _updateProjectiles(deltaTime) {
        this.projectiles.forEach(p => p.update(deltaTime));
        this.projectiles = this.projectiles.filter(p => !p.markedForDeletion);
    }

    _advanceAnimation() {
        if (!this.gameOver) this.gameTime += 16; // rough dt placeholder; called per-frame
        if (this.frameX < this.maxFrame) {
            if (this.frameTime < 100) this.frameTime += 4;
            else { this.frameTime = 0; this.frameX += 1; }
        } else {
            this.frameX = 0;
        }
    }

    // power-up ticks
    _tickPowerUps(deltaTime) {
        if (this.BombPowerUp)    this._tickBomb(deltaTime);
        if (this.JetPackPowerUp) this._tickJetPack(deltaTime);
        if (this.HeartPowerUp)   this._tickHeart(deltaTime);
        if (this.RaygunPowerUp)  this._tickRaygun(deltaTime);
    }

    _tickBomb(deltaTime) {
        if (this.BombPowerUpTimer < this.BombPowerUpLimit) {
            this.BombPowerUpTimer += deltaTime;
            if (this.AirSupportTimer < this.AirSupportLimit) {
                this.AirSupportTimer += deltaTime;
            } else {
                this.AirSupportTimer = 0;
                this.game.addAirSupport();
            }
        } else {
            this.BombPowerUp = false;
            this.BombPowerUpTimer = 0;
            this.game.AirSupportS.forEach(a => {
                a.markedForDeletion = true;
                this.game.addExplosion(a);
            });
        }
    }

    _tickJetPack(deltaTime) {
        if (this.JetPackPowerUpTimer < this.JetPackPowerUpLimit) {
            this.JetPackPowerUpTimer += deltaTime;
            this.gravity = 0;
            if (!this.RaygunPowerUp) {
                if (!this.game.spacePressed) this.image = document.getElementById('raccoonJet1');
            } else {
                this.image = document.getElementById('flyingRaygun');
            }
        } else {
            this.JetPackPowerUp = false;
            this.JetPackPowerUpTimer = 0;
            this.image = document.getElementById('raccoon1');
            this.gravity = 7000;
        }
    }

    _tickHeart(deltaTime) {
        if (this.HeartPowerUpTimer < this.HeartPowerUpLimit) {
            this.HeartPowerUpTimer += deltaTime;
            if (this.HeartPowerUpAdderTimer < this.HeartPowerUpAdderLimit) {
                this.HeartPowerUpAdderTimer += deltaTime;
            } else {
                if (this.game.lives < this.game.MaxLives) this.game.lives++;
                this.HeartPowerUpAdderTimer = 0;
            }
        } else {
            this.HeartPowerUp = false;
            this.HeartPowerUpTimer = 0;
            this.HeartPowerUpAdderTimer = 0;
            this.game.powerups.forEach(p => {
                if (p.constructor.name === 'HealthRing') p.markedForDeletion = true;
            });
        }
    }

    _tickRaygun(deltaTime) {
        if (this.RaygunPowerUpTimer < this.RaygunPowerUpLimit) {
            this.RaygunPowerUpTimer += deltaTime;
            this.image = this.JetPackPowerUp
                ? document.getElementById('flyingRaygun')
                : document.getElementById('groundedRaygun');
        } else {
            this.RaygunPowerUp = false;
            this.RaygunPowerUpTimer = 0;
            if (this.game.ammo < 10) this.game.ammo = 10;
            this.image = document.getElementById('raccoon1');
        }
    }
}
