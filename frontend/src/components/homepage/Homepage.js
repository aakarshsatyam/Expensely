import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import NavigationBar from '../navbar/NavigationBar';
import FinanceSummary from '../financeSummary/FinanceSummary';
import Transactions from '../transactions/Transactions';
import { Container } from 'react-bootstrap';

function Homepage() {
    const [user, setUser] = useState([]);

    const location = useLocation();

    useEffect(() => {
        fetch("http://localhost:9030/api/viewer/" + location.state.id)
            .then(result => result.json())
            .then((result) => {
                console.log("Record received")
                console.log(result)
                setUser(result);
            })
    }, [])
    return (
        <div>
            <NavigationBar email={user.email} />
            <Container>
                Hi {user.email}
                <FinanceSummary data={location.state.id} />
                <Transactions data={location.state.id} />
            </Container>
        </div >
    )
}

export default Homepage
