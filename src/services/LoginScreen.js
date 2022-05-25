import Login from './Login'
import { useGlobalState } from '../GlobalState'

export default function LoginScreen() {

    const [state, dispatch] = useGlobalState()
    //immediately dispatch the view to anything but 0 if someone is currently logged in.
    //probably should send them to profile rather than the buy page.
    if (state.user){
        dispatch({view:1})
    }


    return (
        <div className='login-screen'>
            <h1>Strange Aeons</h1>
            <Login />
        </div>
    )
}