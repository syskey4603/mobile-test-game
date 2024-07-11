var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{

    this.load.image('heartace', 'heartace.png');

}

function create ()
{

    heartace = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/2, 'heartace')








    // Enable touch input
    this.input.on('pointerdown', function (pointer) {
        console.log('Touch at: ' + pointer.x + ', ' + pointer.y);
        heartace.setPosition(300, 500);
        // Add your touch handling logic here
    }, this);




}

function update ()
{

}

// Function to resize the game
function resize() {
    game.scale.resize(window.innerWidth, window.innerHeight);
}

// Add event listener for window resize
window.addEventListener('resize', resize);
indow.addEventListener('orientationchange', resize);
