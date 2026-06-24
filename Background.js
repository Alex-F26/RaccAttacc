// Layer
class Layer {
    constructor(game, image, speedModifier) {
        this.game          = game;
        this.image         = image;
        this.speedModifier = speedModifier;
        this.width         = 1022;
        this.height        = 500;
        this.x             = 0;
        this.y             = 0;
    }

    update(deltaTime) {
        if (this.x <= -this.width) this.x = 0;
        this.x -= this.game.speed * (deltaTime / 1000) * this.speedModifier;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
        context.drawImage(this.image, this.x + this.width, this.y);
    }
}

// Background
export class Background {
    constructor(game) {
        this.game = game;

        const img = id => document.getElementById(id);

        this.layer1  = new Layer(game, img('layer1'),  50);
        this.layer2  = new Layer(game, img('layer2'),  75);
        this.layer3  = new Layer(game, img('layer3'),  75);
        this.layer35 = new Layer(game, img('layer35'), 100);
        this.layer36 = new Layer(game, img('layer36'), 125);
        this.layer4  = new Layer(game, img('layer4'),  200);

        // layer4 is drawn last (foreground), managed by Game.draw()
        this.layers = [this.layer1, this.layer2, this.layer3, this.layer35, this.layer36];
    }

    update(deltaTime) {
        this.layers.forEach(layer => layer.update(deltaTime));
    }

    draw(context) {
        this.layers.forEach(layer => layer.draw(context));
    }
}
