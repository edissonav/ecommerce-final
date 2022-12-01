import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { chekoutcartThunk, getcartThunk } from '../store/slices/cart.slice';

const Cart = ({show, handleClose}) => {

    const dispatch=useDispatch()


    useEffect(()=>{
        dispatch(getcartThunk())
    },[])

    const cart= useSelector(state => state.cart)

    return (

        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title> <i className='bx bxs-cart-alt'></i> </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            {cart.map(item => (
               <Link className='link' to={`/product/${item.id}`}>
                <Offcanvas.Title>{item.title} </Offcanvas.Title>
                <Offcanvas.Title>$: {item.price}</Offcanvas.Title>
                </Link>    

                ))}
            </Offcanvas.Body>
            <Button onClick={()=> dispatch(chekoutcartThunk())}>CheckOut</Button>
        </Offcanvas>

    );
};

export default Cart;