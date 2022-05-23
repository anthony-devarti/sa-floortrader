import ConditionSlider from "../controls/ConditionSlider"

export default function Settings(){
    return(
        <>
        <h1>Settings</h1>
        <div>
            <p>Use the sliders below to set your buy rates.  Your margin is the percentage difference between the current retail price and how much you will offer.  You can also change the rate at which your offer decreases as condition decreases.</p>
        </div>
        <ConditionSlider />
        </>
    )
}