import Buy from "./Routes/buy"
import History from "./Routes/history"
import Settings from "./Routes/settings"
import Profile from "./Routes/Profile"
import LoginScreen from "./services/LoginScreen"
import { useGlobalState } from "./GlobalState"

export default function Body(view){
    const [state, disptach] = useGlobalState()

    let current = state.view

    if (current === 0){
        return(
            <LoginScreen />
        )
    } else if (current === 1) {
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