import Search from "../Search"
import Cart from "../Cart"
import Visualizer from "../Visualizer"

export default function Buy(){
    return(
        <div className="buy">
        <h1>Buy</h1>
        <Search />
        <Visualizer />
        <Cart />
        </div>
    )
}