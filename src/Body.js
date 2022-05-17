import Buy from "./Routes/buy"
import History from "./Routes/history"
import Settings from "./Routes/settings"
import Profile from "./Routes/Profile"

export default function Body(view){

    let current = view.view
    
    if (current === 1) {
        return(
            <Buy />
        )
    } else if (current === 2) {
        return(
            <History />
        )
    } else if (current === 3){
        return(
            <Settings />
        )
    } else if(current === 4){
        return(
            <Profile />
        )
    }
}