import { Game } from './Game.js';
import { Background } from './Background.js';
import { Player } from './Player.js';

// SITE-WIDE CURSOR

const mainMenu        = document.getElementById('mainMenu');
const howToPlayScreen = document.getElementById('HTPscreen');
const INFOScreen      = document.getElementById('INFOScreen');
const SettingsScreen  = document.getElementById('SettingsScreen');
const PauseButton     = document.getElementById('PauseButton');
const cursorSW        = document.querySelector('.custom-cursor.site-wide');
const buttons         = document.querySelectorAll('button');
const canvas2         = document.getElementById('canvas2'); 

cursorSW.style.pointerEvents = 'none';

document.addEventListener('mouseenter', () => {
    if (!gameRunning || gamePaused) cursorSW.style.display = 'block';
});
document.addEventListener('mouseleave', () => {
    cursorSW.style.display = 'none';
});
document.addEventListener('mousemove', TrackCursor);
document.addEventListener('mousedown', () => cursorSW.classList.add('active'));
document.addEventListener('mouseup',   () => cursorSW.classList.remove('active'));

buttons.forEach(button => {
    document.addEventListener('mousedown', () => cursorSW.classList.add('active'));
    document.addEventListener('mouseup',   () => cursorSW.classList.remove('active'));

    button.addEventListener('mouseenter', () => cursorSW.classList.add('hovering-button'));
    button.addEventListener('mouseleave', () => cursorSW.classList.remove('hovering-button'));
});

function TrackCursor(evt) {
    const w = cursorSW.clientWidth;
    const h = cursorSW.clientHeight;
    cursorSW.style.transform = `translate(${evt.clientX - w / 2}px, ${evt.clientY - h / 2}px)`;
}

// GAME STATE

let game;
let gameRunning = false;
let gamePaused  = false;
let lastTime    = 0;
let animationFrameId;

// INIT (runs once on load)

window.addEventListener('load', function () {

    const canvas = document.getElementById('canvas1');
    const ctx    = canvas.getContext('2d');
    canvas.width  = 1024;
    canvas.height = 500;
    canvas2.width  = 1024;
    canvas2.height = 500;

    let Normal = true;
    let Hard   = false;

    const Music       = document.getElementById('Music');
    const MenuMusic   = document.getElementById('MenuMusic');
    const volumeSlider = document.getElementById('myRange');

    Music.volume = 0.35;

    volumeSlider.addEventListener('input', function () {
        const volume = volumeSlider.value / 100;
        Music.volume    = volume;
        MenuMusic.volume = volume;
    });

    const musicSelect = document.getElementById('musicSelect');
    musicSelect.addEventListener('change', function () {
        Music.src = `Assets/AUDIO/${musicSelect.value}`;
        Music.play();
    });

    //Sound declarations 

    const RATsound          = document.getElementById('RATsound');         RATsound.volume = 0.15;
    const RATsound2         = document.getElementById('RATsound2');        RATsound2.volume = 0.15;
    const RATsqueak         = document.getElementById('RATsqueak');        RATsqueak.volume = 0.5;
    const BUZZ              = document.getElementById('BUZZ');             BUZZ.volume = 1;
    const GROWL             = document.getElementById('GROWL');            GROWL.volume = 0.15;
    const miniGROWL         = document.getElementById('miniGROWL');        miniGROWL.volume = 0.2;
    const miniGROWL2        = document.getElementById('miniGROWL2');       miniGROWL2.volume = 0.15;
    const MRR               = document.getElementById('MRR');              MRR.volume = 1;
    const MOO               = document.getElementById('MOO');              MOO.volume = 1;
    const WHO               = document.getElementById('WHO');              WHO.volume = 0.4;
    const WHOWHO            = document.getElementById('WHOWHO');           WHOWHO.volume = 0.05;
    const FeatherPoof       = document.getElementById('FeatherPoof');      FeatherPoof.volume = 0.5;
    const ALIENVOICE        = document.getElementById('ALIENVOICE');       ALIENVOICE.volume = 0.4;
    const ALIENSCREAM       = document.getElementById('ALIENSCREAM');      ALIENSCREAM.volume = 0.2;
    const BOOM              = document.getElementById('BOOM');             BOOM.volume = 0.4;
    const UFOSOUND          = document.getElementById('UFOSOUND');         UFOSOUND.volume = 0.1;
    const MINIALIENVOICE    = document.getElementById('MINIALIENVOICE');   MINIALIENVOICE.volume = 0.4;
    const METALHIT          = document.getElementById('METALHIT');         METALHIT.volume = 1;
    const SQUIRRELSOUND     = document.getElementById('SQUIRRELSOUND');    SQUIRRELSOUND.volume = 1;
    const SLINGSHOT         = document.getElementById('SLINGSHOT');        SLINGSHOT.volume = 0.25;
    const SQUIRRELDEATH     = document.getElementById('SQUIRRELDEATH');    SQUIRRELDEATH.volume = 0.4;
    const GNOMEBREAK        = document.getElementById('GNOMEBREAK');       GNOMEBREAK.volume = 0.35;
    const JETPACKSOUND      = document.getElementById('JETPACKSOUND');     JETPACKSOUND.volume = 0.15;
    const airSupportHitSound = document.getElementById('airSupportHit');   airSupportHitSound.volume = 0.1;
    const laserShotSound1   = document.getElementById('laserShotSound1');  laserShotSound1.volume = 0.15;
    const HIT               = document.getElementById('HIT');              HIT.volume = 0.15;
    const powerUpSound      = document.getElementById('powerUpSound');     powerUpSound.volume = 0.1;
    const PLAYERHURT        = document.getElementById('PLAYERHURT');       PLAYERHURT.volume = 0.3;

    const allSounds = [
        BUZZ, airSupportHitSound, laserShotSound1, JETPACKSOUND, powerUpSound,
        RATsound, RATsound2, WHO, GNOMEBREAK, UFOSOUND, ALIENVOICE,
        SQUIRRELSOUND, MINIALIENVOICE
    ];
    const wasPlaying = new Map();

    function pauseAllSounds() {
        allSounds.forEach(sound => {
            wasPlaying.set(sound, !sound.paused);
            sound.pause();
        });
        Music.pause();
    }

    function resumePlayingSounds() {
        allSounds.forEach(sound => {
            if (wasPlaying.get(sound)) sound.play();
        });
        Music.play();
    }

    //Button: Start

    document.getElementById('StartButton').addEventListener('pointerdown', () => {
        mainMenu.classList.add('hidden');
        canvas.classList.remove('hidden');
        canvas2.classList.add('hidden');

        game = new Game(canvas.width, canvas.height, { Normal, Hard });
        setupGame();
        cursorSW.style.display = 'none';
        PauseButton.classList.remove('hidden');
    });

    //Button: Restart 

    document.getElementById('RestartButton').addEventListener('pointerdown', () => {
        gamePaused  = false;
        gameRunning = false;
        Music.currentTime = 0;
        cancelAnimationFrame(animationFrameId);

        mainMenu.classList.add('hidden');
        canvas.classList.remove('hidden');
        canvas2.classList.add('hidden');

        game.markedForDeletion = true;
        game = new Game(canvas.width, canvas.height, { Normal, Hard });

        setupGame();
        cursorSW.style.display = 'none';
        PauseButton.classList.remove('hidden');
    });

    //Button: Quit

    document.getElementById('QuitButton').addEventListener('pointerdown', () => {
        gamePaused  = false;
        gameRunning = false;
        Music.currentTime = 0;
        cancelAnimationFrame(animationFrameId);

        mainMenu.classList.remove('hidden');
        canvas.classList.add('hidden');
        canvas2.classList.remove('hidden');
        document.getElementById('StartButton').classList.remove('hidden');
        document.getElementById('ResumeButton').classList.add('hidden');
        document.getElementById('RestartButton').classList.add('hidden');
        document.getElementById('QuitButton').classList.add('hidden');
        document.getElementById('WinMessage').classList.add('hidden');
        document.getElementById('LoseMessage').classList.add('hidden');
        document.getElementById('CreditsMessage').classList.add('hidden');

        game.markedForDeletion = true;
    });

    //Button: Resume

    document.getElementById('ResumeButton').addEventListener('pointerdown', () => {
        gamePaused = false;
        mainMenu.classList.add('hidden');
        canvas2.classList.add('hidden');
        cursorSW.style.display = 'none';
        PauseButton.classList.remove('hidden');

        if (Game.gameOver) {
            document.getElementById('WinMessage').classList.remove('hidden');
            document.getElementById('LoseMessage').classList.remove('hidden');
            document.getElementById('CreditsMessage').classList.remove('hidden');
        }

        resumePlayingSounds();
        lastTime = performance.now();
        requestAnimationFrame(animate);
    });

    //Button: More Info 

    document.getElementById('MoreInfo').addEventListener('pointerdown', () => {
        howToPlayScreen.classList.add('hidden');
        mainMenu.classList.remove('hidden');
    });

    //Button: How To Play 

    document.getElementById('HTPButton').addEventListener('click', () => {
        mainMenu.classList.add('hidden');
        howToPlayScreen.classList.remove('hidden');

        document.getElementById('backButtonHTP').addEventListener('click', () => {
            howToPlayScreen.classList.add('hidden');
            mainMenu.classList.remove('hidden');
        });
    });

    //Button: INFO / Critters & Lore 

    let i = 0, b = 0, p = 0;

    document.getElementById('INFOButton').addEventListener('click', () => {
        i = 0; b = 0; p = 0;

        mainMenu.classList.add('hidden');
        INFOScreen.classList.remove('hidden');

        document.getElementById('OPOSSUM-container').classList.remove('hidden');
        document.getElementById('OWLBoss-container').classList.remove('hidden');
        document.getElementById('JETPACK-container').classList.remove('hidden');

        document.getElementById('backButtonINFO').addEventListener('click', () => {
            INFOScreen.classList.add('hidden');
            mainMenu.classList.remove('hidden');

            ['RATMENU-container','WASPMENU-container','cow-container','MINIOWL-container',
             'FLYINGSQUIRREL-container','GNOMES-container','UFOBoss-container',
             'SQUIRRELBoss-container','HEART-container','RAYGUN-container',
             'BOMB-container','PLATFORM-container'].forEach(id =>
                document.getElementById(id).classList.add('hidden'));
        });
    });

    document.getElementById('EnemyNextButtonRight').addEventListener('click', () => {
        i++;
        _showEnemy(i);
        if (i > 6) { i = 0; _showEnemy(i); }
    });

    document.getElementById('EnemyNextButtonLeft').addEventListener('click', () => {
        i--;
        if (i < 0) { i = 6; }
        _showEnemy(i);
    });

    function _showEnemy(index) {
        const all = ['OPOSSUM-container','RATMENU-container','WASPMENU-container',
                     'cow-container','MINIOWL-container','FLYINGSQUIRREL-container','GNOMES-container'];
        all.forEach(id => document.getElementById(id).classList.add('hidden'));
        if (index >= 0 && index < all.length)
            document.getElementById(all[index]).classList.remove('hidden');
    }

    document.getElementById('BossNextButtonRight').addEventListener('click', () => {
        b++;
        if (b > 2) b = 0;
        _showBoss(b);
    });

    document.getElementById('BossNextButtonLeft').addEventListener('click', () => {
        b--;
        if (b < 0) b = 2;
        _showBoss(b);
    });

    function _showBoss(index) {
        const all = ['OWLBoss-container','UFOBoss-container','SQUIRRELBoss-container'];
        all.forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById(all[index]).classList.remove('hidden');
    }

    document.getElementById('PowerUpNextButtonRight').addEventListener('click', () => {
        p++;
        if (p > 4) p = 0;
        _showPowerUp(p);
    });

    document.getElementById('PowerUpNextButtonLeft').addEventListener('click', () => {
        p--;
        if (p < 0) p = 4;
        _showPowerUp(p);
    });

    function _showPowerUp(index) {
        const all = ['JETPACK-container','HEART-container','RAYGUN-container','BOMB-container','PLATFORM-container'];
        all.forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById(all[index]).classList.remove('hidden');
    }

    //Button: Settings 

    document.getElementById('difficultyNormalButtonACTIVE').classList.remove('hidden');
    document.getElementById('normalHiddenMessage').classList.remove('hidden');

    document.getElementById('SettingsButton').addEventListener('click', () => {
        mainMenu.classList.add('hidden');

        if (gameRunning) {
            if (Normal) {
                document.getElementById('difficultyHardButton').classList.add('hidden');
                document.getElementById('difficultyNormalButtonACTIVE').classList.add('hidden');
            } else {
                document.getElementById('difficultyNormalButton').classList.add('hidden');
                document.getElementById('difficultyHardButtonACTIVE').classList.add('hidden');
            }
        } else {
            document.getElementById('difficultyNormalButton').classList.remove('hidden');
            document.getElementById('difficultyHardButton').classList.remove('hidden');
        }
        SettingsScreen.classList.remove('hidden');

        document.getElementById('backButtonSettings').addEventListener('click', () => {
            SettingsScreen.classList.add('hidden');
            mainMenu.classList.remove('hidden');
        });

        function setNormal() {
            Normal = true; Hard = false;
            document.getElementById('difficultyNormalButtonACTIVE').classList.remove('hidden');
            document.getElementById('difficultyHardButtonACTIVE').classList.add('hidden');
            document.getElementById('normalHiddenMessage').classList.remove('hidden');
            document.getElementById('HardHiddenMessage').classList.add('hidden');
        }
        function setHard() {
            Normal = false; Hard = true;
            document.getElementById('difficultyNormalButtonACTIVE').classList.add('hidden');
            document.getElementById('difficultyHardButtonACTIVE').classList.remove('hidden');
            document.getElementById('normalHiddenMessage').classList.add('hidden');
            document.getElementById('HardHiddenMessage').classList.remove('hidden');
        }

        document.getElementById('difficultyNormalButton').addEventListener('click', setNormal);
        document.getElementById('difficultyNormalButtonACTIVE').addEventListener('click', setNormal);
        document.getElementById('difficultyHardButton').addEventListener('click', setHard);
        document.getElementById('difficultyHardButtonACTIVE').addEventListener('click', setHard);
    });

    //Pause (Tab key on PauseButton) 

    document.getElementById('PauseButton').addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        e.preventDefault();
        gamePaused = !gamePaused;

        if (gamePaused) {
            pauseAllSounds();
            document.getElementById('StartButton').classList.add('hidden');
            mainMenu.classList.remove('hidden');
            document.getElementById('ResumeButton').classList.remove('hidden');
            document.getElementById('RestartButton').classList.remove('hidden');
            document.getElementById('QuitButton').classList.remove('hidden');
            PauseButton.classList.add('hidden');
            document.getElementById('WinMessage').classList.add('hidden');
            document.getElementById('LoseMessage').classList.add('hidden');
            document.getElementById('CreditsMessage').classList.add('hidden');
            cursorSW.style.display = 'block';
            canvas2.classList.remove('hidden');
        }
    });

    // setupGame

    function setupGame() {
        document.getElementById('WinMessage').classList.add('hidden');
        document.getElementById('LoseMessage').classList.add('hidden');
        document.getElementById('CreditsMessage').classList.add('hidden');

        if (gameRunning) {
            lastTime     = performance.now();
            game.speed   = 1;
            gamePaused   = false;
            game.background = new Background(game);
            game.player     = new Player(game);
            return;
        }

        gameRunning = true;
        gamePaused  = false;
        lastTime    = performance.now();
        requestAnimationFrame(animate);

        Music.playbackRate = 1;
        Music.play();
    }

    // animate

    function animate(timeStamp) {
        if (!gameRunning || gamePaused) return;

        let deltaTime = timeStamp - lastTime;
        if (deltaTime > 50) deltaTime = 50;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);

        animationFrameId = requestAnimationFrame(animate);
    }

}, { once: true });