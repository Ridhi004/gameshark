let title = document.querySelector('#title  ');
let img = document.querySelector('#thumb');
let price = document.querySelector('#price');
let ID = document.body.getAttribute('data-game');


const printGames = async () => {
    const options = {
        method: 'GET',
        url: 'https://cheapshark-game-deals.p.rapidapi.com/games',
        params: { id: `${ID}` },
        headers: {
            'X-RapidAPI-Key': 'Your-RapidAPI-Key', //Unique key that you'll receive from RapidAPI
            'X-RapidAPI-Host': 'cheapshark-game-deals.p.rapidapi.com'
        }
    };

    try {
        let res = await axios.request(options);
        let dataAll = res.data
        title.innerHTML = dataAll.info.title
        price.textContent = dataAll.cheapestPriceEver.price
        img.src = dataAll.info.thumb;
        printCards(res.data);
    }
    catch (err) {
        console.log(err);
    }
};

let printCards = (dataAll) => {
    for (let data of dataAll.deals) {

        console.log(dataAll.info.title)
        const cardContainer = document.getElementById('card-container');

        const card = document.createElement('div');
        card.classList.add('deal-card');

        const priceParagraph = document.createElement('p');
        priceParagraph.classList.add('deal-price');
        priceParagraph.innerHTML = 'Deal price: <span>' + data.price + '</span>€';

        const button = document.createElement('button');
        button.classList.add('deal-btn');
        button.textContent = 'CHECK THIS DEAL';

        button.addEventListener('click', () => {
            window.location.href = `https://www.cheapshark.com/redirect?dealID=${data.dealID}`;
        });

        card.appendChild(priceParagraph);
        card.appendChild(button);
        cardContainer.appendChild(card);
    }

}
printGames();
function createCard(dealPrice) {
    const cardContainer = document.getElementById('card-container');

    const card = document.createElement('div');
    card.classList.add('deal-card');

    const priceParagraph = document.createElement('p');
    priceParagraph.classList.add('deal-price');
    priceParagraph.innerHTML = 'Deal price: <span>' + dealPrice + '</span>';

    const button = document.createElement('button');
    button.classList.add('deal-btn');
    button.textContent = 'CHECK THIS DEAL';

    card.appendChild(priceParagraph);
    card.appendChild(button);

    cardContainer.appendChild(card);
}

const randomDealPrice = getRandomDealPrice();
createCard(randomDealPrice);

function getRandomDealPrice() {
    const minPrice = 30;
    const maxPrice = 50;
    const randomPrice = (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);
    return '€' + randomPrice;
}