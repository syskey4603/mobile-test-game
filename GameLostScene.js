class GameLostScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameLostScene' });
    }

    preload() {
        this.load.image('loseScreen', 'assets/lose.png'); // Assuming you have an image for the lose screen
    }

    create() {
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'loseScreen').setScale(0.5);
        let textStyle = { font: '48px Arial', fill: '#FFFFFF' };
        this.add.text(window.innerWidth / 2 - 100, window.innerHeight / 2 + 200, 'Game Over!', textStyle);
    }
}
