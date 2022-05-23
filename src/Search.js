import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap"
import { useGlobalState } from "./GlobalState";
import Visualizer from "./Visualizer";
import { offerPrice } from "./data";

export default function Search() {

    const [ state, dispatch ] = useGlobalState()

    var scryfall = require("scryfall-client");

    //handles offer state
    const [offer, setOffer] = useState(0)

    //foil state
    const options = [
        { label: 'Non-Foil', value: 1 },
        { label: 'Foil', value: 2 },
        { label: "Etched", value: 3 }
    ];

    // const [foilStatus, setFoilStatus] = useState("nonf")

    const handleFoilChange = (event) => {
        let status = Number(event.target.value)
        // setFoilStatus("foil status: ", status)
        dispatch({ foilStatus: status });
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
        let parsed = parseFloat(event.target.value)
        setCondition(parsed)
        dispatch({ condition : parsed });
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
                //card variable is all of the key values pairs, so wrapping it up like this allows it to replace the previous card object in global state, rather than adding 100 new keys into gs
                // dispatch(state.card={card})
                dispatch({ card })
                setOffer(offerPrice(card.prices.usd, card.prices.usd_foil, state.foilStatus, condition))
                // console.log("image", card.image_uris.normal)
                console.log("card fetched by scryfall", state.card)
            });
        }

    
        
        return (
            <>
            <div className="narrow-row">
                <label>
                    Foiling
                    <select value={state.foilStatus} onChange={handleFoilChange}>
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