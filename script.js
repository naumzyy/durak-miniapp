const values = ['6','7','8','9','10','J','Q','K','A'];
const suits = ['♠️','♣️','♥️','♦️'];

function getRandomCards(count) {
  const deck = [];
  for (let v of values) {
    for (let s of suits) {
      deck.push(v + s);
    }
  }
  const hand = [];
  while (hand.length < count) {
    const randIndex = Math.floor(Math.random() * deck.length);
    hand.push(deck.splice(randIndex, 1)[0]);
  }
  return hand;
}

function renderHand(cards) {
  const handDiv = document.getElementById('player-hand');
  handDiv.innerHTML = '';
  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerText = card;
    cardDiv.onclick = () => playCard(card);
    handDiv.appendChild(cardDiv);
  });
}

function playCard(card) {
  document.getElementById('status').innerText = Ты походил картой ${card}, бот отбился.;
}

function restart() {
  const newHand = getRandomCards(6);
  renderHand(newHand);
  document.getElementById('status').innerText = '';
}

Telegram.WebApp.ready();
Telegram.WebApp.expand();
restart();