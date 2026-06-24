import { Background }   from './Background.js';
import { Player }       from './Player.js';
import { InputHandler } from './InputHandler.js';
import { UI }           from './UI.js';
import { Platform }     from './Platform.js';
import { Obstacle }     from './Platform.js'; // same file
import { OWL, UFO, SQUIRREL }                     from './Boss.js';
import { miniOWL, miniCOW, ACORN, miniSQUIRREL, SquirrelLaser } from './MiniBoss.js';
import { RAT, WASP, OPOSSUM, miniOPOSSUM, miniCOWenemy }        from './Enemy.js';
import { Bomb, JetPack, Heart, Raygun, HealthRing, AirSupport } from './PowerUp.js';
import { Alien, Feather, AcornSingle, Spark, Screw }            from './Particles.js';
import {
    SmokeExplosion, FireExplosion, FeatherExplosion, AcornExplosion,
    ProjectileExplosion, GnomeExplosion, Damage
} from './Explosion.js';
import { Projectile } from './Projectile.js';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Game {
    constructor(width, height, difficulty = { Normal: true, Hard: false }) {
        this.width  = width;
        this.height = height;

        this.background = new Background(this);
        this.player     = new Player(this);
        this.input      = new InputHandler(this);
        this.ui         = new UI(this);

        this.keys    = [];
        this.enemies = [];

        // Particle arrays
        this.particles    = [];
        this.aliens       = [];
        this.feathers     = [];
        this.sparks       = [];
        this.screws       = [];
        this.acornSingles = [];

        this.damages    = [];
        this.explosions = [];

        // Platforms & obstacles
        this.Platforms       = [];
        this.PlatformTimer   = 0;
        this.PlatformInterval = 1800;

        this.Obstacles        = [];
        this.ObstacleTimer    = 0;
        this.ObstacleInterval = getRandomInt(4255, 5157);

        // Mini-bosses
        this.miniBossTimer           = 0;
        this.miniOWLBossInterval     = 250;
        this.miniCOWBossInterval     = 500;
        this.miniSQUIRRELBossInterval = 800;
        this.squirrelLaserz = [];
        this.miniBosses     = [];

        this.squirrelLaserCount = 0;
        this.ACORNCount  = 0;
        this.RATCount    = 0;
        this.COWcount    = 0;

        // Bosses
        this.bossTimer           = 0;
        this.bossOWLInterval     = 30000;
        this.bossUFOInterval     = 90000;
        this.bossSQUIRRELInterval = 165000;
        this.bosses      = [];
        this.bossCount   = 0;
        this.bossDeaths  = 0;
        this.bossIsAlive = false;

        this.OWLIsAlive      = false;
        this.UFOIsAlive      = false;
        this.SQUIRRELIsAlive = false;

        // Power-ups
        this.powerups         = [];
        this.powerUpInterval  = getRandomInt(5000, 7000);
        this.powerUpTimer     = 0;
        this.AirSupportS      = [];

        this.spacePressed = false;

        // Enemy spawning
        this.enemyTimer    = 0;
        this.enemyInterval = difficulty.Hard
            ? getRandomInt(1500, 1800)
            : getRandomInt(1800, 2200);

        // Ammo
        this.ammo         = difficulty.Hard ? 30 : 20;
        this.maxAmmo      = difficulty.Hard ? 30 : 20;
        this.ammoTimer    = 0;
        this.ammoInterval = difficulty.Hard ? 200 : 300;

        this.gameOver = false;
        this.score    = 0;

        this.gameTime    = 0;
        this.gameTimeX   = 250000;
        this.gameTimeOGX = this.gameTimeX;
        this.timeEnd     = 0;

        this.speed = 1;
        this.debug = false;

        this.lives    = 10;
        this.MaxLives = difficulty.Hard ? 20 : 30;

        this.secondprojectiles = [];
        this.RayGunBackup      = 0;
        this.randomizeSoundTimer = 0;
    }

    // update
    update(deltaTime) {
        // Game-over condition
        if (this.gameTime > this.gameTimeOGX || this.lives < 1 || this.bossDeaths > 2) {
            this.gameOver = true;
        } else if (!this.gameOver && this.gameTimeX > this.timeEnd) {
            this.gameTime  += deltaTime;
            this.gameTimeX -= deltaTime;
        }

        // Late-game raygun spawn
        if (this.gameTimeX < 20000 && this.RayGunBackup < 1) {
            this.addRaygun(350);
            this.RayGunBackup++;
        }

        this.background.update(deltaTime);
        this.background.layer4.update(deltaTime);
        this.player.update(deltaTime);

        // Ammo regeneration
        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) this.ammo++;
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }

        this._updateParticles(deltaTime);
        this._updateAirSupport(deltaTime);
        this._updateEnemies(deltaTime);
        this._updatePowerUps(deltaTime);
        this._updateBosses(deltaTime);
        this._updateMiniBosses(deltaTime);
        this._updatePlatforms(deltaTime);
        this._updateObstacles(deltaTime);
        this._spawnEnemies(deltaTime);
        this._spawnBosses(deltaTime);
        this._cleanupOnGameOver();
    }

    // draw
    draw(context) {
        this.background.draw(context);

        this.miniBosses
            .filter(mb => !(mb instanceof SquirrelLaser))
            .forEach(mb => mb.draw(context));

        this.bosses.forEach(b => b.draw(context));

        this.miniBosses
            .filter(mb => mb instanceof SquirrelLaser)
            .forEach(mb => mb.draw(context));

        this.player.draw(context);

        this.particles.forEach(p => p.draw(context));
        this.aliens.forEach(a => a.draw(context));
        this.feathers.forEach(f => f.draw(context));
        this.sparks.forEach(s => s.draw(context));
        this.screws.forEach(s => s.draw(context));
        this.acornSingles.forEach(a => a.draw(context));

        this.Platforms.forEach(p => p.draw(context));
        this.AirSupportS.forEach(a => a.draw(context));
        this.powerups.forEach(p => p.draw(context));
        this.Obstacles.forEach(o => o.draw(context));
        this.enemies.forEach(e => e.draw(context));
        this.damages.forEach(d => d.draw(context));
        this.explosions.forEach(e => e.draw(context));

        this.background.layer4.draw(context);
        this.ui.draw(context);
    }

    // spawn helpers
    addOWLBoss()      { this.bosses.push(new OWL(this)); }
    addUFOBoss()      { this.bosses.push(new UFO(this)); }
    addSQUIRRELBoss() { this.bosses.push(new SQUIRREL(this)); }

    addMiniOWL()      { this.miniBosses.push(new miniOWL(this)); }
    addMiniCOW()      { this.miniBosses.push(new miniCOW(this)); }
    addMiniSQUIRREL() { this.miniBosses.push(new miniSQUIRREL(this)); }
    addACORN()        { this.miniBosses.push(new ACORN(this)); }
    addSquirrelLaser(){ this.miniBosses.push(new SquirrelLaser(this)); }

    addBomb(y)    { this.powerups.push(new Bomb(this, y)); }
    addJetPack(y) { this.powerups.push(new JetPack(this, y)); }
    addHeart(y)   { this.powerups.push(new Heart(this, y)); }
    addHealthRing(){ this.powerups.push(new HealthRing(this)); }
    addAirSupport() { this.AirSupportS.push(new AirSupport(this)); }
    addRaygun(y)  { this.powerups.push(new Raygun(this, y)); }
    addPlatform() { this.Platforms.push(new Platform(this)); }
    addObstacle() { this.Obstacles.push(new Obstacle(this)); }

    addEnemy() {
        const r = Math.random();
        if      (r < 0.2)  { this.enemies.push(new WASP(this));    this.enemies.push(new miniCOWenemy(this)); }
        else if (r < 0.5)  { this.enemies.push(new RAT(this));     this.enemies.push(new WASP(this)); }
        else if (r < 0.70) { this.enemies.push(new RAT(this));     this.enemies.push(new miniCOWenemy(this)); }
        else                { this.enemies.push(new OPOSSUM(this)); }
    }

    addExplosion(entity) {
        const cx = entity.x + entity.width / 2;
        const cy = entity.y + entity.height / 2;

        if (entity instanceof Player)        { this.damages.push(new Damage(this, entity.x + entity.width, entity.y + entity.height)); return; }
        if (entity instanceof miniOWL)       { this.explosions.push(new FeatherExplosion(this, cx, cy)); return; }
        if (entity instanceof miniSQUIRREL)  { this.explosions.push(new AcornExplosion(this, cx, cy));  return; }
        if (entity instanceof ACORN)         { this.explosions.push(new AcornExplosion(this, cx, cy));  return; }
        if (entity instanceof SquirrelLaser) { this.explosions.push(new FireExplosion(this, cx, cy));   return; }
        if (entity instanceof miniCOW)       { this.explosions.push(new SmokeExplosion(this, cx, cy));  return; }

        if (entity instanceof OWL || entity instanceof UFO || entity instanceof SQUIRREL) {
            [
                [cx, cy],
                [entity.x + entity.width,     entity.y + entity.height],
                [entity.x + entity.width / 4, entity.y + entity.height / 4],
                [entity.x + entity.width,     entity.y + entity.height / 9],
            ].forEach(([x, y]) => this.explosions.push(new SmokeExplosion(this, x, y)));
            return;
        }

        if (entity instanceof AirSupport)  { this.explosions.push(new SmokeExplosion(this, entity.x + entity.width, entity.y + entity.height)); return; }
        if (entity instanceof Projectile)  { this.explosions.push(new ProjectileExplosion(this, cx, cy)); return; }
        if (entity instanceof Obstacle)    { this.explosions.push(new GnomeExplosion(this, cx, cy));      return; }
        // Generic enemy
        this.explosions.push(new FireExplosion(this, cx, cy));
    }

    addDeathSound(entity) {
        if (entity instanceof RAT) {
            document.getElementById('RATsqueak').play();
        }
        if (entity instanceof miniOWL) {
            entity.sound.play();
        }
    }

    addDamageExplosion(x, y) {
        this.explosions.push(new SmokeExplosion(this, x, y));
    }

    // collision helpers
    checkCollision(rect1, rect2) {
        return (
            rect1.x + 50               < rect2.x + rect2.width &&
            rect1.x + rect1.width / 2  > rect2.x &&
            rect1.y + 80               < rect2.y + rect2.height &&
            rect1.y + rect1.height     > rect2.y
        );
    }

    checkJetPackCollision(rect1, rect2) {
        return (
            rect1.x + 50               < rect2.x + rect2.width &&
            rect1.x + rect1.width - 45 > rect2.x &&
            rect1.y + 70               < rect2.y + rect2.height &&
            rect1.y + rect1.height - 40 > rect2.y
        );
    }

    checkProjectileCollision(rect1, rect2) {
        return (
            rect1.x                < rect2.x + rect2.width &&
            rect1.x + rect1.width  > rect2.x &&
            rect1.y                < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    checkAirSupportCollision(rect1, rect2) {
        return this.checkProjectileCollision(rect1, rect2);
    }

    checkGnomeCollision(rect1, rect2) {
        return (
            rect1.x + 50               < rect2.x + rect2.width &&
            rect1.x + rect1.width - 50 > rect2.x &&
            rect1.y                    < rect2.y + rect2.height &&
            rect1.y + rect1.height     > rect2.y
        );
    }

    checkGnomeJetPackCollision(rect1, rect2) {
        return (
            rect1.x + 50               < rect2.x + rect2.width &&
            rect1.x + rect1.width - 45 > rect2.x &&
            rect1.y                    < rect2.y + rect2.height &&
            rect1.y + rect1.height - 40 > rect2.y
        );
    }

    checkPlatformCollision(rect1, rect2) {
        return (
            rect1.x + rect1.width - 20 >= rect2.x &&
            rect1.x + 90               <= rect2.x + rect2.width &&
            rect1.y + rect1.height     >= rect2.y &&
            rect1.y + rect1.height     <= rect2.y + 40
        );
    }

    checkPowerUpCollision(rect1, rect2) {
        return this.checkProjectileCollision(rect1, rect2);
    }

    // private update methods
    _updateParticles(deltaTime) {
        const tick = arr => {
            arr.forEach(p => p.update(deltaTime));
            return arr.filter(p => !p.markedForDeletion);
        };
        this.particles    = tick(this.particles);
        this.aliens       = tick(this.aliens);
        this.feathers     = tick(this.feathers);
        this.sparks       = tick(this.sparks);
        this.screws       = tick(this.screws);
        this.acornSingles = tick(this.acornSingles);
        this.damages      = tick(this.damages);
        this.explosions   = tick(this.explosions);
    }

    _applyKnockback(power, powerY) {
        const knockbackPower = power;
        if (this.player.x < 500) {
            this.player.knockbackX = -knockbackPower;
        } else {
            this.player.knockbackX = knockbackPower;
        }
        this.player.knockbackY     = -powerY;
        this.player.isKnockedBack  = true;
        this.player.knockbackTimer = 20;
    }

    _knockbackFromEntity(entity, powerX = 700, powerY = 700) {
        if (this.player.x < entity.x) {
            this.player.knockbackX = -powerX;
        } else {
            this.player.knockbackX = powerX;
        }
        this.player.knockbackY     = -powerY;
        this.player.isKnockedBack  = true;
        this.player.knockbackTimer = 20;
    }

    _updateAirSupport(deltaTime) {
        this.AirSupportS = this.AirSupportS.filter(a => !a.markedForDeletion);
        const airSupportHitSound = document.getElementById('airSupportHit');

        this.AirSupportS.forEach(airSupport => {
            airSupport.update(deltaTime);

            this.enemies.forEach(enemy => {
                if (enemy instanceof miniOPOSSUM) return;
                if (this.checkAirSupportCollision(airSupport, enemy)) {
                    this.score++;
                    enemy.markedForDeletion      = true;
                    airSupport.markedForDeletion = true;
                    this.addExplosion(airSupport);
                    airSupportHitSound.currentTime = 0;
                    airSupportHitSound.play();
                }
            });

            this.miniBosses.forEach(mb => {
                if (this.checkAirSupportCollision(airSupport, mb)) {
                    this.score++;
                    mb.markedForDeletion         = true;
                    airSupport.markedForDeletion = true;
                    this.addExplosion(airSupport);
                    airSupportHitSound.currentTime = 0;
                    airSupportHitSound.play();
                }
            });

            this.bosses.forEach(boss => {
                if (this.checkAirSupportCollision(airSupport, boss)) {
                    boss.lives -= 0.5;
                    airSupport.markedForDeletion = true;
                    this.addExplosion(airSupport);
                    airSupportHitSound.currentTime = 0;
                    airSupportHitSound.play();
                }
            });
        });
    }

    _updateEnemies(deltaTime) {
        const PLAYERHURT = document.getElementById('PLAYERHURT');
        const HIT        = document.getElementById('HIT');

        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);

            // Player-enemy collision
            const collide = this.player.JetPackPowerUp
                ? this.checkJetPackCollision(this.player, enemy)
                : this.checkCollision(this.player, enemy);

            if (collide) {
                if (enemy instanceof miniOPOSSUM) {
                    if (!enemy.hasBittenPlayer) {
                        PLAYERHURT.play();
                        this.lives--;
                        enemy.hasBittenPlayer = true;
                        this.addExplosion(this.player);
                    }
                    return;
                }
                this._knockbackFromEntity(enemy);
                enemy.markedForDeletion = true;
                this.addExplosion(enemy);
                this.addDeathSound(enemy);
                PLAYERHURT.play();

                const dmg = { OPOSSUM: 5, WASP: 2, RAT: 3, miniCOWenemy: 1 };
                if (!this.gameOver && dmg[enemy.type] !== undefined) {
                    this.score--;
                    this.lives -= dmg[enemy.type];
                    this.addExplosion(this.player);
                }
            }

            // Projectile-enemy collision
            this.player.projectiles.forEach(projectile => {
                if (this.checkProjectileCollision(projectile, enemy)) {
                    if (!(enemy instanceof miniOPOSSUM)) {
                        enemy.lives--;
                        projectile.markedForDeletion = true;
                        this.addExplosion(projectile);
                        HIT.play();
                        HIT.currentTime = 0;
                    }
                    if (enemy.lives <= 0) {
                        enemy.markedForDeletion = true;
                        this.addExplosion(enemy);
                        this.addDeathSound(enemy);
                        if (enemy.type === 'OPOSSUM') {
                            for (let i = 0; i < 5; i++) {
                                this.enemies.push(new miniOPOSSUM(
                                    this,
                                    enemy.x + Math.random() * enemy.width,
                                    enemy.y + Math.random() * enemy.height * 0.8
                                ));
                            }
                        }
                        if (!this.gameOver) this.score += enemy.score;
                    }
                }
            });
        });

        this.enemies.forEach(e => {
            if (e.markedForDeletion && e.sound) {
                e.sound.pause();
                e.sound.currentTime = 0;
            }
        });
        this.enemies = this.enemies.filter(e => !e.markedForDeletion);
    }

    _updatePowerUps(deltaTime) {
        this.powerups.forEach(powerup => {
            powerup.update(deltaTime);
            if (this.checkPowerUpCollision(this.player, powerup)) {
                switch (powerup.type) {
                    case 'Bomb':    this.player.enterBombPowerUp();    powerup.markedForDeletion = true; break;
                    case 'JetPack': this.player.enterJetPackPowerUp(); powerup.markedForDeletion = true; break;
                    case 'Heart':   this.player.enterHeartPowerUp();   this.addHealthRing();  powerup.markedForDeletion = true; break;
                    case 'Raygun':  this.player.enterRaygunPowerUp();  powerup.markedForDeletion = true; break;
                }
            }
        });
        this.powerups = this.powerups.filter(p => !p.markedForDeletion);

        if (this.powerUpTimer > this.powerUpInterval && !this.gameOver && this.gameTime >= 10000) {
            const r = Math.random();
            if      (r < 0.2)  this.addRaygun(getRandomInt(200, 350));
            else if (r < 0.5)  this.addJetPack(getRandomInt(200, 350));
            else if (r < 0.75) this.addHeart(getRandomInt(200, 350));
            else                this.addBomb(getRandomInt(200, 350));
            this.powerUpTimer = 0;
        } else {
            this.powerUpTimer += deltaTime;
        }
    }

    _updateBosses(deltaTime) {
        const PLAYERHURT = document.getElementById('PLAYERHURT');
        const HIT        = document.getElementById('HIT');
        const FeatherPoof = document.getElementById('FeatherPoof');
        const ALIENVOICE  = document.getElementById('ALIENVOICE');
        const ALIENSCREAM = document.getElementById('ALIENSCREAM');
        const UFOSOUND    = document.getElementById('UFOSOUND');
        const BOOM        = document.getElementById('BOOM');
        const SQUIRRELDEATH = document.getElementById('SQUIRRELDEATH');
        const MINIALIENVOICE = document.getElementById('MINIALIENVOICE');
        const SQUIRRELSOUND  = document.getElementById('SQUIRRELSOUND');

        this.bosses.forEach(boss => {
            boss.update(deltaTime);

            // Boss-player collision
            if (this.checkCollision(this.player, boss)) {
                this.lives--;
                PLAYERHURT.play();
                this.addExplosion(this.player);

                const powerX = 3000;
                const powerY = 2000;

                if (boss instanceof OWL || boss instanceof SQUIRREL) {
                    this._knockbackFromEntity(boss, powerX, powerY);
                } else {
                    // UFO : downward push if player is near bottom edge of boss
                    if (this.player.y < boss.y + boss.height && this.player.y > boss.y + boss.height - 100) {
                        this.player.knockbackY = 3000;
                    } else {
                        this._knockbackFromEntity(boss, powerX, powerY);
                    }
                }
            }

            // Projectile-boss collision
            this.player.projectiles.forEach(projectile => {
                if (boss.markedForDeletion) return;
                if (this.checkProjectileCollision(projectile, boss)) {
                    boss.lives--;
                    HIT.play();
                    projectile.markedForDeletion = true;
                    this.addExplosion(projectile);

                    // Particle effects per boss type
                    const pts = [
                        [boss.x + boss.width / 10, boss.y + boss.height / 10],
                        [boss.x + boss.width / 2,  boss.y + boss.height / 2],
                        [boss.x + boss.width,       boss.y + boss.height / 2],
                    ];
                    if (boss instanceof OWL) {
                        FeatherPoof.play(); FeatherPoof.currentTime = 0;
                        pts.forEach(([x, y]) => this.feathers.push(new Feather(this, x, y)));
                    }
                    if (boss instanceof UFO) {
                        HIT.play(); HIT.currentTime = 0;
                        [...pts, [boss.x + boss.width / 5, boss.y + boss.height / 5]]
                            .forEach(([x, y]) => this.sparks.push(new Spark(this, x, y)));
                    }
                    if (boss instanceof SQUIRREL) {
                        [...pts,
                         [boss.x + boss.width / 5,  boss.y + boss.height / 5],
                         [boss.x + boss.width / 15, boss.y + boss.height / 15],
                         [boss.x + boss.width / 2,  boss.y + boss.height],
                        ].forEach(([x, y]) => this.screws.push(new Screw(this, x, y)));
                    }

                    if (boss.lives <= 0) {
                        this.bossDeaths++;

                        if (boss instanceof OWL) {
                            FeatherPoof.play();
                            for (let i = 0; i < 5; i++) {
                                const ox = Math.random() * 50 - 15;
                                const oy = Math.random() * 50 - 15;
                                this.feathers.push(new Feather(this, boss.x + boss.width / 2 + ox, boss.y + boss.height / 2 + oy));
                            }
                        }
                        if (boss instanceof UFO) {
                            ALIENVOICE.pause(); UFOSOUND.pause();
                            ALIENSCREAM.play(); BOOM.play();
                            for (let i = 0; i < 2; i++) {
                                this.aliens.push(new Alien(this, boss.x + boss.width / 2, boss.y + boss.height / 2));
                                this.sparks.push(new Spark(this, boss.x + boss.width, boss.y + boss.height / 2));
                                this.sparks.push(new Spark(this, boss.x + boss.width / 5, boss.y + boss.height / 5));
                            }
                        }
                        if (boss instanceof SQUIRREL) {
                            SQUIRRELDEATH.play(); BOOM.play();
                            this.aliens.push(new Alien(this, boss.x + boss.width / 2, boss.y + boss.height / 2));
                            for (let i = 0; i < 5; i++) {
                                MINIALIENVOICE.pause(); SQUIRRELSOUND.pause();
                                this.acornSingles.push(new AcornSingle(this, boss.x + boss.width / 2, boss.y + boss.height / 2));
                            }
                        }

                        boss.markedForDeletion = true;
                        this.bossIsAlive = false;
                        this.addExplosion(boss);
                        if (!this.gameOver) this.score += boss.score;
                    }
                }
            });
        });

        // Game-over boss removal
        this.bosses.forEach(boss => {
            if (this.gameOver) {
                if (boss instanceof OWL) {
                    for (let i = 0; i < 20; i++) {
                        const ox = Math.random() * 200 - 25;
                        const oy = Math.random() * 200 - 25;
                        this.feathers.push(new Feather(this, boss.x + boss.width / 2 + ox, boss.y + boss.height / 2 + oy));
                    }
                }
                if (boss instanceof UFO)      { for (let i = 0; i < 2; i++) this.aliens.push(new Alien(this, boss.x + boss.width / 2, boss.y + boss.height / 2)); }
                if (boss instanceof SQUIRREL) { for (let i = 0; i < 5; i++) this.acornSingles.push(new AcornSingle(this, boss.x + boss.width / 2, boss.y + boss.height / 2)); }
                this.bosses = this.bosses.filter(b => b.markedForDeletion);
            }
        });

        this.bosses = this.bosses.filter(b => !b.markedForDeletion);

        if (this.bossDeaths === 1) this.OWLIsAlive = false;
        if (this.bossDeaths > 1 && this.bossDeaths <= 2) this.UFOIsAlive = false;
        if (this.bossDeaths > 2) this.SQUIRRELIsAlive = false;
    }

    _updateMiniBosses(deltaTime) {
        const HIT = document.getElementById('HIT');
        const SLINGSHOT = document.getElementById('SLINGSHOT');

        this.miniBosses.forEach(mb => {
            mb.update(deltaTime);

            if (this.checkCollision(this.player, mb)) {
                this._knockbackFromEntity(mb);
                this.lives--;
                document.getElementById('PLAYERHURT').play();
                this.addExplosion(this.player);
                mb.markedForDeletion = true;
                this.addExplosion(mb);
                this.addDeathSound(mb);
            }

            this.player.projectiles.forEach(projectile => {
                if (this.checkProjectileCollision(projectile, mb)) {
                    mb.lives--;
                    HIT.play(); HIT.currentTime = 0;
                    projectile.markedForDeletion = true;
                    this.addExplosion(projectile);
                    if (mb.lives <= 0) {
                        mb.markedForDeletion = true;
                        this.addExplosion(mb);
                        this.addDeathSound(mb);
                        if (!this.gameOver) this.score += mb.score;
                    }
                }
            });
        });

        this.miniBosses = this.miniBosses.filter(mb => !mb.markedForDeletion);

        // Mini-boss spawning logic
        if (this.bossDeaths === 0 && this.gameTime > this.bossOWLInterval + 500 &&
            this.miniBossTimer > this.miniOWLBossInterval && !this.gameOver) {
            this.addMiniOWL();
            this.miniBossTimer = 0;
        } else if (this.bossDeaths === 1 && this.gameTime > this.bossUFOInterval + 500 &&
            this.miniBossTimer > this.miniCOWBossInterval && !this.gameOver) {
            const spawnX = [500, 550, 600, 650, 700, 750];
            if (this.COWcount < 6) {
                this.miniBosses.push(new miniCOW(this, spawnX[this.COWcount]));
                if (this.randomizeSoundTimer < 3) {
                    const MRR = document.getElementById('MRR');
                    const MOO = document.getElementById('MOO');
                    const s   = Math.random() < 0.5 ? MRR.cloneNode() : MOO.cloneNode();
                    s.volume = 0.4; s.play(); s.currentTime = 0;
                    this.randomizeSoundTimer++;
                }
                this.COWcount++;
            } else {
                this.COWcount = 0;
                this.enemies.push(new WASP(this));
            }
            this.miniBossTimer = 0;
        } else if (this.bossDeaths === 2 && this.gameTime > this.bossSQUIRRELInterval + 500 && !this.gameOver) {
            if (this.bosses[0] && this.bosses[0].frameX === 3 && this.ACORNCount === 0) {
                document.getElementById('SLINGSHOT').play();
                document.getElementById('SLINGSHOT').currentTime = 0;
                this.addACORN();
                this.ACORNCount = 1;
            } else if (this.bosses[0] && this.bosses[0].frameX === 4) {
                this.ACORNCount = 0;
            }
            if (this.miniBossTimer >= this.miniSQUIRRELBossInterval) {
                this.addMiniSQUIRREL();
                this.miniBossTimer = 0;
            }
            this.miniBossTimer += deltaTime;
        } else {
            this.miniBossTimer += deltaTime;
        }
    }

    _updatePlatforms(deltaTime) {
        this.Platforms = this.Platforms.filter(p => !p.markedForDeletion);

        if (this.PlatformTimer > this.PlatformInterval && !this.gameOver) {
            this.addPlatform();
            this.PlatformTimer = 0;
        } else {
            this.PlatformTimer += deltaTime;
        }

        this.player.grounded = false;
        this.Platforms.forEach(platform => {
            platform.update(deltaTime);
            if (this.checkPlatformCollision(this.player, platform) && !this.player.JetPackPowerUp) {
                if (this.player.vy >= 0) {
                    this.player.y      = platform.y - this.player.height;
                    this.player.vy     = 0;
                    this.player.grounded = true;
                }
            }
        });
    }

    _updateObstacles(deltaTime) {
        const GNOMEBREAK = document.getElementById('GNOMEBREAK');
        const PLAYERHURT = document.getElementById('PLAYERHURT');

        this.Obstacles = this.Obstacles.filter(o => !o.markedForDeletion);

        if (this.ObstacleTimer > this.ObstacleInterval && !this.gameOver && !this.bossIsAlive) {
            this.addObstacle();
            this.ObstacleTimer = 0;
        } else {
            this.ObstacleTimer += deltaTime;
        }

        this.Obstacles.forEach(obstacle => {
            obstacle.update(deltaTime);

            const collide = this.player.JetPackPowerUp
                ? this.checkGnomeJetPackCollision(this.player, obstacle)
                : this.checkGnomeCollision(this.player, obstacle);

            if (collide) {
                this._knockbackFromEntity(obstacle);
                obstacle.markedForDeletion = true;
                GNOMEBREAK.play();
                this.addExplosion(obstacle);
                this.lives--;
                PLAYERHURT.play();
                this.addExplosion(this.player);
            }
        });
    }

    _spawnEnemies(deltaTime) {
        if (this.enemyTimer > this.enemyInterval && !this.gameOver && !this.bossIsAlive && this.gameTime > 3000) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
    }

    _spawnBosses(deltaTime) {
        if (this.gameTime > this.bossOWLInterval && !this.gameOver) {
            if (this.bossCount === 0) {
                this.addRaygun(350);
                this.addOWLBoss();
                this.OWLIsAlive = true;
                this.bossIsAlive = true;
                this.bossCount++;
                this.bossTimer = 0;
            } else if (this.bossDeaths === 1 && this.bossCount === 1 && this.gameTime > this.bossUFOInterval) {
                this.addJetPack(350);
                this.addUFOBoss();
                this.UFOIsAlive = true;
                this.bossIsAlive = true;
                this.bossCount++;
                this.bossTimer = 0;
            } else if (this.bossDeaths === 2 && this.bossCount === 2 && this.gameTime > this.bossSQUIRRELInterval) {
                this.addBomb(350);
                this.addSQUIRRELBoss();
                this.SQUIRRELIsAlive = true;
                this.bossIsAlive = true;
                this.bossCount++;
                this.bossTimer = 0;
            }
        } else {
            this.bossTimer += deltaTime;
        }
    }

    _cleanupOnGameOver() {
        if (this.gameOver) {
            this.enemies = this.enemies.filter(e => e.markedForDeletion);
        }
    }
}
