import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { chekoutcartThunk, deletecartThunk, getcartThunk } from '../store/slices/cart.slice';

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
            {cart.map((item) =>  (
               <Link className='link' to={`/product/${item.id}`}>
                <Offcanvas.Header>
                 {item.brand} 
            </Offcanvas.Header>
                <Offcanvas.Title>{item.title} </Offcanvas.Title>
                <Offcanvas.Header>$: {item.price}</Offcanvas.Header>
                <Button onClick={()=>dispatch(deletecartThunk(item.id))} className="btn btn-outline-danger " variant="btn btn-outline-danger"><i className='bx bx-trash'></i></Button>
                </Link>    

                ))}
            </Offcanvas.Body>
            <Offcanvas.Header>Total:
                 <br /> 
                 ${cart.reduce((amount, item) => Number(item.price) + Number(amount), 0) } 
            </Offcanvas.Header>
            <Button onClick={()=> dispatch(chekoutcartThunk())}>CheckOut</Button>
        </Offcanvas>



    );
};

export default Cart;