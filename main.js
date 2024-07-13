var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var heartace;
var isDragging = false;


function preload () {
    this.load.image('heartace', 'heartace.png');
    this.load.image('diamond2', 'diamond2.png');
    this.load.image('diamond3', 'diamond3.png');
    this.load.image('diamond4', 'diamond4.png');
    this.load.image('diamond5', 'diamond5.png');
}

function create () {
    heartace = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'heartace');
    diamond2 = this.physics.add.sprite(window.innerWidth/2, 800, 'diamond2').setInteractive();

    diamond3 = this.physics.add.sprite(window.innerWidth/2-200, 80, 'diamond3');
    diamond4 = this.physics.add.sprite(window.innerWidth/2-100, 80, 'diamond4');
    diamond5 = this.physics.add.sprite(window.innerWidth/2, 80, 'diamond5');


    diamond2.on('pointerdown', () => {
        console.log("diamond2 clicked")
        if(diamond3.active) {
            diamond2.setPosition(diamond3.body.x+35, diamond3.body.y + 70)
        }
    })
    // Enable touch input
    this.input.on('pointerdown', function (pointer) {
        if (pointer.x >= heartace.x - heartace.width / 2 &&
            pointer.x <= heartace.x + heartace.width / 2 &&
            pointer.y >= heartace.y - heartace.height / 2 &&
            pointer.y <= heartace.y + heartace.height / 2) {
            isDragging = true;
        }
    }, this);

    this.input.on('pointermove', function (pointer) {
        if (isDragging) {
            heartace.setPosition(pointer.x, pointer.y);
        }
    }, this);

    this.input.on('pointerup', function () {
        isDragging = false;
    }, this);
}

// Update function, currently empty
function update () {

}

// Function to resize the game
function resize() {
    game.scale.resize(window.innerWidth, window.innerHeight);
    game.scene.scenes[0].cameras.main.setSize(window.innerWidth, window.innerHeight);

    // Reposition the heartace sprite to be centered in the new dimensions
    if (heartace) {
        heartace.setPosition(window.innerWidth / 2, window.innerHeight / 2);
    }
}

// Add event listener for window resize and orientation change
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
