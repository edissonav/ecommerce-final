import React, { useEffect, useState } from 'react';
import { Button, Card, CardGroup, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import Carousel from 'react-bootstrap/Carousel';
import { postcartThunk } from '../store/slices/cart.slice';

const ProductDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const productslist = useSelector(state => state.products)

    const findproduct = productslist.find(product => product.id === Number(id))
    const relatedproducts = productslist.filter(productrelated => productrelated.category.id === findproduct.category.id)
    const [inputvalue, setInputvalue] = useState(1)

    const addtocart = () => {
        const productadded = {
            id: findproduct.id,
            quantity: inputvalue
        };
        dispatch(postcartThunk(productadded))
/*         console.log(productadded);
 */        alert('Product Added to cart succesfully')

    }
    const decrement =()=>{
        setInputvalue(inputvalue-1)
    }
    const increment =()=>{
        setInputvalue(inputvalue+1)
    }


    return (
        <div>
            <Col >

                <Card className="card success-danger mb-3">
                    <Carousel>
                        <Carousel.Item>
                            <Card.Img className='img detail' variant="top" src={findproduct?.productImgs[0]} />

                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card.Img className='img detail' variant="top" src={findproduct?.productImgs[1]} />


                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card.Img className='img detail' variant="top" src={findproduct?.productImgs[2]} />


                        </Carousel.Item>
                    </Carousel>

                    <Card.Body>
                        <Card.Title>{findproduct?.title}</Card.Title>
                        <Card.Text>
                            {findproduct?.description}
                        </Card.Text>
                        <Card.Text>price:{findproduct?.price}</Card.Text>

                        <Card.Text>id:{findproduct?.id}</Card.Text>

                        <Button disabled={inputvalue === 1} className="btn btn-outline-primary addtocart" variant="btn btn-outline-primary" onClick={decrement}>-</Button>
                        <input style={{'textAlign':'center' }} type="text" value={inputvalue} onChange={e => setInputvalue(e.target.value)} />
                        <Button className="btn btn-outline-primary addtocart" variant="btn btn-outline-primary" onClick={increment}>+</Button>

                    </Card.Body>
                    <Button className="btn btn-outline-primary addtocart" variant="btn btn-outline-primary" onClick={addtocart}><i className='bx bx-cart-add' ></i></Button>

                </Card>
            </Col>

            <h3> <strong>Related products :</strong> </h3>
            {
                relatedproducts.map(relatedproduct => (
                    <Link className='link ' key={relatedproduct.id} to={`/product/${relatedproduct.id}`}>
                        <CardGroup className='related-products'><Card.Title>{relatedproduct.title}</Card.Title></CardGroup></Link>
                ))
            }

        </div>
    );
};

export default ProductDetail;