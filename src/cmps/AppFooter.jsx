

import { UserMsg } from './UserMsg.jsx'
import logoPng from '../assets/img/mister-toy-logo.png'

export function AppFooter() {

    return (
        <footer className='full'>
            <div className='logo-footer-container'>
                <img src={logoPng}/>
            </div>
            <p>
                Coffeerights to all
            </p>

            <UserMsg />
        </footer>
    )
}
