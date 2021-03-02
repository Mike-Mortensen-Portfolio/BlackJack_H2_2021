//#region Class declarations
//// Defines a card from a cardgame //////////////////////////
//////////////////////////////////////////////////////////////
//////// id: The ID that identifies the card /////////////////
//////// points: The value of a card         /////////////////
//////// name: The name of the card          /////////////////
//////// imageUrl: The releative path to the /////////////////
////////           image for the card        /////////////////
//////////////////////////////////////////////////////////////
class Card {
    constructor(_id, _points, _name, _imageUrl) {
        this.ID = _id;
        this.Points = _points;
        this.Name = _name;
        this.ImageUrl = _imageUrl;

        //////////////////////////////////////////////////////////////
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
        //////// imageUrl: The relative path to the //////////////////
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
        //////// index: The zero-based index /////////////////////////
        ////////        in the collection    /////////////////////////
        //////////////////////////////////////////////////////////////
        this.GetCourtCardValue = function (_index) { return courtCards[_index]; };
        //// Returns the suit card value at the specifed index //////
        //////////////////////////////////////////////////////////////
        //////// index: The zero-based index /////////////////////////
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
//////// id: The ID that identifies the person ///////////////
//////// name: The name of the person          ///////////////
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
//////// id: The ID that identifies the player ///////////////
//////// name: The name of the player          ///////////////
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
////////////////////// Game UI ///////////////////////////////
//////////////////////////////////////////////////////////////
let button = document.getElementById ("btn_draw");
let txtArea = document.getElementById ("txt_gameInfo");
let aceValue = document.getElementById ("btn_switchValue");
let dealerPoints = document.getElementById ("dealerPoints");
let playerPoints = document.getElementById ("playerPoints");

////////////////////// Game Data ////////////////////////////
/////////////////////////////////////////////////////////////
var ph = new CardHolder();  //  The HTML card placeholder
var deck = new Deck();      //  The deck of cards
var dealer = new Player (0, "Dealer");
var player = new Player (1, "Player");
let currentCard;            //  The Currently displayed card
let accepted = false;       //  Whether or not the player accepted the value of an Ace

//#region Initial Setup
txtArea.innerHTML = "Welcome to Oiski's Blackjack Table!\n";
dealerPoints.innerHTML = dealer.Name + " Points: " + dealer.GetPointsAsDoubleDigitString();
playerPoints.innerHTML = player.Name + " Points: " + player.GetPointsAsDoubleDigitString();
deck.BuilDeck();
deck.Shuffle();
//#endregion

////////// Draws a new card and resets the game ////////////
////////// when there's no cards left as well   ////////////
////////// as accepting the value of an Ace     ////////////
////////////////////////////////////////////////////////////
function DrawCard ()
{
    if (button.innerHTML != "Try Again"){
        if (button.innerHTML != "Accept"){
            currentCard  = deck.DrawCard();
            ph.SetSource (currentCard.ImageUrl);
            
            txtArea.scrollTop = txtArea.scrollHeight;
            txtArea.innerHTML += "Player drew: " + currentCard.Name + "\n";
            
            if (currentCard.Name.includes("Ace")){
                txtArea.scrollTop = txtArea.scrollHeight;
                txtArea.innerHTML += "Ace Counts as: " + aceValue.innerHTML.replace("Ace Value: ", "") + "\n";
                aceValue.disabled = false;
                button.innerHTML = "Accept";
            }
            else{
                aceValue.disabled = true;
            }
        }
        else{
            accepted = true;
            button.innerHTML = "Draw Card";
            aceValue.disabled = true;
        }

        if (currentCard.Name.includes("Ace") == false || accepted == true){
            player.Points += currentCard.Points;
            playerPoints.innerHTML = player.Name + " Points: " + player.GetPointsAsDoubleDigitString();
            accepted == false;
        }
    }
    else{
        txtArea.scrollTop = txtArea.scrollHeight;
        txtArea.innerHTML = "";

        ph.SetSource ("./Images/GameBoard.jpg");
        deck.BuilDeck();
        deck.Shuffle();

        button.innerHTML = "Draw Card";
    }
     
     if (deck.GetCards().length == 0)
     {
        button.innerHTML = "Try Again";
        txtArea.scrollTop = txtArea.scrollHeight;
        txtArea.innerHTML += "Game Over\n";
     }
}

//////////Switches the value of the displayed Ace ////////////
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
    txtArea.scrollTop = txtArea.scrollHeight;
    txtArea.innerHTML += "Ace Counts as: " + aceValue.innerHTML.replace("Ace Value: ", "") + "\n";
}
//#endregion