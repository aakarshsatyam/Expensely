import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import { Container } from 'react-bootstrap';

function FinanceSummary(props) {
    const [balance, setBalance] = useState();
    const [income, setIncome] = useState();
    const [expense, setExpense] = useState();

    const fetchBalance = () => {
        const result = axios
            .get("http://localhost:9030/api/getBalance/" + props.data)
            .then((result) => {
                // console.log(result);
                setBalance(result.data);
            });
    }

    const fetchIncome = () => {
        const result = axios
            .get("http://localhost:9030/api/getTypeIncome/" + props.data)
            .then((result) => {
                // console.log(result);
                setIncome(result.data);
            });
    }

    const fetchExpense = () => {
        const result = axios
            .get("http://localhost:9030/api/getTypeExpense/" + props.data)
            .then((result) => {
                // console.log(result);
                setExpense(result.data);
            });
    }

    useEffect(() => {
        fetchBalance();
        fetchIncome();
        fetchExpense();
    }, []);

    return (
        <div>
            <Container>
                <Row xs={1} md={2} className="g-4 mx-1 my-2 ">
                    {Array.from({ length: 1 }).map((_, idx) => (
                        <>
                            <Card border="dark" className="mx-3" style={{ width: '18rem' }}>
                                <Card.Header>Balance</Card.Header>
                                <Card.Body>
                                    <Card.Text>₹{balance}</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card border="dark" className="mx-3" style={{ width: '18rem' }}>
                                <Card.Header>Income</Card.Header>
                                <Card.Body>
                                    <Card.Text>₹{income}</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card border="dark" className="mx-3" style={{ width: '18rem' }}>
                                <Card.Header>Expense</Card.Header>
                                <Card.Body>
                                    <Card.Text>₹{expense}</Card.Text>
                                </Card.Body>
                            </Card>
                        </>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default FinanceSummary
