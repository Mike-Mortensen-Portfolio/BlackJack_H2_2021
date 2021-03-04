//#region Class declarations
//// Defines a card from a cardgame //////////////////////////
//////////////////////////////////////////////////////////////
//////// _id: The ID that identifies the card ////////////////
//////// _points: The value of a card         ////////////////
//////// _name: The name of the card          ////////////////
//////// _imageUrl: The releative path to the ////////////////
////////           image for the card        /////////////////
//////////////////////////////////////////////////////////////
class Card {
    constructor(_id, _points, _name, _imageUrl) {
        this.ID = _id;
        this.Points = _points;
        this.Name = _name;
        this.ImageUrl = _imageUrl;

        //// Returns a formated string representation ////////////////
        //// of this card                             ////////////////
        //////////////////////////////////////////////////////////////
        this.ToString = function () {
            return "ID: " + this.ID + ", Points: " + this.Points + ", Image URL: " + this.ImageUrl;
        };
    }
}

//// Represents an HTML <img> element ////////////////////////
//////////////////////////////////////////////////////////////
class CardHolder {
    constructor() {
        var ref = document.getElementById("cardPlaceholder");

        //// Set the src attribute of the <img> element //////////////
        //////////////////////////////////////////////////////////////
        //////// _imageUrl: The relative path to the /////////////////
        ////////           image for the reference  //////////////////
        //////////////////////////////////////////////////////////////
        this.SetSource = function (_imageUrl) {
            ref.src = _imageUrl;
        };
    }
}

//// Represents a Deck of cards //////////////////////////////
//////////////////////////////////////////////////////////////
class Deck {
    constructor() {
        var courtCards = ["Jack", "Queen", "King", "Joker"];
        var suitCards = ["Club", "Diamond", "Heart", "Spade"];
        var cards = [];
        var discardStack = [];
        this.CourtCardPoints = 10;
        this.AcePoints = 1;
        this.AllowCourtCards = true;
        this.AmountOfJokersAllowed = 0;

        //// Returns the court card value at the specifed index //////
        //////////////////////////////////////////////////////////////
        //////// _index: The zero-based index ////////////////////////
        ////////        in the collection    /////////////////////////
        //////////////////////////////////////////////////////////////
        this.GetCourtCardValue = function (_index) { return courtCards[_index]; };

        //// Returns the suit card value at the specifed index ///////
        //////////////////////////////////////////////////////////////
        //////// _index: The zero-based index ////////////////////////
        ////////        in the collection    /////////////////////////
        //////////////////////////////////////////////////////////////
        this.GetSuitCardValue = function (_index) { return suitCards[_index]; };

        //// Returns all cards in the deck ///////////////////////////
        //////////////////////////////////////////////////////////////
        this.GetCards = function () { return cards; };

        //// Returns a collection of the cards that have been ////////
        //// been drawen and is now discarded                 ////////
        //////////////////////////////////////////////////////////////
        //////// index: The zero-based index /////////////////////////
        ////////        in the collection    /////////////////////////
        //////////////////////////////////////////////////////////////
        this.GetDiscardStack = function () { return discardStack; };

        //// Builds the deck of cards ///////////////////////////
        //////////////////////////////////////////////////////////////
        this.BuilDeck = function () {
            let cardCount = 0;
            let jokerCount = 0;
            discardStack = [];

            //  Generating Court and Joker Cards
            if (this.AllowCourtCards) {
                for (let i = 0; i < courtCards.length; i++) {
                    for (let j = 0; j < suitCards.length; j++) {
                        if (jokerCount >= this.AmountOfJokersAllowed && courtCards[i] == "Joker") {
                            break;
                        }

                        cards[cardCount] = new Card(cardCount, this.CourtCardPoints, courtCards[i] + " of " + suitCards[j] + "s", "./Images/Cards/" + suitCards[j] + "s/" + courtCards[i] + "_" + suitCards[j] + ".png");

                        if (jokerCount < this.AmountOfJokersAllowed && courtCards[i] == "Joker") {
                            jokerCount++;
                        }

                        //console.log("Generated Court Card: " + cards[cardCount].ToString());
                        cardCount++;
                    }
                }
            }

            //  Generating Aces Normal Cards
            let normCardsPoints = 2;
            let nomrCardCount = 2;
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < suitCards.length; j++) {
                    if (i < 9) {
                        cards[cardCount] = new Card(cardCount, normCardsPoints, nomrCardCount + " of " + suitCards[j] + "s", "./Images/Cards/" + suitCards[j] + "s/" + nomrCardCount + "_" + suitCards[j] + ".png");
                    }
                    else {
                        cards[cardCount] = new Card(cardCount, 1, "Ace of " + suitCards[j] + "s", "./Images/Cards/" + suitCards[j] + "s/Ace" + "_" + suitCards[j] + ".png");
                    }

                    //console.log("Generated Card: " + cards[cardCount + i].ToString());
                    cardCount++;
                }

                nomrCardCount++;
                normCardsPoints++;
            }
        };

        //// Returns the top most card in the deck ///////////////////
        //// and adds it to the discard stack      ///////////////////
        //////////////////////////////////////////////////////////////
        this.DrawCard = function () {
            let card = cards.shift();
            discardStack.push(card);
            return card;
        };

        //// Shuffles the deck of cards ///////////////////////////
        //////////////////////////////////////////////////////////////
        this.Shuffle = function () {
            for (let i = cards.length - 1; i > 0; i--) {
                var seed = Math.floor(Math.random() * (i + 1));
                var card = cards[i];
                cards[i] = cards[seed];
                cards[seed] = card;
            }
        };
    }
}

//// Represents a human //////////////////////////////////////
//////////////////////////////////////////////////////////////
//////// _id: The ID that identifies the person ////////////// 
//////// _name: The name of the person          //////////////
//////////////////////////////////////////////////////////////
class Person {
    constructor (_id, _name){
        this.ID = _id;
        this.Name = _name;
    }
}

//// Represents a player that can participate in /////////////
//// the game                                    /////////////
//////////////////////////////////////////////////////////////
//////// _id: The ID that identifies the player //////////////
//////// _name: The name of the player          //////////////
//////////////////////////////////////////////////////////////
class Player extends Person{
    constructor (_id, _name){
        super (_id, _name);
        this.Points = 0;

        //// Returns the players points as a string //////////////////
        //// that is formated to consist of at      //////////////////
        //// least two digits (Ex: 00)             //////////////////
        //////////////////////////////////////////////////////////////
        this.GetPointsAsDoubleDigitString = function (){
            return this.Points.toLocaleString ("en-US", { minimumIntegerDigits: 2, useGrouping: false});
        }
    }
}
//#endregion

//#region Game Logic
//#region Data Fields
////////////////////// Game UI ///////////////////////////////
//////////////////////////////////////////////////////////////
let drawButton = document.getElementById ("btn_draw");              //  The button to press when drawing a card
let stopButton = document.getElementById("btn_stop");               //  The button to press when stopping players turn
let txtArea = document.getElementById ("txt_gameInfo");             //  The text area that contains the games progress
let aceValue = document.getElementById ("btn_switchValue");         //  The button to press to switch the value between 1 and 11 for Aces
let dealerPoints = document.getElementById ("dealerPoints");        //  The dealers scoreboard
let playerPoints = document.getElementById ("playerPoints");        //  The players scoreboard
//#region Checking UI Elements
let abortExecution = false;
try{
    if (drawButton == undefined){
        throw "drawButton not found!";
    }
    if (stopButton == undefined){
        throw "stopButton not found!";
    }
    if (txtArea == undefined){
        throw "txtArea not found!";
    }
    if (aceValue == undefined){
        throw "aceValue not found!";
    }
    if (dealerPoints == undefined){
        throw "dealerPoints not found!";
    }
    if (playerPoints == undefined){
        throw "playerPoints not found!";
    }
}
catch (err){
    console.error("ERROR: " + err + "\nGame stopped!");
    abortExecution = true;
}
//#endregion

////////////////////// Game Data /////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
var ph = new CardHolder();                                          //  The HTML card placeholder
var deck = new Deck();                                              //  The deck of cards
var dealer = new Player (0, "Dealer");
var player = new Player (1, localStorage.getItem("PlayerName"));
let currentCard;                                                    //  The Currently displayed card
let accepted = false;                                               //  Whether or not the player accepted the value of an Ace
let playersTurn = true;                                             //  Whether or not the current turn is the players or the dealers
var botDraw = {                                                     //  Whether or not the bot is allowed to draw a new card
    allowed: true
};
//#endregion

//#region Initial Setup
if (abortExecution == false){
    txtArea.innerHTML = "Welcome to Oiski's Blackjack Table!\n";
    dealerPoints.innerHTML = dealer.Name + " Points: " + dealer.GetPointsAsDoubleDigitString();
    playerPoints.innerHTML = player.Name + " Points: " + player.GetPointsAsDoubleDigitString();
    deck.BuilDeck();
    deck.Shuffle();
}
//#endregion

//#region Bot Logic
//// Start the Botplayer (Dealer) ////////////////////////////
//////////////////////////////////////////////////////////////
async function StartBot (){
    console.log ("<----Bot Initiated---->");
    console.log ("      Allowed Draw: " + botDraw.allowed);
    do{
        //#region Debug
        console.log ("<----Bot Continued---->");
        console.log ("      Allowed Draw: " + botDraw.allowed);
        console.log ("      Points: " + dealer.Points);
        //#endregion
        
        if (botDraw.allowed == true){
            botDraw.allowed = false;
            DrawCard ();
            console.log ("<----Bot Decision---->");
            console.log ("      Allowed Draw: " + botDraw.allowed);

            if (BotStopDecision(dealer.Points, 79) == false)
            {
                txtArea.scrollTop = txtArea.scrollHeight;
                if (dealer.Points >= player.Points && dealer.Points < 21){
                    EndTurn(player.Name + " lost!\n");
                }
                else if (dealer.Points < 21){
                    EndTurn(player.Name + " won!\n");
                }
                
                break;
            }

            let waitTime = Math.random () * (1500 - 1000) + 1000;
            console.log ("      Wait Time: " + waitTime);
            await new Promise (resolve => setTimeout (resolve, waitTime));

            botDraw.allowed = true;
        }

    } while (dealer.Points < 21);

    
    playersTurn = true;
    botDraw.allowed = true;

    //#region Debug
    console.log ("<----Bot Sequence Over---->");
    console.log ("      Players Turn: " + playersTurn);
    console.log ("      Allowed Draw: " + botDraw.allowed);
    //#endregion
}

//// Lets the bot decide what to do with an Ace //////////////
//////////////////////////////////////////////////////////////
function BotAceValueDecision (){

    console.log ("<----Bot Ace Evalutation---->");

    if (currentCard.Name.includes("Ace") == true){

        if (aceValue.innerHTML == "Ace Value: 01"){
            currentCard.Points = 1;
        }
        else{
            currentCard.Points = 11;
        }
        console.log ("      Card Point: " + currentCard.Points);

        if (aceValue.innerHTML == "Ace Value: 11" && (dealer.Points + 11) > 21){    //  If the current ace value is 11 and would make the bot lose, switch
            SwitchValue();
            console.log ("      Switched to 11 to: " + currentCard.Points);
        }
        else if (aceValue.innerHTML == "Ace Value: 01" && (dealer.Points + 11) <= 21){  //  If the current ace value is 1 and 11 would not make the bot lose, switch
            SwitchValue();
            console.log ("      Switched from 1 to: " + currentCard.Points);
        }
        else{   //  If the current ace value is 11 and 11 wouldnt make the bot lose, stay on 11. Or if the current ace value is 1 and 11 would make the bot lose, stay on 1.
            txtArea.scrollTop = txtArea.scrollHeight;
            txtArea.innerHTML += "Ace Counts as: " + aceValue.innerHTML.replace("Ace Value: ", "") + "\n";
            console.log ("      Stayed on: " + currentCard.Points);
        }

        OnAccept();
    }
    else{
        console.log ("      No Ace to Evaluate");
    }
}

//// Lets the bot decide when to stop drawing cards //////////
//////////////////////////////////////////////////////////////
//////// _points: The points to compare against //////////////
////////          the _threshold                //////////////
//////////////////////////////////////////////////////////////
function BotStopDecision (_points, _threshold){
    let proc = ((_points / 21) * 100);

    //#region Debug
    console.log ("<----BotStopDecision()---->");
    console.log ("      Procentage: " + _points + " / 21 * 100 = " + proc);
    console.log ("      Threshold Met: " + !(proc <= _threshold));
    //#endregion

    if (proc <= _threshold ){

        return true;
    }
    
    return false;
}
//#endregion

////////// Draws a new card and resets the game //////////////
////////// when there's no cards left as well   //////////////
////////// as accepting the value of an Ace     //////////////
//////////////////////////////////////////////////////////////
function DrawCard ()
{
    if (abortExecution == false){
        if (drawButton.innerHTML != "Try Again"){
            if (drawButton.innerHTML != "Accept"){
                currentCard = deck.DrawCard();

                //#region  Debug
                console.log ("<----OnDraw()---->");
                console.log ("      Current Card: " + currentCard.ToString());
                console.log ("      Accepted: " + accepted);
                console.log ("      Players Turn: " + playersTurn);
                console.log ("      Button Text: " + drawButton.innerHTML);
                //#endregion

                ph.SetSource (currentCard.ImageUrl);
                
                if (playersTurn == true){
                    AddInfoToGameBoard(player)
                    SetAceButton();
                }
                else{
                    AddInfoToGameBoard (dealer);
                    BotAceValueDecision ();
                }
            }
            else{
                OnAccept();
            }

            //#region Debug
            console.log ("<----About to Count Points---->");
            console.log ("      Current Card: " + currentCard.ToString());
            console.log ("      Accepted: " + accepted);
            console.log ("      Players Turn: " + playersTurn);
            console.log ("      Button Text: " + drawButton.innerHTML);
            //#endregion

            console.log ("<----Counted Points---->")
            if (currentCard.Name.includes("Ace") == false || accepted == true){
                if (playersTurn == true){
                    console.log ("      Points Before: " + player.Points);
                    CountPoints(player);
                    console.log ("      Points After: " + player.Points);
                    DisplayScore(playerPoints, player);
                }
                else{
                    console.log ("      Points Before: " + dealer.Points);
                    CountPoints (dealer);
                    console.log ("      Points After: " + dealer.Points);
                    DisplayScore(dealerPoints, dealer);
                }
                
                console.log ("      Players Turn: " + playersTurn);
                console.log ("      Card: " + currentCard.ToString());
            }
            
            if (playersTurn == true)
            {
                TryEndTurnSuccess (player.Points, "");
            }
            
        }
        else{
            console.clear();
            ResetGame();
        }

        if (playersTurn == true)
        {
            TryEndTurnFailed (player.Points, player.Name + " lost!");
        }
        else{
            if (TryEndTurnFailed (dealer.Points,  player.Name + " won!") == false){
                TryEndTurnSuccess (dealer.Points, player.Name + " Lost!");
            }
        }
    }
}

//// Enable or disable the Ace Value Button///////////////////
//////////////////////////////////////////////////////////////
function SetAceButton (){
    if (currentCard.Name.includes("Ace")){
        txtArea.scrollTop = txtArea.scrollHeight;
        txtArea.innerHTML += "Ace Counts as: " + aceValue.innerHTML.replace("Ace Value: ", "") + "\n";

        if (aceValue.innerHTML == "Ace Value: 01"){
            currentCard.Points = 1;
        }
        else{
            currentCard.Points = 11;
        }

        aceValue.disabled = false;
        drawButton.innerHTML = "Accept";
    }
    else{
        aceValue.disabled = true;
    }

    //#region Debug
    console.log ("<----SetAceButton---->");
    console.log ("      Current Card: " + currentCard.ToString());
    console.log ("      Ace Value: " + aceValue.innerHTML.replace("Ace Value: ", ""));
    console.log ("      Ace Butten Enabled: " + !aceValue.disabled);
    //#endregion
}

//// Add the games progress to the gameboard /////////////////
//////////////////////////////////////////////////////////////
//////// _player: The current playing player /////////////////
//////////////////////////////////////////////////////////////
function AddInfoToGameBoard (_player){
    txtArea.scrollTop = txtArea.scrollHeight;
    txtArea.innerHTML +=  _player.Name + " drew: " + currentCard.Name + "\n";
}

//// Display the score of _player on the UI //////////////////
//////////////////////////////////////////////////////////////
//////// _scoreboard: The UI element that     ////////////////
////////              will hold the score     ////////////////
////------------------------------------------------------////
//////// _player: The player that hold the    ////////////////
////////          points to display           ////////////////
//////////////////////////////////////////////////////////////
function DisplayScore (_scoreboard, _player)
{
    _scoreboard.innerHTML = _player.Name + " Points: " + _player.GetPointsAsDoubleDigitString();
}

//// Count the points for the current card into //////////////
///  _players points                            //////////////
//////////////////////////////////////////////////////////////
//////// _player: the player to add points for ///////////////
//////////////////////////////////////////////////////////////
function CountPoints (_player){
    _player.Points += currentCard.Points;
    accepted == false;
}

//// When the user accepts the value of an Ace ///////////////
//////////////////////////////////////////////////////////////
function OnAccept ()
{
    accepted = true;
    drawButton.innerHTML = "Draw Card";
    aceValue.disabled = true;

    console.log ("<----OnAccept---->")
    console.log("      Accepted: " + accepted);
}

//// End the current turn ////////////////////////////////////
//////////////////////////////////////////////////////////////
//////// _message: The message to display    /////////////////
////////              on the gameboard       /////////////////
//////////////////////////////////////////////////////////////
function EndTurn (_message){
    drawButton.innerHTML = "Try Again";
    txtArea.scrollTop = txtArea.scrollHeight;
    txtArea.innerHTML += _message + "\n";
    stopButton.disabled = true;
    drawButton.disabled = false;
}

//// Ends the game ///////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////// _points: the points to check against ////////////////
////------------------------------------------------------////
//////// _gameOverMessage: The message to     ////////////////
///////                    display when the   ////////////////
///////                    game ends          ////////////////
//////////////////////////////////////////////////////////////
function TryEndTurnFailed (_points, _message)
{
    //#region Debug
    console.log ("<----TryEndTurnFailed()---->");
    console.log ("      Deck Size: " + deck.GetCards().length);
    console.log ("      Points: " + _points);
    console.log ("      Message: " + _message);
    //#endregion

    if (deck.GetCards().length == 0 || _points > 21)
    {
        EndTurn (_message);
        return true;
    }

    return false;
}

//// Ends the game ///////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////// _points: the points to check against ////////////////
////------------------------------------------------------////
//////// _gameOverMessage: The message to     ////////////////
///////                    display when the   ////////////////
///////                    game ends          ////////////////
//////////////////////////////////////////////////////////////
function TryEndTurnSuccess (_points, _message){
    //#region Debug
    console.log ("<----TryEndTurnSuccess---->");
    console.log ("      Players turns: " + playersTurn);
    console.log ("      Points: " + _points);
    console.log ("      Message: " + _message);
    //#endregion

    if (_points == 21 && playersTurn == false)
    {
        EndTurn (_message);
        return true;
    }
    else if (_points == 21){
        StopTurn();
        return true;
    }

    return false;
}

////////// Resets the game to its initial setup //////////////
//////////////////////////////////////////////////////////////
function ResetGame ()
{
    console.log("<----Game was reset---->");
    txtArea.scrollTop = txtArea.scrollHeight;
    txtArea.innerHTML = "";
    stopButton.disabled = false;
    player.Points = 0;
    dealer.Points = 0;
    DisplayScore(playerPoints, player);
    DisplayScore(dealerPoints, dealer);
    playersTurn = true;

    //#region Debug
    console.log ("      " + player.Name + " points: " + player.Points);
    console.log ("      " + dealer.Name + " points: " + dealer.Points);
    console.log ("      Player scoreboard: " + playerPoints.innerHTML);
    console.log ("      Dealer scoreboard: " + dealerPoints.innerHTML);
    console.log ("      Players turn: " + playersTurn);
    //#endregion

    ph.SetSource ("./Images/GameBoard.jpg");
    deck.BuilDeck();
    deck.Shuffle();

    drawButton.innerHTML = "Draw Card";
}

////////// Switches the value of the displayed Ace ///////////
//////////////////////////////////////////////////////////////
function SwitchValue (){
    if (aceValue.innerHTML == "Ace Value: 01"){
        aceValue.innerHTML = "Ace Value: 11";
        currentCard.Points = 11;
    }
    else{
        aceValue.innerHTML = "Ace Value: 01";
        currentCard.Points = 1;
    }

    console.log ("<----SwitchValue()---->");
    console.log ("      Current Card: " + currentCard.ToString());

    txtArea.scrollTop = txtArea.scrollHeight;
    txtArea.innerHTML += "Ace Counts as: " + aceValue.innerHTML.replace("Ace Value: ", "") + "\n";
}

////////// Stop the current turn and hand it over ////////////
////////// to the other player                    ////////////
//////////////////////////////////////////////////////////////
function StopTurn (){
    if (abortExecution == false){
        playersTurn = !playersTurn;

        console.log("<--------------------------------Switching turn-------------------------------->");
        txtArea.scrollTop = txtArea.scrollHeight;
        if (playersTurn == true){
            txtArea.innerHTML +=  "Turn given to: " + player.Name + "\n";
        }
        else{
            drawButton.disabled = true;
            stopButton.disabled = true;
            
            txtArea.innerHTML +=  "Turn given to: " + dealer.Name + "\n";

            StartBot();
        }
    }
}
//#endregion