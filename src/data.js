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