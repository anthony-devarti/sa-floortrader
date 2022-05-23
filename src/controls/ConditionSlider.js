import React from 'react';
import Slider from 'react-input-slider';
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useGlobalState } from '../GlobalState';

export default function ConditionSlider() {
    const [state, dispatch] = useGlobalState();

    const [margin, setMargin] = useState({ x: 10 });
    const [lp, setLp] = useState({ x: 10 });
    const [mp, setMp] = useState({ x: 10 });
    const [hp, setHp] = useState({ x: 10 });
    const [dmg, setDmg] = useState({ x: 10 });
    const [bulk, setBulk] = useState(state.margins.bulkThreshold);


    function save() {
        let newMargins = {
            margin: .3,
            nm: 1,
            lp: lp,
            mp: mp,
            hp: hp,
            dmg: dmg,
            bulkThreshold: bulk
        }
        dispatch({ margins: newMargins })
    }

    return (
        <>
            <div className='card-flex'>
                <Card className='slider-cards'>
                    <Card.Header>Near Mint/Margin</Card.Header>
                    <Card.Body><Slider axis="x" x={margin.x} onChange={setLp} /></Card.Body>
                    <Card.Footer>Current Percentage({margin.x})</Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Lightly Played</Card.Header>
                    <Card.Body><Slider axis="x" x={lp.x} onChange={setLp} /></Card.Body>
                    <Card.Footer>Current Percentage({lp.x})</Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Moderately Played</Card.Header>
                    <Card.Body><Slider axis="x" x={mp.x} onChange={setMp} /></Card.Body>
                    <Card.Footer>Current Percentage({mp.x})</Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Heavily Played</Card.Header>
                    <Card.Body><Slider axis="x" x={hp.x} onChange={setHp} /></Card.Body>
                    <Card.Footer>Current Percentage({hp.x})</Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Damaged</Card.Header>
                    <Card.Body><Slider axis="x" x={dmg.x} onChange={setDmg} /></Card.Body>
                    <Card.Footer>Current Percentage({dmg.x})</Card.Footer>
                </Card>
                <Card className='slider-cards'>
                    <Card.Header>Bulk Threshold</Card.Header>
                    <Form.Group className="buy-form" controlId="bulk">
                            <Form.Control
                                type="currency"
                                placeholder={state.margins.bulkThreshold}
                                onChange={(e) => setBulk(e.target.value)}
                            />
                        </Form.Group>
                </Card>
            </div>
            <div className='center'>
            <Button
                variant="primary"
                onClick={save}
            >Save Changes</Button>
            </div>
        </>
    );
}