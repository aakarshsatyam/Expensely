import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import login from "../images/login.png";
import logo from "../images/logo.png";
import "./Login.css"
import axios from 'axios'

function Login() {
    const [user, setUser] = useState([
        {   //Fields name should be same as the Table Coloumn name
            "id": null,
            "email": "",
            "password": "",
        }
    ]);
    const handleClick = useNavigate();

    function changeDetails(e) {
        let value = e.target.value;
        setUser({ ...user, [e.target.name]: value })
    }


    const verifyFunction = async (e) => {
        const result = await axios.post('http://localhost:9030/api/verify', user)
            .then((result) => {
                console.log("Record received")
                console.log(result)
                if (result.data >= 1000) {
                    alert("Login Successful!!!")
                    console.log("inside if");
                    const id = result.data;
                    handleClick('/homepage', { state: { id: id } })
                }
                else if (result.data == 0) {
                    alert("Password Wrong!!!")
                    console.log("inside else")
                } else {
                    alert("User Id doesnot exist.")
                }
            })
    }

    return (
        <div class="container mt-5 pt-5">
            <div class="row">
                <div class="col">
                    <img className="login-img" src={login} alt="Login" />
                </div>
                <div class="col ms-5">
                    <div className="right-container">
                        <img className="logo-img" src={logo} alt="Logo" />
                        <div class="card">
                            <div class="card-body">
                                <h2>Login</h2>
                                <Form>
                                    <Form.Text className="text-muted">Login with the data you entered during your registration.</Form.Text>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name="email" value={user.email} onChange={(e) => changeDetails(e)} placeholder="Enter email" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" value={user.password} onChange={(e) => changeDetails(e)} placeholder="Password" />
                                    </Form.Group>
                                    <div class="d-grid">
                                        <Button class="btn btn-primary btn-block" variant="primary" type="button" onClick={(e) => verifyFunction(e)}>Log in</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-4">
                        <div class="card-body">
                            <p className="signupButton">Don't have Expensely Yet?</p>
                            <div class="d-grid">
                                <Link to='/signup'>
                                    <div class="d-grid"><Button class="btn btn-secondary btn-block" variant="primary" type="submit">Create your Expensely Account</Button></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
