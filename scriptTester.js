const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
const deck = []
function buildDeck(){
    for (let s = 0; s < suits.length; s++){
        for (let v = 0; v < values.length; v++){
            const value = values[v];
            const suit = suits[s];
            deck.push({value , suit});
        }
    }
    return deck;
}
buildDeck();
console.log(deck[1])
