import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterproductsThunk, getProductsThunk, inputsearchThunk } from '../store/slices/products.slice';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import { postcartThunk } from '../store/slices/cart.slice';
import Alert from 'react-bootstrap/Alert';

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)

    const [categorieslist, setCategorieslist] = useState([])


    useEffect(() => {
        dispatch(getProductsThunk())
        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategorieslist(res.data.data.categories))
    }, [])
    /*     console.log(categorieslist);
     */
    const [inputSearch, setInputSearch] = useState('')

    const addtocart = (id) => {
        const productadded = {
            id: id,
            quantity: 1
        };
        dispatch(postcartThunk(productadded))
        alert('Product Added to cart succesfully')
    }
    return (
        <div>
            <h1>Home </h1>
            <InputGroup className="mb-3 input-home">
                <Form.Control
                    placeholder="Search Product"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    bg='border-danger'

                    value={inputSearch} onChange={e => setInputSearch(e.target.value)}
                    style={{ background: 'grey' }}
                />
                <Button className="btn btn-outline-primary" onClick={() => dispatch(inputsearchThunk(inputSearch))} variant="btn btn-outline-primary" id="button-addon2">
                    Search
                </Button>

            </InputGroup>

            <ButtonGroup className='buttongroup-home'>

                {categorieslist.map(categorie => (
                    <Button className="btn btn-outline-primary" variant="btn btn-outline-primary" onClick={() => dispatch(filterproductsThunk(categorie.id))}>{categorie.name}</Button>
                ))}
            </ButtonGroup>

            <Row xs={4} md={3} className="g-4">
                {products.map(product => (
                    <Col key={product.id} className='col' >

                        <Card className="card border-primary mb-3" >
                            < Link className='link' to={`/product/${product.id}`}>

                                <Card.Img className='img' variant="top" src={product?.productImgs[0]} />
                                {/*                                 <Card.Img className='img-over' variant="top" src={product?.productImgs[1]} />
 */}
                                <Card.Body className='card-body'>
                                    <Card.Title className='title'>{product?.title}</Card.Title>
                                    <Card.Text>price:${product?.price}</Card.Text>

                                    <Card.Text>id:{product?.id}</Card.Text>

                                </Card.Body>
                            </Link>
                            <Button onClick={() => addtocart(product.id)} className="btn btn-outline-primary addtocart" variant="btn btn-outline-primary"><i className='bx bx-cart-add' ></i></Button>

                        </Card>

                    </Col>
                ))}

            </Row>
        </div>
    );
};

export default Home;