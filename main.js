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


const DIAMOND = 1
const HEART = 2
const CLUB = 3
const SPADE = 4

class Card {
constructor (rank, suit, open, positionx, positiony) {
    this.rank = rank;
    this.suit = suit;
    this.open = open;
    this.positionx = positionx;
    this.positiony = positiony;
    this.suitname = []
    this.suitname[1] = "tiles"
    this.suitname[2] = "heart"
    this.suitname[3] = "clovers"
    this.suitname[4] = "pikes"
    this.rankanme = []
    this.rankanme[1] = "A"
    this.rankanme[2] = "2"
    this.rankanme[3] = "3"
    this.rankanme[4] = "4"
    this.rankanme[5] = "5"
    this.rankanme[6] = "6"
    this.rankanme[7] = "7"
    this.rankanme[8] = "8"
    this.rankanme[9] = "9"
    this.rankanme[10] = "10"
    this.rankanme[11] = "J"
    this.rankanme[12] = "Q"
    this.rankanme[13] = "K"
  }

    getSpriteName() {
        if(!this.open) {
            return "assets/backofcard.png"
        }
        else {
            return "assets/" + this.getSuitName() + "_" + this.getRankName() + ".png";
        }
    }

    getSuitName() {
        return this.suitname[this.suit];
    }

    getRankName() {
        return this.rankanme[this.rank];
    }

}

var talon = []
var table = []
var talonsprites = []
var tablesprites = []
var playedcards = []
var playedcardssprites = []


function initialSetup() {
    playedcards.push(new Card(2, DIAMOND, true, window.innerWidth/2+100, 800))
    talon.push(new Card(8, HEART, false, window.innerWidth/2, 800))
    talon.push(new Card(9, HEART, false, window.innerWidth/2, 800))
    talon.push(new Card(10, HEART, false, window.innerWidth/2, 800))
    table.push(new Card(3, DIAMOND, true, window.innerWidth/2-200, 80))
    table.push(new Card(4, DIAMOND, true, window.innerWidth/2-100, 80))
    table.push(new Card(5, DIAMOND, true, window.innerWidth/2, 80))
}


function preload () {
    initialSetup()
    for (let i = 0; i < talon.length; i++) {
        this.load.image(talon[i].getSpriteName(), talon[i].getSpriteName())
        
    }
    for (i = 0; i < table.length; i++) {
        this.load.image(table[i].getSpriteName(), table[i].getSpriteName())
    }
    for (i = 0; i < playedcards.length; i++) {
        this.load.image(playedcards[i].getSpriteName(), playedcards[i].getSpriteName())
    }


}

    function create () {
        for (let i = 0; i < talon.length; i++) {
            talonsprites.push(this.physics.add.sprite(talon[i].positionx, talon[i].positiony, talon[i].getSpriteName()).setInteractive().setScale(0.3, 0.3))
            
        }
        for (i = 0; i < table.length; i++) {
            tablesprites.push(this.physics.add.sprite(table[i].positionx, table[i].positiony, table[i].getSpriteName()).setInteractive().setScale(0.3, 0.3))
        }
        for (i = 0; i < playedcards.length; i++) {
            playedcardssprites.push(this.physics.add.sprite(playedcards[i].positionx, playedcards[i].positiony, playedcards[i].getSpriteName()).setInteractive().setScale(0.3, 0.3))
        }

        for (i = 0; i < tablesprites.length; i++) {
            tablesprites[i].on('pointerdown', tablespritehandlerfunc.bind(false, i, table))
        }
        for (i = 0; i < talonsprites.length; i++) {
            talonsprites[i].on('pointerdown', talonspritehandlerfunc.bind(false, i, talon))
        }
        for (i = 0; i < playedcardssprites.length; i++) {
            playedcardssprites[i].on('pointerdown', playedspritehandlerfunc.bind(false, i, playedcards))
        }

    }

    const tablespritehandlerfunc = function (j, table) {
        console.log("table: " + j.toString())
        console.log(table[j].getSpriteName())
    }

    const talonspritehandlerfunc = function (j, talon) {
        console.log("talon: " + j.toString())
        console.log(talon[j].getSpriteName())
    }
    
    const playedspritehandlerfunc = function (j, playedcards) {
        console.log("playedcard: " + j.toString())
        console.log(playedcards[j].getSpriteName())
    }

    

/*
    diamond2.on('pointerdown', () => {
        console.log("diamond2 clicked")
        if(diamond3.active) {
            diamond2.setDepth(1);
            diamond3.setDepth(0);
            diamond2.setPosition(diamond3.body.x+37, diamond3.body.y + 70)
        }
    })
    */
// Update function, currently empty
function update () {

}

// Function to resize the game
function resize() {
    game.scale.resize(window.innerWidth, window.innerHeight);
    game.scene.scenes[0].cameras.main.setSize(window.innerWidth, window.innerHeight);

    // Reposition the heartace sprite to be centered in the new dimensions

}

// Add event listener for window resize and orientation change
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
