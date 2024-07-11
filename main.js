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
}

function create () {
    heartace = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'heartace');

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

function update () {

}

// Function to resize the game
function resize() {
    game.scale.resize(window.innerWidth, window.innerHeight);
}

// Add event listener for window resize
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
