// import { Player } from './Player.js';


//site wide cursor
const mainMenu = document.getElementById('mainMenu');
const howToPlayScreen = document.getElementById('HTPscreen');
const INFOScreen = document.getElementById('INFOScreen');
const SettingsScreen = document.getElementById('SettingsScreen')
const PauseButton = document.getElementById('PauseButton');
const cursorSW = document.querySelector('.custom-cursor.site-wide');
const buttons = document.querySelectorAll('button');
const canvas2 = document.getElementById ('canvas2');









cursorSW.style.pointerEvents = 'none';
document.addEventListener('mouseenter', () => { 
    if(!gameRunning || gamePaused) cursorSW.style.display = 'block'; 
});

document.addEventListener('mouseleave', () => { 
    cursorSW.style.display = 'none';
});

document.addEventListener('mousemove', TrackCursor); //comment out for game to work FOR NOW

document.addEventListener('mousedown', () => cursorSW.classList.add('active'));
document.addEventListener('mouseup', () => cursorSW.classList.remove('active'));

buttons.forEach(button => {
    document.addEventListener('mousedown', () => cursorSW.classList.add('active'));
    document.addEventListener('mouseup', () => cursorSW.classList.remove('active'));

    button.addEventListener('mouseenter', () => {
       
        cursorSW.classList.add('hovering-button');


    });
    button.addEventListener('mouseleave', () => {
        cursorSW.classList.remove('hovering-button');
    });
});

function TrackCursor(evt){
    const w = cursorSW.clientWidth;
    const h = cursorSW.clientHeight;
    cursorSW.style.transform = `translate(${evt.clientX - w/2}px, ${evt.clientY - h/2}px)`;
}

    
let game;
let gameRunning = false;
let gamePaused = false;

let lastTime = 0;
let animationFrameId;

    Music.volume = 0.35;




window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 500;
    canvas2.width = 1024; 
    canvas2.height = 500;


    var Normal = true;
    var Hard = false;
    
    const Music = document.getElementById('Music');
    const MenuMusic = document.getElementById('MenuMusic');
    const volumeSlider = document.getElementById('myRange');

// When the slider moves
volumeSlider.addEventListener('input', function() {
    const volume = volumeSlider.value / 100; // Convert 1–100 → 0.01–1.0
    Music.volume = volume;
    MenuMusic.volume = volume;
});


const musicSelect = document.getElementById('musicSelect');

musicSelect.addEventListener('change', function() {
    const selectedTrack = musicSelect.value;
    Music.src = `Assets/AUDIO/${selectedTrack}`;
    Music.play(); // Start playing new track
});


document.getElementById('StartButton').addEventListener('pointerdown', () => { //pointerdown works for mouse, touchscreen, and stylus inputs

    mainMenu.classList.add('hidden');
    canvas.classList.remove('hidden');
    canvas2.classList.add('hidden');
    


    game = new Game(canvas.width, canvas.height);
    setupGame(); // <-- call existing game start function here!
    cursorSW.style.display = 'none';
    PauseButton.classList.remove('hidden');
});

document.getElementById('RestartButton').addEventListener('pointerdown', () => { //pointerdown works for mouse, touchscreen, and stylus inputs
    gamePaused = false;
    gameRunning = false; // set to false to allow the setupGame() function to reset the game timer
    Music.currentTime = 0;
    cancelAnimationFrame(animationFrameId);

    
    mainMenu.classList.add('hidden');
    canvas.classList.remove('hidden');
    canvas2.classList.add('hidden');
 
    

    game.markedForDeletion = true;
    game = new Game(canvas.width, canvas.height);
    

    setupGame(); // <-- call existing game start function here!
    cursorSW.style.display = 'none';
    PauseButton.classList.remove('hidden');
});


document.getElementById('QuitButton').addEventListener('pointerdown', () => { //pointerdown works for mouse, touchscreen, and stylus inputs
    gamePaused = false;
    gameRunning = false; // set to false to allow the setupGame() function to reset the game timer
    Music.currentTime = 0;
    cancelAnimationFrame(animationFrameId);

    
    mainMenu.classList.remove('hidden');
    canvas.classList.add('hidden');
    canvas2.classList.remove('hidden');
    StartButton.classList.remove('hidden');
    ResumeButton.classList.add('hidden');
    RestartButton.classList.add('hidden');
    QuitButton.classList.add('hidden');
    document.getElementById("WinMessage").classList.add('hidden');
        document.getElementById("LoseMessage").classList.add('hidden');
        document.getElementById("CreditsMessage").classList.add('hidden');
 
    

    game.markedForDeletion = true;

});

document.getElementById('ResumeButton').addEventListener('pointerdown', () => { 
    gamePaused = false;
            mainMenu.classList.add('hidden');
            canvas2.classList.add('hidden');
            cursorSW.style.display = 'none';
            PauseButton.classList.remove('hidden');

            if(Game.gameOver){
                document.getElementById("WinMessage").classList.remove('hidden');
                document.getElementById("LoseMessage").classList.remove('hidden');
                document.getElementById("CreditsMessage").classList.remove('hidden');
            }


            resumePlayingSounds();
            lastTime = performance.now();
            requestAnimationFrame(animate);

});

document.getElementById('MoreInfo').addEventListener('pointerdown', () => { 
    howToPlayScreen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});


document.getElementById('HTPButton').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    howToPlayScreen.classList.remove('hidden');

    document.getElementById('backButtonHTP').addEventListener('click', () => {
        howToPlayScreen.classList.add('hidden');
        mainMenu.classList.remove('hidden');
    });
});

let i;
let b;
let p;

document.getElementById('INFOButton').addEventListener('click', () => {

     i = 0;
     b = 0;
     p = 0;

    mainMenu.classList.add('hidden');
    INFOScreen.classList.remove('hidden');


    document.getElementById('OPOSSUM-container').classList.remove('hidden');
    document.getElementById('OWLBoss-container').classList.remove('hidden');
    document.getElementById('JETPACK-container').classList.remove('hidden');
    
    


    
    document.getElementById('backButtonINFO').addEventListener('click', () => {

        INFOScreen.classList.add('hidden');
        mainMenu.classList.remove('hidden');

        document.getElementById('RATMENU-container').classList.add('hidden');
        document.getElementById('WASPMENU-container').classList.add('hidden');
        document.getElementById('cow-container').classList.add('hidden');
        document.getElementById('MINIOWL-container').classList.add('hidden');
        document.getElementById('FLYINGSQUIRREL-container').classList.add('hidden');
        document.getElementById('GNOMES-container').classList.add('hidden');


        document.getElementById('UFOBoss-container').classList.add('hidden');
        document.getElementById('SQUIRRELBoss-container').classList.add('hidden');

        document.getElementById('HEART-container').classList.add('hidden');
        document.getElementById('RAYGUN-container').classList.add('hidden');
        document.getElementById('BOMB-container').classList.add('hidden');
        document.getElementById('PLATFORM-container').classList.add('hidden');
    });
});
    

    document.getElementById('EnemyNextButtonRight').addEventListener('click', () => {

        
        
        i++;
        if(i === 0){
            document.getElementById('OPOSSUM-container').classList.remove('hidden');
            document.getElementById('cow-container').classList.add('hidden');
            document.getElementById('GNOMES-container').classList.add('hidden'); 
          }
        if(i === 1){
            document.getElementById('OPOSSUM-container').classList.add('hidden');
            document.getElementById('RATMENU-container').classList.remove('hidden');
            document.getElementById('WASPMENU-container').classList.add('hidden');
          }

        if(i === 2){
            document.getElementById('RATMENU-container').classList.add('hidden');
            document.getElementById('WASPMENU-container').classList.remove('hidden');
            document.getElementById('cow-container').classList.add('hidden');
            }

        if(i === 3){
            document.getElementById('WASPMENU-container').classList.add('hidden');
            document.getElementById('cow-container').classList.remove('hidden');
            document.getElementById('MINIOWL-container').classList.add('hidden');

        }
        if(i === 4){
            document.getElementById('MINIOWL-container').classList.remove('hidden');
            document.getElementById('cow-container').classList.add('hidden');
            document.getElementById('FLYINGSQUIRREL-container').classList.add('hidden');

        }
        if(i === 5){
            document.getElementById('FLYINGSQUIRREL-container').classList.remove('hidden');
            document.getElementById('cow-container').classList.add('hidden');
            document.getElementById('MINIOWL-container').classList.add('hidden');
            document.getElementById('GNOMES-container').classList.add('hidden');
            
        }
        if(i === 6){
            document.getElementById('FLYINGSQUIRREL-container').classList.add('hidden');
            document.getElementById('GNOMES-container').classList.remove('hidden');
        }
        else if(i > 6){
            i = 0;
            document.getElementById('OPOSSUM-container').classList.remove('hidden');
            document.getElementById('cow-container').classList.add('hidden');
            document.getElementById('GNOMES-container').classList.add('hidden');}
            
    });

    document.getElementById('EnemyNextButtonLeft').addEventListener('click', () => {
        
        
        
        i--;
        if(i === 0){
            document.getElementById('OPOSSUM-container').classList.remove('hidden');
            document.getElementById('cow-container').classList.add('hidden');
            document.getElementById('GNOMES-container').classList.add('hidden');
            document.getElementById('RATMENU-container').classList.add('hidden');
            
          }
          else if(i < 0){
            i = 6;
            document.getElementById('FLYINGSQUIRREL-container').classList.remove('hidden');
            document.getElementById('cow-container').classList.add('hidden');
            document.getElementById('MINIOWL-container').classList.add('hidden');
            document.getElementById('OPOSSUM-container').classList.add('hidden');}

        if(i === 1){
            document.getElementById('OPOSSUM-container').classList.add('hidden');
            document.getElementById('RATMENU-container').classList.remove('hidden');
            document.getElementById('WASPMENU-container').classList.add('hidden');
          }

        if(i === 2){
            document.getElementById('RATMENU-container').classList.add('hidden');
            document.getElementById('WASPMENU-container').classList.remove('hidden');
            document.getElementById('cow-container').classList.add('hidden');

            }

        if(i === 3){
            document.getElementById('WASPMENU-container').classList.add('hidden');
            document.getElementById('cow-container').classList.remove('hidden');
           document.getElementById('MINIOWL-container').classList.add('hidden');

        }
        if(i === 4){
            document.getElementById('MINIOWL-container').classList.remove('hidden');
            document.getElementById('cow-container').classList.add('hidden');
            document.getElementById('FLYINGSQUIRREL-container').classList.add('hidden');


        }
        if(i === 5){
            document.getElementById('FLYINGSQUIRREL-container').classList.remove('hidden');
            document.getElementById('cow-container').classList.add('hidden');
            document.getElementById('MINIOWL-container').classList.add('hidden');
            document.getElementById('GNOMES-container').classList.add('hidden');
            

        }
        if(i === 6){
            document.getElementById('GNOMES-container').classList.remove('hidden');
            document.getElementById('OPOSSUM-container').classList.add('hidden');
            document.getElementById('FLYINGSQUIRREL-container').classList.add('hidden');
        }
        
            
    });




document.getElementById('BossNextButtonRight').addEventListener('click', () => {
    
    b++;
    if(b === 0){
        document.getElementById('OWLBoss-container').classList.remove('hidden');
        document.getElementById('UFOBoss-container').classList.add('hidden');
        document.getElementById('SQUIRRELBoss-container').classList.add('hidden');
      }
    if(b === 1){
        document.getElementById('OWLBoss-container').classList.add('hidden');
        document.getElementById('UFOBoss-container').classList.remove('hidden');
        document.getElementById('SQUIRRELBoss-container').classList.add('hidden');
      }

    if(b === 2){
        document.getElementById('OWLBoss-container').classList.add('hidden');
        document.getElementById('UFOBoss-container').classList.add('hidden');
        document.getElementById('SQUIRRELBoss-container').classList.remove('hidden');

    }
    else if(b > 2){
        b= 0;
        document.getElementById('OWLBoss-container').classList.remove('hidden');
        document.getElementById('SQUIRRELBoss-container').classList.add('hidden');
        document.getElementById('UFOBoss-container').classList.add('hidden');
    }
        
});

document.getElementById('BossNextButtonLeft').addEventListener('click', () => {

    b--;
    if(b === 0){
        document.getElementById('OWLBoss-container').classList.remove('hidden');
        document.getElementById('UFOBoss-container').classList.add('hidden');
        document.getElementById('SQUIRRELBoss-container').classList.add('hidden');
        
      }
      else if(b < 0){
        b = 2;
        document.getElementById('OWLBoss-container').classList.add('hidden');
        document.getElementById('SQUIRRELBoss-container').classList.add('hidden');
        document.getElementById('UFOBoss-container').classList.add('hidden');
    }

    if(b === 1){
        document.getElementById('OWLBoss-container').classList.add('hidden');
        document.getElementById('UFOBoss-container').classList.remove('hidden');
        document.getElementById('SQUIRRELBoss-container').classList.add('hidden');
      }

    if(b === 2){
        document.getElementById('OWLBoss-container').classList.add('hidden');
        document.getElementById('UFOBoss-container').classList.add('hidden');
        document.getElementById('SQUIRRELBoss-container').classList.remove('hidden');
        }
    
        
});

document.getElementById('PowerUpNextButtonRight').addEventListener('click', () => {
    
    
    p++;
    if(p === 0){
        document.getElementById('JETPACK-container').classList.remove('hidden');
        document.getElementById('HEART-container').classList.add('hidden');
      }
    if(p === 1){
        document.getElementById('JETPACK-container').classList.add('hidden');
        document.getElementById('RAYGUN-container').classList.add('hidden');
        document.getElementById('HEART-container').classList.remove('hidden');

      }

    if(p === 2){
        document.getElementById('HEART-container').classList.add('hidden');
        document.getElementById('RAYGUN-container').classList.remove('hidden');
        document.getElementById('BOMB-container').classList.add('hidden');


    }
    if(p === 3){
        document.getElementById('PLATFORM-container').classList.add('hidden');
        document.getElementById('RAYGUN-container').classList.add('hidden');
        document.getElementById('BOMB-container').classList.remove('hidden');


    }
    if(p === 4){
        document.getElementById('JETPACK-container').classList.add('hidden');
        document.getElementById('BOMB-container').classList.add('hidden');
        document.getElementById('PLATFORM-container').classList.remove('hidden');

    }
    else if(p > 4){
        p = 0;
        document.getElementById('JETPACK-container').classList.remove('hidden');
        document.getElementById('PLATFORM-container').classList.add('hidden');
    }
        
});

document.getElementById('PowerUpNextButtonLeft').addEventListener('click', () => {
    
    
    p--;
    if(p === 0){
        document.getElementById('JETPACK-container').classList.remove('hidden');
        document.getElementById('HEART-container').classList.add('hidden');
        document.getElementById('PLATFORM-container').classList.add('hidden');
        
      }
      else if(p < 0){
        p = 4;
       
        document.getElementById('JETPACK-container').classList.add('hidden');
        document.getElementById('PLATFORM-container').classList.remove('hidden');

    }

    if(p === 1){
        document.getElementById('JETPACK-container').classList.add('hidden');
        document.getElementById('RAYGUN-container').classList.add('hidden');
        document.getElementById('HEART-container').classList.remove('hidden');

      }

    if(p === 2){
        document.getElementById('HEART-container').classList.add('hidden');
        document.getElementById('RAYGUN-container').classList.remove('hidden');
        document.getElementById('BOMB-container').classList.add('hidden');
        }
    if(p === 3){
        document.getElementById('RAYGUN-container').classList.add('hidden');
        document.getElementById('BOMB-container').classList.remove('hidden');
        document.getElementById('PLATFORM-container').classList.add('hidden');
    }

    if(p === 4){
        document.getElementById('JETPACK-container').classList.add('hidden');
        document.getElementById('BOMB-container').classList.add('hidden');
        document.getElementById('PLATFORM-container').classList.remove('hidden');
        }
    
        
});




difficultyNormalButtonACTIVE.classList.remove('hidden');
normalHiddenMessage.classList.remove('hidden');

document.getElementById('SettingsButton').addEventListener('click', () => {
    mainMenu.classList.add('hidden');

    if(gameRunning){
        if(Normal === true){
        difficultyHardButton.classList.add('hidden');
        difficultyNormalButtonACTIVE.classList.add('hidden');


        }
        else{
        difficultyNormalButton.classList.add('hidden');
        difficultyHardButtonACTIVE.classList.add('hidden');

}
    }
    else{
        difficultyNormalButton.classList.remove('hidden');
        difficultyHardButton.classList.remove('hidden');
    }
    SettingsScreen.classList.remove('hidden');


    document.getElementById('backButtonSettings').addEventListener('click', () => {
        SettingsScreen.classList.add('hidden');
        mainMenu.classList.remove('hidden');
    
    });



    document.getElementById('difficultyNormalButton').addEventListener('click', () => {
        Normal = true;
        Hard = false;
        difficultyNormalButtonACTIVE.classList.remove('hidden');
        difficultyHardButtonACTIVE.classList.add('hidden');

        normalHiddenMessage.classList.remove('hidden');
        HardHiddenMessage.classList.add('hidden');

    });
    document.getElementById('difficultyHardButton').addEventListener('click', () => {
        Normal = false
        Hard = true;
        difficultyNormalButtonACTIVE.classList.add('hidden');
        difficultyHardButtonACTIVE.classList.remove('hidden');

        normalHiddenMessage.classList.add('hidden');
        HardHiddenMessage.classList.remove('hidden');
    });

    
    document.getElementById('difficultyNormalButtonACTIVE').addEventListener('click', () => {
        Normal = true;
        Hard = false;
        difficultyNormalButtonACTIVE.classList.remove('hidden');
        difficultyHardButtonACTIVE.classList.add('hidden');

        normalHiddenMessage.classList.remove('hidden');
        HardHiddenMessage.classList.add('hidden');

    });
    document.getElementById('difficultyHardButtonACTIVE').addEventListener('click', () => {
        Normal = false
        Hard = true;
        difficultyNormalButtonACTIVE.classList.add('hidden');
        difficultyHardButtonACTIVE.classList.remove('hidden');

        normalHiddenMessage.classList.add('hidden');
        HardHiddenMessage.classList.remove('hidden');
    });
});



document.getElementById('PauseButton').addEventListener('keydown', (e) => {
    if (e.key === 'Tab') { // 0 = left mouse button
        e.preventDefault();
        gamePaused = !gamePaused;

        
       
        if (gamePaused) {
            pauseAllSounds();
            StartButton.classList.add('hidden');
            mainMenu.classList.remove('hidden');
            ResumeButton.classList.remove('hidden');
            RestartButton.classList.remove('hidden');
            QuitButton.classList.remove('hidden');
            PauseButton.classList.add('hidden');
            document.getElementById("WinMessage").classList.add('hidden');
            document.getElementById("LoseMessage").classList.add('hidden');
            document.getElementById("CreditsMessage").classList.add('hidden');

            cursorSW.style.display = 'block';
            
            canvas2.classList.remove('hidden');
        } 

    }
});

    

    //canvas setup


 


    //NOTES
    //TO ADD PARTICLES, there are TWO boss areas where they must be edited.
    //a class for each must be made unless extended from another.
    //update the particle in GAME class                 this.feathers.forEach(Feather => Feather.update(deltaTime) );
    //filter deletion of particles in GAME class        this.feathers = this.feathers.filter(Feather => !Feather.markedForDeletion);
    //add to the draw context to visualize in game      this.feathers.forEach(Feather => Feather.draw(context));
    //add an array for the particles                    this.feathers = [];

    //NOTES
    //A const declaration declares block-scoped local variables

    //NOTES
    //ADJUST WHAT HAPPENS WHEN PLAYER COLLIDES WITH BOSS

    //NOTES
    //add the raygun when O.W.L spawns and remove jetpack after testing

   
        


    const RATsound = document.getElementById('RATsound');
        RATsound.volume = 0.15; // 5% volume
    const RATsound2 = document.getElementById('RATsound2');
        RATsound2.volume = 0.15; // 5% volume
        
    const RATsqueak = document.getElementById('RATsqueak');
        RATsqueak.volume = 0.5; // 5% volume

    const BUZZ = document.getElementById('BUZZ');
        BUZZ.volume = 1; // 20% volume

    const GROWL = document.getElementById('GROWL');
        GROWL.volume = 0.15; // 20% volume

    const miniGROWL = document.getElementById('miniGROWL');
        miniGROWL.volume = .2; // 20% volume
    const miniGROWL2 = document.getElementById('miniGROWL2');
        miniGROWL2.volume = .15; // 20% volume

    const MRR = document.getElementById('MRR');
        MRR.volume = 1; // 20% volume

    const MOO = document.getElementById('MOO');
        MOO.volume = 1; // 20% volume

    const WHO = document.getElementById('WHO');
        WHO.volume = .4; // 30% volume

    const WHOWHO = document.getElementById('WHOWHO');
        WHOWHO.volume = .05; // 50% volume
        
    const FeatherPoof = document.getElementById('FeatherPoof');
        FeatherPoof.volume = .5; // 50% volume

    const ALIENVOICE = document.getElementById('ALIENVOICE');
        ALIENVOICE.volume = 0.4; // 20% volume

    const ALIENSCREAM = document.getElementById('ALIENSCREAM');
        ALIENSCREAM.volume = 0.2; // 20% volume
    const BOOM = document.getElementById('BOOM');
        BOOM.volume = 0.4; // 20% volume

    const UFOSOUND = document.getElementById('UFOSOUND');
        UFOSOUND.volume = 0.1; // 20% volume

    const MINIALIENVOICE = document.getElementById('MINIALIENVOICE');
        MINIALIENVOICE.volume = 0.4; // 20% volume
    const METALHIT = document.getElementById('METALHIT');
        METALHIT.volume = 1; // 20% volume
    const SQUIRRELSOUND = document.getElementById('SQUIRRELSOUND');
        SQUIRRELSOUND.volume = 1; // 20% volume
    const SLINGSHOT = document.getElementById('SLINGSHOT');
        SLINGSHOT.volume = .25; // 20% volume
    const SQUIRRELDEATH = document.getElementById('SQUIRRELDEATH');
        SQUIRRELDEATH.volume = .4; // 20% volume
        
    const GNOMEBREAK = this.document.getElementById('GNOMEBREAK');
        GNOMEBREAK.volume = 0.35;

    const JETPACKSOUND = this.document.getElementById('JETPACKSOUND');
        JETPACKSOUND.volume = 0.15;

    const airSupportHitSound = document.getElementById('airSupportHit');
        airSupportHitSound.volume = 0.1; // 20% volume

    const laserShotSound1 = document.getElementById('laserShotSound1');
        laserShotSound1.volume = 0.15; // 20% volume
    const HIT = document.getElementById('HIT'); 
        HIT.volume = 0.15; // 20% volume

    const powerUpSound = document.getElementById('powerUpSound');
        powerUpSound.volume = 0.1; // 20% volume

    const PLAYERHURT = document.getElementById('PLAYERHURT');
        PLAYERHURT.volume = .3; // 20% volume
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////    

    class InputHandler {
        constructor(game){
            this.game = game;
            

    //Key press
    

            window.addEventListener('keydown', e => {
            if(((e.key === 'ArrowUp' )  || (e.key === 'ArrowDown') ||
                (e.key === 'ArrowLeft')|| (e.key === 'ArrowRight'))
                && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);}

                else if(e.key === ' ' && gamePaused === false){
                    this.game.spacePressed = true;
                    this.game.player.shootTop();
                    

                    if(!this.game.player.RaygunPowerUp && this.game.player.JetPackPowerUp)this.game.player.image = document.getElementById('raccoonJet2');
                    else if(!this.game.player.RaygunPowerUp)this.game.player.image = document.getElementById('raccoon2');
                    
                    } 
                else if(e.key === 'd'){
                    this.game.debug = !this.game.debug;}
            });
            
    //Key release
            window.addEventListener('keyup', e =>{
                if(this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);}
            if (e.key === 'ArrowUp') {
                this.game.player.canJump = true;} // Allow jumping again when key is released
                 if(e.key === ' ' ){
                    this.game.spacePressed = false;
                    if(!this.game.player.RaygunPowerUp && this.game.player.JetPackPowerUp)this.game.player.image = document.getElementById('raccoonJet1');
                    else if(!this.game.player.RaygunPowerUp) this.game.player.image = document.getElementById('raccoon1');
                    } 
            });}}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
    class Platform{
        constructor(game){
            this.game = game;
            this.width = 100;
            this.height = 25;
            this.x = this.game.width;

            this.speedX = 150;


            this.y = getRandomInt(290, 350);
            this.markedForDeletion = false;        

              const images = ['plat1', 'plat2', 'plat3'];
              this.image = document.getElementById(images[Math.floor(Math.random() * images.length)]);
            }
        
        update(deltaTime){
            this.x -= (this.speedX * this.game.speed * (deltaTime/1000));
            if(this.x < -this.game.width +50) this.markedForDeletion = true;
        }
        
        draw(context){          
            if(this.game.debug){context.strokeRect(this.x, this.y, this.width, this.height);}
            context.drawImage(this.image, this.x, this.y);
            
    }}


////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Obstacle{
    constructor(game){
        this.game = game;
        this.width = 40;
        this.height = 75;
        this.x = this.game.width;
        this.speedX = 100;


        this.y = this.game.height - this.height-10;
        this.markedForDeletion = false;
        const images = ['gnomes1', 'gnomes2', 'gnomes3'];
        this.image = document.getElementById(images[Math.floor(Math.random() * images.length)]);
   

    }
    
    update(deltaTime){
        this.x -= (this.speedX * this.game.speed * (deltaTime/1000));
        if(this.x < -this.game.width +50) this.markedForDeletion = true;
        
    }
    
    draw(context){          
        if(this.game.debug){context.strokeRect(this.x, this.y, this.width, this.height);}
        context.drawImage(this.image, this.x, this.y);
    }}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//WORK ZONE
//WORK ZONE
//WORK ZONE    



    class powerup{
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.speedX = 150;
            this.speedY = 150;
            this.markedForDeletion = false;
            this.frameTime = 0;
            this.frameX = 0;
            this.frameY = 0;

            this.y = getRandomInt(200, 350);
            this.markedForDeletion = false;
        }
        
        update(deltaTime) {
            this.x -= (this.speedX * this.game.speed * (deltaTime/1000) );
            if(this.x < -this.game.width +50) this.markedForDeletion = true;           
        }
        
        draw(context){          
            if(this.game.debug){context.strokeRect(this.x, this.y, this.width, this.height);}
             }}

//BOMB
    class Bomb extends powerup{
            constructor(game, y){
                super(game);
                this.width = 60;
                this.height = 60;
                this.y = y;
                this.image = document.getElementById("Bomb");
                this.maxFrame = 4;
                this.type = 'Bomb';}

            update(deltaTime) {
                this.x -= (this.speedX * this.game.speed * (deltaTime/1000) );
                if(this.x < -this.game.width +50) this.markedForDeletion = true;   
                const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 5;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}}
            else {this.frameX = 0;}        
            }
            
            draw(context){          
                context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);       
            }}
    class AirSupport {
        constructor(game){
            this.game = game;
            this.width = 60;
            this.height = 60;
            this.speedX = 100;
            this.speedY = 140;
            this.x = getRandomInt(0, 600);
            this.y = -this.height;
            this.markedForDeletion = false;
            this.frameTime = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 3;
            this.image = document.getElementById('AirSupport');
        }

    update(deltaTime){
        this.x +=  this.speedX * this.game.speed * (deltaTime/1000);
        this.y += this.speedY * this.game.speed * (deltaTime/1000);
        if(this.x > this.game.width +50) this.markedForDeletion = true;
        if(this.y > this.game.height +50) this.markedForDeletion = true;
        
        if(this.frameX < this.maxFrame){
            if(this.frameTime < 100){
                this.frameTime += 4;}
            else{
                this.frameTime = 0;
                this.frameX += 1;}
        }

        else {this.frameX = 0;}
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);  
    }}

//JETPACK
    class JetPack extends powerup{
            constructor(game, y){
                super(game);
                this.width = 60;
                this.height = 60;
                this.y = y;
                this.image = document.getElementById("JetPack");
                this.maxFrame = 3;
                this.type = 'JetPack';}

            update(deltaTime) {
                this.x -= (this.speedX * this.game.speed * (deltaTime/1000) );
                if(this.x < -this.game.width +50) this.markedForDeletion = true;     
                const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 5;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}}
            else {this.frameX = 0;}      }
            
            draw(context){          
                context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            } }

//HEART
    class Heart extends powerup{
            constructor(game, y){
                super(game);
                this.width = 40;
                this.height = 40;
                this.y = y;
                this.image = document.getElementById("Heart");
                this.maxFrame = 5;
                this.type = 'Heart';
            }
            update(deltaTime) {
                this.x -= (this.speedX * this.game.speed * (deltaTime/1000));
                if(this.x < -this.game.width +50) this.markedForDeletion = true;      
                const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 6;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}     
            }
            
            draw(context){          
                context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
       
            }
        }
        class HealthRing extends powerup{
            constructor(game){
                super(game)
                this.game = game;
                this.width = 150;
                this.height = 100;
                this.x = game.player.x+50;
                this.y = game.player.y+40;
                this.markedForDeletion = false;
                this.frameTime = 0;
                this.frameX = 0;
                this.frameY = 0;
                this.maxFrame = 6;
                this.image = document.getElementById('HealthRing');
            }

        update(deltaTime){
            this.x = this.game.player.x+50;
            this.y = this.game.player.y+40;
            if(this.frameX < this.maxFrame){
                if(this.frameTime < 100){
                    this.frameTime += 4;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);  
        }}


//Raygun
    class Raygun extends powerup{
            constructor(game, y){
                super(game);
                this.y = y;
                this.width = 60;
                this.height = 60;
                this.image = document.getElementById("Raygun");
                this.maxFrame = 2;
                this.type = 'Raygun';
            }
            update(deltaTime) {
                this.x -= (this.speedX * this.game.speed * (deltaTime/1000));
                if(this.x < -this.game.width +50) this.markedForDeletion = true;  
                const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 3;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}         
            }
            
            draw(context){    
                context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            }
        }
//WORK ZONE
//WORK ZONE
//WORK ZONE
////////////////////////////////////////////////////////////////////////////////////////////////////////////


    class Projectile {
        constructor(game, x, y){
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
            this.x += this.speed * this.game.speed * (deltaTime/1000);
            if(this.x > this.game.width - 50) this.markedForDeletion = true;  
        }

        draw(context){
            if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);

            context.drawImage(this.image, this.x, this.y);

        }
    }

    class Soda extends Projectile{
        constructor(game, x, y){
            super(game, x, y);
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 20;
            this.image = document.getElementById("soda");
            this.maxFrame = 3;
            this.frameX = 0;
            this.frameY = 0;
            this.type = 'soda';
        }
        update(deltaTime) {
            this.x += this.speed * this.game.speed * (deltaTime/1000);;
            if(this.x < -this.game.width +50) this.markedForDeletion = true;  
            const frameDelay = 100;

        if(this.frameX < this.maxFrame){
            if(this.frameTime < frameDelay){
                this.frameTime += 3;}
            else{
                this.frameTime = 0;
                this.frameX += 1;}
        }

        else {this.frameX = 0;}         
        }
        
        draw(context){    
            if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
           // context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }

    class Bottle extends Projectile{
        constructor(game, x, y){
            super(game, x, y);
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 30;
            this.image = document.getElementById("bottle");
            this.maxFrame = 3;
            this.frameX = 0;
            this.frameY = 0;
            this.type = 'bottle';
        }
        update(deltaTime) {
            this.x += this.speed * this.game.speed * (deltaTime/1000);; 
            if(this.x < -this.game.width +50) this.markedForDeletion = true;  
            const frameDelay = 100;

        if(this.frameX < this.maxFrame){
            if(this.frameTime < frameDelay){
                this.frameTime += 3;}
            else{
                this.frameTime = 0;
                this.frameX += 1;}
        }

        else {this.frameX = 0;}         
        }
        
        draw(context){    
            if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
           // context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }
    class Apple extends Projectile{
        constructor(game, x, y){
            super(game, x, y);
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 30;
            this.image = document.getElementById("apple");
            this.maxFrame = 3;
            this.frameX = 0;
            this.frameY = 0;
            this.type = 'apple';
        }
        update(deltaTime) {
            this.x += this.speed * this.game.speed * (deltaTime/1000);;
            if(this.x < -this.game.width +50) this.markedForDeletion = true;  
            const frameDelay = 100;

        if(this.frameX < this.maxFrame){
            if(this.frameTime < frameDelay){
                this.frameTime += 3;}
            else{
                this.frameTime = 0;
                this.frameX += 1;}
        }

        else {this.frameX = 0;}         
        }
        
        draw(context){    
            if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
           // context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }

    class Frog extends Projectile{
        constructor(game, x, y){
            super(game, x, y);
            this.x = x;
            this.y = y;
            this.width = 40;
            this.height = 40;
            this.image = document.getElementById("frog");
            this.maxFrame = 3;
            this.frameX = 0;
            this.frameY = 0;
            this.type = 'frog';
        }
        update(deltaTime) {
            this.x += this.speed * this.game.speed * (deltaTime/1000);;
            if(this.x < -this.game.width +50) this.markedForDeletion = true;  
            const frameDelay = 100;

        if(this.frameX < this.maxFrame){
            if(this.frameTime < frameDelay){
                this.frameTime += 3;}
            else{
                this.frameTime = 0;
                this.frameX += 1;}
        }

        else {this.frameX = 0;}         
        }
        
        draw(context){    
            if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
           // context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }



    class laserShot1 extends Projectile{
        constructor(game, x, y){
            super(game, x, y);
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 20;
            this.image = document.getElementById('laserShot');
        }

        update(deltaTime) {
            this.x += this.speed * this.game.speed * (deltaTime/1000);;
            this.y -= this.speedY * this.game.speed * (deltaTime/1000);;
            if(this.x > this.game.width) this.markedForDeletion = true;
        }

        draw(context){
            context.drawImage(this.image, this.x, this.y);

        }
    }
    class laserShot2 extends Projectile{
        constructor(game, x, y){
            super(game, x, y);
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 20;
            this.image = document.getElementById('laserShot');
        }

        update(deltaTime) {
            this.x += this.speed * this.game.speed * (deltaTime/1000);;
            if(this.x > this.game.width) this.markedForDeletion = true;
        }

        draw(context){
            context.drawImage(this.image, this.x, this.y);

        }
    }
    class laserShot3 extends Projectile{
        constructor(game, x, y){
            super(game, x, y);
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 20;
            this.image = document.getElementById('laserShot');
        }

        update(deltaTime) {
            this.x += this.speed * this.game.speed * (deltaTime/1000);;
            this.y += this.speedY * this.game.speed * (deltaTime/1000);;
            if(this.x > this.game.width) this.markedForDeletion = true;
        }

        draw(context){
            context.drawImage(this.image, this.x, this.y);

        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////


    class Alien{
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('Alien');
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = 0
            this.spriteSize = 100;

            this.size = this.spriteSize 
            this.speedX = Math.random() * 150 - 150;
            this.speedY = Math.random() * 300 - 300;
            this.gravity = 350;
            this.markedForDeletion = false;
            this.angle = 0;
            this.va = Math.random() * 0.15 - 0.1;


        }

        update(deltaTime) {
            this.angle += this.va; // spins (though with va=1, it doesn’t change angle)
            this.speedY += this.gravity * this.game.speed * (deltaTime/1000);; // gravity pulls it downward more over time
            this.x -= this.speedX * this.game.speed * (deltaTime/1000); // moves left across the screen
            this.y += this.speedY * this.game.speed * (deltaTime/1000); ; // moves vertically based on speedY

            if(this.y > this.game.height + this.size || this.x < 0 -this.size){
                this.markedForDeletion = true;}

        }

        draw(context){
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
            context.restore();
        }
    }

    class Feather{
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('Feather');
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = 0
            this.spriteSize = 100;

            this.size = this.spriteSize 
            this.speedX = Math.random() * 50 - 50;
            this.speedY = Math.random() * 250 - 250;
            this.gravity = 200;
            this.markedForDeletion = false;
 


        }

        update(deltaTime) {
             this.speedY += this.gravity * this.game.speed * (deltaTime/1000);; // gravity pulls it downward more over time
            this.randomize = Math.random();


             this.x -= this.speedX * this.game.speed * (deltaTime/1000); 
            
            this.y += this.speedY * this.game.speed * (deltaTime/1000); ; // moves vertically based on speedY

            if(this.y > this.game.height + this.size || this.x < 0 -this.size){
                this.markedForDeletion = true;}

        }

        draw(context){
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
            context.restore();
        }
    }

    class AcornSingle{
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('AcornParticle');
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = 0
            this.spriteSize = 80;

            this.size = this.spriteSize 
            this.speedX = Math.random() * 500 - 500;
            this.speedY = Math.random() * 400 - 400;
            this.gravity = 500;
            this.markedForDeletion = false;
 


        }

        update(deltaTime) {
             this.speedY += this.gravity * this.game.speed * (deltaTime/1000);; // gravity pulls it downward more over time
            this.randomize = Math.random();


             this.x -= this.speedX * this.game.speed * (deltaTime/1000); 
            
            this.y += this.speedY * this.game.speed * (deltaTime/1000); ; // moves vertically based on speedY

            if(this.y > this.game.height + this.size || this.x < 0 -this.size){
                this.markedForDeletion = true;}

        }

        draw(context){
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
            context.restore();
        }
    }

    class Spark{
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('Spark');
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = 0
            this.spriteSize = 60;

            this.size = this.spriteSize 
            this.speedX = Math.random() * 200 - 100;
            this.speedY = Math.random() * 450 - 450;
            this.gravity = 700;
            this.markedForDeletion = false;
 


        }

        update(deltaTime) {
             this.speedY += this.gravity * this.game.speed * (deltaTime/1000);; // gravity pulls it downward more over time
            this.randomize = Math.random();


             this.x -= this.speedX * this.game.speed * (deltaTime/1000); 
            
            this.y += this.speedY * this.game.speed * (deltaTime/1000); ; // moves vertically based on speedY

            if(this.y > this.game.height + this.size || this.x < 0 -this.size){
                this.markedForDeletion = true;}

        }

        draw(context){
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
            context.restore();
        }
    }

    class Screw{
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('Screw');
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = Math.floor(Math.random() * 3);
            this.spriteSize = 20;

            this.size = this.spriteSize 
            this.speedX = Math.random() * 200 - 100;
            this.speedY = Math.random() * 450 - 450;
            this.gravity = 700;
            this.markedForDeletion = false;

            this.bounced = 0;
            this.bottomBounceBoundary = Math.random() * 80 + 60;
 


        }

        update(deltaTime) {
             this.speedY += this.gravity * this.game.speed * (deltaTime/1000);; // gravity pulls it downward more over time
            this.randomize = Math.random();


             this.x -= this.speedX * this.game.speed * (deltaTime/1000);  
            
            this.y += this.speedY * this.game.speed * (deltaTime/1000); ; // moves vertically based on speedY

            if(this.y > this.game.height + this.size || this.x < 0 -this.size){
                this.markedForDeletion = true;}

                if(this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 5) {
                    this.bounced ++;
                    this.speedY *= -0.5;

        }
    }

        draw(context){
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
            context.restore();
        }
    }





////////////////////////////////////////////////////////////////////////////////////////////////////////////

    class Player{
        constructor(game){
            this.game = game;
            this.image = document.getElementById('raccoon1');

            this.markedForDeletion = false;

            this.width = 200;
            this.height = 150;
            this.x = 20;
            this.y = 0;
            
            this.speedX = 0 ;
            this.speedY = 0;
            this.maxSpeed = 2;
            
            this.vy = 0;
            this.gravity = 7000;
            this.jumpStrength = -1900;
            this.grounded = true;

            this.projectiles = [];

            this.BombPowerUp = false;
            this.JetPackPowerUp = false;
            this.HeartPowerUp = false;
            this.RaygunPowerUp = false;

    //POWERUP TIMERS
            this.BombPowerUpTimer = 0;
            this.BombPowerUpLimit = 7000;
            this.AirSupportTimer = 0;
            this.AirSupportLimit = 350;

            this.JetPackPowerUpTimer = 0;
            this.JetPackPowerUpLimit = 10000;

            this.HeartPowerUpTimer = 0;
            this.HeartPowerUpLimit = 10000;
            this.HeartPowerUpAdderTimer = 0;
            this.HeartPowerUpAdderLimit = 1000;

            this.RaygunPowerUpTimer = 0;
            this.RaygunPowerUpLimit = 10000;
    //POWERUP TIMERS

            this.gameTime = 0;

            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 11;
            this.frameTime = 0;

            this.canJump = true;




            this.knockbackX = 0;
        this.knockbackY = 0;
        this.isKnockedBack = false;
        this.knockbackTimer = 0;
        }

        update(deltaTime){


            if (this.isKnockedBack) {
                this.x += this.knockbackX * (deltaTime / 1000);
                this.y += this.knockbackY * (deltaTime / 1000);
        
                // Slow down knockback (friction effect)
                this.knockbackX *= .70 ** (deltaTime/16);
                this.knockbackY *= .70 ** (deltaTime/16);
        
                this.knockbackTimer--;
        
                if (this.knockbackTimer <= 0) {
                    this.isKnockedBack = false;
                    this.knockbackX = 0;
                    this.knockbackY = 0;
                }
            }




            if(this.game.keys.includes('ArrowRight')) this.speedX = 400 * this.game.speed * (deltaTime/1000);
            else if(this.game.keys.includes('ArrowLeft')) this.speedX = -400 * this.game.speed * (deltaTime/1000);
            else  this.speedX = 0;

            if(this.game.keys.includes('ArrowRight') && this.JetPackPowerUp) this.speedX = 600 * this.game.speed * (deltaTime/1000);
            else if(this.game.keys.includes('ArrowLeft') && this.JetPackPowerUp) this.speedX = -600 * this.game.speed * (deltaTime/1000);
            
            this.x += this.speedX;

    //vertical movement
            this.vy += this.gravity * (deltaTime / 1000);
            this.y += this.vy  * this.game.speed * (deltaTime/1000);

    //grounded logic
            if(this.y >= this.game.height -this.height){
                this.y = this.game.height -this.height; //snaps to ground
                this.vy = 0; //stops vertical movement
                this.grounded = true; }
            else if( (this.y < this.game.height -this.height) && (!this.game.checkPlatformCollision)){
                this.grounded = false;}

    //JUMPING MECHANIC
            if((this.game.keys.includes('ArrowUp') && this.grounded && this.canJump && !this.JetPackPowerUp)){
                this.vy = this.jumpStrength;
                this.grounded = false;
                this.canJump = false;}
            else if(this.game.keys.includes('ArrowDown') && this.grounded && !this.JetPackPowerUp){
                this.grounded = false;
                this.y += 10}
            if(this.game.keys.includes('ArrowDown') && this.JetPackPowerUp){
                this.grounded = false;
                this.y += 700 * this.game.speed * (deltaTime/1000);}
            if((this.game.keys.includes('ArrowUp') && this.JetPackPowerUp)){
                this.grounded = false;
                this.y -= 700 * this.game.speed * (deltaTime/1000);}
            if(this.JetPackPowerUp){
                this.vy = 0;
            }

    //vertical boundaries
            if(this.y > this.game.height - this.height){
                this.y = this.game.height - this.height;}
            else if(this.y < -100 ){
                this.y = -100}

    //horizontal boundaries
            if(this.x > this.game.width - this.width/2 ){
                this.x = this.game.width - this.width/2;}
            else if(this.x < -this.width/2){
                this.x = -this.width/2;}

    //handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update(deltaTime) ;
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
            
    //sprite animation
            if(!this.gameOver) this.gameTime += deltaTime;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < 100){
                    this.frameTime += 4;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}
//WORK ZONE
//WORK ZONE
//WORK ZONE
            //power up
    if(this.BombPowerUp){
        

            if(this.BombPowerUpTimer < this.BombPowerUpLimit){               
                this.BombPowerUpTimer += deltaTime;
                if(this.AirSupportTimer < this.AirSupportLimit){
                    this.AirSupportTimer += deltaTime;
                   }
                else {
                    this.AirSupportTimer = 0;
                    this.game.addAirSupport();
                }
            }
            else {
                this.BombPowerUp = false;
                this.BombPowerUpTimer = 0; 
                this.game.AirSupportS.forEach(AirSupport => {
                        AirSupport.markedForDeletion = true;
                    this.game.addExplosion(AirSupport)});
                
                }}  

    if(this.JetPackPowerUp){

        
                if(this.JetPackPowerUpTimer < this.JetPackPowerUpLimit){
                    if(!this.RaygunPowerUp){
                        if(!this.game.spacePressed)this.image = document.getElementById('raccoonJet1');
                        this.JetPackPowerUpTimer += deltaTime; 
                        this.gravity = 0;  }
                    else if(this.RaygunPowerUp){
                        this.image = document.getElementById('flyingRaygun');
                        this.JetPackPowerUpTimer += deltaTime; 
                        this.gravity = 0;  }
                               
                }
                else {
                    this.JetPackPowerUp = false;
                    this.JetPackPowerUpTimer = 0;
                    this.image = document.getElementById('raccoon1');
                    this.gravity = 7000;                    
                }}  


    if(this.HeartPowerUp){
                if(this.HeartPowerUpTimer < this.HeartPowerUpLimit){  
                                
                    if(this.HeartPowerUpAdderTimer < this.HeartPowerUpAdderLimit){
                        this.HeartPowerUpAdderTimer += deltaTime;
                        }
                    else {
                        if(this.game.lives < this.game.MaxLives){
                        this.game.lives++;
                        this.HeartPowerUpAdderTimer = 0;}}

                    this.HeartPowerUpTimer += deltaTime;
                }
                else {
                    this.HeartPowerUp = false;
                    this.HeartPowerUpTimer = 0;    
                    this.HeartPowerUpAdderTimer = 0;   
                    
                    this.game.powerups.forEach(powerup => {
                        if (powerup instanceof HealthRing) {
                            powerup.markedForDeletion = true;
                        }});
                }}  

    if(this.RaygunPowerUp){
       
                if(this.RaygunPowerUpTimer < this.RaygunPowerUpLimit){
                    if(!this.JetPackPowerUp){                 
                    this.RaygunPowerUpTimer += deltaTime;  
                    this.image = document.getElementById('groundedRaygun'); } 
                    if(this.JetPackPowerUp){                 
                        this.RaygunPowerUpTimer += deltaTime;  
                        this.image = document.getElementById('flyingRaygun'); }                  
                }
                else {
                    this.RaygunPowerUp = false;
                    this.RaygunPowerUpTimer = 0; 
                    if(this.game.ammo < 10) this.game.ammo = 10;   
                    this.image = document.getElementById('raccoon1');               
                }}  

//WORK ZONE
//WORK ZONE
//WORK ZONE
        }

        draw(context){      
            if(this.game.debug){context.strokeRect(this.x, this.y, this.width, this.height);}
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
            context.drawImage(this.image, this.frameX * this.width , this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }

        shootTop(){
            
            
            if(this.RaygunPowerUp) this.shootLaser();
            else if(this.game.ammo > 0){
                
                this.randomize = Math.random();
                if( this.randomize < 0.1){this.projectiles.push(new Projectile(this.game, this.x+140, this.y +35));
                    laserShotSound1.currentTime = 0;
                    laserShotSound1.play();
                }
                else if( this.randomize < 0.3){this.projectiles.push(new Soda(this.game, this.x+140, this.y +35)); 
                    laserShotSound1.currentTime = 0;
                    laserShotSound1.play();
                }
                else if( this.randomize < 0.6){this.projectiles.push(new Bottle(this.game, this.x+140, this.y +35)); 
                    laserShotSound1.currentTime = 0;
                    laserShotSound1.play();
                }
                else if( this.randomize < 0.9){this.projectiles.push(new Apple(this.game, this.x+140, this.y +35)); 
                    laserShotSound1.currentTime = 0;
                    laserShotSound1.play();
                }
                else if( this.randomize < 1){this.projectiles.push(new Frog(this.game, this.x+140, this.y +35));
                    laserShotSound1.currentTime = 0;
                    laserShotSound1.play();
                }
                
                
                this.game.ammo--;}
               
            
        }
        
        shootLaser(){       
            
            if(this.game.ammo > 0){
                this.projectiles.push(new laserShot1(this.game, this.x+165, this.y+40));
                laserShotSound1.currentTime = 0;
                    laserShotSound1.play();
                this.projectiles.push(new laserShot2(this.game, this.x+165, this.y+40));
                laserShotSound1.currentTime = 0;
                    laserShotSound1.play();
                this.projectiles.push(new laserShot3(this.game, this.x+165, this.y+40));
                laserShotSound1.currentTime = 0;
                    laserShotSound1.play();
                this.game.ammo--;
            }
            
        }

        enterBombPowerUp(){
            this.game.ammo += 3;
            this.BombPowerUpTimer = 0;
            this.BombPowerUp = true;

            powerUpSound.currentTime = 0;
            powerUpSound.play();

            
        }
        enterJetPackPowerUp(){
            this.game.ammo += 3;
            this.JetPackPowerUpTimer = 0;
            this.JetPackPowerUp = true;
            powerUpSound.currentTime = 0;
            powerUpSound.play();
            if(this.JetPackPowerUp){
                JETPACKSOUND.currentTime = 0;
            }
            JETPACKSOUND.play();
            
        }
        enterHeartPowerUp(){
            this.game.ammo += 3;
            this.HeartPowerUpTimer = 0;
            this.HeartPowerUp = true;   
            powerUpSound.currentTime = 0;
            powerUpSound.play();        
                       
        }

        enterRaygunPowerUp(){
            this.game.ammo += 5;
            this.RaygunPowerUpTimer = 0;
            this.RaygunPowerUp = true;
            powerUpSound.currentTime = 0;
            powerUpSound.play();
            
        }
    }

                                    
////////////////////////////////////////////////////////////////////////////////////////////////////////////


    class Boss{
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * -200 -200;
            
            this.markedForDeletion = false;
            this.frameTime = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.referenceY = 0;
            
           
        }

        update(deltaTime){
            
        }
        draw(context){          
            if(this.game.debug){context.strokeRect(this.x, this.y, this.width, this.height);}
            
            context.font = '20px Helvetica';
            if(this.game.debug)context.fillText(this.lives, this.x, this.y);
        }
    }

        class OWL extends Boss {
            constructor(game){
                super(game);
                this.width = 300;
                this.height = 500;
                this.y = 0;
                this.image = document.getElementById('OWL');
                this.maxFrame = 10;

                this.explosion1 = 0;
                this.explosion2 = 0;
                
                this.lives = 125; //125
                this.livesOG = this.lives;
                this.score = this.lives;
        }
    
    update(deltaTime){
        
        if(this.lives < this.livesOG - this.livesOG*.7 ){
            this.image = document.getElementById('OWL90');

            if(this.explosion1 === 0){
                this.game.addDamageExplosion(900, 230);
                this.game.addDamageExplosion(850, 200);
                this.explosion1++;
    
            }

            this.height = 171;
            this.y = this.game.height - this.height;
        }
        else if(this.lives < this.livesOG - this.livesOG*.4 ){
           this.image = document.getElementById('OWL60');

           if(this.explosion2 === 0){
                this.game.addDamageExplosion(900, 50);
                this.game.addDamageExplosion(850, 75);
                this.explosion2++;
      
            }

            this.height = 358;
            this.y = this.game.height - this.height;;
        }
         
        if(this.x > this.game.width - 290) this.x += this.speedX * this.game.speed * (deltaTime/1000);
        const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 10;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;
                    WHO.play();
                    WHOWHO.play();
                }
            }

            else {
                
                this.frameX = 0;}

    }
    draw(context){ 
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}



        class UFO extends Boss {
            constructor(game){
                super(game);
                this.width = 400;
                this.height = 200;
                this.y = 0;
                this.image = document.getElementById('UFO');
                this.maxFrame = 3;

                this.explosion1 = 0;
                this.explosion2 = 0;
                
                this.lives = 111; //125
                this.livesOG = this.lives;
                this.score = this.lives;
        }
        update(deltaTime){
            if(this.lives < this.livesOG - this.livesOG*.7 ){
                this.image = document.getElementById('UFO90');

                if(this.explosion1 === 0){
                    this.game.addDamageExplosion(750, 100);
                    this.explosion1++;
            
                    
                    ALIENVOICE.play();
                }
    }
            else if(this.lives < this.livesOG - this.livesOG*.4 ){
                this.image = document.getElementById('UFO60');

                if(this.explosion2 === 0){
                this.game.addDamageExplosion(750, 100);
                ALIENVOICE.currentTime = 0;
                GNOMEBREAK.play();
                ALIENVOICE.play();
                this.explosion2++;
     
                }}
            
            if(this.x > this.game.width - 500) this.x += this.speedX * this.game.speed * (deltaTime/1000);
            const frameDelay = 200;
    
                if(this.frameX < this.maxFrame){
                    if(this.frameTime < frameDelay){
                        this.frameTime += 10;}
                    else{
                        this.frameTime = 0;
                        this.frameX += 1;
                        UFOSOUND.play();}
                }
    
                else {this.frameX = 0;}
    
        }
        draw(context){ 
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            }}

        class SQUIRREL extends Boss {
            constructor(game){
                super(game);
                this.width = 300;
                this.height = 500;
                this.y = 0;
                this.image = document.getElementById('SQUIRREL');
                this.maxFrame = 12;
                this.frameX = 0;

                this.explosion1 = 0;
                this.explosion2 = 0;
                
                this.lives = 150; //150
                this.livesOG = this.lives;
                this.score = this.lives;
        }
    
    update(deltaTime){

        if(this.lives < this.livesOG - this.livesOG*.7 ){
                this.image = document.getElementById('SQUIRREL90');
                
                METALHIT.play();
                
                if(this.explosion1 === 0){
                this.game.addDamageExplosion(900, 100);
                this.explosion1++;
                MINIALIENVOICE.play();
  }
        }

            else if(this.lives < this.livesOG - this.livesOG*.4 ){
                this.image = document.getElementById('SQUIRREL60');
                
                METALHIT.play();
               
                if(this.explosion2 === 0){
                this.game.addDamageExplosion(800, 250);
                MINIALIENVOICE.play();
                this.explosion2++;}
            }
                
            METALHIT.currentTime = 0;

        if(this.x > this.game.width - 290) this.x += this.speedX * this.game.speed * (deltaTime/1000);
        const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 10;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;
                    SQUIRRELSOUND.play();}
            }

            else {this.frameX = 0;}

    }
    draw(context){ 
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////



class miniBoss{
    constructor(game){
        this.game = game;
        
        this.speedX = Math.random() * -200 -200;
        this.speedY = Math.random() * -150 -150;
        
        this.markedForDeletion = false;
        this.frameTime = 0;
        this.frameX = 0;
        this.frameY = 0;
        
        
       
    }

    update(deltaTime){
        
    }
    draw(context){          
        if(this.game.debug){context.strokeRect(this.x, this.y, this.width, this.height);}
        
        context.font = '20px Helvetica';
        if(this.game.debug)context.fillText(this.lives, this.x, this.y);
    }
}
class miniOWL extends miniBoss{
    constructor(game){
        super(game);
        this.width = 75;
        this.x = this.game.width;
            this.height = 30;
            this.y = getRandomInt(0,500);
            this.yOG = this.y;
            this.image = document.getElementById('miniOWL');
            this.maxFrame = 5;
            
            this.sound = FeatherPoof.cloneNode();
            this.sound.volume = .3;
            
            this.lives = 1;
            this.score = this.lives;
    }
    update(deltaTime){
         this.x += this.speedX * this.game.speed * (deltaTime/1000);
         if(this.x + this.width < 0 || this.y + this.height < 0 || this.y > 500) this.markedForDeletion = true;
       
        

         const randomize = Math.random();
        //the following code uses the randomize variable to decide whether the miniOWLs will
        //fly up or down depending also on their initial y spawn
         if(randomize < .3 && this.yOG >= 250) this.y += this.speedY * this.game.speed * (deltaTime/1000);
         if(randomize < .6 && this.yOG <= 200) this.y -= this.speedY * this.game.speed * (deltaTime/1000);
         if(randomize < .9 && this.yOG > 200 && this.yOG < 250) this.y;
       
        const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 4;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}

    }
    draw(context){ 
    
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    
    }

}

class miniCOW extends miniBoss{
    constructor(game, x){
        super(game);
        this.width = 75;
            this.height = 75;
            this.x = x;
            this.y = 100;
            this.image = document.getElementById('miniCOW');
            this.maxFrame = 6;
            this.OGx = x;
            
            this.randomizeSound = Math.random();
            this.randomizeSound < 0.5 ? this.sound = MRR.cloneNode() : this.sound = MOO.cloneNode();
            this.sound.volume = .3;
           
            
            this.lives = 3;
            this.score = this.lives;
    }
    update(deltaTime){
        this.randomize = Math.random();


             
         if(this.x + this.width < 0 || this.y + this.height < 0 || this.y > 500) this.markedForDeletion = true;
               
        if( this.OGx === 500){
            this.x -= 100 * this.game.speed * (deltaTime/1000);
            this.y = 100;
            this.image = document.getElementById('miniCOW');
            this.sound.play();
            this.sound.currentTime = 0;
            
            
            }


        if( this.OGx === 550){
            this.x -= 110 * this.game.speed * (deltaTime/1000);
            this.y += 30 * this.game.speed * (deltaTime/1000);
            this.image = document.getElementById('miniCowBrown'); 
            }


        if( this.OGx === 600){
            this.x -= 105 * this.game.speed * (deltaTime/1000);
            this.y += 50 * this.game.speed * (deltaTime/1000);
            this.image = document.getElementById('miniCOW');
            this.sound.play();
            this.sound.currentTime = 0;}


        if( this.OGx === 650){
            this.x -= 90 * this.game.speed * (deltaTime/1000);
            this.y += 70 * this.game.speed * (deltaTime/1000);
            this.image = document.getElementById('miniCowBrown'); }
        if( this.OGx === 700){
            this.x -= 80 * this.game.speed * (deltaTime/1000);
            this.y += 80 * this.game.speed * (deltaTime/1000);
            this.image = document.getElementById('miniCOW');
            }


        if( this.OGx === 750){
            this.x -= 50 * this.game.speed * (deltaTime/1000);
            this.y += 70 * this.game.speed * (deltaTime/1000);
            this.image = document.getElementById('miniCowBrown'); 
            this.sound.play();
            this.sound.currentTime = 0;
        }
            
            
        
        const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 4;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}

    }
    draw(context){ 
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    
    }

}
class ACORN extends miniBoss{
    constructor(game){
        super(game);
        this.width = 60;
        this.x = this.game.width-300;
            this.height = 60;
            this.y = 207;
            this.image = document.getElementById('ACORN');
            this.maxFrame = 4;
            this.referenceY = 0;
      
            
            this.lives = 1;
            this.score = this.lives;
    }
    update(deltaTime){
        this.referenceY = this.game.player.y;
         this.x += -300 * this.game.speed * (deltaTime/1000);
        //  this.y -= -1 - this.game.speed * (deltaTime/1000);
         if(this.x + this.width < 0 || this.y + this.height < 0 || this.y > 500) this.markedForDeletion = true;
        
        

        //   const randomize = Math.random();
        //the following code uses the randomize variable to decide whether the miniOWLs will
        //fly up or down depending also on their initial y spawn
         if(this.referenceY > 300) this.y -= -200 * this.game.speed * (deltaTime/1000);
         if(this.referenceY < 200) this.y += -200 * this.game.speed * (deltaTime/1000);
         if(this.referenceY > 200 < 300) this.y;
       
        const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 1.6;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}

    }
    draw(context){ 
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    
    }

}

class SquirrelLaser extends miniBoss{
    constructor(game){
        super(game);

        this.width = 60;
        this.height = 30;

        this.x = this.game.width-200;  
        this.y = 100;

        this.image = document.getElementById('SquirrelLaser');
        this.maxFrame = 0;
        this.referenceY = 0;
    
            this.lives = 1;
            this.score = this.lives;
    }
    update(deltaTime){
        this.referenceY = this.game.player.y;
         this.x -= 2;
         this.y += this.game.speed;
        //  this.y -= -1 - this.game.speed;
         if(this.x + this.width < 0 || this.y + this.height < 0 || this.y > 500) this.markedForDeletion = true;
        
        

        //   const randomize = Math.random();
        //the following code uses the randomize variable to decide whether the miniOWLs will
        //fly up or down depending also on their initial y spawn
        //  if(this.referenceY > 300) this.y -= this.speedY - this.game.speed;
        //  if(this.referenceY < 200) this.y += this.speedY - this.game.speed;
        //  if(this.referenceY > 200 < 300) this.y;

    }
    draw(context){ 
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    
    }

}
//
//
//
class miniSQUIRREL extends miniBoss{
    constructor(game){
        super(game);
        this.width = 45;
        this.x = getRandomInt(750, 800);
            this.height = 45;
            this.y = getRandomInt(0,500);
            this.yOG = this.y;
            this.image = document.getElementById('miniSQUIRREL');
            this.maxFrame = 14;
            
      
            
            this.lives = 1;
            this.score = this.lives;
    }
    update(deltaTime){
        
        this.x += this.speedX * this.game.speed * (deltaTime/1000);
         if(this.x + this.width < 0 || this.y + this.height < 0 || this.y > 500) this.markedForDeletion = true;
        
        

         const randomize = Math.random();
        //the following code uses the randomize variable to decide whether the miniOWLs will
        //fly up or down depending also on their initial y spawn
         if(randomize < .3 && this.yOG >= 250) this.y += this.speedY * this.game.speed * (deltaTime/1000);
         if(randomize < .6 && this.yOG <= 250) this.y -= this.speedY * this.game.speed * (deltaTime/1000);
         if(randomize < .9 && this.yOG <= 250) this.y;
       
        const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 4;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}

    }
    draw(context){ 
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    
    }

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////

    class Enemy{
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            
            this.markedForDeletion = false;
            this.frameX = 0;
            this.frameY = 0;
            
        }

        update(deltaTime) {
            this.x += this.speedX - this.game.speed * (deltaTime/1000);
            if(this.x + this.width < 0) this.markedForDeletion = true;

            //sprite animation
            const frameDelay = 10 ;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 1;}
                else{
                    this.frameTime = 0;
 
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}

        }
        draw(context){          
            if(this.game.debug){context.strokeRect(this.x, this.y, this.width, this.height);}
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            context.font = '20px Helvetica';
            if(this.game.debug)context.fillText(this.lives, this.x, this.y);
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//subclass of super class "Enemy" above ^^^


class miniCOWenemy extends Enemy {
    constructor(game){
        super(game);
        this.width = 75;
        this.height = 75;
        this.y = -100
        this.x = getRandomInt(50, 800)
        this.randomize = Math.random();

        this.randomize <= .5 ? this.image = document.getElementById('miniCowBrown') : this.image = document.getElementById('miniCOW');

        this.frameY = 0
        this.lives = 1;
        this.score = this.lives;
        this.type = 'miniCOWenemy';
        this.maxFrame = 6;
        this.speedY = Math.random() * 150 + 100;

        this.randomizeSound = Math.random();
        this.randomizeSound < 0.5 ? this.sound = MRR.cloneNode() : this.sound = MOO.cloneNode();
        this.sound.play();
        this.sound.currentTime = 0;
        this.sound.volume = .6;
    }
    update(deltaTime) {
        
        this.y += this.speedY * this.game.speed * (deltaTime/1000);
        if(this.y > 510 ) this.markedForDeletion = true;

        //sprite animation

        const frameDelay = 100;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 4;}
                else{
                    this.frameTime = 0;
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}

    }}



    class RAT extends Enemy {
        constructor(game){
            super(game);
            this.width = 150;
            this.height = 150;
            this.y = this.game.height - this.height;
            this.image = document.getElementById('RAT');
            this.frameY = 0
            this.lives = 5;
            this.score = this.lives;
            this.type = 'RAT';
            this.maxFrame = 5;
            this.speedX = Math.random() * -125 -100;

            this.randomSqueak = Math.random();
            if(this.randomSqueak <= 0.45) {
                this.sound = RATsound.cloneNode(); 
                this.sound.volume = .18;
            }
            
            if(this.randomSqueak > 0.45) {
                this.sound = RATsound2.cloneNode(); 
                this.sound.volume = .15;
            }

            
        }
        update(deltaTime) {
            this.x += this.speedX * this.game.speed * (deltaTime/1000);
            if(this.x + this.width < 0) this.markedForDeletion = true;

            //sprite animation
            const frameDelay = 10 ;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 1;}
                else{
                    this.frameTime = 0;
                    this.sound.play();
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}

        }}

    class WASP extends Enemy {
        constructor(game){
            super(game);
            this.width = 100;
            this.height = 100;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.image = document.getElementById('WASP');
            this.frameY = 0
            this.lives = 3;
            this.score = this.lives;
            this.type = 'WASP';
            this.speedX = Math.random() * -275 -250;

            this.maxFrame = 5;

            this.sound = BUZZ.cloneNode(); 
            this.sound.volume = 1;
        }
        update(deltaTime) {
            this.x += this.speedX * this.game.speed * (deltaTime/1000);
            if(this.x + this.width < 0) {
                this.markedForDeletion = true;
                this.sound.pause();
                this.sound.currentTime = 0;
            }

            //sprite animation
            const frameDelay = 10 ;

            if(this.frameX < this.maxFrame){
                if(this.frameTime < frameDelay){
                    this.frameTime += 1;}
                else{
                    this.frameTime = 0;
                    this.sound.play();
                    this.frameX += 1;}
            }

            else {this.frameX = 0;}

        }}


        class OPOSSUM extends Enemy {
            constructor(game){
                super(game);
                this.width = 230;
                this.height = 200;
                this.y = Math.random() * (this.game.height * 0.95 - this.height);
                this.image = document.getElementById('OPOSSUM');
                this.frameY = 0;
                this.lives = 8;
                this.score = this.lives;
                this.type = 'OPOSSUM';
                this.speedX = Math.random() * -100 -100;

                this.sound = GROWL.cloneNode();
                this.sound.volume = 0.25    ;
                this.SoundCount = 0;


                this.maxFrame = 3;
            }
            update(deltaTime) {
                this.x += this.speedX * this.game.speed * (deltaTime/1000);
                if(this.x + this.width < 0) {
                    this.markedForDeletion = true;
                    this.sound.pause();
                    this.sound.currentTime = 0;
                }
    
                //sprite animation
                const frameDelay = 10 ;
    
                if(this.frameX < this.maxFrame ){
                    if(this.frameTime < frameDelay){
                        this.frameTime += 1;}
                    else{
                        this.frameTime = 0;
                       
                        this.frameX += 1;
                        if(this.SoundCount === 0){
                            this.sound.play();
                            this.SoundCount = 1;}}
                }
    
                else {
                    this.frameX = 0;
                    this.SoundCount = 0;}
                
    
            }}

        class miniOPOSSUM extends Enemy {
            constructor(game, x, y){
                super(game);
                this.width = 70;
                this.height = 40;
                this.x = x;
                this.y = y;
                this.image = document.getElementById('miniOPOSSUM');
                this.frameY = 0
                this.lives = 1;
                this.score = this.lives;
                this.type = 'miniOPOSSUM';
                this.speedX = Math.random() * -550 -450;

                this.hasBittenPlayer = false;

                this.randomizeOpossumSound = Math.random();
                if(this.randomizeOpossumSound <= .6){
                    this.sound = miniGROWL.cloneNode();
                    this.sound.volume = 0.35;
                }

                if(this.randomizeOpossumSound > .6){
                    this.sound = miniGROWL2.cloneNode();
                    this.sound.volume = 0.3;
                }

                
                this.sound.play();
                this.sound.currentTime = 0;

                this.maxFrame = 2;
            }
            update(deltaTime) {
                this.x += this.speedX * this.game.speed * (deltaTime/1000);
                if(this.x + this.width < 0) {
                    this.markedForDeletion = true;
                    this.sound.pause();
                    this.sound.currentTime = 0;
                }
    
                //sprite animation
                const frameDelay = 10 ;
    
                if(this.frameX < this.maxFrame){
                    if(this.frameTime < frameDelay){
                        this.frameTime += 1;}
                    else{
                        this.frameTime = 0;
                        this.sound.play();
                        this.sound.play();
                        this.frameX += 1;}
                }
    
                else {this.frameX = 0;}
    
            }}
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    class Layer{
        constructor(game, image, speedModifier){
            this.game = game;
            this.image = image;
            this.speedModifier = speedModifier;
            this.width = 1022;
            this.height = 500;
            this.x = 0;
            this.y = 0;
        }

        update(deltaTime) {
            if(this.x <=  -this.width) this.x = 0;
            this.x -= (this.game.speed * (deltaTime/1000)) * this.speedModifier;
        }

        draw(context){
            context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.x + this.width, this.y);
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////

    class Background{
        constructor(game){
            this.game = game;
            this.image1 = document.getElementById('layer1');
            this.image2 = document.getElementById('layer2');
            this.image3 = document.getElementById('layer3');
            this.image35 = document.getElementById('layer35');
            this.image36 = document.getElementById('layer36');
            this.image4 = document.getElementById('layer4');
            this.layer1 = new Layer(this.game, this.image1, 50);
            this.layer2 = new Layer(this.game, this.image2, 75);
            this.layer3 = new Layer(this.game, this.image3, 75);
            this.layer35 = new Layer(this.game, this.image35, 100)
            this.layer36 = new Layer(this.game, this.image36, 125)
            this.layer4 = new Layer(this.game, this.image4, 200);
            this.layers = [this.layer1, this.layer2, this.layer3, this.layer35, this.layer36]; }

        update(deltaTime) {
            this.layers.forEach(layer => layer.update(deltaTime));}

        draw(context){
            this.layers.forEach(layer => layer.draw(context));}
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////

    class Explosion{
        constructor(game, x, y){
            this.game = game;
            this.frameX = 0;
            this.spriteHeight = 200;
            this.spriteWidth = 200;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x - this.width/ 2;
            this.y = y - this.height/ 2;
            
            this.timer = 0;
            this.fps = 60;
            this.interval = 1000/this.fps;
            this.markedForDeletion = false;
            this.maxFrame = 7; }

        update(deltaTime){
            this.x -= this.game.speed * (deltaTime/1000);
            if(this.timer > this.interval){
                this.frameX++;
                this.timer = 0;}
            else{
                this.timer += deltaTime;}
            if(this.frameX > this.maxFrame) this.markedForDeletion = true;
        }

        draw(context){
            context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    class SmokeExplosion extends Explosion{
        constructor(game, x, y){
            super(game, x, y);
            this.image = document.getElementById('smokeExplosion');}}
            
    class FireExplosion extends Explosion{
        constructor(game, x, y){
            super(game, x, y);
            this.image = document.getElementById('fireExplosion');}}

    class FeatherExplosion extends Explosion{
        constructor(game, x, y){
            super(game, x, y);
            this.image = document.getElementById('featherExplosion');}}

    class AcornExplosion extends Explosion{
        constructor(game, x, y){
            super(game, x, y);
            this.image = document.getElementById('acornExplosion');}}

    class ProjectileExplosion extends Explosion{
        constructor(game, x, y){
            super(game);
            this.spriteHeight = 30;
            this.spriteWidth = 30;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x - this.width/ 2;
            this.y = y - this.height/ 2;
            this.maxFrame = 6;
            this.image = document.getElementById('ProjectileExplosion');}}

    class GnomeExplosion extends Explosion{
        constructor(game, x, y){
            super(game);
            this.spriteHeight = 75;
            this.spriteWidth = 40;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x - this.width/ 2;
            this.y = y - this.height/ 2;
            this.maxFrame = 5;
            this.image = document.getElementById('GnomeExplosion');}}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
//DAMAGE

    class Damage{
        constructor(game, x, y){
            this.game = game;
            this.frameX = 0;
            this.spriteHeight = 200;
            this.spriteWidth = 200;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.image = document.getElementById('DamageFly');
            this.x = x 
            this.y = y 
            this.fps = 60;
            this.timer = 0;
            this.interval = 1000/this.fps;
            this.markedForDeletion = false;
            this.maxFrame = 2;

             }

        update(deltaTime){
            this.x = this.game.player.x;
            this.y = this.game.player.y;

            if(this.game.player.JetPackPowerUp){
                this.image = document.getElementById('DamageFly');
                if(this.timer > this.interval){
                    this.frameX++;
                    this.timer = 0;}
                else{
                    this.timer += deltaTime;}
                if(this.frameX > this.maxFrame) this.markedForDeletion = true;
            }
            else{
                this.image = document.getElementById('DamageGro');
                if(this.timer > this.interval){
                    this.frameX++;
                    this.timer = 0;}
                else{
                    this.timer += deltaTime;}
                if(this.frameX > this.maxFrame) this.markedForDeletion = true;
                
            }
            
        }

        draw(context){
            context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }}
            

////////////////////////////////////////////////////////////////////////////////////////////////////////////

    class UI{
        constructor(game){
            this.game = game;
            this.fontSize = 20;
            this.fontFamily = 'Jaro';
            this.color = 'HoneyDew';
        }

        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            context.shadowColor = 'black';
            context.font = '18px Jaro';

            //score
            context.fillText('Score: ' + this.game.score, 900, 40);

            //timer
            const formattedTime = (this.game.gameTimeX * 0.001).toFixed(1);
            if(this.game.gameTimeX < 30000 ) {
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                context.fillStyle = 'red';
            }
            context.fillText('Time: ' + formattedTime, 900, 20);

            //lives
            context.fillStyle = 'red'
            if(this.game.gameOver){
                context.fillText('Health: ' , 10, 20);
            }

            else if(!this.game.gameOver){
            context.fillText('Health: ' + this.game.lives, 10, 20);            
            for(let i = 0; i<this.game.lives; i++){
                context.fillStyle = 'red'
                context.fillRect(10 + 3 * i, 25 , 3, 5);}}

                //10 + 5 * i: This spaces out each rectangle horizontally.

                // Starts at x = 10 (first health bar).

                // Then adds 5 * i for each additional health bar.

                // So 2nd bar is at x = 15, 3rd at 20, etc.

                // 25: The vertical position (y) — so all bars are on the same line.

                // 5: The width of each bar.

                // 5: The height of each bar.


                //to make VERTICAL:
                // context.shadowOffsetX = 3;
                // context.shadowOffsetY = -1;
                // context.fillRect(350 , 400 - 1 * i, 8, 10);


            //Turn these to false BEFORE drawing the boss health bars, otherwise, it crashes
            //It crashes because it runs when (---BossIsAlive is true) 
            //It tries to get the boss.lives, but if the game is over and the boss is not killed,
            //Then (---BossIsAlive is always true) but the boss won't exist so boss.lives is invalid
            //Making it false before the (---BossIsAlive) checks, stops it from running that code
            
            if(this.game.gameOver){
                this.game.OWLIsAlive = false;
                this.game.UFOIsAlive = false;
                this.game.SQUIRRELIsAlive = false;}

            //boss lives
            if(this.game.OWLIsAlive){
                const owlBoss = this.game.bosses.find(Boss => Boss instanceof OWL);
                //^^THIS LINE OF CODE IS GODLY
                //It finds your boss instance of OWL in the bosses array
                //Once that's done, you can reference anything in the OWL class by using the constant
                //like done BELOW:  owlBoss.lives, owlBoss.y, etc.
            context.fillStyle = 'red'
            context.fillText('O.W.L Health', 500, 20);

            for(let i = 0; i< owlBoss.lives; i++){
                context.fillStyle = 'red'
                context.fillRect(310 + 3 * i, 25 , 3, 10);
            }}

            if(this.game.UFOIsAlive){
                const ufoBoss = this.game.bosses.find(Boss => Boss instanceof UFO);
                context.fillStyle = 'red'
                context.fillText('U.F.O Health', 500, 20);
                for(let i = 0; i< ufoBoss.lives; i++){
                    context.fillStyle = 'red'
                    context.fillRect(325 + 3 * i, 25, 3, 10);
                }}

            if(this.game.SQUIRRELIsAlive){
                const squirrelBoss = this.game.bosses.find(Boss => Boss instanceof SQUIRREL);
                context.fillStyle = 'red'
                context.fillText('S.Q.U.I.R.R.E.L Health', 450, 20);
                for(let i = 0; i< squirrelBoss.lives; i++){
                    context.fillStyle = 'red'
                    context.fillRect(300 + 2 * i, 25, 2, 10);
                }}



            //ammo
            if(this.game.player.RaygunPowerUp) context.fillStyle = 'cyan';
            else context.fillStyle = 'cyan';
            context.fillText('Ammo ' , 10, 50);
            
         
            
            //ammo design
           if(this.game.player.RaygunPowerUp) {
            for(let i = 0; i<this.game.ammo; i++){
            context.fillStyle = 'cyan';
            context.fillRect(10 + 4 * i, 55, 5, 7);}}
            else{
           for(let i = 0; i<this.game.ammo; i++){
            context.fillStyle = 'cyan';
            context.fillRect(10 + 5 * i, 55, 3, 7);
            //context.fillRect
            // (x + spaceBetween * i(addition of squares for each bullet), y, width, height);
        }}


            //game over messages
            if(this.game.gameOver){

                if(this.game.bossDeaths > 2){
                    document.getElementById("WinMessage").classList.remove('hidden');
                
                    document.getElementById("CreditsMessage").classList.remove('hidden');
                } 
                else {

                    document.getElementById("LoseMessage").classList.remove('hidden');

                }
            }

            
            context.restore(); //this FILLS up the bars for ammo and health(ONLY ONE IS NEEDED)
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this); 
            this.input = new InputHandler(this);
            this.ui = new UI(this);


            this.keys = [];
            this.enemies = [];
            this.particles = [];
            this.aliens = [];
            this.feathers = [];
            this.sparks = [];

            this.damages = [];

            this.screws = [];
            this.acornSingles = [];
            
            this.explosions = [];

            this.Platforms = [];
            this.PlatformTimer = 0;
            this.PlatformInterval = 1800;

            this.Obstacles = [];
            this.ObstacleTimer = 0;
            this.ObstacleInterval = getRandomInt(4255, 5157);

            this.miniBossTimer = 0;
            this.miniOWLBossInterval = 250;
            this.miniCOWBossInterval = 500;
            this.miniSQUIRRELBossInterval = 800;
            this.squirrelLaserz = [];
            this.miniBosses = [];

            this.squirrelLaserCount = 0;
            this.ACORNCount = 0;
            this.RATCount = 0;
            this.COWcount = 0;


            this.bossTimer = 0;
            this.bossOWLInterval = 30000;//30000
            this.bossUFOInterval = 90000;//90000                                         
            this.bossSQUIRRELInterval = 165000;//165000
            this.bosses = [];
            this.bossCount = 0;
            this.bossDeaths = 0;

            this.bossIsAlive = false;

            this.OWLIsAlive = false;
            this.UFOIsAlive = false;
            this.SQUIRRELIsAlive = false;

//WORK ZONE
//WORK ZONE
//WORK ZONE
            this.powerups = [];
            this.powerUpInterval = getRandomInt(5000, 7000);
            this.powerUpTimer = 0;
            this.AirSupportS = [];

            this.spacePressed = false;

//WORK ZONE
//WORK ZONE
//WORK ZONE

            this.enemyTimer = 0;


            if(Hard === true){
                this.enemyInterval = getRandomInt(1500, 1800);
               
                this.ammo = 30;
                this.maxAmmo = 30;
                this.ammoTimer = 0;
                this.ammoInterval = 200;
                this.MaxLives = 20;
            }
            else if(Normal === true){
            this.enemyInterval = getRandomInt(1800, 2200);}



            this.ammo = 20;
            this.maxAmmo = 20;
            this.ammoTimer = 0;
            this.ammoInterval = 300;
            this.gameOver = false;
            this.score = 0;
           
            
            this.gameTime = 0; //THIS TIME IS WHAT ENEMIES,OBJECT, PLAYER, AND BOSSES USE TO UPDATE

            this.gameTimeX = 250000; //This is used ONLY for the timer for the game
            this.gameTimeOGX = this.gameTimeX; //This is used ONLY for the timer for the game
            this.timeEnd = 0;       //This is used ONLY for the timer for the game


            //Increase speed for a potential powerup option
            this.speed = 1 
            this.debug = false;
            this.lives = 10;
            this.MaxLives = 30;

            //secondprojectile 
            this.secondprojectiles = [];      
            
            this.RayGunBackup = 0;


            this.randomizeSoundTimer = 0;
            
        }

//////////////////////////////////////////////////////////////////////////////////////////////////////////// 

        
        update(deltaTime){
            
            if(this.gameTime > this.gameTimeOGX || this.lives < 1 || this.bossDeaths > 2) this.gameOver = true;          
            else if(!this.gameOver && this.gameTimeX > this.timeEnd) {
                this.gameTime += deltaTime; 
                this.gameTimeX -= deltaTime;}

            if(this.gameTimeX < 20000 & this.RayGunBackup < 1) {
                this.addRaygun(350);
                this.RayGunBackup++;
            }
            
            

            this.background.update(deltaTime) ;
            this.background.layer4.update(deltaTime) ;
            this.player.update(deltaTime);

            if(this.ammoTimer > this.ammoInterval){
                if(this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;}
            else{
            this.ammoTimer += deltaTime; }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
//PARTICLES
        this.particles.forEach(particle => particle.update(deltaTime) );
        this.particles = this.particles.filter(particle => !particle.markedForDeletion);

//ALIENS
        this.aliens.forEach(Alien => Alien.update(deltaTime) );
        this.aliens = this.aliens.filter(Alien => !Alien.markedForDeletion);

//FEATHERS
        this.feathers.forEach(Feather => Feather.update(deltaTime) );
        this.feathers = this.feathers.filter(Feather => !Feather.markedForDeletion);

//SPARKS
        this.sparks.forEach(Spark => Spark.update(deltaTime) );
        this.sparks = this.sparks.filter(Spark => !Spark.markedForDeletion);

//SCREWS
        this.screws.forEach(Screw => Screw.update(deltaTime) );
        this.screws = this.screws.filter(Screw => !Screw.markedForDeletion);

//AcornSingle
        this.acornSingles.forEach(AcornSingle => AcornSingle.update(deltaTime) );
        this.acornSingles = this.acornSingles.filter(AcornSingle => !AcornSingle.markedForDeletion);
//DAMAGE
        this.damages.forEach(Damage => Damage.update(deltaTime));  //deltaTime ALLOWS DELETION OF THE Damage sprite
        this.damages = this.damages.filter(Damage => !Damage.markedForDeletion);

//EXPLOSIONS
        this.explosions.forEach(explosion => explosion.update(deltaTime));
        this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion);



////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //WORK ZONE
        //WORK ZONE
        //WORK ZONE


//AIR SUPPORT/BOMB COLLISIONS



this.AirSupportS = this.AirSupportS.filter(AirSupport => !AirSupport.markedForDeletion);

this.AirSupportS.forEach(AirSupport => {
    AirSupport.update(deltaTime) ;
    this.enemies.forEach(enemy =>{

        //          --NOTE--
        //     DO NOT ADD THIS HERE 
        //       enemy.update(deltaTime) ; 
        // ^^^ DO NOT ADD THIS HERE ^^^ 
        // THIS MAKES THE ENEMY UPDATE AGAIN FOR EVERY AIRSUPPORT THAT IS UPDATED
        // THIS CAUSES THE ENEMY CLASS TO SPEED UP BECAUSE IT WILL BE MOVING TWICE(or more) AS FAST
        // The enemy.update(deltaTime) ; is already called below and that is ENOUGH

if (this.checkAirSupportCollision(AirSupport, enemy)) {

    if(enemy instanceof miniOPOSSUM){return;}
                this.score++;
                enemy.markedForDeletion = true;
                AirSupport.markedForDeletion = true;
                this.addExplosion(AirSupport);
                airSupportHitSound.currentTime = 0;
            airSupportHitSound.play();
            }});

    this.miniBosses.forEach(miniBoss =>{
    if (this.checkAirSupportCollision(AirSupport, miniBoss)) {
                    this.score++;
                    miniBoss.markedForDeletion = true;
                    AirSupport.markedForDeletion = true;
                    this.addExplosion(AirSupport);
                    airSupportHitSound.currentTime = 0;
            airSupportHitSound.play();
        }});

    

    this.bosses.forEach(Boss =>{
    if (this.checkAirSupportCollision(AirSupport, Boss)) {
                    Boss.lives-= 0.5;
                    AirSupport.markedForDeletion = true;
                    this.addExplosion(AirSupport);
                    airSupportHitSound.currentTime = 0;
            airSupportHitSound.play();
            }});



    });


    //WORK ZONE
    //WORK ZONE
    //WORK ZONE

////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
//ENEMY COLLISIONS
        this.enemies.forEach(enemy =>{
            enemy.update(deltaTime) ;
            
            if(!this.player.JetPackPowerUp){
            if(this.checkCollision(this.player, enemy)){
                if(enemy instanceof miniOPOSSUM){
                    if(!enemy.hasBittenPlayer){
                    PLAYERHURT.play();
                    this.lives--;
                    enemy.hasBittenPlayer = true;
                    this.addExplosion(this.player);
                    }
                    return; 
            //RETURN - this makes the code restart and check the collision again
            //this means it won't ever mark the miniopossum for deletion or add explosions
            //it starts the check again and checks a new miniOpossum or other entity's properties
                }
                const knockbackPower = 700; // Higher = stronger knockback

                if (this.player.x < enemy.x) {
                    this.player.knockbackX = -knockbackPower;
                    this.player.knockbackY = -700; 
                } else {
                    this.player.knockbackX = knockbackPower;
                    this.player.knockbackY = -700; 
                }
                this.player.isKnockedBack = true;
                this.player.knockbackTimer = 20;


                enemy.markedForDeletion = true;
                this.addExplosion(enemy);
                this.addDeathSound(enemy);
                PLAYERHURT.play();

            // if(enemy.type === 'lucky' && this.lives < this.MaxLives) {
            //     this.lives += 1;}

            if(!this.gameOver && enemy.type === 'OPOSSUM') {
                this.score--;
                this.lives -= 5;
                this.addExplosion(this.player);
            }
            else if(!this.gameOver && enemy.type === 'WASP') {
                this.score--;
                this.lives -= 2;
                this.addExplosion(this.player);
            }
            else if(!this.gameOver && enemy.type === 'RAT') {
                this.score--;
                this.lives -= 3;
                this.addExplosion(this.player);
            }
            else if(!this.gameOver && enemy.type === 'miniCOWenemy') {
                this.score--;
                this.lives--;
                this.addExplosion(this.player);
            }

            }}
            if(this.player.JetPackPowerUp){
            if(this.checkJetPackCollision(this.player, enemy) ){

                if(enemy instanceof miniOPOSSUM){
                    if(!enemy.hasBittenPlayer){
                    PLAYERHURT.play();
                    this.lives--;
                    enemy.hasBittenPlayer = true;
                    this.addExplosion(this.player);
                    }
                    return;
                }

                const knockbackPower = 700; // Higher = stronger knockback

                if (this.player.x < enemy.x) {
                    this.player.knockbackX = -knockbackPower;
                    this.player.knockbackY = -700; 
                } else {
                    this.player.knockbackX = knockbackPower;
                    this.player.knockbackY = -700; 
                }
                this.player.isKnockedBack = true;
                this.player.knockbackTimer = 20;

                enemy.markedForDeletion = true;
                this.addExplosion(enemy);
                this.addDeathSound(enemy);
                PLAYERHURT.play();
                
            
                if(!this.gameOver && enemy.type === 'OPOSSUM') {
                    this.score--;
                    this.lives -= 5;
                    this.addExplosion(this.player);
                }
                else if(!this.gameOver && enemy.type === 'WASP') {
                    this.score--;
                    this.lives -= 2;
                    this.addExplosion(this.player);
                }
                else if(!this.gameOver && enemy.type === 'RAT') {
                    this.score--;
                    this.lives -= 3;
                    this.addExplosion(this.player);
                }
                else if(!this.gameOver && enemy.type === 'miniCOWenemy') {
                    this.score--;
                    this.lives--;
                    this.addExplosion(this.player);
                }
            }}

       


     
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//PROJECTILE COLLISION


            this.player.projectiles.forEach(projectile => {
                if(this.checkProjectileCollision(projectile, enemy)){
                    if(enemy instanceof miniOPOSSUM){
                    }
                    else{enemy.lives--;                   
                        projectile.markedForDeletion = true;
                        this.addExplosion(projectile);
                        HIT.play();
                        HIT.currentTime = 0;}
    

                    //this.particles.push(new Particle(this, enemy.x + enemy.width/2, enemy.y + enemy.height/2));
                if(enemy.lives <= 0){
                    //every time enemy dies, gears explode out
                    // for(let i = 0; i < enemy.score; i++){
                    //     this.particles.push(new Particle(this, enemy.x + enemy.width/2, enemy.y + enemy.height/2));
                    // }

                        enemy.markedForDeletion = true;
                        this.addExplosion(enemy);
                       this.addDeathSound(enemy);

                       
 
                    if(enemy.type === 'OPOSSUM'){
                        
                        for(let i = 0; i < 5; i++){
                            this.enemies.push(new miniOPOSSUM(this, enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * enemy.height * 0.8));}
                            
                        } 
                            
                    if(!this.gameOver) this.score += enemy.score;
                    }
                    //winningscore
                }})
            });
            
            
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//WORK ZONE
//WORK ZONE
//WORK ZONE
//PowerUp Collisions
        this.powerups.forEach(powerup => {
            powerup.update(deltaTime) ;
            
            if(this.checkPowerUpCollision(this.player, powerup)){
                
                if(powerup.type === 'Bomb'){
                    this.player.enterBombPowerUp();
                    powerup.markedForDeletion = true;
                }
                if(powerup.type === 'JetPack'){
                    this.player.enterJetPackPowerUp();
                    powerup.markedForDeletion = true;
                }
                if(powerup.type === 'Heart'){
                    this.player.enterHeartPowerUp();
                    this.addHealthRing();
                    powerup.markedForDeletion = true;
                }
                if(powerup.type === 'Raygun'){
                    this.player.enterRaygunPowerUp();
                    powerup.markedForDeletion = true;
                }
            }
        });


//PowerUp Spawns

const randomize = Math.random();

        this.powerups = this.powerups.filter(powerup => !powerup.markedForDeletion);
        if(this.powerUpTimer > this.powerUpInterval && !this.gameOver && this.gameTime >= 10000){
            
            if(randomize < 0.2)  {this.addRaygun(getRandomInt(200, 350)); //.2
                }
            else if(randomize < 0.5) {this.addJetPack(getRandomInt(200, 350)); //.5
                }
            else if(randomize < 0.75) {this.addHeart(getRandomInt(200, 350));  //.75
                }
            else if(randomize < 1) {this.addBomb(getRandomInt(200, 350));   //1
                }
            this.powerUpTimer = 0;
            
        }
        else {
            this.powerUpTimer += deltaTime;
        }


//WORK ZONE
//WORK ZONE
//WORK ZONE

////////////////////////////////////////////////////////////////////////////////////////////////////////////


this.bosses.forEach(Boss =>{
    Boss.update(deltaTime) ;

    if(this.checkCollision(this.player, Boss)){
    this.lives--;
    PLAYERHURT.play();
    this.addExplosion(this.player);

    const knockbackPower = 3000; // Higher = stronger knockback
    const knockbackPowerY = 2000;

    // Determine direction
    if(Boss instanceof OWL || Boss instanceof SQUIRREL){

    if (this.player.x < Boss.x) {
        this.player.knockbackX = -knockbackPower;
        this.player.knockbackY = -knockbackPowerY; 
    } else {
        this.player.knockbackX = knockbackPower;
        this.player.knockbackY = -knockbackPowerY; 
    }}

    else{
        if (this.player.y < Boss.y + Boss.height && this.player.y > Boss.y + Boss.height - 100 ) {
        this.player.knockbackY = 3000;}
        else if (this.player.x < Boss.x) {
            this.player.knockbackX = -knockbackPower;
            this.player.knockbackY = -knockbackPowerY; 
        } else {
            this.player.knockbackX = knockbackPower;
            this.player.knockbackY = -knockbackPowerY; }
    
    }

    

    this.player.isKnockedBack = true;
    this.player.knockbackTimer = 20; // frames of knockback effect

    }

        this.player.projectiles.forEach(projectile => {
            if (Boss.markedForDeletion) return; //if boss is dead, it skips eveything else to prevent another projectile from causing a "double" boss death
            if(this.checkProjectileCollision(projectile, Boss)){
                Boss.lives--;  
                HIT.play();
                projectile.markedForDeletion = true;
                this.addExplosion(projectile);
                
                
                if(Boss instanceof OWL){
                    FeatherPoof.play();
                    FeatherPoof.currentTime = 0;
                this.feathers.push(new Feather(this, Boss.x + Boss.width/10, Boss.y + Boss.height/10));
                this.feathers.push(new Feather(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));
                this.feathers.push(new Feather(this, Boss.x + Boss.width, Boss.y + Boss.height/2));
                }
                if(Boss instanceof UFO){
                    HIT.play();
                    HIT.currentTime = 0;
                    this.sparks.push(new Spark(this, Boss.x + Boss.width/10, Boss.y + Boss.height/10));
                    this.sparks.push(new Spark(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));
                    this.sparks.push(new Spark(this, Boss.x + Boss.width, Boss.y + Boss.height/2));
                    this.sparks.push(new Spark(this, Boss.x + Boss.width/5, Boss.y + Boss.height/5));
                      
                }
                if(Boss instanceof SQUIRREL){
                    this.screws.push(new Screw(this, Boss.x + Boss.width/10, Boss.y + Boss.height/10));
                    this.screws.push(new Screw(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));
                    this.screws.push(new Screw(this, Boss.x + Boss.width, Boss.y + Boss.height/2));
                    this.screws.push(new Screw(this, Boss.x + Boss.width/5, Boss.y + Boss.height/5));
                    this.screws.push(new Screw(this, Boss.x + Boss.width/15, Boss.y + Boss.height/15));
                    this.screws.push(new Screw(this, Boss.x + Boss.width/2, Boss.y + Boss.height));
                    
                }
            if(Boss.lives <= 0){
                this.bossDeaths++;
                // this.addHeart(350);

                if(Boss instanceof OWL){
                    FeatherPoof.play();
                    for(let i = 0; i < 5; i++){
                        const offsetX = Math.random() * 50 - 15;
                        const offsetY = Math.random() * 50 - 15;
                        
                        this.feathers.push(new Feather(this, Boss.x + Boss.width / 2 + offsetX, Boss.y + Boss.height / 2 + offsetY));
                    } }
                if(Boss instanceof UFO){
                    ALIENVOICE.pause();
                    UFOSOUND.pause();
                    ALIENSCREAM.play();
                    BOOM.play();

                    for(let i = 0; i < 2; i++){
                        this.aliens.push(new Alien(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));
                        this.sparks.push(new Spark(this, Boss.x + Boss.width, Boss.y + Boss.height/2));
                        this.sparks.push(new Spark(this, Boss.x + Boss.width/5, Boss.y + Boss.height/5));
                         
                    } }
                if(Boss instanceof SQUIRREL){
                    SQUIRRELDEATH.play();
                    BOOM.play();
                    this.aliens.push(new Alien(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));
                       
                    for(let i = 0; i < 5; i++){
                        MINIALIENVOICE.pause();
                    SQUIRRELSOUND.pause();
                        this.acornSingles.push(new AcornSingle(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));
                    } }
                

                Boss.markedForDeletion = true;
                this.bossIsAlive = false;
                    this.addExplosion(Boss);
 
                if(!this.gameOver) this.score += Boss.score;}}})
                
                });

    this.miniBosses.forEach(miniBoss =>{
        miniBoss.update(deltaTime) ;
        if(this.checkCollision(this.player, miniBoss)){

            const knockbackPower = 700; // Higher = stronger knockback

    if (this.player.x < miniBoss.x) {
        this.player.knockbackX = -knockbackPower;
        this.player.knockbackY = -700; 
    } else {
        this.player.knockbackX = knockbackPower;
        this.player.knockbackY = -700; 
    }
    this.player.isKnockedBack = true;
    this.player.knockbackTimer = 20;

            this.lives--;
            PLAYERHURT.play();
            this.addExplosion(this.player);
               
            miniBoss.markedForDeletion = true;
            this.addExplosion(miniBoss);
            this.addDeathSound(miniBoss);

            //FUTURE REFERENCE
            //create another instance like "addExplosion()" and add the correct animation 
            //for all enemies
        
        }

        


       
    
            this.player.projectiles.forEach(projectile => {
                if(this.checkProjectileCollision(projectile, miniBoss)){
                    miniBoss.lives--;  
                    HIT.play();
                    HIT.currentTime = 0;
                    projectile.markedForDeletion = true;   
                    this.addExplosion(projectile); 
                     if(miniBoss.lives <= 0){
                    //every time enemy dies, gears explode out
                    
    
                    miniBoss.markedForDeletion = true;
                        this.addExplosion(miniBoss); 
                        this.addDeathSound(miniBoss);
                       
                    if(!this.gameOver) this.score += miniBoss.score;}}})});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
//PLATFORM SPAWN
        this.Platforms = this.Platforms.filter(Platform => !Platform.markedForDeletion);
        
        //Following If statement works as follows:
        //
        //The PlatformTimer will be increasing when deltaTime is added to it, if the first condition is not met
        //Every time deltaTime is added, and it reaches the PlatformInterval value, an Platform is spawned and PlatformTimer goes back to zero
        //Cycle repeats
        //
        if(this.PlatformTimer > this.PlatformInterval && !this.gameOver){
            this.addPlatform();
            this.PlatformTimer = 0;}
        else{
            this.PlatformTimer += deltaTime;}

//Platform Collision
        //The code right under this is meant to ensure that the 'update(deltaTime) ' function in any class is called (Every class needs its own  version)
        this.player.grounded = false;
        this.Platforms.forEach(Platform =>{
            Platform.update(deltaTime);

         if (this.checkPlatformCollision(this.player, Platform) && !this.player.JetPackPowerUp) {
            if (this.player.vy >= 0) {  // Ensure player is falling before grounding
                this.player.y = Platform.y - this.player.height;
                this.player.vy = 0;  // Stop downward movement
                this.player.grounded = true;
            }} 
      
        });

        //This code can be used as some type of magnet mechanism. 
        //(It causes the player to stick to the bottom part of the platforms)
        //It also prevents player from jumping
        //
        // if(this.checkCollision(this.player, Platform)){
        //     this.player.y = Platform.y - Platform.height;
        // }

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Obstacle SPAWN
            this.Obstacles = this.Obstacles.filter(Obstacle => !Obstacle.markedForDeletion);
            if(this.ObstacleTimer > this.ObstacleInterval && !this.gameOver && !this.bossIsAlive){
                this.addObstacle();
                this.ObstacleTimer = 0;}
            else{
                this.ObstacleTimer += deltaTime;}

//Obstacle Collision 
            this.Obstacles.forEach(Obstacle =>{
                Obstacle.update(deltaTime) ;
            if(!this.player.JetPackPowerUp){
            if(this.checkGnomeCollision(this.player, Obstacle)){
                const knockbackPower = 700; // Higher = stronger knockback

                if (this.player.x < Obstacle.x) {
                    this.player.knockbackX = -knockbackPower;
                    this.player.knockbackY = -700; 
                } else {
                    this.player.knockbackX = knockbackPower;
                    this.player.knockbackY = -700; 
                }
                this.player.isKnockedBack = true;
                this.player.knockbackTimer = 20;

                Obstacle.markedForDeletion = true;
                GNOMEBREAK.play();
                this.addExplosion(Obstacle);
                this.lives--;
                PLAYERHURT.play();
                this.addExplosion(this.player);   
              
            }}
            if(this.player.JetPackPowerUp){
            if(this.checkGnomeJetPackCollision(this.player, Obstacle)){
                const knockbackPower = 700; // Higher = stronger knockback

                if (this.player.x < Obstacle.x) {
                    this.player.knockbackX = -knockbackPower;
                    this.player.knockbackY = -700; 
                } else {
                    this.player.knockbackX = knockbackPower;
                    this.player.knockbackY = -700; 
                }
                this.player.isKnockedBack = true;
                this.player.knockbackTimer = 20;

                Obstacle.markedForDeletion = true;
                GNOMEBREAK.play();
                this.addExplosion(Obstacle);
                this.lives--;
                PLAYERHURT.play();
                this.addExplosion(this.player);    
               
            }}
        
        });

        

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ENEMY INSERTION 
        this.enemies.forEach(enemy => {
            if (enemy.markedForDeletion && enemy.sound) {
                enemy.sound.pause();
                enemy.sound.currentTime = 0; // optional: reset to beginning
            }
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        //Following If statement works as follows:
        //
        //The enemyTimer will be increasing when deltaTime is added to it, if the first condition is not met
        //Every time deltaTime is added, and it reaches the enemyInterval value, an enemy is spawned and enemyTimer goes back to zero
        //Cycle repeats
        //
        if(this.enemyTimer > this.enemyInterval && !this.gameOver && !this.bossIsAlive && this.gameTime > 3000){
            this.addEnemy();


            this.enemyTimer = 0;}
        else{
            this.enemyTimer += deltaTime;}



////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        this.bosses = this.bosses.filter(Boss => !Boss.markedForDeletion);
        if((this.gameTime > this.bossOWLInterval && !this.gameOver) ){
            if(this.bossCount === 0){
            this.addRaygun(350);
            this.addOWLBoss();
            this.OWLIsAlive = true;
            this.bossIsAlive = true;
            this.bossCount++;
            this.bossTimer = 0;}

            else if(this.bossDeaths === 1 && this.bossCount === 1 && this.gameTime > this.bossUFOInterval){
                this.addJetPack(350); 
                this.addUFOBoss();
                this.UFOIsAlive = true;
                this.bossIsAlive = true;
                this.bossCount++;
                this.bossTimer = 0;}
            
                else if(this.bossDeaths === 2 && this.bossCount === 2 && this.gameTime > this.bossSQUIRRELInterval){
                    this.addBomb(350);
                    this.addSQUIRRELBoss();
                    this.SQUIRRELIsAlive = true;
                    this.bossIsAlive = true;
                    this.bossCount++;
                    this.bossTimer=0;

                
                    
                }
        }
        else{
            this.bossTimer += deltaTime;}

            if(this.bossDeaths === 1){this.OWLIsAlive = false;}
                if(this.bossDeaths > 1 && this.bossDeaths <= 2){this.UFOIsAlive = false;}
                if(this.bossDeaths > 2){this.SQUIRRELIsAlive = false;}





        this.bosses.forEach(Boss =>{
            if(this.gameOver){
                this.bosses = this.bosses.filter(Boss => Boss.markedForDeletion);
                // for(let i = 0; i < Boss.score; i++){
                // this.explosions.push(new SmokeExplosion(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));
                // this.explosions.push(new FireExplosion(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));
                // }
                if(Boss instanceof OWL){
                    for(let i = 0; i < 20; i++){
                        const offsetX = Math.random() * 200 - 25;
                        const offsetY = Math.random() * 200 - 25;
                        this.feathers.push(new Feather(this, Boss.x + Boss.width / 2 + offsetX, Boss.y + Boss.height / 2 + offsetY));
                    } }
                if(Boss instanceof UFO){
                    for(let i = 0; i < 2; i++){
                        this.aliens.push(new Alien(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));
                }}
                if(Boss instanceof SQUIRREL){
                    for(let i = 0; i < 5; i++){
                        this.acornSingles.push(new AcornSingle(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));
                    } }


        //             else{
        //                 for(let i = 0; i < Boss.score; i++){
        //                     //this.particles.push(new Particle(this, Boss.x + Boss.width/2, Boss.y + Boss.height/2));}
        //     }
         }
        });       

    this.miniBosses = this.miniBosses.filter(miniBoss => !miniBoss.markedForDeletion);
    
            if(this.bossDeaths === 0 && this.gameTime > this.bossOWLInterval+500 && this.miniBossTimer > this.miniOWLBossInterval && !this.gameOver){
            this.addMiniOWL();
            this.miniBossTimer = 0;

            if(this.enemyTimer < 4000){
                this.enemyTimer += deltaTime;}
            else{
                this.enemies.push(new RAT(this));
                

                this.enemyTimer = 0;
            }
            
            
            }
            //when the miniBossTimer reaches the miniOWLBossInterval, it will add a miniOWL and reset
            //as long as the game is not over and the first boss has not died

            
           else if (this.bossDeaths === 1 && this.gameTime > this.bossUFOInterval+500 && this.miniBossTimer > this.miniCOWBossInterval && !this.gameOver) {
            const spawnX = [500, 550, 600, 650, 700, 750];
           
            if (this.COWcount < 6) {
                const x = spawnX[this.COWcount];
                const newMiniCOW = new miniCOW(this, x);
                this.miniBosses.push(newMiniCOW);

            if(this.randomizeSoundTimer < 3){
            this.randomizeSound = Math.random();
            this.randomizeSound < 0.5 ? this.sound = MRR.cloneNode() : this.sound = MOO.cloneNode();
            this.sound.play();
            this.sound.currentTime = 0;
            this.sound.volume = .4;
            this.randomizeSoundTimer++;
            }

                this.COWcount++;
                
                } else {
                    this.COWcount = 0;
                    this.enemies.push(new WASP(this));
                }
                this.miniBossTimer = 0;
            }
        

    else if(this.bossDeaths === 2 && this.gameTime > this.bossSQUIRRELInterval+500  && !this.gameOver  ){
        if( this.bosses[0].frameX === 3 && this.ACORNCount === 0){
            SLINGSHOT.play();
            SLINGSHOT.currentTime = 0;
            this.addACORN();
            
            if(this.enemyTimer < 4000){
                this.enemyTimer += deltaTime;}
            else{
                this.enemies.push(new RAT(this));
                this.enemyTimer = 0;
            }
        this.ACORNCount = 1; //THIS makes sure that only ONE acorn spawns at a time when the slingshot is shot
        }
       else if(this.bosses[0].frameX === 4) 
        {this.ACORNCount = 0;
            
        }

       if( this.bosses[0].frameX === 6 && this.squirrelLaserCount === 0){
       // this.addSquirrelLaser();
        this.squirrelLaserCount = 1;

     //THIS makes sure that only ONE acorn spawns at a time when the slingshot is shot
    }
            else if(this.bosses[0].frameX === 7) 
            {this.squirrelLaserCount = 0;}

    if(this.miniBossTimer >= this.miniSQUIRRELBossInterval){
        this.addMiniSQUIRREL();
        this.miniBossTimer = 0;
       }
        this.miniBossTimer += deltaTime;
       
       
    }
        
        else{
            this.miniBossTimer += deltaTime;}
            //this code adds time to the miniBossTimer until it reaches the miniCOWBossInterval
                

////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //ENEMY DELETION
        this.enemies.forEach(enemy =>{
            if(this.gameOver){
                this.enemies = this.enemies.filter(enemy => enemy.markedForDeletion);
            }
        });

////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
        
    draw(context){
            this.background.draw(context);
     
        //mini boss
        this.miniBosses
            .filter(miniBoss => !(miniBoss instanceof SquirrelLaser)) 
            .forEach(miniBoss => miniBoss.draw(context));
        
    
        //boss
        this.bosses.forEach(Boss =>{
            Boss.draw(context);
        });

        //mini boss
        this.miniBosses
            .filter(miniBoss => (miniBoss instanceof SquirrelLaser)) 
            .forEach(miniBoss => miniBoss.draw(context));

        
    
   
                       
            this.player.draw(context);

            //particles
            this.particles.forEach(particle => particle.draw(context)
            );

            this.aliens.forEach(Alien => Alien.draw(context)
            );

            this.feathers.forEach(Feather => Feather.draw(context)
            );
            
            this.sparks.forEach(Spark => Spark.draw(context)
            );

            this.screws.forEach(Screw => Screw.draw(context)
            );

            this.acornSingles.forEach(AcornSingle => AcornSingle.draw(context)
            );

            


    

            //platforms
            this.Platforms.forEach(Platform =>{
                Platform.draw(context); 
            });

    //WORK ZONE
    //WORK ZONE
    //WORK ZONE
    this.AirSupportS.forEach(AirSupport =>{
        AirSupport.draw(context)
    });

    this.powerups.forEach(powerup =>{
        powerup.draw(context);
    });
    //WORK ZONE
    //WORK ZONE
    //WORK ZONE

            //obstacles
            this.Obstacles.forEach(Obstacle =>{
                Obstacle.draw(context); 
            });

            //enemy
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });

                //damage
            this.damages.forEach(Damage =>{
                Damage.draw(context);
            });

            //explosion
            this.explosions.forEach(explosion =>{
                explosion.draw(context);
            });

            

            //background
            this.background.layer4.draw(context); 
            
            this.ui.draw(context);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
    addOWLBoss(){
        this.bosses.push(new OWL(this));}

    addUFOBoss(){
        this.bosses.push(new UFO(this));}

    addSQUIRRELBoss(){
        this.bosses.push(new SQUIRREL(this));}

    addMiniOWL(){
        this.miniBosses.push(new miniOWL(this));}

    addMiniCOW(){
            this.miniBosses.push(new miniCOW(this));
        }
    addMiniSQUIRREL(){
        this.miniBosses.push(new miniSQUIRREL(this));
    }

    addACORN(){
        this.miniBosses.push(new ACORN(this));
    }

    addSquirrelLaser(){
        this.miniBosses.push(new SquirrelLaser(this));
    }
    //WORK ZONE
    //WORK ZONE
    //WORK ZONE
    addBomb(y){
        this.powerups.push(new Bomb(this, y));}
    addJetPack(y){
        this.powerups.push(new JetPack(this, y));}
    addHeart(y){
        this.powerups.push(new Heart(this, y));}

    addHealthRing(){
        this.powerups.push(new HealthRing(this));
    }
    addAirSupport(){
        this.AirSupportS.push(new AirSupport(this));
    }

    addRaygun(y){
        this.powerups.push(new Raygun(this, y));}
    //WORK ZONE
    //WORK ZONE
    //WORK ZONE
        addEnemy(){
            const randomize = Math.random();
            if(randomize < 0.2){//.2
                this.enemies.push(new WASP(this));
                this.enemies.push(new miniCOWenemy(this));
            } 
            else if(randomize < 0.5){//.5
                this.enemies.push(new RAT(this));
                this.enemies.push(new WASP(this));

               }
            else if(randomize < 0.70){
                this.enemies.push(new RAT(this));
                this.enemies.push(new miniCOWenemy(this));
            }
 
            else if(randomize < 1) {
                this.enemies.push(new OPOSSUM(this));
                }

        } 
       
        addPlatform(){ 
            this.Platforms.push(new Platform(this));   

            }

        addObstacle() {
            this.Obstacles.push(new Obstacle(this));
        }

        addExplosion(entity){ 
        // entity allows ANY parameter to be used(enemies, boss, player, minboss) 
        // inside of the function below, you can add the logic specific to the desired entity

            const randomize = Math.random();
            //player
            if(entity instanceof Player)   this.damages.push(new Damage(this, entity.x + entity.width, entity.y + entity.height));

            //miniBosses
            if(entity instanceof miniOWL)   this.explosions.push(new FeatherExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));
            if(entity instanceof miniSQUIRREL)   this.explosions.push(new AcornExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));
            if(entity instanceof ACORN)   this.explosions.push(new AcornExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));
            if(entity instanceof SquirrelLaser)   this.explosions.push(new FireExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));
           
            if (entity instanceof miniCOW) this.explosions.push(new SmokeExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));
            
            //Bosses
            if (entity instanceof OWL){
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width, entity.y + entity.height));
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width/4, entity.y + entity.height/4));
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width, entity.y + entity.height/9));
            }

            if (entity instanceof UFO){
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width, entity.y + entity.height));
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width/4, entity.y + entity.height/4));
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width, entity.y + entity.height/9));
            }

            if (entity instanceof SQUIRREL){
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width, entity.y + entity.height));
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width/4, entity.y + entity.height/4));
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width, entity.y + entity.height/9));
            }

            //AIRSUPPORT
            if(entity instanceof AirSupport){
                this.explosions.push(new SmokeExplosion(this, entity.x + entity.width, entity.y + entity.height));
            }

            if (entity instanceof Enemy){
                this.explosions.push(new FireExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));
            }

            if(entity instanceof Projectile){
                this.explosions.push(new ProjectileExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));}
            
            if(entity instanceof Obstacle){
                this.explosions.push(new GnomeExplosion(this, entity.x + entity.width/2, entity.y + entity.height/2));}
            
        }
        

        addDeathSound(entity){ 
            const miniOWLboss = this.miniBosses.find(miniBoss => miniBoss instanceof miniOWL);
            if (entity instanceof RAT){
                RATsqueak.play(); }
            if (entity instanceof miniOWL){
                entity.sound.play(); }
        }

        addDamageExplosion(x, y){
            this.explosions.push(new SmokeExplosion(this, x, y));
           
        }


////////////////////////////////////////////////////////////////////////////////////////////////////////////
       
        checkCollision(rect1, rect2){ //ONLY USED FOR PLAYER AGAINST ENEMIES
            return(
                    rect1.x+50 < rect2.x + rect2.width && 
                    rect1.x + rect1.width/2 > rect2.x &&
                    rect1.y+80 < rect2.y + rect2.height &&
                    rect1.y + rect1.height> rect2.y )}

        checkJetPackCollision(rect1, rect2){ //ONLY USED FOR JETPACK AGAINST ENEMIES
            return(
                    rect1.x+50 < rect2.x + rect2.width && 
                    rect1.x + rect1.width-45 > rect2.x &&
                    rect1.y+70 < rect2.y + rect2.height &&
                    rect1.y + rect1.height -40> rect2.y )}

        checkProjectileCollision(rect1, rect2){
            return(
                    rect1.x < rect2.x + rect2.width && 
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height> rect2.y )}

        checkAirSupportCollision(rect1, rect2){
            return(
                    rect1.x < rect2.x + rect2.width && 
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height> rect2.y )}

        checkGnomeCollision(rect1, rect2){
            return(
                    rect1.x+50 < rect2.x + rect2.width && 
                    rect1.x + rect1.width-50 > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height> rect2.y )}

        checkGnomeJetPackCollision(rect1, rect2){
            return(
                    rect1.x+50 < rect2.x + rect2.width && 
                    rect1.x + rect1.width-45 > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height - 40> rect2.y )}

        checkPlatformCollision(rect1, rect2){
            return(
                rect1.x + rect1.width-20 >= rect2.x && 
                rect1.x+90 <= rect2.x + rect2.width &&
                rect1.y + rect1.height >= rect2.y && 
                rect1.y + rect1.height <= rect2.y+ 7 )} // Allow a small buffer

        checkPowerUpCollision(rect1, rect2){
            return(
                    rect1.x < rect2.x + rect2.width && 
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height> rect2.y )}
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Setup and start the game
function setupGame() {

        document.getElementById("WinMessage").classList.add('hidden');
        document.getElementById("LoseMessage").classList.add('hidden');
        document.getElementById("CreditsMessage").classList.add('hidden');


    if (gameRunning) {
        lastTime = performance.now(); // reset time
        game.speed = 1; // reset speed
        gamePaused = false;

        game.background = new Background(game); // Reinitialize background with fresh state
        game.player = new Player(game); 

        


        return;
    }

    gameRunning = true;
    gamePaused = false;
    lastTime = performance.now();
    requestAnimationFrame(animate);

    // Music reset
    const Music = document.getElementById('Music');
    Music.playbackRate = 1;
    Music.play();



    // Add any other necessary resets here
}

// Animation loop
function animate(timeStamp) {
    if (!gameRunning || gamePaused) return;
    
    let deltaTime   = timeStamp - lastTime;
    if (deltaTime > 50) deltaTime = 50; 
    lastTime = timeStamp;



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime );
    game.draw(ctx);

    animationFrameId = requestAnimationFrame(animate);
}





        const allSounds = [BUZZ, airSupportHitSound, laserShotSound1, JETPACKSOUND, powerUpSound, RATsound, RATsound2, WHO, GNOMEBREAK, UFOSOUND, ALIENVOICE, SQUIRRELSOUND, MINIALIENVOICE];
        const wasPlaying = new Map();
       
        function pauseAllSounds() {
            allSounds.forEach(sound => {
                wasPlaying.set(sound, !sound.paused);
                sound.pause();
                Music.pause();
            });
        }
        
        function resumePlayingSounds() {
            allSounds.forEach(sound => {
                if (wasPlaying.get(sound)) {
                    sound.play();   
                }
                Music.play();
            });
        }




}, {once: true });
