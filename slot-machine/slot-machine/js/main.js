/**
*Author: Ebin Antoo
*Desc: To Create a slot machine game using html5 canvas and javascript
*Version: 1.0
*/

/// <reference path="jquery.js" />
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var playerValue = 0;
var betValue;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;

var betMoney = 0;
var betValue;
var betOne = 0;

var jackpotMoney;
var winningMoney;

var stage;

var cash = 0;
var number7 = 0;
var bar = 0;
var diamond = 0;
var bell = 0;
var coin = 0;
var card = 0;
var gold = 0;

//img
var cashImg = new Image();
cashImg.src = "images/cash.png";

var number7Img = new Image();
number7Img.src = "images/number7.png";

var barImg = new Image();
barImg.src = "images/bar.png";

var diamondImg = new Image();
diamondImg.src = "images/diamond.png";

var bellImg = new Image();
bellImg.src = "images/bell.png";

var coinImg = new Image();
coinImg.src = "images/coin.png";

var cardImg = new Image();
cardImg.src = "images/playingcard.png";

var goldbarImg = new Image();
goldbarImg.src = "images/goldbar.png";

var bet1 = 0;

//reel Lines
var reelLine1;
var reelLine2;
var reelLine3;

//start up screen reel
var reel = [reelLine1 = new createjs.Bitmap(cashImg), reelLine2 = new createjs.Bitmap(number7Img), reelLine3 = new createjs.Bitmap(barImg)];

//background sound
var bgSound = new Audio("./sounds/Casino Crowd Ambiance.mp3");
var betClick = new Audio("./sounds/coins-drop.mp3");

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    cash = 0;
    number7 = 0;
    bar = 0;
    diamond = 0;
    bell = 0;
    coin = 0;
    card = 0;
    gold = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
    bet1 = 0;
}

/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    console.log("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();

    winningMoney.text = "You Won: $" + winnings; //winnings.toString();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    //win.text = 0;
    console.log("You Lost!");
    resetFruitTally();
    jackpot += parseInt(playerBet);
    stage.update();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "card";
                card++;
                reel[spin].image = cardImg;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "cash";
                cash++;
                reel[spin].image = cashImg;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "goldbar";
                gold++;
                reel[spin].image = goldbarImg;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "bar";
                bar++;
                reel[spin].image = barImg;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "diamond";
                diamond++;
                reel[spin].image = diamondImg;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "bell";
                reel[spin].image = bellImg;
                bell++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "coin";
                coin++;
                reel[spin].image = coinImg;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "number7";
                number7++;
                reel[spin].image = number7Img;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (card == 0) {
        if (cash == 3) {
            winnings = playerBet * 10;
        }
        else if (number7 == 3) {
            winnings = playerBet * 20;
        }
        else if (bar == 3) {
            winnings = playerBet * 30;
        }
        else if (diamond == 3) {
            winnings = playerBet * 40;
        }
        else if (bell == 3) {
            winnings = playerBet * 50;
        }
        else if (coin == 3) {
            winnings = playerBet * 75;
        }
        else if (gold == 3) {
            winnings = playerBet * 100;
        }
        else if (cash == 2) {
            winnings = playerBet * 2;
        }
        else if (number7 == 2) {
            winnings = playerBet * 2;
        }
        else if (bar == 2) {
            winnings = playerBet * 3;
        }
        else if (diamond == 2) {
            winnings = playerBet * 4;
        }
        else if (bell == 2) {
            winnings = playerBet * 5;
        }
        else if (coin == 2) {
            winnings = playerBet * 10;
        }
        else if (gold == 2) {
            winnings = playerBet * 20;
        }
        else if (gold == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}

//Draws Canvas
function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    drawSlotMachine();

    bgSound.loop = true;
    bgSound.play();
    bgSound.volume = .20
}

//stage update
function handleTick() {
    stage.update();
}

//adds images to canvas and positions them
function drawSlotMachine() {
    //base slot machine
    var slotMachine = new createjs.Bitmap("images/slot_machine8.0.jpg");
    slotMachine.x = -95;
    slotMachine.y = -50;

    //reel line
    reel[0].x = 542;
    reel[0].y = 248;

    reel[1].x = 641;
    reel[1].y = 248;

    reel[2].x = 742;
    reel[2].y = 248;

    //reset button
    var reset = new createjs.Bitmap("images/reset2.0.jpg");
    reset.x = 500;
    reset.y = 445;

    //bet one button
    var bet_one = new createjs.Bitmap("images/bet-1.jpg");
    bet_one.x = 587;
    bet_one.y = 445;

    //bet more button
    var bet_more = new createjs.Bitmap("images/bet-more.jpg");
    bet_more.x = 673;
    bet_more.y = 445;

    //spin button
    var spin = new createjs.Bitmap("images/spin.jpg");
    spin.x = 758;
    spin.y = 445;

    //jackpotsign board
    var jackpotSign = new createjs.Bitmap("images/jackpotsign.jpg");
    jackpotSign.x = 638;
    jackpotSign.y = 215;

    jackpotMoney = new createjs.Text(jackpot, "22px Arial", "red");
    jackpotMoney.x = 660;
    jackpotMoney.y = 214;


    //player money sign
    var playerSign = new createjs.Bitmap("images/playersign.jpg");
    playerSign.x = 481;
    playerSign.y = 415;

    var playerValue = new createjs.Text(playerMoney, "22px Arial", "white");
    playerValue.x = 514;
    playerValue.y = 415;
    

    //winningsign board
    var winningSign = new createjs.Bitmap("images/winningsign.jpg");
    winningSign.x = 638;
    winningSign.y = 520;

    winningMoney = new createjs.Text(winnings, "22px Arial", "white");
    winningMoney.x = 645;
    winningMoney.y = 518;
    

    //bet sign board
    var betSign = new createjs.Bitmap("images/betsign.jpg");
    betSign.x = 797;
    betSign.y = 412;

    betValue = new createjs.Text(bet1, "22px Arial", "white");
    betValue.x = 831;
    betValue.y = 412;


    //bet line
    var betLine = new createjs.Bitmap("images/betline.png");
    betLine.x = 539;
    betLine.y = 302;

    //exit
    var exitButton = new createjs.Bitmap("images/powerButton.png");
    exitButton.x = 915;
    exitButton.y = 75;

    stage.addChild(slotMachine, reset, bet_one, bet_more, spin,
                    jackpotSign, jackpotMoney,
                    playerSign, playerValue,
                    winningSign, winningMoney,
                    betSign, betValue,
                    exitButton
                    );
     
    stage.addChild(reel[0], reel[1], reel[2], betLine);

    /*event for the buttons*/
    //reset
    reset.addEventListener("click", resetGame);

    //bet_one
    bet_one.addEventListener("click", betOne1);

    //bet_more
    bet_more.addEventListener("click", betMore);

    //spin
    spin.addEventListener("click", spinGame);

    //exit button
    exitButton.addEventListener("click", exitGame);
}

/* Utility function to show Player Stats */
function showPlayerStats() {
    jackpotMoney.text = jackpot.toString();
    playerValue.text = playerMoney.toString();
    betValue.text = bet1.toString();

    //winningMoney.text = winnings.toString();
    stage.update();
}

//bet one
function betOne1() {
    betClick.play();
    playerBet = 1;
    bet1 +=1;
    console.log(bet1);
    showPlayerStats();
}

//bet more
function betMore() {
    betClick.play();
    playerBet = 10;
    bet1 += 10;
    showPlayerStats();
}

//reset game
function resetGame() {
    var r = confirm("Are you sure, you want to Reset?");
    if (r == true) {
        resetAll();
        showPlayerStats();
    } else {
        alert("You can continue the game");
    }
}

//exit game
function exitGame() {
    if (confirm("Exit The Game?")) {
        alert("Thanks for playing!");
        window.close();
    }
}

//spin button - function
/* When the player clicks the spin button the game kicks off */
function spinGame() {
    if (bet1 == 0 || bet1 <= 0) {
        console.log("ni");
        alert("Please choose a bet");
    }
    else {
        if (playerMoney == 0) {
            if (confirm("You ran out of Money! \nDo you want to play again?")) {
                resetAll();
                showPlayerStats();
            }
        }
        else if (playerBet > playerMoney) {
            alert("You don't have enough Money to place that bet.");
        }
        else if (playerBet < 0) {
            alert("All bets must be a positive $ amount.");
        }
        else if (playerBet <= playerMoney) {
            spinResult = Reels();
            bet1 = bet1 - playerBet;
            determineWinnings();
            turn++;
            showPlayerStats();
        }
        else {
            alert("Please choose a valid bet");
        }
    }
}