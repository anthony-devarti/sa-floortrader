import { useEffect, useState } from "react";
import { Form, FormControl, Button, Row } from "react-bootstrap"
import Visualizer from "./Visualizer";

export default function Search() {

    var scryfall = require("scryfall-client");

    const [currentCard, setCurrentCard] = useState({})

    //foil state
    const options = [
        { label: 'Non-Foil', value: 'non' },
        { label: 'Foil', value: 'foil' },
    ];

    const [foil, setFoil] = useState("non")

    const handleFoilChange = (event) => {
        setFoil(event.target.value);
    };

    //condition state
    const conditions = [
        { label: "Near-Mint", value: 1 },
        { label: "Lightly Played", value: .8 },
        { label: "Moderately Played", value: .7 },
        { label: "Heavily Played", value: .5 },
        { label: "Damaged", value: .25 },
    ]

    const [condition, setCondition] = useState(1)

    //changes the condition state object based on the dropdown
    const handleConditionChange = (event) => {
        setCondition(event.target.value);
    };

    
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
                console.log(condition)
                let result = {
                    name: card.name,
                    img: card.image_uris.normal,
                    price: Math.floor((card.prices.usd * condition)*100)/100,
                    foilPrice: card.prices.usd_foil * condition,
                    text: card.oracle_text,
                    tcgId: card.prints_search_uri,
                    set: card.set_name,
                }
                // console.group(card)
                localStorage.setItem("card", JSON.stringify(result))
                setCurrentCard(result)
                // console.log(card)
            });
        }
        
        return (
            <>
            <div className="narrow-row">
                <label>
                    Foiling
                    <select foil={foil} onChange={handleFoilChange}>
                        {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Condition
                    <select condition={condition} onChange={handleConditionChange}>
                        {conditions.map((condition) => (
                            <option key={condition.value} value={condition.value}>{condition.label}</option>
                        ))}
                    </select>
                </label>
            </div>
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
            <Visualizer currentCard={currentCard} />
        </>
    )
}