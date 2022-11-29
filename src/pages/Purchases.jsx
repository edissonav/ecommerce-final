import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getpurchasesThunk } from '../store/slices/purchases.slice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

const Purchases = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getpurchasesThunk())
    }, [])

    const purchasesList = useSelector(state => state.purchases)
    return (
        <div>
            <h1>Purchases</h1>
            {purchasesList.map(purchase => (

                <Link to={`/product/${purchase.cart.products[0]?.id}`}>
                    <Card style={{ width: '18rem', margin: '0 auto'}}>
                        <Card.Text>
                            {purchase.cart.products[0]?.createdAt}
                        </Card.Text>
                        <Card.Body>
                            <Card.Title>{purchase.cart.products[0]?.title}</Card.Title>
                        </Card.Body>
                    </Card></Link>

            ))
            }
        </div>
    );
};

export default Purchases;