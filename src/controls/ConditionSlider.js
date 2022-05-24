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
            margin: margin.x / 100,
            nm: 1,
            lp: lp.x / 100,
            mp: mp.x / 100,
            hp: hp.x / 100,
            dmg: dmg.x / 100,
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



    return (
        <>
            <Card className='slider-cards'>
                <Card.Header>Near Mint/Margin</Card.Header>
                <Card.Body>
                    <Slider
                        axis="x" x={margin.x}
                        onChange={setMargin}
                        style={
                            {
                                width: "90vw",
                                height: "40px",
                            }}
                        styles={{
                            track: {
                                backgroundColor: 'green'
                            },
                            active: {
                                backgroundColor: 'blue'
                            },
                            thumb: {
                                width: 50,
                                height: 50
                            },
                            disabled: {
                                opacity: 0.5
                            }
                        }}
                    />
                </Card.Body>
                <Card.Footer className="dan-schneider">{margin.x}% of Retail
                    <Button
                        onClick={() => setMargin({ x: curr.margin * 100 })}
                        size = "sm"
                    > Reset
                    </Button>
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
                    <Card.Footer className="dan-schneider">
                        {lp.x}% of NM Value
                        <Button 
                        onClick={() => setLp({ x: curr.lp * 100 })} 
                        size = "sm"
                        >Reset</Button>
                    </Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Moderately Played</Card.Header>
                    <Card.Body>
                        <Slider
                            axis="x" x={mp.x}
                            onChange={setMp} />
                    </Card.Body>
                    <Card.Footer className="dan-schneider">
                        {mp.x}% of NM Value
                        <Button
                            onClick={() => setMp({ x: curr.mp * 100 })}
                            size = "sm"
                            >Reset
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
                    <Card.Footer className="dan-schneider">
                        {hp.x}% of NM Value
                        <Button
                            onClick={() => setHp({ x: curr.hp * 100 })}
                            size = "sm"
                            >
                                Reset
                        </Button>
                    </Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Damaged</Card.Header>
                    <Card.Body>
                        <Slider
                            axis="x" x={dmg.x}
                            onChange={setDmg} />
                    </Card.Body>
                    <Card.Footer className="dan-schneider">
                        {dmg.x}% of NM Value
                        <Button
                            onClick={() => setDmg({ x: curr.dmg * 100 })}
                            size = "sm"
                            >
                                Reset
                            </Button>
                    </Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Bulk Threshold</Card.Header>
                    <Card.Body>
                        <Form.Group className="buy-form" controlId="bulk">
                            <Form.Control
                                type="currency"
                                placeholder={"$" + state.margins.bulkThreshold}
                                onChange={(e) => setBulk(e.target.value)}
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="dan-schneider">
                        Offers below this amount will be displayed as bulk.
                    </Card.Footer>
                </Card>
            </div>
            <div className="d-grid gap-2">
                <Button
                    variant="primary"
                    size="lg"
                    onClick={save}
                    style={{ margin: "2rem" }}
                >
                    Save Changes
                </Button>
            </div>
        </>
    );
}