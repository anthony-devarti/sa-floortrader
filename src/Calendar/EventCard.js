import './EventCard.css'

export default function EventCard(props) {

    console.log(props)

    var r = document.querySelector(':root')

    return (
        <div className="container">
            <div className="card modern">
                <div className="contentBx">
                    <h2>{props.details.name}</h2>
                    <div className="size">
                        <span>Date: 22</span>
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