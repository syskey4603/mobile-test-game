var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
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

}

function create ()
{

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
