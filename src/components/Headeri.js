import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar } from 'react-bootstrap'

function Header() {
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <img alt="logo" src={logo} width="40px" height="40px"/>
                    Huonekalulista
                </Navbar.Brand>
            </Navbar>
        </div>
    );
}

export default Header