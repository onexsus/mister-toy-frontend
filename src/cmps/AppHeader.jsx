import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import logoPng from '../assets/img/mister-toy-logo.png'

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { SET_USER } from '../store/reducers/user.reducer.js'



export function AppHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onLogout() {
        userService.logout()
            .then(() => {
                
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {

        dispatch({ type: SET_USER, user })
        navigate('/')
    }

    console.log(user);
    return (
        <header className="app-header full main-layout">
            <section className="header-container flex align-center justify-between">
            <div className='logo-appheader-container'>
            <NavLink to="/" ><img src={logoPng}/></NavLink>
            </div>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
        </nav>
            {user ? (
                < section className='user-container'>
                    <div>
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                    </div>
                {user &&user.isAdmin&& <NavLink to="/dashboard">Dashboard</NavLink>}
                </ section >
            ) : (
                <section>
                    <LoginSignup onSetUser={onSetUser} />
                </section>
            )}
            </section>
            <UserMsg />
        </header>
    )
}
