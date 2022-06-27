import './EventCard.css'

export default function EventCard() {

    var r = document.querySelector(':root')
    
    function getColor(format){
        switch(format.toLowerCase()){
            case "standard":
                return "blue"
            case "modern":
                return "green"
            case "legacy":
                return "red"
            case "commander":
                return "purple"
            case "pioneer":
                return "orange"
            case "pauper":
                return "yellow"
            case "sealed":
                return "brown"
            case "draft":
                return "grey"
            default:
                return "maroon"
        }
    }

    return (
        <div className="container">
            <div className="card" style={{background:getColor("Modern")}}>
                <div className="contentBx">
                    <h2>Modern 1K</h2>
                    <div className="size">
                        <span>Date: 7/2/22</span>
                        <span>Prize: $1000</span>
                    </div>
                    <div className="size">
                        <span>Format: Modern</span>
                        <span>Entry: $10</span>
                    </div>
                    <div className="size">
                        <span>Time: 1 PM</span>
                        <span>Cap: 36</span>
                    </div>
                    <a href="#">Edit</a>
                </div>
            </div>
        </div>
    )
}