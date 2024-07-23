class GameWonScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameWonScene' });
    }

    preload() {
        this.load.image('winScreen', 'assets/win.png'); // Assuming you have an image for the win screen
    }

    create() {
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'winScreen').setScale(0.5);
        let textStyle = { font: '48px Arial', fill: '#FFFFFF' };
        this.add.text(window.innerWidth / 2 - 100, window.innerHeight / 2 + 200, 'You Win!', textStyle);
    }
}
