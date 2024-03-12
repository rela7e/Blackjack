var chipCount = 100
var playerCards = []
var dealerCards = []

function buildDeck(){
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
    const deck = [];
    for (let s = 0; s < suits.length; s++){
        for (let v = 0; v < values.length; v++){
            const value = values[v];
            const suit = suits[s];
            deck.push({value , suit});
        }
    }
return deck;
}




