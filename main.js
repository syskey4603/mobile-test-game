const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1080
const MIN_SIZE_WIDTH_SCREEN = 270
const MIN_SIZE_HEIGHT_SCREEN = 480
const SIZE_WIDTH_SCREEN = 932
const SIZE_HEIGHT_SCREEN = 430
var globalData;
var gameLostText;
var i;
var j;
var m;
var n;
var valarray;

async function fetchData() {
    try {
        const response = await fetch('test.json');
        const json = await response.json();
        globalData = json;
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}


function splitPosVals(vals) {
    vals = vals.replace(/[\(\)]+/g, '');
    valarray = vals.split(',').map(val => Number(val.trim()));
    return valarray

}

await fetchData()

var config = {
    type: Phaser.AUTO,

    physics: {
        default: 'arcade',
        arcade: {}
    },
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game',
        width: SIZE_WIDTH_SCREEN,
        height: SIZE_HEIGHT_SCREEN,
        min: {
            width: MIN_SIZE_WIDTH_SCREEN,
            height: MIN_SIZE_HEIGHT_SCREEN
        },
        max: {
            width: MAX_SIZE_WIDTH_SCREEN,
            height: MAX_SIZE_HEIGHT_SCREEN
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



var game = new Phaser.Game(config);
game.screenBaseSize = {
    maxWidth: MAX_SIZE_WIDTH_SCREEN,
    maxHeight: MAX_SIZE_HEIGHT_SCREEN,
    minWidth: MIN_SIZE_WIDTH_SCREEN,
    minHeight: MIN_SIZE_HEIGHT_SCREEN,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN
}

const DIAMOND = 1
const HEART = 2
const CLUB = 3
const SPADE = 4

var suitname = []
suitname[1] = "tiles"
suitname[2] = "hearts"
suitname[3] = "clovers"
suitname[4] = "pikes"
var rankanme = []
rankanme[1] = "A"
rankanme[2] = "2"
rankanme[3] = "3"   
rankanme[4] = "4"
rankanme[5] = "5"
rankanme[6] = "6"
rankanme[7] = "7"
rankanme[8] = "8"
rankanme[9] = "9"
rankanme[10] = "10"
rankanme[11] = "J"
rankanme[12] = "Q"
rankanme[13] = "K"
//create level class and load the json
class Card {
constructor (rank, suit, positionx, positiony, id, cardRotation) {
    this.dependsOn = [];
    this.id = id;
    this.cardRotation = cardRotation;
    this.rank = rank;
    this.suit = suit;
    this.open = true;
    this.positionx = positionx;
    this.positiony = positiony;

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
        return suitname[this.suit];
    }

    getRankName() {
        return rankanme[this.rank];
    }

    isNextCard(checkRank) {
        if(this.rank-1 == checkRank || this.rank+1 == checkRank || (this.rank == 13 && checkRank == 1) || (this.rank == 1 && checkRank == 13)) {
            return true;
        }
        return false;

    }

    getDepth() {
        if(!this.dependsOn || this.dependsOn.length == 0) {
            return 100;
        }
        else {
            var lowestDepth = 100
            var currentDepth = 0;
            for (i = 0; i < this.dependsOn.length; i++) {
                currentDepth = table[this.dependsOn[i]].getDepth()
                if(currentDepth < lowestDepth) {
                    lowestDepth = lowestDepth
            
                }
            }
            return lowestDepth
        }

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

var c;

var gameWonText

function initialSetup() {
    for (let i = 0; i < globalData["playedcards"]["NumberOfPlayedCards"]; i++) {
        let position = splitPosVals(globalData["playedcards"]["CardPosition"][i]);
        let randomPlayedCard = randomValues(position[0], position[1])
        var CurrentPlayedCard = new Card(
            randomPlayedCard[0],
            randomPlayedCard[1],
            randomPlayedCard[2],
            randomPlayedCard[3],
            randomPlayedCard[4]
        )        
        playedcards.push(CurrentPlayedCard)
    }
    
    loadTalon()
    loadTable()



    
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function randomValues(positionx, positiony) {
    //let openArray = [true, false]
    //var randomOpen;
    let ValueArray = []
    ValueArray.push(randInt(1, 13))
    ValueArray.push(randInt(1, 4))
    //randomOpen = Math.floor(Math.random() * openArray.length);
    //ValueArray.push(openArray[randomOpen])
    ValueArray.push(positionx)
    ValueArray.push(positiony)
    ValueArray.push(randInt(525, 1624))
    return ValueArray;
}


function loadTalon() {
    var xpos = 290;
    var randomVals;
    for (let i = 0; i < globalData["table"]["data"]["NumberOfDeckCards"]; i++) {

        randomVals = randomValues(xpos,300)
        
        var currentCard = new Card(randomVals[0], randomVals[1], randomVals[2], randomVals[3], randomVals[4])
    
        //let position = splitPosVals(globalData["talon"]["CardPosition"][i]);
        //var currentCard = new Card(globalData["talon"]["Rank"][i], globalData["talon"]["Suit"][i], position[0], position[1], globalData["talon"]["Index"][i])
        
        xpos+= 10
        currentCard.open = false;
        talon.push(currentCard)

    }

}

function loadTable() {
    for (let i = 0; i < globalData["table"]["data"]["NumOfTableCards"]; i++) {
        var randVals = randomValues(splitPosVals(globalData["table"]["data"]["CardPosition"][i])[0], splitPosVals(globalData["table"]["data"]["CardPosition"][i])[1])
        if(globalData["table"]["data"]["MapSequence"][i] < 0) {
            table.push(new Card(randVals[0], randVals[1], splitPosVals(globalData["table"]["data"]["CardPosition"][i])[0], splitPosVals(globalData["table"]["data"]["CardPosition"][i])[1], i))
        }
        else {
            table.push(new Card(globalData["table"]["data"]["MapSequence"][i]+1, globalData["table"]["data"]["Suit"][i], splitPosVals(globalData["table"]["data"]["CardPosition"][i])[0], splitPosVals(globalData["table"]["data"]["CardPosition"][i])[1], i))
        }
        
       

    }

    for (i = 0; i < globalData["table"]["data"]["DependedOn"].length; i++) {
        table[globalData['table']['data']["DependedOn"][i]["index"]].dependsOn = globalData['table']['data']["DependedOn"][i]["depends"];
        table[globalData['table']['data']["DependedOn"][i]["index"]].open = false;

    }
    // add random and all based on mapsequence for table

}


function preload () {
    initialSetup()

    for(let j = 0; j < 4; j++) {

        for(let i = 0; i < 13; i++) {

            this.load.image("assets/" + suitname[j+1] + "_" + rankanme[i+1] + ".png", "assets/" + suitname[j+1] + "_" + rankanme[i+1] + ".png")
        }


    }

    this.load.image("assets/backofcard.png", "assets/backofcard.png")
    this.load.image("background", "Level Assets/BonusLevel_BG/BG.png")

}

    function create () {
        this.add.image(400, 300, 'background').setScale(0.5, 0.5);
        let textStyle = { font: '96px Arial', fill: '#FFFFFF' };
        gameWonText = this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'You Win!', textStyle);
        gameWonText.visible = false;
        gameLostText = this.add.text(window.innerWidth/2, window.innerHeight/2, 'You Lose!', textStyle);
        gameLostText.visible = false;
        for (let i = 0; i < talon.length; i++) {
            talonsprites.push(this.physics.add.sprite(talon[i].positionx, talon[i].positiony, talon[i].getSpriteName()).setInteractive().setScale(0.3, 0.3))
            talonids.push(talon[i].id)
            
        }
        for (let i = table.length-1; i > -1; i--) {
           
            tablesprites.push(this.physics.add.sprite(table[i].positionx, table[i].positiony, table[i].getSpriteName()).setInteractive().setScale(0.3, 0.3).setAngle(globalData['table']['data']['CardRotation'][i]))


                
            
            tableids.push(table[i].id)

        }
        tablesprites = tablesprites.reverse();
        for (let i = 0; i < playedcards.length; i++) {
            playedcardssprites.push(this.physics.add.sprite(playedcards[i].positionx, playedcards[i].positiony, playedcards[i].getSpriteName()).setInteractive().setScale(0.3, 0.3))
            playedcardids.push(playedcards[i].id)
        }

        for (i = 0; i < tablesprites.length; i++) {
            tablesprites[i].on('pointerdown', cardhandlerfunc.bind(false, talon, playedcards, playedcardssprites, talonsprites, table, tablesprites, tableids, talonids, playedcardids, table[i].id))
           
            

            tablesprites[i].setDepth(table[i].getDepth())
        }
        for (i = 0; i < talonsprites.length; i++) {
            talonsprites[i].on('pointerdown', cardhandlerfunc.bind(false, talon, playedcards, playedcardssprites, talonsprites, table, tablesprites, tableids, talonids, playedcardids, talon[i].id))
        }
        for (i = 0; i < playedcardssprites.length; i++) {
            playedcardssprites[i].on('pointerdown', cardhandlerfunc.bind(false, talon, playedcards, playedcardssprites, talonsprites, table, tablesprites, tableids, talonids, playedcardids, playedcards[i].id))
        }

    }
    
    const cardhandlerfunc = function (talon, playedcards, playedcardssprites, talonsprites, table, tablesprites, tableids, talonids, playedcardids, cardid) {
        var playedCardIndex = getcardindex(playedcards, cardid)
        if(playedCardIndex != -1) {
            console.log("playedcards clicked")
        }

        var talonCardIndex = getcardindex(talon, cardid)
        if(talonCardIndex != -1) {
            var talonlengthtemp = talon.length-1
            console.log("cardindex: " + talonCardIndex)
            console.log("talon length: " + talonlengthtemp.toString())
        }

        if(0 < talon.length && talonCardIndex == talon.length-1) {
            playedcards.push(talon[talonCardIndex])
            playedcards[playedcards.length-1].open = true;
            playedcards[playedcards.length-1].positionx = playedcards[playedcards.length-2].positionx
            playedcards[playedcards.length-1].positiony = playedcards[playedcards.length-2].positiony
            talon.pop()
            playedcardssprites.push(talonsprites[talonsprites.length-1])
            playedcardssprites[playedcardssprites.length-2].disableBody(true, true);
            playedcardssprites[playedcardssprites.length-1].setTexture(playedcards[playedcards.length-1].getSpriteName()).setScale(0.3, 0.3)
            playedcardssprites[playedcardssprites.length-1].setPosition(playedcards[playedcards.length-1].positionx, playedcards[playedcards.length-1].positiony)
            talonsprites.pop()

        }

        var tableCardIndex = getcardindex(table, cardid)
        if(tableCardIndex != -1) {
            if(!table[tableCardIndex].open) {
                return
            }

           
            if(table[tableCardIndex].isNextCard(playedcards[playedcards.length-1].rank)) {
                tablesprites[tableCardIndex].setAngle(0);
                playedcards.push(table[tableCardIndex])
                playedcards[playedcards.length-1].positionx = playedcards[playedcards.length-2].positionx
                playedcards[playedcards.length-1].positiony = playedcards[playedcards.length-2].positiony                
                table.splice(tableCardIndex, 1)
                playedcardssprites.push(tablesprites[tableCardIndex])
                playedcardssprites[playedcardssprites.length-2].disableBody(true, true);
                playedcardssprites[playedcardssprites.length-1].setPosition(playedcards[playedcards.length-1].positionx, playedcards[playedcards.length-1].positiony)
                tablesprites.splice(tableCardIndex, 1)

            }
            

            if(table.length > 0 && !table[tableCardIndex].open) {
                console.log("openning next card:" + tableCardIndex)
                table[tableCardIndex].open = true;
                tablesprites[tableCardIndex].setTexture(table[tableCardIndex].getSpriteName()).setScale(0.3, 0.3);
                tablesprites[tableCardIndex].setDepth(5555)

            }
            else {
                console.log("no match")
        }
        }

        //checkGameOver()


    }


    function getcardindex(list, id) {
        for(let i = 0; i < list.length; i++) {
            if(list[i].id == id) {
                return i;
            }

        }
        return -1
    }

/*
function checkGameOver() {
    if(table.length == 0) {
        console.log("game won")
        gameWonText.visible = true;
        for(let i = 0; i < talonsprites.length; i++) {
            talonsprites[i].disableBody(true, true)

        }
        for(i = 0; i < playedcardssprites.length; i++) {
            playedcardssprites[i].disableBody(true, true)
        }
        game.scene.pause()
    }
    if(talon.length == 0) {
        for(let i = 0; i < table.length; i++) {
            if(!table[i].isNextCard(playedcards[playedcards.length-1].rank)) {
                console.log("game lost")
                gameLostText.visible = true;
                for(let m = 0; m < playedcardssprites.length; m++) {
                    playedcardssprites[m].disableBody(true, true)
                }
                for(m = 0; m < tablesprites.length; m++) {
                    tablesprites[m].disableBody(true, true)
                }




        }
    }

}
}
*/
function update () {

}

/*
function resize() {
    game.scale.resize(window.innerWidth, window.innerHeight);
    game.scene.scenes[0].cameras.main.setSize(window.innerWidth, window.innerHeight);


}

window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
*/  