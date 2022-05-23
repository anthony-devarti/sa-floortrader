import React from 'react';
import Slider from 'react-input-slider';
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useGlobalState } from '../GlobalState';
import { conditionTranslator } from '../data';

export default function ConditionSlider() {
    const [state, dispatch] = useGlobalState();
    let curr = state.margins

    const [margin, setMargin] = useState({ x: curr.margin * 100 });
    const [lp, setLp] = useState({ x: curr.lp * 100 });
    const [mp, setMp] = useState({ x: curr.mp * 100 });
    const [hp, setHp] = useState({ x: curr.hp * 100 });
    const [dmg, setDmg] = useState({ x: curr.dmg * 100 });
    const [bulk, setBulk] = useState(curr.bulkThreshold);


    function save() {
        if (!check()) {
            alert("Check your sliders.")
            return
        }
        let newMargins = {
            margin: .3,
            nm: 1,
            lp: lp,
            mp: mp,
            hp: hp,
            dmg: dmg,
            bulkThreshold: bulk
        }
        console.log(newMargins)
        dispatch({ margins: newMargins })
    }

    function check() {
        let currentConditions = [dmg.x, hp.x, mp.x, lp.x]
        let next;
        for (let i = 0; i < currentConditions.length; i++) {
            next = i + 1;
            if (currentConditions[next] < currentConditions[i]) {
                console.log("Failed: ", conditionTranslator(i) + " is greater than " + conditionTranslator(next))
                return false;
            }
        }
        return true;
    }


    const styling = {
        track: {
            backgroundColor: 'red'
        },
        active: {
            backgroundColor: 'red'
        },
        thumb: {
            width: 50,
            height: 50
        },
        disabled: {
            opacity: 0.5
        }
    }

    return (
        <>
            <Card className='slider-cards'>
                <Card.Header>Near Mint/Margin</Card.Header>
                <Card.Body>
                    <Slider
                        style={styling}
                        axis="x" x={margin.x}
                        onChange={setMargin}
                    />
                </Card.Body>
                <Card.Footer>{margin.x}% of Retail
                    <Button onClick={() => setMargin({ x: curr.margin * 100 })}>Reset</Button>
                </Card.Footer>
            </Card>
            <div className='card-flex'>
                <Card className='slider-cards'>
                    <Card.Header>Lightly Played</Card.Header>
                    <Card.Body>
                        <Slider
                            axis="x" x={lp.x}
                            onChange={setLp} />
                    </Card.Body>
                    <Card.Footer>
                        {lp.x}% of NM Value
                        <Button onClick={() => setLp({ x: curr.lp * 100 })}>Reset</Button>
                    </Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Moderately Played</Card.Header>
                    <Card.Body>
                        <Slider
                            axis="x" x={mp.x}
                            onChange={setMp} />
                    </Card.Body>
                    <Card.Footer>
                        {mp.x}% of NM Value
                        <Button
                            onClick={() => setMp({ x: curr.mp * 100 })}>
                            Reset
                        </Button>
                    </Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Heavily Played</Card.Header>
                    <Card.Body>
                        <Slider 
                        axis="x" x={hp.x} 
                        onChange={setHp} />
                        </Card.Body>
                    <Card.Footer>
                        {hp.x}% of NM Value
                        <Button onClick={() => setHp({ x: curr.hp * 100 })}>Reset</Button>
                    </Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Damaged</Card.Header>
                    <Card.Body>
                        <Slider 
                        axis="x" x={dmg.x} 
                        onChange={setDmg} />
                        </Card.Body>
                    <Card.Footer>
                        {dmg.x}% of NM Value
                        <Button onClick={() => setDmg({ x: curr.dmg * 100 })}>Reset</Button>
                    </Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Bulk Threshold</Card.Header>
                    <Card.Body>
                        <Form.Group className="buy-form" controlId="bulk">
                            <Form.Control
                                type="currency"
                                placeholder={state.margins.bulkThreshold}
                                onChange={(e) => setBulk(e.target.value)}
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        Offers below this amount will be displayed as bulk.
                    </Card.Footer>
                </Card>
            </div>
            <div className='center'>
                <Button
                    variant="primary"
                    onClick={save}
                >Save Changes</Button>
                <Button onClick={() => check(lp, mp, hp, dmg)}>Check sorting</Button>
            </div>
        </>
    );
}