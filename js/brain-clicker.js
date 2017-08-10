var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload () {

    //  The second parameter is the URL of the image (relative)
    game.load.image('backgroundImg', '/img/background.jpg');
    
    //  Main sprites
    game.load.image('brainImg', '/img/brain.png');

    //  Sounds & Music
    game.load.audio('music1', '/snd/13marilynT.wav');
    game.load.audio('music2', '/snd/13marilynT.wav');
    
    game.load.audio('brainClick', '/snd/pistol.wav');
}

var brain;

var brainpower = 0;
var brainpower_score = "";
var brainpower_label;
    
var myCountdownSeconds;
var timesUp = '+';

//  sounds
var clickSnd;    

function create() {
    
    //  Load the background. Sprites added after this get layered on top - order matters!
    game.add.sprite(0, 0, 'backgroundImg');

    //  Load the background music
    game.add.audio('music1');
    
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen and assign it to a variable
    brain = game.add.sprite(game.world.centerX, game.world.centerY, 'brainImg');
    brain.anchor.set(0.5);
    brain.inputEnabled = true;
    
    clickSnd = game.add.audio('brainClick');

    //  Set up the scoreboard
    brainpower_label = game.add.text(25, 16, '', { fill: '#ffffff' });
    brainpower_label.text = "Brainpower: ";
    brainpower_score = game.add.text(190, 16, '', { fill: '#eeff68' });
    brainpower_score.text = "" + brainpower;

    brain.events.onInputDown.add(brain_click, this);
    
}

function brain_click () {
    //  Even though the parent will scale, the child will remain at its own scale (and this is carried on down to any of its children)
    game.add.tween(brain.scale).to( { x: .92, y: .92 }, 40, Phaser.Easing.Linear.None, true, 0, 0, true);
    clickSnd.play();
    
    brainpower++;
    brainpower_score.text = "" + brainpower;
}

function countDownTimer() {
  
    var timeLimit = 120;
  
    mySeconds = game.time.totalElapsedSeconds();
    myCountdownSeconds = timeLimit - mySeconds;
    
    if (myCountdownSeconds <= 0) 
        {
        // time is up
        timesUp = 'Time is up!'; 
        myCountdownSeconds = 0;

    }
}

    
function update() {
    countDownTimer();
}

function render() {

    game.debug.text('Done? ' + timesUp, 620, 50, 'rgb(100,255,100)');
    game.debug.text('Time: ' + myCountdownSeconds, 620, 15, 'rgb(100,255,100)');
}