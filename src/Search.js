import { useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap"

export default function Search() {

    var scryfall = require("scryfall-client");

    const [currentCard, setCurrentCard] = useState(
        {
            // name: "",
            // img: "",
            // price: "",
            // foilPrice: "",
            // text: "",
            // printings: "",
            // tcgId: "",
            // set: "",
        }
    )

    function handleSearch(e) {
        e.preventDefault()
        scryfall
            .get("cards/named", {
                fuzzy: "animar soul",
            })
            .then(function (card) {
                card.getPrice(); // '11.25'
                card.getPrice("usd"); // '11.25'
                card.getPrice("usd_foil"); // '52.51'
                // console.log(card.name)
                let result = {
                    name: card.name,
                    img: card.image_uris.normal,
                    price: card.prices.usd,
                    foilPrice: card.prices.usd_foil,
                    text: card.oracle_text,
                    tcgId: card.prints_search_uri,
                    set: card.set_uri,
                }
                localStorage.setItem("card", JSON.stringify(result))
                setCurrentCard(result)
            });
    }

    // localStorage.setItem()
    return (
        <>
            <div className="search-bar">
                <Form className="d-flex" onSubmit={(e) => handleSearch(e)}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success" onClick={(e) => handleSearch(e)}>Search</Button>
                </Form>
            </div>
        </>
    )
}