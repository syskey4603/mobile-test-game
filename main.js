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
constructor (rank, suit, open, positionx, positiony, id) {
    this.id = id;
    this.rank = rank;
    this.suit = suit;
    this.open = open;
    this.positionx = positionx;
    this.positiony = positiony;
    this.suitname = []
    this.suitname[1] = "tiles"
    this.suitname[2] = "hearts"
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
var playedcards = []

var talonsprites = []
var tablesprites = []
var playedcardssprites = []

var talonids = []
var tableids = []
var playedcardids = []

function initialSetup() {
    playedcards.push(new Card(2, DIAMOND, true, window.innerWidth/2+100, 800, 1))
    talon.push(new Card(8, HEART, false, window.innerWidth/2, 800, 2))
    talon.push(new Card(9, HEART, false, window.innerWidth/2, 800, 3))
    talon.push(new Card(10, HEART, false, window.innerWidth/2, 800, 4))
    table.push(new Card(3, DIAMOND, true, window.innerWidth/2-200, 80, 5))
    table.push(new Card(4, DIAMOND, true, window.innerWidth/2-100, 80, 6))
    table.push(new Card(5, DIAMOND, true, window.innerWidth/2, 80, 7))
    
}


function preload () {
    initialSetup()
    /*
    for (let i = 0; i < talon.length; i++) {
        this.load.image(talon[i].getSpriteName(), talon[i].getSpriteName())
        
    }
    for (i = 0; i < table.length; i++) {
        this.load.image(table[i].getSpriteName(), table[i].getSpriteName())
    }
    for (i = 0; i < playedcards.length; i++) {
        this.load.image(playedcards[i].getSpriteName(), playedcards[i].getSpriteName())
    }
    */

    c = new Card(1, DIAMOND, true, 1, 1);

    for(let j = 0; j < 4; j++) {

        for(i = 0; i < 13; i++) {

            this.load.image("assets/" + c.suitname[j+1] + "_" + c.rankanme[i+1] + ".png", "assets/" + c.suitname[j+1] + "_" + c.rankanme[i+1] + ".png")
        }


    }

    this.load.image("assets/backofcard.png", "assets/backofcard.png")
}

    function create () {
        for (let i = 0; i < talon.length; i++) {
            talonsprites.push(this.physics.add.sprite(talon[i].positionx, talon[i].positiony, talon[i].getSpriteName()).setInteractive().setScale(0.3, 0.3))
            talonids.push(talon[i].id)
            
        }
        for (i = 0; i < table.length; i++) {
            tablesprites.push(this.physics.add.sprite(table[i].positionx, table[i].positiony, table[i].getSpriteName()).setInteractive().setScale(0.3, 0.3))
            tableids.push(table[i].id)
        }
        for (i = 0; i < playedcards.length; i++) {
            playedcardssprites.push(this.physics.add.sprite(playedcards[i].positionx, playedcards[i].positiony, playedcards[i].getSpriteName()).setInteractive().setScale(0.3, 0.3))
            playedcardids.push(playedcards[i].id)
        }

        for (i = 0; i < tablesprites.length; i++) {
            tablesprites[i].on('pointerdown', cardhandlerfunc.bind(false, i, talon, playedcards, playedcardssprites, talonsprites, table, tablesprites, tableids, talonids, playedcardids))
        }
        for (i = 0; i < talonsprites.length; i++) {
            talonsprites[i].on('pointerdown', cardhandlerfunc.bind(false, i, talon, playedcards, playedcardssprites, talonsprites, table, tablesprites, tableids, talonids, playedcardids))
        }
        for (i = 0; i < playedcardssprites.length; i++) {
            playedcardssprites[i].on('pointerdown', cardhandlerfunc.bind(false, i, talon, playedcards, playedcardssprites, talonsprites, table, tablesprites, tableids, talonids, playedcardids))
        }

    }

    /*
    const tablespritehandlerfunc = function (j, table) {
        console.log("table: " + j.toString())
        console.log(table[j].getSpriteName())

    }
*/
    const cardhandlerfunc = function (j, talon, playedcards, playedcardssprites, talonsprites, table, tablesprites, tableids, talonids, playedcardids) {
        for(let m = 0; m < playedcardids.length; m++) {
            if(playedcards[m].id == playedcardids[m]) {
                console.log("playedcards clicked")

            }
        }
        for(m = 0; m < talonids.length; m++) {
            if(talon[m].id == talonids[m]) {
                console.log("talon clicked")
                console.log("talon: " + j.toString())
                console.log(talon[j].getSpriteName())
                playedcards.push(talon[j])
                playedcards[playedcards.length-1].open = true;
                playedcards[playedcards.length-1].positionx = playedcards[playedcards.length-2].positionx
                playedcards[playedcards.length-1].positiony = playedcards[playedcards.length-2].positiony
                talon.pop(talon[j])
                playedcardssprites.push(talonsprites[talonsprites.length-1])
                playedcardssprites[playedcardssprites.length-2].disableBody(true, true);
                console.log(playedcards[playedcards.length-1].getSpriteName())
                playedcardssprites[playedcardssprites.length-1].setTexture(playedcards[playedcards.length-1].getSpriteName()).setScale(0.3, 0.3)
                playedcardssprites[playedcardssprites.length-1].setPosition(playedcards[playedcards.length-1].positionx, playedcards[playedcards.length-1].positiony)
                talonsprites.pop(talonsprites[talonsprites.length-1])

            }
        }
        for(m = 0; m < tableids.length; m++) {
            if(table[m].id == tableids[m]) {
                console.log("table clicked")

            }
        }


    }
    /*
    const playedspritehandlerfunc = function (j, playedcards) {
        console.log("playedcard: " + j.toString())
        console.log(playedcards[j].getSpriteName())
    }
*/
    


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

//all cards should have unique id one function for all that checks which card it is based on the id
// run the switch basis the card 