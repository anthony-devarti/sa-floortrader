


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

//for some reason, foil is evaluating to true and non foil or non
export function offerPrice(price, foilPrice, foilStatus, condition, margin, bulk) {
    // margin is undefined when it's being passed in
    console.log(arguments)
    let retail = price;
    if (foilStatus == 1) {
        retail = price
    //this will need to control for other finshes besides foil and non
    } else {
        retail = foilPrice
    }
    let offer = (Math.floor((retail - retail * margin) * condition * 100)) / 100
    //bulk defintion will need to be replaced by variable later 
    if (offer < bulk) {
        return "Bulk"
    } else return "$" + offer
}

export function addToCart(card, suggested, offer, condition) {
    //define everything that needs to be included in the total order information
    //this may need to take place inside of a component.
    let lineItem = {
        name: card.name,
        Estimate: suggested,
        Actual: offer,
        condition: condition,
    }
}

export function foilTranslator(foilCode) {
    switch (true) {
        case foilCode === 1:
            return "Non-Foil"
            break;
        case foilCode === 2:
            return "Foil"
            break;
        case foilCode === 3:
            return "Etched"
        default:
            break;
    }
}

export function conditionTranslator(input) {
    switch (true) {
        case input === 3:
            return "Lightly Played"
        case input === 2:
            return "Moderately Played"
        case input === 1:
            return "Heavily Played"
        case input === 0:
            return "Damaged"
        default:
            break;
    }
}