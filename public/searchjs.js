
const search = document.querySelector("#search");
const gamename = document.querySelector("#gamename");
const cardContainer = document.getElementById('cardContainer');
const searchitem = document.getElementById('searchitem')
const searchcontain = document.getElementById('searchcontain')

search.addEventListener("click", () => {
  cardContainer.innerHTML = '';
  printGames();
});


const printGames = async () => {
  const options = {
    method: 'GET',
    url: 'https://cheapshark-game-deals.p.rapidapi.com/deals',
    params: {
      lowerPrice: '0',
      steamRating: '0',
      title: `${gamename.value}`,
      desc: '0',
      output: 'json',
      steamworks: '0',
      sortBy: 'Deal Rating',
      AAA: '0',
      pageSize: '60',
      exact: '0',
      upperPrice: '50',
      pageNumber: '0',
      onSale: '0',
      metacritic: '0',
      'storeID[0]': '1,2,3'
    },
    headers: {
      'X-RapidAPI-Key': 'Your-RapidAPI-Key', //Unique key that you'll receive from RapidAPI
      'X-RapidAPI-Host': 'cheapshark-game-deals.p.rapidapi.com'
    }
  };


  try {
    let res = await axios.request(options);
    searchitem.textContent = gamename.value
    searchcontain.style.display = 'block';
    gamename.value = '';
    createCards(res.data);
  }
  catch (err) {
    console.log(err);
  }
};

let createCards = (games) => {
games.forEach(game => {
    const card = document.createElement('div');
    card.classList.add('card');

    const thumbnail = document.createElement('img');
    thumbnail.classList.add('game-thumbnail');
    thumbnail.src = game.thumb;
    thumbnail.alt = `${game.title} Thumbnail`;

    const title = document.createElement('h3');
    title.textContent = game.title;

    const deal = document.createElement('p');
    deal.textContent = `Deal: ${game.salePrice}`;

    const rating = document.createElement('p');
    rating.textContent = `Steam Rating: ${game.steamRatingText}`;

    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = 'CHECK DEALS';

    card.appendChild(thumbnail);
    card.appendChild(title);
    card.appendChild(deal);
    card.appendChild(rating);
    card.appendChild(button);
    cardContainer.appendChild(card);


    button.addEventListener('click', () => {
      window.location.href = `game?q=${game.gameID}`;
    });

});
}







