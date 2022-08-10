import ConditionSlider from "../controls/ConditionSlider"
import SellerSettings from "../controls/SellerSettings"
import { Tab, Tabs } from 'react-bootstrap';

export default function Settings() {
    return (
        <>
            <h1>Settings</h1>
            <Tabs defaultActiveKey="buy" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="buy" title="Buy">
                    <ConditionSlider />
                </Tab>
                <Tab eventKey="seller" title="Seller">
                    <SellerSettings />
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    Nothing here yet.
                </Tab>
            </Tabs>
        </>
    )
}