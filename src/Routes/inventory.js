import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getCard } from "scryfall-client/dist/api-routes/cards";
import { getInventory } from "../data";
import { API_ROOT } from "../data";

export default function Inventory() {

    var scryfall = require("scryfall-client");

    //then, we whould have a state of the inventory minus the cards that are filtered out.
    const [visible, setVisible] = useState([])

    //there should be a starting inventory of cards
    const inventory = getInventory().json;

    console.log("inventory: ", inventory)

    return (
        <>
            <h1>Inventory</h1>
            <>Search Bar</>
            <Card>
                <Card.Header>
                    <Card.Title>
                        <h3>Omnath, Locus of Mana</h3>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div>Condition: NM </div>
                    <div>Cost: 1</div>
                    <div>Price: $0.00</div>
                </Card.Body>
            </Card>
        </>
    )
}