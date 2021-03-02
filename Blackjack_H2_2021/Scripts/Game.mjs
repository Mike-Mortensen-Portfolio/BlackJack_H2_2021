class Deck {
    constructor(deckSize = 52) {
        this.GenerateDeck = function (deckSize) {
            console.log("Generating Deck");
            let cardSpecialTypes = ["Ace", "King", "Queen", "Jack", "Joker"];
            let cardType = ["Clubs", "Diamonds", "Spades", "Hearts"];
            let cardCollection = [];
            let normCard = 2;
            let specialTypeIndex = 0;
            let cardCount = 0;
            let maxCardCount = deckSize;

            for (let i = 0; i < 14; i++) {

                if (i < 9)
                {
                    for (let typeIndex = 0; typeIndex < cardType.length; typeIndex++) {
                        cardCollection.push(normCard + " of " + cardType[typeIndex]);
                        console.log("[" + i + "]" + "Normal" + "(" + normCard + ")" + "-----> " + cardCollection[cardCount] + "(" + cardCount + ")");
                        cardCount++;
                    }

                    normCard++;
                }
                else{
                    for (let typeIndex = 0; typeIndex < cardType.length; typeIndex++) {
    
                        if (i - 10 < cardSpecialTypes.length && i - 10 != cardSpecialTypes.length - 1) {
                             cardCollection.push(cardSpecialTypes[specialTypeIndex] + " of " + cardType[typeIndex]);
                             console.log("[" + i + "]" + "Special" + "(" + typeIndex + ")" + "----> " + cardCollection[cardCount] + "(" + cardCount + ")");
                        }
                        else{
                            cardCollection.push(cardSpecialTypes[specialTypeIndex]);
                            console.log("[" + i + "]" + "Joker" + "(" + typeIndex + ")" + "----> " + cardCollection[cardCount] + "(" + cardCount + ")");
                        }

                        cardCount++;

                        if (cardCount >= maxCardCount)
                        {
                            break;
                        }
                    }

                    specialTypeIndex++;
                }

                if (cardCount >= maxCardCount)
                {
                    break;
                }
            }

            return cardCollection;
        };

        this.cards = this.GenerateDeck(deckSize);
    }
}


 //var cardDeck = new Deck();

// for (let i = 0; i < cardDeck.cards.length; i++)
// {
//     let p = document.createElement ("p").innerHTML = cardDeck.cards[i] + "\n";
//     let body = document.getElementsByTagName("body");
//     body.innerHTML = "Ehllo";
// }