const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
let deck = [];
let playerHand = [];
let dealerHand = [];

// function to calculate hand score
function calculateScore(hand) {
    let score = 0;
    let numAces = 0;

    // loop through each card in the hand 
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
    // adjust scores where aces present to avoid busting, changing value of ace from 11 to 1
    while (score > 21 && numAces > 0) {
        score -= 10;
        numAces--;
    }

    if (score > 21) {
        return "Bust";
    }

    return score;
}

// combines the suit and value arrays in order to construct a 52 card deck
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

// randomizes the deck
function shuffleDeck(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// function to create HTML versions of cards dealt
function createCardRepresentation(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    
    const valueElement = document.createElement('div');
    valueElement.classList.add('card-value');
    valueElement.textContent = card.value;

    const suitElement = document.createElement('div');
    suitElement.classList.add('card-suit');
    suitElement.classList.add(card.suit.toLowerCase()); 
    suitElement.textContent = getSuitSymbol(card.suit);

    cardElement.appendChild(valueElement);
    cardElement.appendChild(suitElement);

    return cardElement;
}

// function to change text of card suit into a symbol for aesthetic purposes
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

// function to update the visual models of hands to properly render the cards
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

// function to initially deal the hands
function deal() {
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;

    if (deck.length === 0) {
        deck = buildDeck();
        shuffleDeck(deck);
    }

    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    updateHands();

    //way to check for initial blackjack so the hand ends if appropriate
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    if (playerScore === 21 && dealerScore === 21 && playerHand.length === 2 && dealerHand.length === 2) {
        document.getElementById('result').textContent = 'Both player and dealer have blackjack. Push!';
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

// function to handle the player drawing additional cards
function hit() {
    playerHand.push(deck.pop());

    updateHands();

    const playerScore = calculateScore(playerHand);
    if (playerScore === "Bust") {
        document.getElementById('result').textContent = 'Bust! You lose.';
        disableButtons();
    }
}

// function to handle player standing - then runs through the dealers turn and checks the results
function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }

    updateHands();

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    if (playerScore === "Bust" || (dealerScore <= 21 && dealerScore > playerScore)) {
        document.getElementById('result').textContent = 'Dealer wins!';
    } else if (dealerScore === "Bust" || playerScore > dealerScore) {
        document.getElementById('result').textContent = 'You win!';
    } else {
        document.getElementById('result').textContent = 'Push!';
    }

    disableButtons();
}

// function to disable hit and stand buttons after hand is over
function disableButtons() {
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
}

// event listeners for the game buttons
document.getElementById('deal-button').addEventListener('click', deal);
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);

