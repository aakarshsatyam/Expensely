import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Transactions(props) {
    const [transaction, setTransaction] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [item, setItem] = useState({
        expensedate: new Date(),
        description: '',
        location: '',
        amount: '',
        type: '',
        category: {
            'id': 0,
            'name': ''
        },
        user: {
            'id': 0
        }
    });

    const fetchTransaction = () => {
        const result = axios
            .get("http://localhost:9030/api/expenses/" + props.data)
            .then((result) => {
                // console.log(result);
                setTransaction(result.data);
                item.user['id'] = props.data;
            });
    }

    const deleteTransaction = (id) => {
        axios
            .delete("http://localhost:9030/api/deleteExpense/" + id)
            .then((response) => {
                setTransaction(transaction.filter((item) => item.id !== id));
                window.location.reload();
            });
    };

    const fetchData = () => {
        axios
            .get("http://localhost:9030/api/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                // console.log(error);
            });
    }

    const categoryList =
        categories.map((category) =>
            <option value={category.name}>
                {category.name}
            </option>
        )

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const type = target.type;
        console.log(value);
        setItem({ ...item, [name]: value });
    }

    function handleDateChange(date) {
        setItem({ ...item, expensedate: date });
    }


    function handleSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost:9030/api/categoryName/${selectedCategory}`)
            .then(result => result.json())
            .then((result) => {
                // console.log("Record received")
                // console.log(result)
                item.category['id'] = result.id;
                item.category['name'] = result.name;
                setItem({ ...item });
                // console.log(item);
                axios.post("http://localhost:9030/api/expense", item)
                window.location.reload();
            })
    }

    useEffect(() => {
        fetchTransaction();
        fetchData();
    }, []);

    return (
        <div>
            <Container>
                <h3>Add Expense</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label for="description">Title</Form.Label>
                        <Form.Control
                            type="description"
                            name="description"
                            id="description"
                            onChange={handleChange}
                            autoComplete="name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <select value={categories.name} onChange={e => setSelectedCategory(e.target.value)} >
                            {categoryList}
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <DatePicker className="date-picker" selected={item.expensedate} onChange={handleDateChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="location">Location</Form.Label>
                        <Form.Control type="text" name="location" id="location" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="location">Amount</Form.Label>
                        <Form.Control type="text" name="amount" id="amount" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Type: </Form.Label>
                        Income<input type="radio" value="income" onChange={handleChange} name="type" />
                        Expense<input type="radio" value="expense" onChange={handleChange} name="type" />
                    </Form.Group>
                    <Form.Group>
                        <Button color="primary" className="mx-1" type="submit">Save</Button>
                        <Button color="secondary" className="mx-1" tag={Link} to="/homepage">Cancel</Button>
                    </Form.Group>
                </Form>
            </Container>
            <Container>
                <h3>Expense List</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaction.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.description}</td>
                                <td>{transaction.location}</td>
                                <td><Moment date={transaction.expensedate} format="DD/MM/YYYY" /></td>
                                <td>{transaction.category.name}</td>
                                <td>₹{transaction.amount}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Transactions
