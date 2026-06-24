export class InputHandler {
    constructor(game) {
        this.game = game;

        window.addEventListener('keydown', e => {
            const movement = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            if (movement.includes(e.key) && !this.game.keys.includes(e.key)) {
                this.game.keys.push(e.key);
            } else if (e.key === ' ' && !window.gamePaused) {
                this.game.spacePressed = true;
                this.game.player.shootTop();

                // Update sprite for shoot action
                if (!this.game.player.RaygunPowerUp && this.game.player.JetPackPowerUp) {
                    this.game.player.image = document.getElementById('raccoonJet2');
                } else if (!this.game.player.RaygunPowerUp) {
                    this.game.player.image = document.getElementById('raccoon2'); 
                }
            } else if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            }
        });

        window.addEventListener('keyup', e => {
            const idx = this.game.keys.indexOf(e.key);
            if (idx > -1) this.game.keys.splice(idx, 1);

            if (e.key === 'ArrowUp') {
                this.game.player.canJump = true;
            }
            if (e.key === ' ') {
                this.game.spacePressed = false;
                if (!this.game.player.RaygunPowerUp && this.game.player.JetPackPowerUp) {
                    this.game.player.image = document.getElementById('raccoonJet1');
                } else if (!this.game.player.RaygunPowerUp) {
                    this.game.player.image = document.getElementById('raccoon1');
                }
            }
        });
    }
}
