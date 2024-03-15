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

function createCardRepresentation(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    
    const valueElement = document.createElement('div');
    valueElement.classList.add('card-value');
    valueElement.textContent = card.value;

    const suitElement = document.createElement('div');
    suitElement.classList.add('card-suit');
    suitElement.classList.add(card.suit.toLowerCase()); // Add class based on suit
    suitElement.textContent = getSuitSymbol(card.suit);

    cardElement.appendChild(valueElement);
    cardElement.appendChild(suitElement);

    return cardElement;
}

function getSuitSymbol(suit) {
    switch (suit) {
        case "Hearts":
            return "♥";
        case "Diamonds":
            return "♦";
        case "Clubs":
            return "♣";
        case "Spades":
            return "♠";
        default:
            return "";
    }
}

function updateHands() {
    const playerCards = document.getElementById('player-cards');
    const dealerCards = document.getElementById('dealer-cards');
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';

    for (let card of playerHand) {
        const cardElement = createCardRepresentation(card);
        playerCards.appendChild(cardElement);
    }
    document.getElementById('player-score').textContent = `Score: ${calculateScore(playerHand)}`;

    for (let card of dealerHand) {
        const cardElement = createCardRepresentation(card);
        dealerCards.appendChild(cardElement);
    }
    document.getElementById('dealer-score').textContent = `Score: ${calculateScore(dealerHand)}`;
}

function deal() {
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;

    const currentBet = parseInt(document.getElementById('current-bet').textContent);

    if (deck.length === 0) {
        deck = buildDeck();
        shuffleDeck(deck);
    }

    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    updateHands();

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    if (playerScore === 21 && dealerScore === 21 && playerHand.length === 2 && dealerHand.length === 2) {
        document.getElementById('result').textContent = 'Both player and dealer have blackjack. It\'s a tie!';
        disableButtons();
    } else if (playerScore === 21 && playerHand.length === 2) {
        document.getElementById('result').textContent = 'Blackjack! You win!';
        updateChips("win"); 
        disableButtons();
    } else if (dealerScore === 21 && dealerHand.length === 2) {
        document.getElementById('result').textContent = 'Dealer has blackjack. You lose!';
        disableButtons();
    }
}

