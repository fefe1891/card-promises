let favNumber = 7; // choose your favorite number
let baseURL = 'http://numbersapi.com';

// Request 4 historical facts about the favourite number and format the output
for(let i = 0; i < 4; i++) {
    fetch(`${baseURL}/${favNumber}?json`)
    .then(response => response.json())
    .then(data => {
        let factElement = document.createElement('p');
        factElement.innerText = `Fact: ${data.text}`;
        document.querySelector('#facts').appendChild(factElement);
    });
}

// get multiple numbers facts and append them to the page
let favNumbers = [11, 22, 23];
favNumbers.forEach(number => {
    fetch(`${baseURL}/${number}?json`)
        .then(response => response.json())
        .then(data => {
            let numberElement = document.createElement('p');
            numberElement.innerText = `Number fact: ${data.text}`;
            document.querySelector('#numbers').appendChild(numberElement);
        });
});

let deckId = '';
baseURL = 'https://deckofcardsapi.com/api/deck';

// Request a new shuffled deck and store its id
fetch(`${baseURL}/new/shuffle?deck_count=1`)
  .then(response => response.json())
  .then(data => {
    deckId = data.deck_id;
  });

// Add an event listener to the draw button
document.querySelector('#draw').addEventListener('click', function() {
  fetch(`${baseURL}/${deckId}/draw/?count=1`)
    .then(response => response.json())
    .then(data => {
      let cardImage = document.createElement('img');
      cardImage.src = data.cards[0].image;
      document.querySelector('#card-area').appendChild(cardImage);
    });
});

// Add an event listener to the shuffle button
document.querySelector('#shuffle').addEventListener('click', function() {
  fetch(`${baseURL}/${deckId}/shuffle`)
    .then(response => response.json())
    .then(data => {
      document.querySelector('#card-area').innerHTML = ''; // remove all current cards
      alert('Deck shuffled!');
    });
});