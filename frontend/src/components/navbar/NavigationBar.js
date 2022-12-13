import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../images/logo.png";
import "./NavigationBar.css";

function NavigationBar(props) {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Link to="/homepage">
                            <img
                                src={logo}
                                width="250"
                                height="70"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Link to='/homepage/category'>
                                <Button class="btn btn-primary btn-block m-1 " variant="primary" type="submit">Category</Button>
                            </Link>
                            <Link to='/'>
                                <Button class="btn btn-primary btn-block m-1" variant="primary" type="submit">Log Out</Button>
                            </Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

export default NavigationBar
