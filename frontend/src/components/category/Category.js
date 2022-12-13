import React, { useState, useEffect } from 'react';
import NavigationBar from '../navbar/NavigationBar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { Container, Form } from 'react-bootstrap';

const Category = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [Categories, setCategories] = useState([]);
    const [formInputs, setFormInputs] = useState({
        "id": null,
        "name": "",
    });
    const [editing, setEditing] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormInputs({ ...formInputs, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editing) {
            axios
                .put("http://localhost:9030/api/updateCategory/" + formInputs.id, formInputs)
                .then((response) => {
                    setCategories(
                        Categories.map((item) => (item.id === formInputs.id ? formInputs : item))
                    );
                });
        } else {
            axios
                .post("http://localhost:9030/api/category", formInputs)
                .then((response) => {
                    setCategories([...Categories, response.Categories]);
                    window.location.reload();
                });
        }
        setFormInputs({ title: "" });
        setEditing(false);
    };

    const fetchData = () => {
        axios
            .get("http://localhost:9030/api/categories")
            .then((response) => {
                setCategories(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const editItem = (item) => {
        setFormInputs(item);
        setEditing(true);
    };

    const deleteItem = (id) => {
        axios
            .delete("http://localhost:9030/api/deleteCategory/" + id)
            .then((response) => {
                setCategories(Categories.filter((item) => item.id !== id));
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <NavigationBar />
            <Container>
                <h3>Add Category</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name: </Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formInputs.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="success" type="submit">Save</Button>
                </Form>
                <h3>Category List</h3>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (<Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>
                                    <Button variant="warning" className="mx-2" onClick={() => editItem(category)}>Edit</Button>
                                    <Button variant="danger" className="mx-2" onClick={() => deleteItem(category.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                    )}
            </Container>
        </div>
    );
};

export default Category;