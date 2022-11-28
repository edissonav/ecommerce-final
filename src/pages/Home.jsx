import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterproductsThunk, getProductsThunk, inputsearchThunk } from '../store/slices/products.slice';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Button, Form, InputGroup } from 'react-bootstrap';

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)

    const [categorieslist, setCategorieslist]= useState([])


    useEffect(() => {
        dispatch(getProductsThunk())
        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
        .then(res=> setCategorieslist(res.data.data.categories))
    }, [])
/*     console.log(categorieslist);
 */
    const [inputSearch, setInputSearch]=useState('')
    return (
        <div>
            <h1>Home </h1>
            <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search Product"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"

          value={inputSearch } onChange={e=> setInputSearch(e.target.value)}
        />
        <Button onClick={()=> dispatch(inputsearchThunk(inputSearch))} variant="outline-secondary" id="button-addon2">
          Search
        </Button>
        
      </InputGroup>

      
            {categorieslist.map(categorie =>(
                <Button onClick={()=> dispatch(filterproductsThunk(categorie.id))}>{categorie.name}</Button>
            ))}
            <br />
      
            <Row  xs={2} md={3} className="g-4">
                {products.map(product => (
                    < Link  key={product.id} className='link' to={`/product/${product.id}`}>
                        <Col >
                            <Card bg='light' variant='light'>
                                <Card.Img className='img' variant="top" src={product?.productImgs[0]} />
                                <Card.Img className='img-over' variant="top" src={product?.productImgs[1]} />

                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>price:{product.price}</Card.Text>

                                    <Card.Text>id:{product.id}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>
                ))}

            </Row>
        </div>
    );
};

export default Home;