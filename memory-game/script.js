const emojis = ["😄", "😄", "🐱", "🐱", "🍕", "🍕", "🚗", "🚗", "🎵", "🎵", "🌟", "🌟", "⚽", "⚽", "🎈", "🎈"];
let flippedCards = [];
let matched = 0;
let moves = 0;

function startGame() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  flippedCards = [];
  matched = 0;
  moves = 0;
  document.getElementById("moves").textContent = "Moves: 0";

  const shuffled = emojis.sort(() => 0.5 - Math.random());

  shuffled.forEach((emoji, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains("flip")) return;

  this.classList.add("flip");
  this.textContent = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById("moves").textContent = `Moves: ${moves}`;

    if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
      matched += 2;
      flippedCards = [];

      if (matched === emojis.length) {
        setTimeout(() => alert("🎉 You Win!"), 500);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(card => {
          card.classList.remove("flip");
          card.textContent = "";
        });
        flippedCards = [];
      }, 1000);
    }
  }
}

startGame();
