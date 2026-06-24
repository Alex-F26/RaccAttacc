export class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 40;
        this.speed = 400;
        this.speedY = 200;
        this.markedForDeletion = false;
        this.image = document.getElementById('projectile');
    }

    update(deltaTime) {
        this.x += this.speed * this.game.speed * (deltaTime / 1000);
        if (this.x > this.game.width - 50) this.markedForDeletion = true;
    }

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y);
    }
}

// Shared animated projectile update
function animatedUpdate(deltaTime, self) {
    self.x += self.speed * self.game.speed * (deltaTime / 1000);
    if (self.x < -self.game.width + 50) self.markedForDeletion = true;

    const frameDelay = 100;
    if (self.frameX < self.maxFrame) {
        if (self.frameTime < frameDelay) {
            self.frameTime += 3;
        } else {
            self.frameTime = 0;
            self.frameX += 1;
        }
    } else {
        self.frameX = 0;
    }
}

function animatedDraw(context, self) {
    if (self.game.debug) context.strokeRect(self.x, self.y, self.width, self.height);
    context.drawImage(
        self.image,
        self.frameX * self.width, self.frameY * self.height,
        self.width, self.height,
        self.x, self.y,
        self.width, self.height
    );
}

// Soda
export class Soda extends Projectile {
    constructor(game, x, y) {
        super(game, x, y);
        this.width = 30;
        this.height = 20;
        this.image = document.getElementById('soda');
        this.maxFrame = 3;
        this.frameX = 0;
        this.frameY = 0;
        this.frameTime = 0;
        this.type = 'soda';
    }
    update(deltaTime) { animatedUpdate(deltaTime, this); }
    draw(context)     { animatedDraw(context, this); }
}

// Bottle
export class Bottle extends Projectile {
    constructor(game, x, y) {
        super(game, x, y);
        this.width = 30;
        this.height = 30;
        this.image = document.getElementById('bottle');
        this.maxFrame = 3;
        this.frameX = 0;
        this.frameY = 0;
        this.frameTime = 0;
        this.type = 'bottle';
    }
    update(deltaTime) { animatedUpdate(deltaTime, this); }
    draw(context)     { animatedDraw(context, this); }
}

// Apple
export class Apple extends Projectile {
    constructor(game, x, y) {
        super(game, x, y);
        this.width = 30;
        this.height = 30;
        this.image = document.getElementById('apple');
        this.maxFrame = 3;
        this.frameX = 0;
        this.frameY = 0;
        this.frameTime = 0;
        this.type = 'apple';
    }
    update(deltaTime) { animatedUpdate(deltaTime, this); }
    draw(context)     { animatedDraw(context, this); }
}

// Frog
export class Frog extends Projectile {
    constructor(game, x, y) {
        super(game, x, y);
        this.width = 40;
        this.height = 40;
        this.image = document.getElementById('frog');
        this.maxFrame = 3;
        this.frameX = 0;
        this.frameY = 0;
        this.frameTime = 0;
        this.type = 'frog';
    }
    update(deltaTime) { animatedUpdate(deltaTime, this); }
    draw(context)     { animatedDraw(context, this); }
}

// Laser shots (diagonal up / straight / diagonal down)
export class LaserShot1 extends Projectile {
    constructor(game, x, y) {
        super(game, x, y);
        this.width = 30;
        this.height = 20;
        this.image = document.getElementById('laserShot');
    }
    update(deltaTime) {
        this.x += this.speed  * this.game.speed * (deltaTime / 1000);
        this.y -= this.speedY * this.game.speed * (deltaTime / 1000);
        if (this.x > this.game.width) this.markedForDeletion = true;
    }
    draw(context) { context.drawImage(this.image, this.x, this.y); }
}

export class LaserShot2 extends Projectile {
    constructor(game, x, y) {
        super(game, x, y);
        this.width = 30;
        this.height = 20;
        this.image = document.getElementById('laserShot');
    }
    update(deltaTime) {
        this.x += this.speed * this.game.speed * (deltaTime / 1000);
        if (this.x > this.game.width) this.markedForDeletion = true;
    }
    draw(context) { context.drawImage(this.image, this.x, this.y); }
}

export class LaserShot3 extends Projectile {
    constructor(game, x, y) {
        super(game, x, y);
        this.width = 30;
        this.height = 20;
        this.image = document.getElementById('laserShot');
    }
    update(deltaTime) {
        this.x += this.speed  * this.game.speed * (deltaTime / 1000);
        this.y += this.speedY * this.game.speed * (deltaTime / 1000);
        if (this.x > this.game.width) this.markedForDeletion = true;
    }
    draw(context) { context.drawImage(this.image, this.x, this.y); }
}
