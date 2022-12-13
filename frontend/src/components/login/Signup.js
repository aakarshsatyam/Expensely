import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import login from "../images/login.png";
import logo from "../images/logo.png";
import "./Login.css"

function Signup() {
    const [user, setUser] = useState([
        {   //Fields name should be same as the Table Coloumn name
            "id": null,
            "email": "",
            "password": "",
        }
    ]);


    function changeDetails(e) {
        let val = e.target.value;
        setUser({ ...user, [e.target.name]: val })
    }
    const handleClick = useNavigate();
    const insertFunction = async (e) => {
        const result = await axios.post('http://localhost:9030/api/user', user)
        alert(result.data);
        if (result.data === "Sign Up Successfull") {
            handleClick('/')
        }
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
                                <h2>Sign Up</h2>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name="email" value={user.email} onChange={(e) => changeDetails(e)} placeholder="Enter email" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" value={user.password} onChange={(e) => changeDetails(e)} placeholder="Password" />
                                    </Form.Group>
                                    <div class="d-grid">
                                        <Button class="btn btn-primary btn-block" variant="primary" type="button" onClick={(e) => insertFunction(e)}>Sign Up</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
