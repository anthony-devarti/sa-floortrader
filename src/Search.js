import { useEffect, useState } from "react";
import { Form, FormControl, Button, Row } from "react-bootstrap"
import { useGlobalState } from "./GlobalState";
import Visualizer from "./Visualizer";
import { offerPrice } from "./data";

export default function Search() {

    const [ state, dispatch ] = useGlobalState()

    var scryfall = require("scryfall-client");

    const [currentCard, setCurrentCard] = useState({})
    const [printings, setPrintings] = useState({})
    console.log( typeof printings)

    //handles offer state
    const [offer, setOffer] = useState(0)

    //foil state
    const options = [
        { label: 'Non-Foil', value: 'non' },
        { label: 'Foil', value: 'foil' },
    ];

    const [foil, setFoil] = useState("non")

    const handleFoilChange = (event) => {
        dispatch(state.foil=event.target.value);
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
        dispatch(state.condition=event.target.value);
    };

    //determines what card is being searched
    const [ searchValue, setSearchValue ] = useState("animar soul of elements")

    
    function handleSearch(e) {
        e.preventDefault()
        scryfall
        .get("cards/named", {
            fuzzy: searchValue,
        })
        .then(function (card) {
                card.getPrice(); // '11.25'
                card.getPrice("usd"); // '11.25'
                card.getPrice("usd_foil"); // '52.51'
                localStorage.setItem("card", JSON.stringify(card))
                dispatch(state.card={...card})
                setOffer(offerPrice(card.prices.usd, card.prices.usd_foil, foil, condition))
                // console.log("image", card.image_uris.normal)
                console.log("card fetched by scryfall", state.card)
            });
        }

    
        
        return (
            <>
            <div className="narrow-row">
                <label>
                    Foiling
                    <select foil={foil} onChange={handleFoilChange}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
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
                        placeholder="Enter a Card Name"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button variant="outline-success" onClick={(e) => handleSearch(e)}>Go</Button>
                </Form>
            </div>
            <Visualizer offer={offer} />
        </>
    )
}