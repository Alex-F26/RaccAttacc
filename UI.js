import { OWL, UFO, SQUIRREL } from './Boss.js';

export class UI {
    constructor(game) {
        this.game       = game;
        this.fontSize   = 20;
        this.fontFamily = 'Jaro';
        this.color      = 'HoneyDew';
    }

    draw(context) {
        context.save();
        context.fillStyle    = this.color;
        context.shadowOffsetX = 3;
        context.shadowOffsetY = 3;
        context.shadowColor   = 'black';
        context.font          = '18px Jaro';

        // Score
        context.fillText('Score: ' + this.game.score, 900, 40);

        // Timer
        const formattedTime = (this.game.gameTimeX * 0.001).toFixed(1);
        if (this.game.gameTimeX < 30000) {
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.fillStyle = 'red';
        }
        context.fillText('Time: ' + formattedTime, 900, 20);

        // Lives
        context.fillStyle = 'red';
        if (this.game.gameOver) {
            context.fillText('Health: ', 10, 20);
        } else {
            context.fillText('Health: ' + this.game.lives, 10, 20);
            for (let i = 0; i < this.game.lives; i++) {
                context.fillStyle = 'red';
                context.fillRect(10 + 3 * i, 25, 3, 5);
            }
        }

        // Prevent crashes from stale boss references after game over
        if (this.game.gameOver) {
            this.game.OWLIsAlive      = false;
            this.game.UFOIsAlive      = false;
            this.game.SQUIRRELIsAlive = false;
        }

        // Boss health bars
        if (this.game.OWLIsAlive) {
            const owlBoss = this.game.bosses.find(b => b instanceof OWL);
            if (owlBoss) {
                context.fillStyle = 'red';
                context.fillText('O.W.L Health', 500, 20);
                for (let i = 0; i < owlBoss.lives; i++) {
                    context.fillStyle = 'red';
                    context.fillRect(310 + 3 * i, 25, 3, 10);
                }
            }
        }
        if (this.game.UFOIsAlive) {
            const ufoBoss = this.game.bosses.find(b => b instanceof UFO);
            if (ufoBoss) {
                context.fillStyle = 'red';
                context.fillText('U.F.O Health', 500, 20);
                for (let i = 0; i < ufoBoss.lives; i++) {
                    context.fillStyle = 'red';
                    context.fillRect(325 + 3 * i, 25, 3, 10);
                }
            }
        }
        if (this.game.SQUIRRELIsAlive) {
            const squirrelBoss = this.game.bosses.find(b => b instanceof SQUIRREL);
            if (squirrelBoss) {
                context.fillStyle = 'red';
                context.fillText('S.Q.U.I.R.R.E.L Health', 450, 20);
                for (let i = 0; i < squirrelBoss.lives; i++) {
                    context.fillStyle = 'red';
                    context.fillRect(300 + 2 * i, 25, 2, 10);
                }
            }
        }

        // Ammo bar
        context.fillStyle = 'cyan';
        context.fillText('Ammo ', 10, 50);
        for (let i = 0; i < this.game.ammo; i++) {
            context.fillStyle = 'cyan';
            if (this.game.player.RaygunPowerUp) {
                context.fillRect(10 + 4 * i, 55, 5, 7);
            } else {
                context.fillRect(10 + 5 * i, 55, 3, 7);
            }
        }

        // Game-over messages
        if (this.game.gameOver) {
            if (this.game.bossDeaths > 2) {
                document.getElementById('WinMessage').classList.remove('hidden');
                document.getElementById('CreditsMessage').classList.remove('hidden');
            } else {
                document.getElementById('LoseMessage').classList.remove('hidden');
            }
        }

        context.restore();
    }
}
 