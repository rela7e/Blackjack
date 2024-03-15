const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
let deck = [];
let playerHand = [];
let dealerHand = [];

function calculateScore(hand) {
    let score = 0;
    let numAces = 0;

    for (let i = 0; i < hand.length; i++) {
        const card = hand[i].value;
        if (card === "J" || card === "Q" || card === "K") {
            score += 10;
        } else if (card === "A") {
            numAces++;
            score += 11;
        } else {
            score += parseInt(card);
        }
    }

    // Adjust score for multiple Aces
    while (score > 21 && numAces > 0) {
        score -= 10;
        numAces--;
    }

    // Return "Bust" if score exceeds 21
    if (score > 21) {
        return "Bust";
    }

    return score;
}

function buildDeck() {
    for (let s = 0; s < suits.length; s++) {
        for (let v = 0; v < values.length; v++) {
            const value = values[v];
            const suit = suits[s];
            deck.push({ value, suit });
        }
    }
    return deck;
}

function shuffleDeck(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}