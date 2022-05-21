export async function printings(cardName) {
    var scryfall = require("scryfall-client");
    scryfall
        .get("cards/named", {
            exact: cardName,
        })
        .then(function (card) {
            return card.getPrints();
        })
        .then(function (list) {
            var sets = list.map(function (card) {
                return card.set;
            });
        });

}

export function getPrintings(endpoint) {
    
    const fetchPromise = fetch(`https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${endpoint}&unique=prints`);

    fetchPromise
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            console.log("response: ", json.data);
        })
        .catch(error => {
            console.error(`Could not get products: ${error}`);
        });
}

export function offerPrice(price, foilPrice, foil, condition) {
    let retail;
    if (foil == "non") {
        retail = price
    } else {
        retail = foilPrice
    }
    //.3 will need to be replaced by margin variable later
    let offer = (Math.floor((retail - retail * .3) * condition * 100)) / 100
    //bulk defintion will need to be replaced by variable later 
    if (offer < .1) {
        return "Bulk"
    } else return "$" + offer
}