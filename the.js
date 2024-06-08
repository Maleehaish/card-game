// script.js
document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const cardValues = generateCardValues(8);
    let flippedCards = [];
    let matchedPairs = 0;

    cardValues.forEach((value, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.dataset.index = index;
        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });

    function generateCardValues(pairCount) {
        const values = [];
        for (let i = 0; i < pairCount; i++) {
            values.push(i, i);
        }
        return values.sort(() => Math.random() - 0.5);
    }

    function flipCard(card) {
        if (card.classList.contains("flip") || card.classList.contains("matched")) {
            return;
        }

        card.classList.add("flip");
        card.textContent = card.dataset.value;

        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedPairs++;
            if (matchedPairs === cardValues.length / 2) {
                alert("Congratulations! You've matched all the cards!");
            }
        } else {
            setTimeout(() => {
                card1.classList.remove("flip");
                card2.classList.remove("flip");
                card1.textContent = "";
                card2.textContent = "";
            }, 1000);
        }
        flippedCards = [];
    }
});
